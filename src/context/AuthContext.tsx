import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Session } from "../types";
import {
  GUEST_RUN_LIMIT,
  clearSession,
  loginAccount,
  readSession,
  recordGuestRun,
  registerAccount,
  startGuestSession,
} from "../lib/auth";

type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  guestRunsRemaining: number;
  canDownload: boolean;
  register: (input: { name: string; email: string; password: string }) => void;
  login: (input: { email: string; password: string }) => boolean;
  continueAsGuest: () => void;
  useGuestRun: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => readSession());

  const value = useMemo<AuthContextValue>(() => {
    const isGuest = session?.tier === "guest";
    const guestRunsRemaining = isGuest ? Math.max(0, GUEST_RUN_LIMIT - session!.guestRunsUsed) : Infinity;

    return {
      session,
      isAuthenticated: session !== null,
      isGuest,
      guestRunsRemaining,
      canDownload: session !== null && !isGuest,
      register: (input: { name: string; email: string; password: string }) => {
        const next = registerAccount(input);
        setSession(next);
      },
      login: (input: { email: string; password: string }) => {
        const next = loginAccount(input);
        if (!next) return false;
        setSession(next);
        return true;
      },
      continueAsGuest: () => {
        const next = startGuestSession();
        setSession(next);
      },
      useGuestRun: () => {
        setSession((current: Session | null) => {
          if (!current || current.tier !== "guest") return current;
          return recordGuestRun(current);
        });
      },
      logout: () => {
        clearSession();
        setSession(null);
      },
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
