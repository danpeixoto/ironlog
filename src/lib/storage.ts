import type { WeightConfig } from "@/types/workout";

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
