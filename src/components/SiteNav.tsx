import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SiteNav({ backTo, backLabel }: { backTo?: string; backLabel?: string }) {
  const { session, isGuest, logout } = useAuth();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07110f]/72 px-5 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="font-semibold tracking-[0.22em] text-emerald-100">
          SRM STUDIO
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {backTo ? (
            <Link
              to={backTo}
              className="font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:text-white"
            >
              {backLabel ?? "Back"}
            </Link>
          ) : null}
          {session ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-amber-300 sm:inline">
                {isGuest ? "Guest session" : session.name}
              </span>
              <button
                onClick={logout}
                className="font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:text-white"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="font-semibold uppercase tracking-[0.18em] text-stone-300 transition hover:text-white"
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
  );
}
