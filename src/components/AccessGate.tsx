import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function AccessGate() {
  const { continueAsGuest } = useAuth();

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07110f]/72 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="font-semibold tracking-[0.22em] text-emerald-100">
            SRM STUDIO
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-16 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,164,65,0.10),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(45,212,191,0.10),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-3xl"
        >
          <p className="text-center text-sm font-semibold uppercase tracking-[0.26em] text-amber-300">
            Access required
          </p>
          <h1 className="mt-4 text-center text-4xl font-black tracking-tight text-white sm:text-5xl">
            Sign in to run the SRM demo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-stone-300">
            The demo, upload, and results pages need an account or a guest session. Guests get one SRM run without
            downloads — register for full, unlimited access.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col border border-white/12 bg-white/[0.04] p-6">
              <h2 className="text-lg font-bold text-white">Guest</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">
                Try one SRM run instantly. No account needed. Downloads are disabled.
              </p>
              <button
                onClick={continueAsGuest}
                className="mt-6 border border-white/25 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
              >
                Continue as Guest
              </button>
            </div>

            <div className="flex flex-col border-2 border-teal-300/50 bg-teal-300/[0.06] p-6">
              <h2 className="text-lg font-bold text-white">Register</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">
                Create a free account. Unlimited SRM runs and full download access.
              </p>
              <Link
                to="/register"
                className="mt-6 bg-teal-300 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 transition hover:bg-white"
              >
                Create Account
              </Link>
            </div>

            <div className="flex flex-col border border-white/12 bg-white/[0.04] p-6">
              <h2 className="text-lg font-bold text-white">Login</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">
                Already registered? Sign back in to continue with full access.
              </p>
              <Link
                to="/login"
                className="mt-6 border border-amber-300/50 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-amber-200 transition hover:border-amber-300 hover:bg-amber-300/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
