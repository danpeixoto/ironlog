import type { ExerciseSet, SetKind } from "@/types/workout";

/** Arredonda para múltiplos de 2,5 kg; valores inválidos viram 0. */
export function roundToNearest2_5(kg: number): number {
  if (!Number.isFinite(kg) || kg <= 0) return 0;
  return Math.round(kg / 2.5) * 2.5;
}

const KIND_PERCENT: Record<SetKind, number | null> = {
  warmup: 50,
  recognition: 70,
  work: 100,
  percentage: null,
};

/** Percentual 0–100 aplicado à carga base para esta série. */
export function getAppliedPercentage(set: ExerciseSet): number {
  if (set.kind === "percentage") {
    const p = set.percentage;
    if (p == null || !Number.isFinite(p)) return 100;
    return Math.min(100, Math.max(0, p));
  }
  return KIND_PERCENT[set.kind] ?? 100;
}

/** Carga sugerida (kg) a partir da carga base configurada. */
export function suggestWeight(baseKg: number, set: ExerciseSet): number {
  if (!Number.isFinite(baseKg) || baseKg <= 0) return 0;
  const factor = getAppliedPercentage(set) / 100;
  return roundToNearest2_5(baseKg * factor);
}

/** Texto para badge/UI, ex.: "70%". */
export function formatPercentLabel(set: ExerciseSet): string {
  return `${Math.round(getAppliedPercentage(set))}%`;
}

const KIND_LABEL: Record<SetKind, string> = {
  warmup: "Aquecimento",
  recognition: "Reconhecimento",
  work: "Válida",
  percentage: "Progressão",
};

export function formatSetKindLabel(set: ExerciseSet): string {
  if (set.kind === "percentage" && set.percentage != null) {
    return `${KIND_LABEL.percentage} ${set.percentage}%`;
  }
  return KIND_LABEL[set.kind];
}

export function formatRest(seconds?: number): string {
  if (seconds == null || !Number.isFinite(seconds)) return "—";
  if (seconds < 60) return `${seconds}s`;
  const m = seconds / 60;
  if (Number.isInteger(m)) return `${m} min`;
  return `${m.toFixed(1).replace(".", ",")} min`;
}
