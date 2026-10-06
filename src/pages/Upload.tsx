import { ChangeEvent, DragEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { enhanceImage, loadImage } from "../lib/imageProcessing";
import { useResult } from "../context/ResultContext";
import { useAuth } from "../context/AuthContext";
import SiteNav from "../components/SiteNav";

export default function Upload() {
  const navigate = useNavigate();
  const { setResult } = useResult();
  const { isGuest, guestRunsRemaining, useGuestRun } = useAuth();

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [dimensions, setDimensions] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  async function loadFile(file: File) {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Unsupported file type. Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result);
      try {
        const image = await loadImage(dataUrl);
        setDimensions(`${image.width} x ${image.height} px`);
        setPreviewUrl(dataUrl);
        setFileName(file.name);
      } catch {
        setError("Could not read this image. Try a different file.");
      }
    };
    reader.onerror = () => {
      setError("Could not read this file. Try a different image.");
    };
    reader.readAsDataURL(file);
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      loadFile(file);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function handleRunEnhancement() {
    if (!previewUrl) {
      setError("Please choose an image first.");
      return;
    }

    if (isGuest && guestRunsRemaining <= 0) {
      setError("Guest sessions include one SRM run. Register for unlimited runs and downloads.");
      return;
    }

    setError("");
    setIsProcessing(true);
    try {
      const result = await enhanceImage(previewUrl, fileName);
      if (isGuest) {
        useGuestRun();
      }
      setResult(result);
      navigate("/results");
    } catch {
      setError("Could not process this image. Try a smaller image or a different file.");
    } finally {
      setIsProcessing(false);
    }
  }

  const guestLimitReached = isGuest && guestRunsRemaining <= 0;

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/demo" backLabel="Back to Demo" />

      <section className="mx-auto max-w-5xl px-5 pb-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-300">Step 2 of 3</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Upload your tile</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
            Drag and drop an image below, or use the file picker. JPG and PNG are supported.
          </p>
        </motion.div>

        {isGuest ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col gap-2 border border-amber-300/30 bg-amber-300/[0.06] px-5 py-4 text-sm text-amber-100 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              {guestLimitReached
                ? "Your guest SRM run has been used."
                : `Guest session: ${guestRunsRemaining} SRM run remaining, no downloads.`}
            </span>
            <span className="flex items-center gap-4">
              <Link to="/login" className="font-bold uppercase tracking-[0.14em] text-stone-200 hover:text-white">
                Sign in
              </Link>
              <Link to="/register" className="font-bold uppercase tracking-[0.14em] text-teal-300 hover:text-teal-200">
                Register for full access →
              </Link>
            </span>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative flex min-h-[320px] flex-col items-center justify-center border-2 border-dashed p-8 text-center transition ${
              isDragging ? "border-emerald-300 bg-emerald-300/10" : "border-white/20 bg-white/[0.03]"
            }`}
          >
            {previewUrl ? (
              <div className="flex w-full flex-col items-center gap-4">
                <img
                  src={previewUrl}
                  alt="Selected upload preview"
                  className="max-h-72 w-auto max-w-full object-contain"
                />
                <div className="text-sm text-stone-300">
                  <p className="font-semibold text-white">{fileName}</p>
                  <p>{dimensions}</p>
                </div>
                <label className="cursor-pointer text-xs font-bold uppercase tracking-[0.16em] text-emerald-300 underline underline-offset-4 hover:text-emerald-200">
                  Choose a different image
                  <input type="file" accept="image/*" className="sr-only" onChange={handleFileInput} />
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold text-white">Drag and drop an image here</p>
                <p className="text-sm text-stone-400">or</p>
                <label className="cursor-pointer bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#07110f] transition hover:bg-emerald-200">
                  Choose File
                  <input type="file" accept="image/*" className="sr-only" onChange={handleFileInput} />
                </label>
                <p className="text-xs text-stone-500">Supports JPG, JPEG, and PNG</p>
              </div>
            )}
          </div>

          {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={handleRunEnhancement}
              disabled={!previewUrl || isProcessing || guestLimitReached}
              className="bg-emerald-300 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isProcessing
                ? "Running SRM Enhancement..."
                : guestLimitReached
                  ? "Guest Run Used"
                  : "Run SRM Enhancement"}
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
