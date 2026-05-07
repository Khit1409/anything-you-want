"use client";

import { setWebMode } from "@/redux/slice/app.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/**
 * Thực hiện các hành động trước khi render ra các component
 * @param param0
 * @returns
 */
export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.app);

  //load theme từ local ->redusx
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      dispatch(setWebMode(saved));
    }
  }, [dispatch]);

  //sync redux -> DOM + storage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    (async () => {
      await dispatch(authThunk());
    })();
  }, [dispatch]);

  return <>{children}</>;
}
