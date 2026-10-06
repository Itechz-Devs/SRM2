# SRM Studio

SRM Studio is a working presentation and prototype for **Deep Learning Based Super Resolution Mapping from Medium Resolution Satellite Imageries**.

The project explains how to transform 10 m Sentinel-2 style imagery into sharper sub-4 m analysis products while preserving geospatial and spectral consistency. It also includes a frontend demo and a FastAPI backend baseline that can later be replaced with trained ESRGAN, SwinIR, or diffusion model weights.

## What This Project Contains

- React, HTML, CSS, and JavaScript presentation UI in `src/App.tsx`
- Browser-based image upload demo that simulates SRM enhancement and uncertainty mapping
- Python FastAPI backend in `backend/app/main.py`
- OpenCV baseline for resize, denoise, sharpen, and uncertainty heat map generation
- PostgreSQL-ready job storage through `DATABASE_URL`
- Docker Compose setup for API plus PostgreSQL

## Recommended Technical Approach

For a real competition or research submission, use this path:

1. Build an OpenCV baseline first so the full system works end to end.
2. Prepare paired training data using Sentinel-2 10 m images and high-resolution references.
3. Train ESRGAN or SwinIR as the first deep learning model.
4. Add spectral consistency loss, edge loss, perceptual loss, and geospatial alignment checks.
5. Generate uncertainty maps because some fine details are inferred by the model.
6. Validate against high-resolution references using PSNR, SSIM, LPIPS, SAM, ERGAS, edge F1, and downstream classification improvement.
7. Deploy inference through FastAPI and store jobs, metrics, and validation records in PostgreSQL.

## Frontend Setup

Install dependencies if needed:

```bash
npm install
```

Run the web app:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Backend Setup Without Docker

Create a virtual environment and install Python dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

If PostgreSQL is not configured, the API still runs and skips persistence.

## Backend Setup With PostgreSQL

Run the API and PostgreSQL together:

```bash
docker compose up --build
```

Useful endpoints:

- `GET http://localhost:8000/api/health`
- `GET http://localhost:8000/api/project-plan`
- `POST http://localhost:8000/api/super-resolve` with form-data field `file`

## Replacing the Baseline With a Deep Model

The function `run_opencv_srm_baseline` in `backend/app/main.py` is the replacement point. A production model runner would:

1. Read the geospatial tile and metadata.
2. Normalize bands using training statistics.
3. Run x3 or x4 model inference on overlapping tiles.
4. Merge tiles with feathering to avoid seams.
5. Restore georeferencing metadata.
6. Return enhanced imagery plus an uncertainty map.

## Presentation Talking Points

- Medium-resolution imagery is valuable because it has broad coverage and frequent revisit time.
- The limitation is insufficient detail for narrow roads, small buildings, field boundaries, and localized damage.
- Super-resolution must not only look sharp; it must preserve geographic and spectral truth.
- The most practical model choice is SwinIR or ESRGAN first, with diffusion as an optional refinement stage.
- Uncertainty is mandatory because reconstructed details are inferred, not directly observed.
- Validation against high-resolution references is essential before operational use.