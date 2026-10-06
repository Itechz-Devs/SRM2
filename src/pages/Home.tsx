import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AmbientBackground from "../components/AmbientBackground";

type PipelineStep = {
  title: string;
  detail: string;
};

const heroImage =
  "https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/content-feature/bluemarble/images/globe_east_2048.jpg";

const agricultureImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/07/sentinel-2_for_agriculture/15535208-1-eng-GB/Sentinel-2_for_agriculture_pillars.jpg";

const disasterImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2026/08/sentinel-2_captures_before_and_after_nepal_flash_flood/27442595-1-eng-GB/Sentinel-2_captures_before_and_after_Nepal_flash_flood_article.jpg";

const urbanImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2024/09/seville_from_copernicus_sentinel-2c/26314246-1-eng-GB/Seville_from_Copernicus_Sentinel-2C_pillars.jpg";

const forestryImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/12/amazon_river/17276553-1-eng-GB/Amazon_River_pillars.jpg";

const infrastructureImage =
  "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/10/truck_detection_using_data_from_copernicus_sentinel-2/22239748-1-eng-GB/Truck_detection_using_data_from_Copernicus_Sentinel-2_pillars.png";

const pipeline: PipelineStep[] = [
  {
    title: "1. Collect paired Earth observation data",
    detail:
      "Use Sentinel-2 10 m imagery as the medium-resolution source and align it with high-resolution references from PlanetScope, aerial imagery, or commercial optical scenes.",
  },
  {
    title: "2. Pre-process before learning",
    detail:
      "Apply cloud masking, radiometric normalization, band selection, co-registration, tiling, and train-validation-test splits by geography to avoid leakage.",
  },
  {
    title: "3. Train the SRM model",
    detail:
      "Start with a SwinIR or ESRGAN baseline, then add spectral consistency, perceptual, edge, and uncertainty losses. Diffusion can be added later for the hardest textures.",
  },
  {
    title: "4. Validate scientifically",
    detail:
      "Compare against high-resolution references using PSNR, SSIM, LPIPS, SAM, ERGAS, edge F1, downstream classification gain, and uncertainty calibration.",
  },
  {
    title: "5. Serve as a geospatial product",
    detail:
      "Return enhanced imagery, georeferencing metadata, uncertainty maps, and processing records so analysts can use outputs responsibly.",
  },
];

const stack = [
  ["Frontend", "HTML, CSS, JavaScript, React, Tailwind CSS"],
  ["API", "Python, FastAPI, Uvicorn, multipart upload"],
  [
    "Image Ops",
    "OpenCV for tiling, sharpening, uncertainty, GeoTIFF-ready processing",
  ],
  ["Model", "SwinIR/ESRGAN first, optional diffusion refinement later"],
  [
    "Database",
    "PostgreSQL for jobs, metrics, audit trails, validation scores",
  ],
  [
    "Deployment",
    "Docker Compose locally, GPU worker for production training/inference",
  ],
];

