import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createSyntheticScene, enhanceImage } from "../lib/imageProcessing";
import { useResult } from "../context/ResultContext";
import { useAuth } from "../context/AuthContext";
import SiteNav from "../components/SiteNav";

export default function Demo() {
  const navigate = useNavigate();
  const { setResult } = useResult();
  const { isGuest, guestRunsRemaining, useGuestRun } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const guestLimitReached = isGuest && guestRunsRemaining <= 0;

  async function handleTrySample() {
    if (guestLimitReached) {
      setError("Guest sessions include one SRM run. Register for unlimited runs and downloads.");
      return;
    }

    setError("");
    setIsProcessing(true);
    try {
      const sample = createSyntheticScene();
      const result = await enhanceImage(sample);
      if (isGuest) {
        useGuestRun();
      }
      setResult(result);
      navigate("/results");
    } catch {
      setError("The browser could not create the sample tile. Try uploading your own image instead.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/" backLabel="Back to Home" />

      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-16 pt-32 sm:pb-24">
        <div className="sweep-line pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-300/70" />

        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-300">Working demo</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
              Satellite Image Super-Resolution Demo
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
              Upload a medium-resolution satellite tile and run a browser-based SRM simulation. The pipeline
              resizes, sharpens, and generates an uncertainty heat map, mirroring the deployed OpenCV baseline and
              the FastAPI backend endpoint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-14 border border-white/12 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur sm:p-12"
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Start with your own image</h2>
                <p className="mt-2 max-w-xl text-stone-300">
                  Upload a JPG or PNG tile. On the next page you can preview it, check its dimensions, and run the
                  enhancement.
                </p>
              </div>
              <button
                onClick={() => navigate("/upload")}
                className="w-full flex-shrink-0 bg-emerald-300 px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white sm:w-auto"
              >
                Upload Image
              </button>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Or try a synthetic sample tile</h3>
                  <p className="mt-1 text-sm text-stone-400">
                    No image on hand? Run the demo instantly on a generated sample scene.
                  </p>
                </div>
                <button
                  onClick={handleTrySample}
                  disabled={isProcessing || guestLimitReached}
                  className="w-full flex-shrink-0 border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isProcessing ? "Processing..." : guestLimitReached ? "Guest Run Used" : "Use Sample Tile"}
                </button>
              </div>
              {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}
              {isGuest ? (
                <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                  <span>
                    {guestLimitReached
                      ? "Your guest SRM run has been used."
                      : `Guest session: ${guestRunsRemaining} SRM run remaining, no downloads.`}
                  </span>
                  <Link to="/login" className="text-stone-200 hover:text-white">
                    Sign in
                  </Link>
                  <Link to="/register" className="text-teal-300 hover:text-teal-200">
                    Register →
                  </Link>
                </p>
              ) : null}
            </div>

            <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Input target</dt>
                <dd className="mt-2 text-sm text-stone-300">10 m Sentinel-2 style RGB/NIR tile</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Output target</dt>
                <dd className="mt-2 text-sm text-stone-300">
                  Sub-4 m enhanced analysis tile plus uncertainty map
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Important note</dt>
                <dd className="mt-2 text-sm text-stone-300">
                  Final science-grade results require paired training data and reference validation.
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>
    </main>
  );
}