import type { ExerciseSet, WorkoutDay } from "@/types/workout";

const R = {
  s60: 60,
  s90: 90,
} as const;

/** 3 séries válidas com mesma faixa de reps e mesmo descanso. */
function workSets(reps: string, restAfterSeconds: number): ExerciseSet[] {
  return [
    { kind: "work", reps, restAfterSeconds },
    { kind: "work", reps, restAfterSeconds },
    { kind: "work", reps, restAfterSeconds },
  ];
}

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    slug: "segunda",
    label: "A — Peito + Tríceps",
    muscleGroups: ["Peito", "Tríceps"],
    exercises: [
      {
        id: "a-supino-reto-barra",
        name: "Supino reto com barra",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "a-supino-inclinado-halter",
        name: "Supino inclinado com halter",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "a-peck-deck",
        name: "Peck deck",
        note: "Alternativa: crucifixo com halter.",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "a-triceps-pulley",
        name: "Tríceps pulley",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "a-triceps-frances-halter",
        name: "Tríceps francês com halter",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "a-flexao",
        name: "Flexão",
        note: "Até a falha. 3 séries.",
        isBodyweight: true,
        sets: workSets("até falhar", R.s90),
      },
    ],
  },
  {
    slug: "terca",
    label: "B — Costas + Bíceps",
    muscleGroups: ["Costas", "Bíceps"],
    exercises: [
      {
        id: "b-puxada-alta-frente",
        name: "Puxada alta na frente",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "b-remada-baixa-polia",
        name: "Remada baixa na polia",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "b-remada-maquina-articulada",
        name: "Remada máquina articulada",
        note: "Alternativa: remada cavalinho.",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "b-pulldown-reto",
        name: "Pulldown reto na polia",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "b-rosca-direta-w",
        name: "Rosca direta barra W",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "b-rosca-martelo-halter",
        name: "Rosca martelo com halter",
        sets: workSets("8-12", R.s60),
      },
    ],
  },
  {
    slug: "quinta",
    label: "C — Perna",
    muscleGroups: ["Quadríceps", "Posterior", "Panturrilha"],
    exercises: [
      {
        id: "c-agachamento-livre",
        name: "Agachamento livre",
        note: "Se tiver insegurança, começar no smith.",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "c-leg-press",
        name: "Leg press",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "c-cadeira-extensora",
        name: "Cadeira extensora",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "c-mesa-flexora",
        name: "Mesa flexora",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "c-panturrilha-sentado",
        name: "Panturrilha sentado",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "c-panturrilha-em-pe",
        name: "Panturrilha em pé",
        sets: workSets("8-12", R.s60),
      },
    ],
  },
  {
    slug: "sabado",
    label: "D — Ombro + Trapézio + Abdômen",
    muscleGroups: ["Ombro", "Trapézio", "Abdômen"],
    exercises: [
      {
        id: "d-desenvolvimento-halter",
        name: "Desenvolvimento com halter",
        sets: workSets("8-12", R.s90),
      },
      {
        id: "d-elevacao-lateral",
        name: "Elevação lateral",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "d-elevacao-frontal",
        name: "Elevação frontal",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "d-encolhimento-trapezio",
        name: "Encolhimento para trapézio",
        sets: workSets("8-12", R.s60),
      },
      {
        id: "d-abdomen-infra",
        name: "Abdômen infra",
        isBodyweight: true,
        sets: workSets("12-15", R.s60),
      },
      {
        id: "d-prancha",
        name: "Prancha",
        note: "Isometria; manter de 30s a 60s por série.",
        isBodyweight: true,
        sets: workSets("30-60s", R.s60),
      },
    ],
  },
];

const SLUGS = new Set(WORKOUT_DAYS.map((d) => d.slug));

export function getWorkoutBySlug(slug: string): WorkoutDay | undefined {
  return WORKOUT_DAYS.find((d) => d.slug === slug);
}

/**
 * Cronograma ideal:
 *  Seg=A · Ter=B · Qua=descanso · Qui=C · Sex=descanso · Sáb=D · Dom=descanso.
 */
export function getTodayWorkoutSlug(): string | null {
  const day = new Date().getDay();
  const map: Record<number, string | null> = {
    0: null,
    1: "segunda",
    2: "terca",
    3: null,
    4: "quinta",
    5: null,
    6: "sabado",
  };
  const slug = map[day];
  if (!slug || !SLUGS.has(slug)) return null;
  return slug;
}

export function isValidWorkoutSlug(slug: string): boolean {
  return SLUGS.has(slug);
}
