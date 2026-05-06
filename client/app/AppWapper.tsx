"use client";

import { AppDispatch } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
/**
 * Thực hiện các hành động trước khi render ra các component
 * @param param0
 * @returns
 */
export default function AppWapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(authThunk());
    })();
  }, [dispatch]);

  return <>{children}</>;
}
