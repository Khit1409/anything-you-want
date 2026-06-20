import { useCallback } from "react";

export default function useHistory() {
  const setHistory = useCallback((path: string) => {
    if (typeof window === "undefined") return;

    sessionStorage.setItem("redirect_path", path);
  }, []);

  const getHistory = useCallback(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("redirect_path");
  }, []);

  const clearHistory = useCallback(() => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("redirect_path");
  }, []);

  return {
    setHistory,
    getHistory,
    clearHistory,
  };
}
