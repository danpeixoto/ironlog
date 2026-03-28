export type SetKind = "warmup" | "recognition" | "work" | "percentage";

export type ExerciseSet = {
  kind: SetKind;
  /** Faixa ou valor, ex.: "6-8", "15", "8-10" */
  reps: string;
  /** Descanso após esta série (segundos). */
  restAfterSeconds?: number;
  /** Usado quando kind === "percentage" (50–100). */
  percentage?: number;
};

export type Exercise = {
  id: string;
  name: string;
  note?: string;
  sets: ExerciseSet[];
};

export type WorkoutDay = {
  slug: string;
  label: string;
  muscleGroups: string[];
  exercises: Exercise[];
};

export type WeightConfig = {
  exerciseName: string;
  baseKg: number;
  unit: "kg";
  note?: string;
};

export type ExerciseCompletion = {
  exerciseId: string;
  completedSetIndices: number[];
  exerciseDone: boolean;
  note: string;
};

export type WorkoutCompletion = {
  id: string;
  daySlug: string;
  label: string;
  completedAt: string;
  exerciseCount: number;
};
