"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";

import type { WorkoutDay } from "@/types/workout";
import { usePersistedAppState } from "@/hooks/use-persisted-app-state";
import { emptySession } from "@/lib/storage";
import { ExerciseCard } from "@/components/ExerciseCard";
import { WorkoutProgressCard } from "@/components/WorkoutProgressCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type WorkoutDetailProps = {
  workout: WorkoutDay;
};

export function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const [state, update, mounted] = usePersistedAppState();

  const session = useMemo(
    () => state.sessions[workout.slug] ?? emptySession(),
    [state.sessions, workout.slug],
  );

  const setSession = useCallback(
    (next: typeof session) => {
      update((s) => ({
        ...s,
        sessions: { ...s.sessions, [workout.slug]: next },
      }));
    },
    [update, workout.slug],
  );

  const completeWorkout = () => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    const entry = {
      id,
      daySlug: workout.slug,
      label: workout.label,
      completedAt: new Date().toISOString(),
      exerciseCount: workout.exercises.length,
    };
    update((s) => ({
      ...s,
      completedLog: [entry, ...s.completedLog],
      sessions: { ...s.sessions, [workout.slug]: emptySession() },
    }));
    toast.success("Treino concluído!");
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-24 animate-pulse rounded-xl bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Link
          href="/"
          className="text-muted-foreground text-sm hover:text-primary hover:underline"
        >
          ← Voltar
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">{workout.label}</h1>
        <p className="text-muted-foreground">{workout.muscleGroups.join(" · ")}</p>
      </div>

      <WorkoutProgressCard workout={workout} session={session} />

      <div className="space-y-4">
        {workout.exercises.map((exercise) => {
          const cfg = state.weights[exercise.name];
          const baseKg = cfg?.baseKg ?? 0;
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              baseKg={baseKg}
              session={session}
              onSessionChange={setSession}
            />
          );
        })}
      </div>

      <Separator />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Ao concluir, o treino é registrado no dashboard e o progresso deste dia é
          zerado para a próxima sessão.
        </p>
        <Button type="button" onClick={completeWorkout}>
          Marcar treino concluído
        </Button>
      </div>
    </div>
  );
}
