import base64
import os
import time
from typing import Any

import asyncpg
import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="SRM Studio API",
    description="FastAPI and OpenCV baseline service for satellite super-resolution mapping.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_pool: asyncpg.Pool | None = None


@app.on_event("startup")
async def startup() -> None:
    """Connect to PostgreSQL only when DATABASE_URL is supplied."""
    global db_pool
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        return

    db_pool = await asyncpg.create_pool(database_url, min_size=1, max_size=4)
    async with db_pool.acquire() as connection:
        await connection.execute(
            """
            CREATE TABLE IF NOT EXISTS srm_jobs (
                id BIGSERIAL PRIMARY KEY,
                file_name TEXT NOT NULL,
                scale_factor INTEGER NOT NULL,
                input_width INTEGER NOT NULL,
                input_height INTEGER NOT NULL,
                output_width INTEGER NOT NULL,
                output_height INTEGER NOT NULL,
                uncertainty_mean DOUBLE PRECISION NOT NULL,
                processing_ms INTEGER NOT NULL,
                metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            );
            """
        )


@app.on_event("shutdown")
async def shutdown() -> None:
    if db_pool:
        await db_pool.close()


def encode_image(image: np.ndarray, extension: str = ".jpg") -> str:
    ok, buffer = cv2.imencode(extension, image)
    if not ok:
        raise HTTPException(status_code=500, detail="Could not encode output image")
    mime = "image/png" if extension == ".png" else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(buffer).decode('ascii')}"


def limit_image_size(image: np.ndarray, max_side: int = 1400) -> np.ndarray:
    height, width = image.shape[:2]
    longest = max(height, width)
    if longest <= max_side:
        return image
    scale = max_side / longest
    return cv2.resize(image, (int(width * scale), int(height * scale)), interpolation=cv2.INTER_AREA)


def run_opencv_srm_baseline(content: bytes, scale_factor: int) -> dict[str, Any]:
    np_buffer = np.frombuffer(content, np.uint8)
    image = cv2.imdecode(np_buffer, cv2.IMREAD_COLOR)
    if image is None:
        raise HTTPException(status_code=400, detail="Unsupported or corrupt image")

    image = limit_image_size(image)
    input_height, input_width = image.shape[:2]

    # This baseline is intentionally replaceable by ESRGAN, SwinIR, or a diffusion model runner.
    upscaled = cv2.resize(image, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)
    denoised = cv2.bilateralFilter(upscaled, d=5, sigmaColor=45, sigmaSpace=45)
    blurred = cv2.GaussianBlur(denoised, (0, 0), sigmaX=1.15)
    enhanced = cv2.addWeighted(denoised, 1.5, blurred, -0.5, 0)

    gray = cv2.cvtColor(enhanced, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_32F, ksize=3)
    magnitude = cv2.convertScaleAbs(laplacian)
    uncertainty = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
    uncertainty = cv2.GaussianBlur(uncertainty, (5, 5), 0)
    uncertainty_color = cv2.applyColorMap(uncertainty, cv2.COLORMAP_TURBO)

    output_height, output_width = enhanced.shape[:2]
    uncertainty_mean = float(np.mean(uncertainty) / 255.0)

    return {
        "input_width": input_width,
        "input_height": input_height,
        "output_width": output_width,
        "output_height": output_height,
        "scale_factor": scale_factor,
        "enhanced_image": encode_image(enhanced, ".jpg"),
        "uncertainty_map": encode_image(uncertainty_color, ".png"),
        "uncertainty_mean": uncertainty_mean,
        "method": "OpenCV bicubic + bilateral filter + unsharp mask baseline",
    }


async def store_job(file_name: str, result: dict[str, Any], processing_ms: int) -> int | None:
    if not db_pool:
        return None

    async with db_pool.acquire() as connection:
        row = await connection.fetchrow(
            """
            INSERT INTO srm_jobs (
                file_name,
                scale_factor,
                input_width,
                input_height,
                output_width,
                output_height,
                uncertainty_mean,
                processing_ms,
                metadata
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
            RETURNING id;
            """,
            file_name,
            result["scale_factor"],
            result["input_width"],
            result["input_height"],
            result["output_width"],
            result["output_height"],
            result["uncertainty_mean"],
            processing_ms,
            '{"model_stage":"baseline","requires_reference_validation":true}',
        )
    return int(row["id"])


@app.get("/api/health")
async def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "postgres_enabled": db_pool is not None,
        "model": "opencv-baseline-replaceable-with-swinir-or-esrgan",
    }


@app.get("/api/project-plan")
async def project_plan() -> dict[str, Any]:
    return {
        "recommended_model_path": [
            "OpenCV baseline",
            "ESRGAN or SwinIR x3/x4 training",
            "spectral and geospatial consistency losses",
            "uncertainty estimation",
            "validation against high-resolution references",
        ],
        "metrics": ["PSNR", "SSIM", "LPIPS", "SAM", "ERGAS", "edge F1", "downstream classification gain"],
    }


@app.post("/api/super-resolve")
async def super_resolve(file: UploadFile = File(...), scale_factor: int = 3) -> dict[str, Any]:
    if scale_factor < 2 or scale_factor > 4:
        raise HTTPException(status_code=400, detail="scale_factor must be between 2 and 4")

    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Upload an image file")

    content = await file.read()
    if len(content) > 12 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File is too large for demo processing")

    start = time.perf_counter()
    result = run_opencv_srm_baseline(content, scale_factor)
    processing_ms = int((time.perf_counter() - start) * 1000)
    job_id = await store_job(file.filename or "uploaded_tile", result, processing_ms)

    return {
        "job_id": job_id,
        "file_name": file.filename,
        "processing_ms": processing_ms,
        **result,
        "warning": "This is a deterministic OpenCV baseline. Replace the model block with trained weights for science-grade SRM.",
    }