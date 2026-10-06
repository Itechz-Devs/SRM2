import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteNav from "../../components/SiteNav";
import AmbientBackground from "../../components/AmbientBackground";

const disasterImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2026/08/sentinel-2_captures_before_and_after_nepal_flash_flood/27442595-1-eng-GB/Sentinel-2_captures_before_and_after_Nepal_flash_flood_article.jpg";

export default function Disaster() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <SiteNav backTo="/#applications" backLabel="Back to Home" />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0">
          <img
            src={disasterImage}
            alt="Sentinel-2 before and after satellite images of the August 2026 Nepal flash flood and glacier collapse"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110f]/60 via-[#07110f]/55 to-[#07110f]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-300">
            Potential Application
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Disaster Management
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            Faster, clearer imagery can help responders understand the scale of a disaster in the critical hours
            after it happens.
          </p>
        </div>
      </section>

      {/* Real-world context, handled respectfully */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real-world context</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            The August 2026 Nepal flash flood
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            On August 26, 2026, a glacier collapse on Langtang Lirung triggered a catastrophic flash flood and
            debris avalanche along the Nepal–China border region, with hundreds killed and many more reported
            missing. In response, both the Copernicus Emergency Mapping Service and the International Charter Space
            and Major Disasters were activated, mobilizing satellite operators worldwide to support search, rescue,
            and recovery efforts.
          </p>
          <p className="mt-4 text-lg leading-8 text-stone-300">
            We reference this event because it illustrates why disaster mapping matters, not to present it as a
            case study our prototype has analyzed. Our thoughts are with those affected.
          </p>
        </motion.div>
      </section>

      {/* Real Sentinel-2 imagery */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden border border-white/12">
            <img
              src={disasterImage}
              alt="Sentinel-2 natural color images comparing the Nepal flood-affected area on August 12, 2026 (before) and August 27, 2026 (after)"
              className="w-full object-contain"
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Real Sentinel-2 output</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Before and after, natural color</h3>
            <p className="mt-4 leading-7 text-stone-300">
              The left image was acquired August 27, 2026, the day after the event; the right image was acquired
              August 12, 2026, before the flood. Both are shown in natural color at Sentinel-2's native resolution,
              clearly revealing the dramatic increase in river water and downstream devastation.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Credit: Contains modified Copernicus Sentinel data (2026), ESA.
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
              At 10 m resolution, damaged roads, collapsed bridges, and affected structures can be difficult to
              distinguish from surrounding terrain, especially in mountainous or debris-covered areas. If validated
              against high-resolution references, a super-resolution step could sharpen these details in the imagery
              already being delivered to emergency responders, potentially helping teams assess impacted
              infrastructure faster during the critical early response window.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-400">
              SRM's current prototype does not perform damage assessment or emergency analysis. This page
              describes a potential future capability that would require careful validation, and would never
              replace official emergency mapping services like Copernicus EMS.
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