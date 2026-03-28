import type { WeightConfig } from "@/types/workout";
import { CONFIGURABLE_EXERCISES } from "@/data/exercises";

export const STORAGE_KEY = "ironlog:v1";

export type WorkoutSessionState = {
  setDone: Record<string, boolean>;
  exerciseDone: Record<string, boolean>;
  workoutDone: boolean;
  notes: Record<string, string>;
};

export type CompletedWorkoutEntry = {
  id: string;
  daySlug: string;
  label: string;
  completedAt: string;
  exerciseCount: number;
};

export type PersistedState = {
  weights: Record<string, WeightConfig>;
  sessions: Record<string, WorkoutSessionState>;
  completedLog: CompletedWorkoutEntry[];
};

export function defaultPersistedState(): PersistedState {
  return {
    weights: {},
    sessions: {},
    completedLog: [],
  };
}

function parse(raw: string | null): PersistedState {
  if (!raw) return defaultPersistedState();
  try {
    const data = JSON.parse(raw) as Partial<PersistedState>;
    return {
      weights: typeof data.weights === "object" && data.weights !== null ? data.weights : {},
      sessions:
        typeof data.sessions === "object" && data.sessions !== null ? data.sessions : {},
      completedLog: Array.isArray(data.completedLog) ? data.completedLog : [],
    };
  } catch {
    return defaultPersistedState();
  }
}

export function loadPersistedState(): PersistedState {
  if (typeof window === "undefined") return defaultPersistedState();
  return parse(localStorage.getItem(STORAGE_KEY));
}

export function savePersistedState(state: PersistedState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetAll(): void {
  savePersistedState(defaultPersistedState());
}

/** Pesos de exemplo (kg) para preencher a lista fixa. */
const EXAMPLE_WEIGHTS: Record<string, number> = {
  Fly: 14,
  "Supino reto": 60,
  "Supino hammer inclinado máquina": 45,
  Desenvolvimento: 40,
  "Puxada alta aberta": 50,
  "Remada cavalinho máquina": 55,
  "Remada baixa triângulo": 45,
  "Banco romano": 25,
  "Pulley barra W": 25,
  "Rosca martelo": 14,
  Francês: 20,
  "Scott máquina": 20,
  "Elevação lateral": 8,
  "Agachamento livre": 100,
  "Mesa flexora": 35,
  "Leg press": 140,
  "Cadeira extensora": 40,
  "Elevação frontal": 12,
  "Crucifixo no fly": 12,
  "Levantamento terra": 120,
};

export function seedExampleWeights(): PersistedState {
  const state = loadPersistedState();
  const next = { ...state, weights: { ...state.weights } };
  for (const name of CONFIGURABLE_EXERCISES) {
    const base = EXAMPLE_WEIGHTS[name];
    if (base == null) continue;
    next.weights[name] = {
      exerciseName: name,
      baseKg: base,
      unit: "kg",
    };
  }
  savePersistedState(next);
  return next;
}

export function emptySession(): WorkoutSessionState {
  return {
    setDone: {},
    exerciseDone: {},
    workoutDone: false,
    notes: {},
  };
}

export function sessionSetKey(exerciseId: string, setIndex: number): string {
  return `${exerciseId}::${setIndex}`;
}
