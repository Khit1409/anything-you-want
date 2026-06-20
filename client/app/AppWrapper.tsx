"use client";

import AuthProvider from "@/features/auth/providers/AuthProvider";
import useTheme from "@/features/common/hooks/useTheme";

/**
 * Thực hiện các hành động trước khi render ra các component
 * @param param0
 * @returns
 */
export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();

  return <AuthProvider>{children}</AuthProvider>;
}
