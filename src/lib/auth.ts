import type { Session, StoredAccount } from "../types";

// ---------------------------------------------------------------------------
// Frontend-only mock authentication. Accounts and the active session are
// stored in the browser (localStorage) exactly like the rest of this
// prototype's "backend" (see lib/api.ts). Nothing here talks to a server —
// when the real FastAPI + PostgreSQL backend is wired up, only the internals
// of these functions need to change.
//
// GUEST_RUN_LIMIT controls how many SRM runs a guest gets before being
// asked to register. Registered/logged-in accounts have no limit.
// ---------------------------------------------------------------------------

const ACCOUNTS_KEY = "geosrm_accounts";
const SESSION_KEY = "geosrm_session";
export const GUEST_RUN_LIMIT = 1;

function generateId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Record<string, string>;

export function validateRegistration(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  } else if (readAccounts().some((a) => a.email.toLowerCase() === input.email.trim().toLowerCase())) {
    errors.email = "An account with this email already exists.";
  }

  if (!input.password) {
    errors.password = "Password is required.";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function validateLogin(input: { email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

/**
 * Creates a mock account and immediately starts a registered session.
 * Caller is expected to have already run validateRegistration().
 */
export function registerAccount(input: { name: string; email: string; password: string }): Session {
  const accounts = readAccounts();
  const account: StoredAccount = {
    id: generateId(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    createdAt: new Date().toISOString(),
  };
  writeAccounts([...accounts, account]);

  const session: Session = {
    tier: "registered",
    accountId: account.id,
    name: account.name,
    email: account.email,
    guestRunsUsed: 0,
  };
  writeSession(session);
  return session;
}

/**
 * Attempts to log in against stored mock accounts. Returns null on failure
 * so the caller can show a single generic "incorrect email or password"
 * message rather than confirming which field was wrong.
 */
export function loginAccount(input: { email: string; password: string }): Session | null {
  const account = readAccounts().find(
    (a) => a.email.toLowerCase() === input.email.trim().toLowerCase() && a.password === input.password,
  );
  if (!account) {
    return null;
  }

  const session: Session = {
    tier: "registered",
    accountId: account.id,
    name: account.name,
    email: account.email,
    guestRunsUsed: 0,
  };
  writeSession(session);
  return session;
}

export function startGuestSession(): Session {
  const session: Session = {
    tier: "guest",
    name: "Guest",
    guestRunsUsed: 0,
  };
  writeSession(session);
  return session;
}

export function recordGuestRun(current: Session): Session {
  const updated: Session = { ...current, guestRunsUsed: current.guestRunsUsed + 1 };
  writeSession(updated);
  return updated;
}

export function clearSession() {
  writeSession(null);
}
