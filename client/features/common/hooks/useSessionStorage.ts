import { useMemo, useSyncExternalStore } from "react";

interface HookProps {
  sessionKey: string;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

export default function useSessionStorage<T>(params: HookProps) {
  const getSnapshot = () => sessionStorage.getItem(params.sessionKey);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value = useMemo<T | undefined>(() => {
    if (!raw) return;
    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }, [raw]);

  return { value };
}
