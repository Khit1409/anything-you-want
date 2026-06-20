import React from "react";

import { useMeQuery } from "../redux/auth.api";

interface Props {
  children: React.ReactNode;
}
export default function AuthProvider({ children }: Props) {
  useMeQuery();
  return <>{children}</>;
}