const comparison = [
  {
    name: "CNN or ESRGAN",
    use: "Best first build",
    why: "Fast to train, strong edges, easier to deploy, good baseline for a hackathon or prototype.",
  },
  {
    name: "Transformer or SwinIR",
    use: "Most optimal core",
    why: "Captures larger spatial context, preserves structures better, and works well for roads, fields, and urban grids.",
  },
  {
    name: "Diffusion SR",
    use: "Advanced refinement",
    why: "Can create realistic texture, but must be constrained carefully because hallucinated detail is risky in remote sensing.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { session, isGuest, logout } = useAuth();
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.26],
    [1, 0.35]
  );

  const qualityChecks = useMemo(
    () => [
      "Geometric alignment",
      "Spectral consistency",
      "Uncertainty map",
      "Reference validation",
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07110f]/72 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a
            href="#top"
            className="font-semibold tracking-[0.22em] text-emerald-100"
          >
            GEOSRM STUDIO
          </a>

          <div className="hidden items-center gap-7 text-sm text-stone-300 md:flex">
            <a
              className="transition hover:text-white"
              href="#approach"
            >
              Approach
            </a>

            <a
              className="transition hover:text-white"
              href="#workflow"
            >
              Workflow
            </a>

            <a
              className="transition hover:text-white"
              href="#applications"
            >
              Applications
            </a>

            <Link
              className="transition hover:text-white"
              to="/demo"
            >
              Demo
            </Link>

            <a
              className="transition hover:text-white"
              href="#stack"
            >
              Stack
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm">
            {session ? (
              <>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-amber-300 sm:inline">
                  {isGuest ? "Guest session" : session.name}
                </span>
                <button
                  onClick={logout}
                  className="font-semibold uppercase tracking-[0.16em] text-stone-300 transition hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden font-semibold uppercase tracking-[0.16em] text-stone-300 transition hover:text-white sm:inline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 transition hover:bg-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:pb-24"
      >
        {/* Globe, right-aligned, partially off-screen */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute -right-[10%] top-1/2 z-0 h-[85vmin] w-[85vmin] -translate-y-1/2 sm:-right-[5%] lg:right-[2%]"
        >
          <img
            src={heroImage}
            alt="NASA Blue Marble Eastern Hemisphere: Earth's landmass and oceans as seen from space, showing Asia, the Middle East, and the Indian Ocean"
            className="h-full w-full rounded-full object-cover shadow-[0_0_120px_40px_rgba(16,185,129,0.15)]"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07110f]/55 via-[#07110f]/40 to-[#07110f]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(13,148,136,0.24),transparent_32%),linear-gradient(90deg,rgba(7,17,15,0.88),rgba(7,17,15,0.18))]" />

        {/* Technical overlay labels */}
        <div className="pointer-events-none absolute right-6 top-28 z-10 hidden flex-col items-end gap-2 font-mono text-xs uppercase tracking-[0.2em] text-teal-200/80 sm:flex">
          <span className="border border-teal-300/30 bg-[#07110f]/50 px-3 py-1 backdrop-blur-sm">
            10 m input
          </span>

          <span className="border border-amber-300/30 bg-[#07110f]/50 px-3 py-1 backdrop-blur-sm">
            super-resolution
          </span>

          <span className="border border-violet-300/30 bg-[#07110f]/50 px-3 py-1 backdrop-blur-sm">
            &lt;4 m target
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-teal-200">
              Deep Learning SRM from Sentinel-2
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
              GeoSRM Studio
            </h1>

            <h2 className="mt-7 max-w-3xl text-2xl font-medium leading-tight text-emerald-50 sm:text-4xl">
              Satellite Image Super-Resolution Mapping — turning 10 m Earth
              observation imagery into an analysis-ready, sub-4 m prototype
              product.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-200 sm:text-lg">
              The optimal route is a transformer-led super-resolution pipeline
              with strict geospatial validation, uncertainty maps, and a
              FastAPI service that can grow into GPU inference.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/demo")}
                className="bg-emerald-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white"
              >
                Try Image Demo
              </button>

              <a
                href="#approach"
                className="border border-white/35 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
              >
                Explore the Method
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section
        id="approach"
        className="relative overflow-hidden bg-gradient-to-b from-[#07110f] via-[#081a17] to-[#07110f] px-5 py-24"
      >
        <AmbientBackground variant="teal" />
        <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-teal-300">
            Most optimal solution
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Start with SwinIR-style transformer SR, not a free hallucination
            engine.
          </h2>

          <p className="mt-5 text-lg leading-8 text-stone-300">
            Remote sensing super-resolution must improve interpretability
            without inventing unsupported geography. A transformer or ESRGAN
            baseline with spectral and uncertainty losses is practical,
            accurate, and explainable for a presentation project.
          </p>
        </motion.div>

        <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
          {comparison.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              className="grid gap-5 py-8 md:grid-cols-[0.8fr_0.55fr_1.25fr] md:items-start"
            >
              <h3 className="text-2xl font-semibold text-white">
                {item.name}
              </h3>

              <p className="text-teal-200">
                {item.use}
              </p>

              <p className="leading-7 text-stone-300">
                {item.why}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative overflow-hidden bg-gradient-to-b from-[#07110f] via-[#171008] to-[#07110f] px-5 py-24 text-stone-100"
      >
        <AmbientBackground variant="amber" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-amber-300">
              Step-by-step procedure
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Build it like a remote sensing product.
            </h2>

            <p className="mt-5 text-lg leading-8 text-stone-300">
              The project can absolutely be built from scratch, but the fastest
              reliable path is to build a classical OpenCV baseline first,
              then replace the model block with a trained deep learning model.
            </p>
          </div>

          <div className="mt-14 grid gap-0 border-t border-white/12">
            {pipeline.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.48,
                  delay: index * 0.05,
                }}
                className="grid gap-4 border-b border-white/12 py-7 md:grid-cols-[120px_1fr]"
              >
                <span className="font-mono text-sm text-amber-300">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-4xl leading-7 text-stone-300">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section
        id="applications"
        className="relative overflow-hidden bg-gradient-to-b from-[#07110f] via-[#12101c] to-[#07110f] px-5 py-24"
      >
        <AmbientBackground variant="spectrum" />
        <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-stone-300">
            Potential applications
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Where sharper imagery could matter.
          </h2>

          <p className="mt-5 text-lg leading-8 text-stone-300">
            These are potential future applications, not capabilities of the
            current prototype. Each would require dedicated validation before
            real-world use.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Agriculture */}
          <Link
            to="/applications/agriculture"
            className="group relative block overflow-hidden border border-white/12 bg-white/[0.03] transition hover:border-amber-300/40"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={agricultureImage}
                alt="Sentinel-2 satellite image showing agriculture fields"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                Agriculture &amp; Precision Farming
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-400">
                Sharper field-level detail for crop boundaries and canopy
                structure.
              </p>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                Explore Application →
              </span>
            </div>
          </Link>

          {/* Urban */}
          <Link
            to="/applications/urban"
            className="group relative block overflow-hidden border border-white/12 bg-white/[0.03] transition hover:border-sky-300/40"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={urbanImage}
                alt="Sentinel-2C satellite image of Seville, Spain"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                Urban Development &amp; Smart Cities
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-400">
                Sharper structural detail for building footprints and road
                networks.
              </p>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
                Explore Application →
              </span>
            </div>
          </Link>

          {/* Disaster */}
          <Link
            to="/applications/disaster"
            className="group relative block overflow-hidden border border-white/12 bg-white/[0.03] transition hover:border-rose-300/40"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={disasterImage}
                alt="Satellite imagery showing before and after flooding in Nepal"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                Disaster Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-400">
                Faster interpretation of affected areas during emergency
                response.
              </p>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
                Explore Application →
              </span>
            </div>
          </Link>

          {/* Forestry */}
          <Link
            to="/applications/forestry"
            className="group relative block overflow-hidden border border-white/12 bg-white/[0.03] transition hover:border-emerald-300/40"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={forestryImage}
                alt="Sentinel-2A satellite image of the Amazon River delta, Brazil"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                Forestry &amp; Environmental Monitoring
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-400">
                Finer vegetation detail for tracking forest cover and canopy
                change.
              </p>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                Explore Application →
              </span>
            </div>
          </Link>

          {/* Infrastructure */}
          <Link
            to="/applications/infrastructure"
            className="group relative block overflow-hidden border border-white/12 bg-white/[0.03] transition hover:border-violet-300/40"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#06100e]">
              <img
                src={infrastructureImage}
                alt="Sentinel-2 derived analysis showing trucks detected on road networks"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-white">
                Infrastructure, Roads &amp; Critical Assets
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-400">
                Clearer road networks and structures for infrastructure
                monitoring.
              </p>

              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-violet-300">
                Explore Application →
              </span>
            </div>
          </Link>
        </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        id="stack"
        className="relative overflow-hidden bg-gradient-to-b from-[#07110f] via-[#0e0b1a] to-[#07110f] px-5 py-24 text-stone-100"
      >
        <AmbientBackground variant="violet" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-violet-300">
                Tech stack
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                The repository now includes frontend and backend project
                pieces.
              </h2>

              <p className="mt-5 text-lg leading-8 text-stone-300">
                React handles the presentation and prototype demo. FastAPI
                handles image uploads. OpenCV performs baseline
                super-resolution operations. PostgreSQL records jobs and
                validation metadata.
              </p>
            </div>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {stack.map(([name, value]) => (
                <div
                  key={name}
                  className="grid gap-3 py-5 sm:grid-cols-[160px_1fr]"
                >
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-violet-300">
                    {name}
                  </h3>

                  <p className="text-lg font-medium text-stone-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-white/12 pt-10">
            <h3 className="text-2xl font-black text-white">
              Validation checklist for the presentation
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {qualityChecks.map((check) => (
                <motion.div
                  key={check}
                  whileHover={{ y: -4 }}
                  className="border-l-4 border-amber-300 bg-white/[0.05] p-5 text-lg font-bold text-white"
                >
                  {check}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-10 text-sm text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            GeoSRM Studio: deep learning based super-resolution mapping project
            scaffold.
          </p>

          <p>
            Use responsibly: inferred details must be validated against
            high-resolution references.
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-7xl text-xs text-stone-500">
          <p>
            Hero image: NASA &quot;Blue Marble&quot; (2002), Eastern
            Hemisphere. Image by Reto Stöckli and Robert Simmon, NASA Goddard
            Space Flight Center (public domain).
          </p>
        </div>
      </footer>
    </main>
  );
}