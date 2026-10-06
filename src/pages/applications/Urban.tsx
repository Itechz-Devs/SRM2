import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "../../components/SiteNav";
import AmbientBackground from "../../components/AmbientBackground";

const urbanImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2024/09/seville_from_copernicus_sentinel-2c/26314246-1-eng-GB/Seville_from_Copernicus_Sentinel-2C_pillars.jpg";

export default function Urban() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/#applications" backLabel="Back to Home" />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0">
          <img
            src={urbanImage}
            alt="Sentinel-2C satellite image of Seville, Spain and the Guadalquivir River, captured shortly after the satellite's September 2024 launch"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110f]/60 via-[#07110f]/55 to-[#07110f]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-300">
            Potential Application
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Urban Development &amp; Smart Cities
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            Sharper structural detail can support how planners interpret building footprints, road networks, and
            the pace of urban growth over time.
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
            Cities are dense and fast-changing — 10 m pixels blur both.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Urban environments pack an enormous amount of structure into a small area: individual buildings, narrow
            streets, construction sites, and infrastructure corridors. At Sentinel-2's native 10 m resolution, many
            of these features fall below a single pixel or blend into their neighbors, making it harder to track
            fine-grained urban change, distinguish building types, or catch new construction early.
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
              src={urbanImage}
              alt="Sentinel-2C image of Seville, Spain, showing the city, the Guadalquivir River, and surrounding agricultural land at 10 m resolution"
              className="w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real Sentinel-2 output</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Seville and the Guadalquivir, Spain</h3>
            <p className="mt-4 leading-7 text-stone-300">
              This is real Sentinel-2 data, not a mockup. Captured on 13 September 2024, just over a week after the
              Sentinel-2C satellite's launch, this was one of its very first images: a clear view of Seville — the
              capital of Andalusia — sitting on the Guadalquivir River, one of the longest rivers in Spain, all
              resolved at the mission's native 10 m resolution.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Credit: Contains modified Copernicus Sentinel data (2024), processed by ESA.
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
              If validated against high-resolution references, a super-resolution step applied before interpretation
              could sharpen building outlines and street-level structure — potentially making it easier to spot new
              construction, distinguish dense urban blocks from open land, or track infrastructure growth across a
              city over time.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-400">
              SRM's current prototype does not yet perform building detection or urban land-use classification.
              This page describes a potential future capability once the model is trained and validated on real
              urban imagery.
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
