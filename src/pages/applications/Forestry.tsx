import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "../../components/SiteNav";
import AmbientBackground from "../../components/AmbientBackground";

const forestryImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/12/amazon_river/17276553-1-eng-GB/Amazon_River_pillars.jpg";

export default function Forestry() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/#applications" backLabel="Back to Home" />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0">
          <img
            src={forestryImage}
            alt="Sentinel-2A satellite image of the Amazon River meeting the Atlantic Ocean in northern Brazil, showing dense rainforest, sediment plume, and cleared land"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110f]/60 via-[#07110f]/55 to-[#07110f]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-300">
            Potential Application
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Forestry &amp; Environmental Monitoring
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            Finer vegetation detail can support how analysts track forest cover, canopy change, and the edges of
            deforestation over time.
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
            Forest loss often starts small — smaller than a 10 m pixel.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Early-stage deforestation, selective logging, and narrow forest access roads can be difficult to
            distinguish at Sentinel-2's native 10 m resolution, especially in dense, continuous canopy. Analysts
            monitoring environmental change often need to wait until clearings grow large enough to register clearly
            across several pixels, which delays detection of change that matters.
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
              src={forestryImage}
              alt="Sentinel-2A image of the Amazon River delta in northern Brazil, acquired 22 August 2017, showing sediment-laden water, rainforest, and cleared agricultural land"
              className="w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real Sentinel-2 output</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Amazon River delta, northern Brazil</h3>
            <p className="mt-4 leading-7 text-stone-300">
              This is real Sentinel-2 data, not a mockup. Acquired by Sentinel-2A on 22 August 2017, the image shows
              sediment-laden river water flowing out to the Atlantic Ocean. In the upper-left section, large brown
              areas mark land already cleared of vegetation, with geometric field boundaries and linear roads cutting
              through the remaining dense rainforest.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Credit: Contains modified Copernicus Sentinel data (2017), processed by ESA.
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
              If validated against high-resolution references, a super-resolution step could sharpen the edges of
              vegetation clearings and access roads in imagery already used for environmental monitoring —
              potentially helping analysts catch smaller-scale forest loss sooner and track canopy change with more
              precision between satellite passes.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-400">
              GeoSRM's current prototype does not perform deforestation detection or vegetation classification. This
              page describes a potential future capability that would require careful validation against real
              forestry and environmental datasets.
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
