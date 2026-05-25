"use client";

import { useState } from "react";
import { toast } from "sonner";

import { CONFIGURABLE_EXERCISES } from "@/data/exercises";
import type { WeightConfig } from "@/types/workout";
import { usePersistedAppState } from "@/hooks/use-persisted-app-state";
import { defaultPersistedState, resetAll } from "@/lib/storage";
import { WeightConfigForm } from "@/components/WeightConfigForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ConfiguracoesPage() {
  const [state, update, mounted] = usePersistedAppState();
  const [resetOpen, setResetOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSave = (weights: Record<string, WeightConfig>) => {
    update((s) => {
      const next = { ...s.weights };
      for (const name of CONFIGURABLE_EXERCISES) {
        if (weights[name]) next[name] = weights[name];
        else delete next[name];
      }
      return { ...s, weights: next };
    });
  };

  const handleReset = () => {
    resetAll();
    update(() => defaultPersistedState());
    setResetOpen(false);
    setFormKey((k) => k + 1);
    toast.success("Todos os dados foram apagados.");
  };

  if (!mounted) {
    return <p className="text-muted-foreground">Carregando…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Cargas base por exercício (100%). Unidade: kg.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="destructive" onClick={() => setResetOpen(true)}>
          Resetar dados
        </Button>
        <Dialog open={resetOpen} onOpenChange={setResetOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apagar todos os dados?</DialogTitle>
              <DialogDescription>
                Isso remove cargas, progresso de treinos e histórico deste aparelho.
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setResetOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" variant="destructive" onClick={handleReset}>
                Apagar tudo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <WeightConfigForm key={formKey} state={state} onSave={handleSave} />
    </div>
  );
}
