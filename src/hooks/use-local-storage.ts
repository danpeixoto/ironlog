"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Estado JSON no localStorage com hidratação segura (evita mismatch SSR/cliente).
 */
export function useLocalStorage<T>(
  key: string,
  getDefault: () => T,
  serialize: (v: T) => string = JSON.stringify,
  deserialize: (raw: string) => T = (raw) => JSON.parse(raw) as T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState<T>(getDefault);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(deserialize(raw));
    } catch {
      /* ignore */
    }
  }, [key, deserialize]);

  const setStored = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, serialize(resolved));
        } catch {
          /* quota */
        }
        return resolved;
      });
    },
    [key, serialize],
  );

  return [value, setStored, mounted];
}
