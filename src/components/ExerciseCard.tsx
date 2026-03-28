"use client";

import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";

import type { Exercise } from "@/types/workout";
import type { WorkoutSessionState } from "@/lib/storage";
import { sessionSetKey } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ExerciseSeriesTable } from "@/components/ExerciseSeriesTable";
import { cn } from "@/lib/utils";

type ExerciseCardProps = {
  exercise: Exercise;
  baseKg: number;
  session: WorkoutSessionState;
  onSessionChange: (next: WorkoutSessionState) => void;
  disabled?: boolean;
};

export function ExerciseCard({
  exercise,
  baseKg,
  session,
  onSessionChange,
  disabled,
}: ExerciseCardProps) {
  const missingWeight = baseKg <= 0;

  const allSetsDone = useMemo(() => {
    return exercise.sets.every((_, i) => session.setDone[sessionSetKey(exercise.id, i)]);
  }, [exercise.sets, exercise.id, session.setDone]);

  const toggleSet = (key: string, done: boolean) => {
    const setDone = { ...session.setDone, [key]: done };
    onSessionChange({ ...session, setDone });
  };

  const toggleExerciseDone = (done: boolean) => {
    const nextSets = { ...session.setDone };
    exercise.sets.forEach((_, i) => {
      nextSets[sessionSetKey(exercise.id, i)] = done;
    });
    onSessionChange({
      ...session,
      setDone: nextSets,
      exerciseDone: { ...session.exerciseDone, [exercise.id]: done },
    });
  };

  const note = session.notes[exercise.id] ?? "";

  return (
    <Card
      className={cn(
        "border-border/80",
        missingWeight && "ring-1 ring-yellow-600/35",
      )}
    >
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{exercise.name}</CardTitle>
            {exercise.note && (
              <p className="mt-1 text-sm text-muted-foreground">{exercise.note}</p>
            )}
          </div>
          {missingWeight && (
            <span className="inline-flex items-center gap-1 rounded-md border border-yellow-200 bg-yellow-50 px-2 py-1 text-xs text-yellow-950">
              <AlertTriangle className="size-3.5" />
              Sem peso base
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Checkbox
            id={`ex-done-${exercise.id}`}
            checked={!!session.exerciseDone[exercise.id] || allSetsDone}
            disabled={disabled}
            onCheckedChange={(v) => toggleExerciseDone(v === true)}
          />
          <Label htmlFor={`ex-done-${exercise.id}`} className="font-normal">
            Exercício concluído
          </Label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ExerciseSeriesTable
          exercise={exercise}
          baseKg={baseKg}
          setDone={session.setDone}
          onToggleSet={toggleSet}
          disabled={disabled}
        />
        <Separator />
        <div className="space-y-2">
          <Label htmlFor={`note-${exercise.id}`}>Anotações</Label>
          <Textarea
            id={`note-${exercise.id}`}
            placeholder="Séries, sensações, ajustes…"
            value={note}
            disabled={disabled}
            onChange={(e) =>
              onSessionChange({
                ...session,
                notes: { ...session.notes, [exercise.id]: e.target.value },
              })
            }
            rows={3}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
