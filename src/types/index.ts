export type ProcessingStatus = "idle" | "processing" | "complete" | "error";

export type ProcessingResult = {
  id: string;
  fileName: string;
  inputUrl: string;
  outputUrl: string;
  uncertaintyUrl: string;
  inputSize: string;
  outputSize: string;
  status: ProcessingStatus;
  metadata?: Record<string, string | number>;
};

export type ProcessingJob = {
  id: string;
  fileName: string;
  status: ProcessingStatus;
  createdAt: string;
  result?: ProcessingResult;
};

export type DatasetSample = {
  id: string;
  name: string;
  category: string;
  thumbnailUrl: string;
  description?: string;
  metadata?: Record<string, string | number>;
};

export type Application = {
  slug: "agriculture" | "urban" | "disaster" | "forestry" | "infrastructure";
  name: string;
  summary: string;
};

export type ApplicationExample = {
  id: string;
  applicationSlug: Application["slug"];
  title: string;
  description: string;
  imageUrl?: string;
};

export type ApplicationResult = {
  applicationSlug: Application["slug"];
  enhancedImageUrl?: string;
  analysisSummary?: string;
  metadata?: Record<string, string | number>;
};

// ---------------------------------------------------------------------------
// Auth types. This is a frontend-only mock: accounts and sessions live in
// browser storage (see lib/auth.ts), mirroring the same "single boundary"
// pattern used by api.ts. There is no real password hashing or server-side
// verification here — it exists to demonstrate tiered access in the
// prototype, not to be a production auth system.
// ---------------------------------------------------------------------------

export type AccountTier = "guest" | "registered";

export type StoredAccount = {
  id: string;
  name: string;
  email: string;
  // Mock-only: never do this in a real system. Kept as a plain string purely
  // so the prototype can "check" a password without a backend.
  password: string;
  createdAt: string;
};

export type Session = {
  tier: AccountTier;
  accountId?: string;
  name: string;
  email?: string;
  guestRunsUsed: number;
};