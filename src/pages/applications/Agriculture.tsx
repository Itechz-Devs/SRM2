import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "../../components/SiteNav";
import AmbientBackground from "../../components/AmbientBackground";

const agricultureImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/07/sentinel-2_for_agriculture/15535208-1-eng-GB/Sentinel-2_for_agriculture_pillars.jpg";

export default function Agriculture() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/#approach" backLabel="Back to Home" />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0">
          <img
            src={agricultureImage}
            alt="Sentinel-2 satellite image near Toulouse, France, showing sunflower fields in orange and maize fields in yellow, classified from 10 m multispectral data"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110f]/60 via-[#07110f]/55 to-[#07110f]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-300">
            Potential Application 01
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Agriculture &amp; Precision Farming
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            Sharper field-level detail can support how analysts interpret crop boundaries, canopy structure, and
            land use over time.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">The problem</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            10 m resolution can blur the edges that matter most to farmers.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            At Sentinel-2's native 10 m resolution, individual field boundaries, irrigation channels, and small
            plots can blend together, especially in regions with fragmented or smallholder agriculture. This limits
            how precisely analysts can track crop type, field-level health, or subtle changes over a growing
            season.
          </p>
        </motion.div>
      </section>

      {/* Real Sentinel-2 context */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-2 md:items-center"
        >
          <div className="overflow-hidden border border-white/12">
            <img
              src={agricultureImage}
              alt="Sunflower fields (orange) and maize fields (yellow) classified from Sentinel-2 imagery near Toulouse, France"
              className="w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real Sentinel-2 output</p>
            <h3 className="mt-3 text-2xl font-bold text-white">
              Crop discrimination near Toulouse, France
            </h3>
            <p className="mt-4 leading-7 text-stone-300">
              This is real Sentinel-2 data, not a mockup. Acquired on July 6, 2015, the satellite's multispectral
              instrument — including its three "red edge" bands — was able to distinguish sunflower fields (shown in
              orange) from maize fields (shown in yellow) at native 10 m resolution.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Credit: Copernicus Sentinel data (2015) / ESA / University of Louvain / CESBIO.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How SRM could help */}
      <section className="relative overflow-hidden px-5 py-20">
        <AmbientBackground variant="amber" />
        <div className="relative z-10">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">How SRM could help</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              A potential future capability, not a current analysis engine.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              If validated against high-resolution references, a super-resolution step applied before classification
              could sharpen field boundaries and small-plot detail — potentially making it easier to distinguish
              adjacent crop types or detect within-field variability that gets lost at native 10 m resolution.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-400">
              SRM's current prototype does not yet perform crop classification or agricultural analysis. This
              page describes a potential future capability once the model is trained and validated on real
              agricultural imagery.
            </p>
          </motion.div>
        </div>
      </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Try the enhancement prototype</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-300">
            See how the current browser-based SRM simulation works on your own image or a synthetic sample tile.
          </p>
          <button
            onClick={() => navigate("/demo")}
            className="mt-8 bg-emerald-300 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white"
          >
            Try Image Demo
          </button>
        </div>
      </section>

      <footer className="px-5 py-10 text-sm text-stone-400">
        <div className="mx-auto max-w-7xl border-t border-white/12 pt-8">
          <p>SRM Studio: deep learning based super-resolution mapping project scaffold.</p>
        </div>
      </footer>
    </main>
  );
}
