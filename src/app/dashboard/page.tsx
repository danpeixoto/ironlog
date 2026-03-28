"use client";

import { useMemo } from "react";
import { History } from "lucide-react";

import { CONFIGURABLE_EXERCISES } from "@/data/exercises";
import { usePersistedAppState } from "@/hooks/use-persisted-app-state";
import { isDateInCurrentWeek } from "@/lib/week";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WEEK_TARGET = 6;

export default function DashboardPage() {
  const [state, , mounted] = usePersistedAppState();

  const weekCompletions = useMemo(
    () => state.completedLog.filter((e) => isDateInCurrentWeek(e.completedAt)),
    [state.completedLog],
  );

  const weekPct = Math.min(
    100,
    Math.round((weekCompletions.length / WEEK_TARGET) * 100),
  );

  const withWeight = CONFIGURABLE_EXERCISES.filter((n) => state.weights[n]);
  const withoutWeight = CONFIGURABLE_EXERCISES.filter((n) => !state.weights[n]);

  const recent = useMemo(
    () => [...state.completedLog].slice(0, 8),
    [state.completedLog],
  );

  if (!mounted) {
    return <p className="text-muted-foreground">Carregando…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Resumo semanal e histórico.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Treinos na semana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold tabular-nums">
              {weekCompletions.length}
              <span className="text-lg font-normal text-muted-foreground">
                /{WEEK_TARGET}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Meta: segunda a sábado (6 treinos).
            </p>
            <Progress value={weekPct} className="h-2" />
            <p className="text-xs text-muted-foreground">{weekPct}% da meta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cargas configuradas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold tabular-nums">
              {withWeight.length}
              <span className="text-lg font-normal text-muted-foreground">
                /{CONFIGURABLE_EXERCISES.length}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {withoutWeight.length} exercício(s) sem peso base.
            </p>
            <Progress
              value={Math.round(
                (withWeight.length / CONFIGURABLE_EXERCISES.length) * 100,
              )}
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Últimos treinos</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <EmptyState
              icon={<History className="size-10" />}
              title="Nenhum treino concluído ainda"
              description="Marque um treino como concluído na página do dia para ver o histórico aqui."
            />
          ) : (
            <ul className="space-y-4">
              {recent.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{e.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(e.completedAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {e.exerciseCount} exercício(s)
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Com peso configurado</CardTitle>
          </CardHeader>
          <CardContent>
            {withWeight.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum exercício com carga base. Configure em Configurações.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {withWeight.map((n) => (
                  <Badge key={n} variant="secondary">
                    {n}: {state.weights[n]!.baseKg} kg
                  </Badge>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sem peso</CardTitle>
          </CardHeader>
          <CardContent>
            {withoutWeight.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Todos os exercícios têm peso base.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {withoutWeight.map((n) => (
                  <Badge key={n} variant="outline" className="border-yellow-300 bg-yellow-50 text-yellow-950">
                    {n}
                  </Badge>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />
      <p className="text-center text-xs text-muted-foreground">
        Dados locais neste navegador — nada é enviado ao servidor.
      </p>
    </div>
  );
}
