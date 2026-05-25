import Link from "next/link";

import { WORKOUT_DAYS, getTodayWorkoutSlug } from "@/data/workouts";
import { WorkoutDayCard } from "@/components/WorkoutDayCard";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const today = getTodayWorkoutSlug();

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Semana de treino</h1>
        <p className="text-muted-foreground">
          Escolha o dia ou abra o treino de hoje.
        </p>
      </div>

      {today && (
        <section className="rounded-xl border border-primary/35 bg-primary/10 p-4 ring-1 ring-primary/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Treino de hoje</p>
              <p className="text-sm text-muted-foreground">
                Abra o treino para ver cargas e marcar séries.
              </p>
            </div>
            <Link
              href={`/treino/${today}`}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              Abrir treino
            </Link>
          </div>
        </section>
      )}

      {!today && (
        <p className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          Hoje é dia de descanso. Aproveite para mobilidade, caminhada leve ou recuperação.
        </p>
      )}

      <div className="grid gap-3">
        {WORKOUT_DAYS.map((d) => (
          <WorkoutDayCard key={d.slug} day={d} isToday={d.slug === today} />
        ))}
      </div>
    </div>
  );
}
