"use client";

import type { WorkoutDay } from "@/types/workout";
import type { WorkoutSessionState } from "@/lib/storage";
import {
  countCompletedSets,
  countWorkoutSets,
  workoutProgressPercent,
} from "@/lib/workout-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type WorkoutProgressCardProps = {
  workout: WorkoutDay;
  session: WorkoutSessionState;
};

export function WorkoutProgressCard({ workout, session }: WorkoutProgressCardProps) {
  const done = countCompletedSets(workout, session);
  const total = countWorkoutSets(workout);
  const pct = workoutProgressPercent(workout, session);

  return (
    <Card className="border-primary/25 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Progresso do treino
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>
            Séries concluídas:{" "}
            <span className="font-semibold text-foreground">
              {done}/{total}
            </span>
          </span>
          <span className="text-primary">{pct}%</span>
        </div>
        <Progress value={pct} className="h-2" />
      </CardContent>
    </Card>
  );
}
