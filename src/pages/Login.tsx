import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validateLogin, type FieldErrors } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    const validation = validateLogin({ email, password });
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const success = login({ email, password });
    if (!success) {
      setFormError("Incorrect email or password.");
      return;
    }
    navigate("/demo");
  }

  return (
    <main className="min-h-screen bg-[#07110f] text-stone-100">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07110f]/72 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="font-semibold tracking-[0.22em] text-emerald-100">
            GEOSRM STUDIO
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(217,164,65,0.10),transparent_38%),radial-gradient(circle_at_85%_75%,rgba(45,212,191,0.10),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md border border-white/12 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-300">Welcome back</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">Sign in</h1>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            Use the email and password you registered with in this browser.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-white/20 bg-[#06100e] px-4 py-3 text-white outline-none transition focus:border-amber-300"
                placeholder="you@example.com"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.16em] text-stone-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-white/20 bg-[#06100e] px-4 py-3 text-white outline-none transition focus:border-amber-300"
                placeholder="Your password"
              />
              {errors.password ? <p className="mt-1 text-xs text-red-300">{errors.password}</p> : null}
            </div>

            {formError ? <p className="text-sm text-red-300">{formError}</p> : null}

            <button
              type="submit"
              className="mt-2 bg-amber-300 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-white"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-teal-300 hover:text-teal-200">
              Register
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
