import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { DemoResult } from "../lib/imageProcessing";

type ResultContextValue = {
  result: DemoResult | null;
  setResult: (result: DemoResult | null) => void;
};

const ResultContext = createContext<ResultContextValue | null>(null);

export function ResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<DemoResult | null>(null);
  const value = useMemo(() => ({ result, setResult }), [result]);
  return <ResultContext.Provider value={value}>{children}</ResultContext.Provider>;
}

export function useResult() {
  const ctx = useContext(ResultContext);
  if (!ctx) {
    throw new Error("useResult must be used inside a ResultProvider");
  }
  return ctx;
}