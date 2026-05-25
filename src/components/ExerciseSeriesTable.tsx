"use client";

import type { Exercise, ExerciseSet } from "@/types/workout";
import {
  formatPercentLabel,
  formatRest,
  formatSetKindLabel,
  suggestWeight,
} from "@/lib/weight";
import { sessionSetKey } from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ExerciseSeriesTableProps = {
  exercise: Exercise;
  baseKg: number;
  setDone: Record<string, boolean>;
  onToggleSet: (key: string, done: boolean) => void;
  disabled?: boolean;
};

function rowWeight(set: ExerciseSet, baseKg: number): string {
  const w = suggestWeight(baseKg, set);
  if (w <= 0) return "—";
  return `${w} kg`;
}

export function ExerciseSeriesTable({
  exercise,
  baseKg,
  setDone,
  onToggleSet,
  disabled,
}: ExerciseSeriesTableProps) {
  const bodyweight = !!exercise.isBodyweight;
  const missing = !bodyweight && baseKg <= 0;

  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead className="hidden sm:table-cell">Descanso</TableHead>
            <TableHead>Carga</TableHead>
            <TableHead>%</TableHead>
            <TableHead className="w-12 text-center">OK</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercise.sets.map((set, index) => {
            const key = sessionSetKey(exercise.id, index);
            const done = !!setDone[key];
            return (
              <TableRow
                key={key}
                className={cn(done && "bg-primary/5")}
              >
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell>
                  <span className="text-foreground">{formatSetKindLabel(set)}</span>
                </TableCell>
                <TableCell>{set.reps}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {formatRest(set.restAfterSeconds)}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    missing && "text-yellow-800",
                    bodyweight && "text-muted-foreground",
                  )}
                >
                  {bodyweight
                    ? "Peso corporal"
                    : missing
                      ? "Configure"
                      : rowWeight(set, baseKg)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {formatPercentLabel(set)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={done}
                    disabled={disabled}
                    onCheckedChange={(v) => onToggleSet(key, v === true)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
