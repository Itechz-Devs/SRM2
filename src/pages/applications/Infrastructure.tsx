import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "../../components/SiteNav";
import AmbientBackground from "../../components/AmbientBackground";

const infrastructureImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/10/truck_detection_using_data_from_copernicus_sentinel-2/22239748-1-eng-GB/Truck_detection_using_data_from_Copernicus_Sentinel-2_pillars.png";

export default function Infrastructure() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/#applications" backLabel="Back to Home" />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0">
          <img
            src={infrastructureImage}
            alt="Sentinel-2 derived analysis showing moving trucks detected on road networks via chromatic-shift patterns between spectral bands"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110f]/60 via-[#07110f]/55 to-[#07110f]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-300">
            Potential Application
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Infrastructure, Roads &amp; Critical Assets
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            Clearer road networks and structures can support how analysts map, monitor, and assess infrastructure
            over time.
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
            Narrow roads and small structures sit near the edge of what 10 m can resolve.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Individual roads, bridges, and small infrastructure assets are often only a few meters wide — close to
            or below the width of a single Sentinel-2 pixel. This makes it harder to trace road networks precisely,
            distinguish nearby structures from one another, or reliably monitor infrastructure corridors for change
            over time using medium-resolution imagery alone.
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
          <div className="overflow-hidden border border-white/12 bg-[#06100e]">
            <img
              src={infrastructureImage}
              alt="Zoomed Sentinel-2 image tiles with cyan markers showing the chromatic-shift trail left by trucks moving along roads, detected using the satellite's band acquisition timing"
              className="w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real Sentinel-2 output</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Detecting trucks on the road network</h3>
            <p className="mt-4 leading-7 text-stone-300">
              This is a real Sentinel-2 analysis product, not a mockup. Because Sentinel-2's spectral bands are
              captured a fraction of a second apart, fast-moving vehicles like trucks leave a rainbow-fringed
              "ghost" trail across the bands. Submitted to an ESA contest on tracking COVID-19's effect on trade and
              traffic, this technique — from contest winner Henrik Fisser of Julius-Maximilians-Universität Würzburg
              — used that chromatic shift to flag trucks (marked in cyan) directly on the road network, at 10 m
              resolution.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Credit: Contains modified Copernicus Sentinel data (2020), analysis by Henrik Fisser
              (Julius-Maximilians-Universität Würzburg), processed by ESA.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How GeoSRM could help */}
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
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">How GeoSRM could help</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              A potential future capability, not a current analysis engine.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-300">
              If validated against high-resolution references, a super-resolution step could sharpen road edges and
              small structures in imagery already used for infrastructure monitoring — potentially making it easier
              to trace road networks precisely, distinguish closely spaced assets, and detect changes to
              infrastructure corridors between satellite passes.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-400">
              GeoSRM's current prototype does not perform road extraction, asset detection, or infrastructure
              analysis. This page describes a potential future capability once the model is trained and validated on
              real infrastructure imagery.
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
          <p>GeoSRM Studio: deep learning based super-resolution mapping project scaffold.</p>
        </div>
      </footer>
    </main>
  );
}
