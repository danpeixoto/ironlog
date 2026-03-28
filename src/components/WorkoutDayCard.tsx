import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/types/workout";

type WorkoutDayCardProps = {
  day: WorkoutDay;
  isToday: boolean;
};

export function WorkoutDayCard({ day, isToday }: WorkoutDayCardProps) {
  return (
    <Link href={`/treino/${day.slug}`} className="block">
      <Card
        className={cn(
          "transition-shadow hover:ring-1 hover:ring-primary/40",
          isToday && "ring-2 ring-primary/60",
        )}
      >
        <CardContent className="flex items-center justify-between gap-3 pt-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-foreground">{day.label}</p>
              {isToday && (
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Hoje
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {day.muscleGroups.join(" · ")}
            </p>
            <p className="text-xs text-muted-foreground">
              {day.exercises.length}{" "}
              {day.exercises.length === 1 ? "exercício" : "exercícios"}
            </p>
          </div>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
