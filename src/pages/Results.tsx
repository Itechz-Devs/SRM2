import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useResult } from "../context/ResultContext";
import { useAuth } from "../context/AuthContext";
import SiteNav from "../components/SiteNav";
import ImageComparisonSlider from "../components/ImageComparisonSlider";

function stripExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot > 0 ? fileName.slice(0, lastDot) : fileName;
}

async function downloadDataUrl(dataUrl: string, filename: string) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

export default function Results() {
  const navigate = useNavigate();
  const { result } = useResult();
  const { canDownload } = useAuth();

  useEffect(() => {
    if (!result) {
      navigate("/upload", { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const baseName = stripExtension(result.fileName);

  function handleDownloadEnhanced() {
    downloadDataUrl(result!.outputUrl, `${baseName}_enhanced-srm.jpg`);
  }

  function handleDownloadUncertainty() {
    downloadDataUrl(result!.uncertaintyUrl, `${baseName}_uncertainty-map.png`);
  }

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/upload" backLabel="Process Another" />

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-300">Step 3 of 3</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            SRM Enhancement Results
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-300">
            <span>
              File: <span className="font-semibold text-white">{result.fileName}</span>
            </span>
            <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Enhancement Complete
            </span>
          </div>
        </motion.div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid grid-cols-2 gap-4 border-y border-white/12 py-6 sm:grid-cols-4"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Input Resolution</p>
            <p className="mt-1 text-sm text-stone-200">{result.inputSize}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Output Resolution</p>
            <p className="mt-1 text-sm text-stone-200">{result.outputSize}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Scale Factor</p>
            <p className="mt-1 text-sm text-stone-200">3x</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Status</p>
            <p className="mt-1 text-sm text-stone-200">Complete</p>
          </div>
        </motion.div>

        {/* Interactive before/after */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Drag to compare</p>
          <div className="mt-3 border border-white/12 bg-[#06100e]">
            <ImageComparisonSlider
              beforeSrc={result.inputUrl}
              afterSrc={result.outputUrl}
              beforeLabel="Original"
              afterLabel="Enhanced SRM"
            />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            Drag the handle, or focus it and use the arrow keys, to reveal more of the enhanced output.
          </p>
        </motion.div>

        {/* Original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">Full-size views</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Original / Input Image</p>
          <div className="mt-3 flex items-center justify-center border border-white/12 bg-[#06100e] p-4">
            <img
              src={result.inputUrl}
              alt="Original input tile"
              className="max-h-[420px] w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Enhanced - prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Enhanced SRM</p>
            <span className="bg-emerald-300 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950">
              Enhanced
            </span>
          </div>
          <div className="mt-3 border-2 border-emerald-300/50 bg-[#06100e] p-4 shadow-2xl shadow-emerald-900/20">
            <div className="flex items-center justify-center">
              <img
                src={result.outputUrl}
                alt="Enhanced SRM output tile"
                className="max-h-[560px] w-full object-contain"
              />
            </div>
          </div>
          {canDownload ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleDownloadEnhanced}
                className="bg-emerald-300 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white"
              >
                Download Enhanced SRM
              </button>
              <button
                onClick={handleDownloadUncertainty}
                className="border border-white/25 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
              >
                Download Uncertainty Map
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3 border border-amber-300/30 bg-amber-300/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-200">
                  Downloads are a registered-account feature
                </p>
                <p className="mt-1 text-sm text-stone-300">
                  Guest sessions can preview results but can&apos;t download files.
                </p>
              </div>
              <Link
                to="/register"
                className="flex-shrink-0 bg-teal-300 px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 transition hover:bg-white"
              >
                Register for Downloads
              </Link>
            </div>
          )}
        </motion.div>

        {/* Uncertainty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Uncertainty Map</p>
          <div className="mt-3 flex items-center justify-center border border-white/12 bg-[#06100e] p-4">
            <img
              src={result.uncertaintyUrl}
              alt="Uncertainty map"
              className="max-h-[420px] w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Bottom actions */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/12 pt-8 sm:flex-row">
          <Link
            to="/upload"
            className="bg-white px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#07110f] transition hover:bg-emerald-200"
          >
            Process Another Image
          </Link>
          <Link
            to="/"
            className="border border-white/25 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}