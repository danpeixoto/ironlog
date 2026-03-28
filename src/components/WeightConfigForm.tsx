"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { CONFIGURABLE_EXERCISES } from "@/data/exercises";
import type { WeightConfig } from "@/types/workout";
import type { PersistedState } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type WeightConfigFormProps = {
  state: PersistedState;
  onSave: (weights: Record<string, WeightConfig>) => void;
};

export function WeightConfigForm({ state, onSave }: WeightConfigFormProps) {
  const [draft, setDraft] = useState<Record<string, { kg: string; note: string }>>(
    () => {
      const init: Record<string, { kg: string; note: string }> = {};
      for (const name of CONFIGURABLE_EXERCISES) {
        const w = state.weights[name];
        init[name] = {
          kg: w ? String(w.baseKg) : "",
          note: w?.note ?? "",
        };
      }
      return init;
    },
  );

  const missing = useMemo(
    () => CONFIGURABLE_EXERCISES.filter((n) => !draft[n]?.kg?.trim()),
    [draft],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, WeightConfig> = {};
    for (const name of CONFIGURABLE_EXERCISES) {
      const raw = draft[name]?.kg?.replace(",", ".").trim() ?? "";
      if (!raw) continue;
      const baseKg = Number.parseFloat(raw);
      if (!Number.isFinite(baseKg) || baseKg <= 0) {
        toast.error(`Peso inválido em “${name}”.`);
        return;
      }
      const note = draft[name]?.note?.trim();
      next[name] = {
        exerciseName: name,
        baseKg,
        unit: "kg",
        note: note || undefined,
      };
    }
    onSave(next);
    toast.success("Cargas salvas.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Defina a carga base (100%) para cada exercício. Aquecimento, reconhecimento e
        progressões são calculados automaticamente.
      </p>
      {missing.length > 0 && (
        <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-950">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>
            {missing.length} exercício(s) sem peso: {missing.slice(0, 4).join(", ")}
            {missing.length > 4 ? "…" : ""}
          </span>
        </div>
      )}
      <div className="space-y-4">
        {CONFIGURABLE_EXERCISES.map((name) => {
          const has = !!draft[name]?.kg?.trim();
          return (
            <div
              key={name}
              className={cn(
                "grid gap-3 rounded-xl border border-border/60 bg-card/40 p-4 sm:grid-cols-[1fr_120px]",
                !has && "ring-1 ring-yellow-600/35",
              )}
            >
              <div className="space-y-1">
                <Label htmlFor={`w-${name}`} className="text-foreground">
                  {name}
                </Label>
                <Input
                  id={`w-${name}`}
                  inputMode="decimal"
                  placeholder="kg base"
                  value={draft[name]?.kg ?? ""}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      [name]: { ...d[name], kg: e.target.value, note: d[name]?.note ?? "" },
                    }))
                  }
                />
                <Input
                  className="mt-2"
                  placeholder="Observação (opcional)"
                  value={draft[name]?.note ?? ""}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      [name]: { ...d[name], note: e.target.value, kg: d[name]?.kg ?? "" },
                    }))
                  }
                />
              </div>
              <div className="flex items-end justify-end text-xs text-muted-foreground sm:flex-col sm:items-end sm:justify-center">
                <span>unidade: kg</span>
              </div>
            </div>
          );
        })}
      </div>
      <Separator />
      <Button type="submit" className="w-full sm:w-auto">
        Salvar cargas
      </Button>
    </form>
  );
}
