import type { WorkoutDay } from "@/types/workout";
import type { WorkoutSessionState } from "@/lib/storage";
import { sessionSetKey } from "@/lib/storage";

export function countWorkoutSets(workout: WorkoutDay): number {
  return workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
}

export function countCompletedSets(
  workout: WorkoutDay,
  session: WorkoutSessionState,
): number {
  let done = 0;
  for (const ex of workout.exercises) {
    ex.sets.forEach((_, i) => {
      if (session.setDone[sessionSetKey(ex.id, i)]) done++;
    });
  }
  return done;
}

export function workoutProgressPercent(
  workout: WorkoutDay,
  session: WorkoutSessionState,
): number {
  const total = countWorkoutSets(workout);
  if (total === 0) return 0;
  return Math.round((countCompletedSets(workout, session) / total) * 100);
}
