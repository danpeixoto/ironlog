"use client";

import { useCallback, useEffect, useState } from "react";
import {
  defaultPersistedState,
  loadPersistedState,
  savePersistedState,
  type PersistedState,
} from "@/lib/storage";

export function usePersistedAppState(): [
  PersistedState,
  (updater: (prev: PersistedState) => PersistedState) => void,
  boolean,
] {
  const [state, setState] = useState<PersistedState>(defaultPersistedState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(loadPersistedState());
  }, []);

  const update = useCallback((updater: (prev: PersistedState) => PersistedState) => {
    setState((prev) => {
      const next = updater(prev);
      savePersistedState(next);
      return next;
    });
  }, []);

  return [state, update, mounted];
}
