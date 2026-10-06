import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import AccessGate from "./AccessGate";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AccessGate />;
  }

  return <>{children}</>;
}
