"use client";

import useCheckAuth from "@/hooks/common/useCheckAuth";
export default function Provider({ children }: { children: React.ReactNode }) {

  useCheckAuth();

  return <>{children}</>;
}
