import type { WorkoutDay } from "@/types/workout";

const R = {
  s40: 40,
  s60: 60,
  s75: 75,
  s90: 90,
  s120: 120,
  s180: 180,
  s240: 240,
} as const;

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    slug: "segunda",
    label: "Segunda-feira",
    muscleGroups: ["Peito", "Ombro frontal"],
    exercises: [
      {
        id: "segunda-fly",
        name: "Fly",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s40 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "segunda-supino-reto",
        name: "Supino reto",
        sets: [
          { kind: "recognition", reps: "12", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
          { kind: "work", reps: "6-8", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "segunda-supino-hammer",
        name: "Supino hammer inclinado máquina",
        sets: [
          { kind: "work", reps: "4-6", restAfterSeconds: R.s120 },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s120 },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "segunda-desenvolvimento",
        name: "Desenvolvimento",
        note: "Preferência no smith; pode ser com halter.",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
        ],
      },
    ],
  },
  {
    slug: "terca",
    label: "Terça-feira",
    muscleGroups: ["Costas"],
    exercises: [
      {
        id: "terca-puxada",
        name: "Puxada alta aberta",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s40 },
          { kind: "recognition", reps: "12", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "terca-remada-cav",
        name: "Remada cavalinho máquina",
        note: "Pegada neutra com as duas mãos; foco em esmagar o meio das costas.",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "terca-remada-baixa",
        name: "Remada baixa triângulo",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "terca-banco-romano",
        name: "Banco romano",
        note: "Foco em hiperextensão lombar; não glúteos/posterior.",
        sets: [
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
        ],
      },
    ],
  },
  {
    slug: "quarta",
    label: "Quarta-feira",
    muscleGroups: ["Bíceps", "Tríceps", "Ombro lateral"],
    exercises: [
      {
        id: "quarta-pulley-w",
        name: "Pulley barra W",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s60 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
        ],
      },
      {
        id: "quarta-rosca-martelo",
        name: "Rosca martelo",
        sets: [
          { kind: "recognition", reps: "12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
        ],
      },
      {
        id: "quarta-frances",
        name: "Francês",
        note: "Preferir halter sentado com apoio nas costas.",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
        ],
      },
      {
        id: "quarta-scott",
        name: "Scott máquina",
        note: "Menos carga e mais contração máxima do bíceps.",
        sets: [
          { kind: "work", reps: "10-12", restAfterSeconds: R.s75 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s75 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s75 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s75 },
        ],
      },
      {
        id: "quarta-elev-lateral",
        name: "Elevação lateral",
        sets: [
          { kind: "recognition", reps: "15", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
        ],
      },
    ],
  },
  {
    slug: "quinta",
    label: "Quinta-feira",
    muscleGroups: ["Pernas"],
    exercises: [
      {
        id: "quinta-agacho",
        name: "Agachamento livre",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s90 },
          {
            kind: "percentage",
            reps: "12",
            percentage: 60,
            restAfterSeconds: R.s120,
          },
          {
            kind: "percentage",
            reps: "10",
            percentage: 80,
            restAfterSeconds: R.s120,
          },
          {
            kind: "percentage",
            reps: "8",
            percentage: 90,
            restAfterSeconds: R.s180,
          },
          { kind: "work", reps: "5-6", restAfterSeconds: R.s180 },
          { kind: "work", reps: "5-6", restAfterSeconds: R.s180 },
          { kind: "work", reps: "5-6", restAfterSeconds: R.s180 },
        ],
      },
      {
        id: "quinta-mesa-flexora",
        name: "Mesa flexora",
        sets: [
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
        ],
      },
      {
        id: "quinta-leg-press",
        name: "Leg press",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s120 },
        ],
      },
      {
        id: "quinta-cadeira-ext",
        name: "Cadeira extensora",
        note: "Menos carga e mais reps buscando dor total.",
        sets: [
          { kind: "work", reps: "15-20", restAfterSeconds: R.s75 },
          { kind: "work", reps: "15-20", restAfterSeconds: R.s75 },
          { kind: "work", reps: "15-20", restAfterSeconds: R.s75 },
          { kind: "work", reps: "15-20", restAfterSeconds: R.s75 },
        ],
      },
    ],
  },
  {
    slug: "sexta",
    label: "Sexta-feira",
    muscleGroups: ["Ombro", "Peito"],
    exercises: [
      {
        id: "sexta-desenvolvimento",
        name: "Desenvolvimento",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s90 },
        ],
      },
      {
        id: "sexta-elev-frontal",
        name: "Elevação frontal",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
        ],
      },
      {
        id: "sexta-elev-lateral",
        name: "Elevação lateral",
        sets: [
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
          { kind: "work", reps: "8-10", restAfterSeconds: R.s75 },
        ],
      },
      {
        id: "sexta-crucifixo",
        name: "Crucifixo no fly",
        sets: [
          { kind: "recognition", reps: "15", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
          { kind: "work", reps: "10-12", restAfterSeconds: R.s90 },
        ],
      },
    ],
  },
  {
    slug: "sabado",
    label: "Sábado",
    muscleGroups: ["Levantamento terra"],
    exercises: [
      {
        id: "sabado-terra",
        name: "Levantamento terra",
        note: "Descanso entre séries: 3–4 min nas séries pesadas.",
        sets: [
          { kind: "warmup", reps: "15", restAfterSeconds: R.s120 },
          {
            kind: "percentage",
            reps: "12",
            percentage: 50,
            restAfterSeconds: R.s180,
          },
          {
            kind: "percentage",
            reps: "8-10",
            percentage: 70,
            restAfterSeconds: R.s180,
          },
          {
            kind: "percentage",
            reps: "6",
            percentage: 90,
            restAfterSeconds: R.s240,
          },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s240 },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s240 },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s240 },
          { kind: "work", reps: "4-6", restAfterSeconds: R.s240 },
        ],
      },
    ],
  },
];

const SLUGS = new Set(WORKOUT_DAYS.map((d) => d.slug));

export function getWorkoutBySlug(slug: string): WorkoutDay | undefined {
  return WORKOUT_DAYS.find((d) => d.slug === slug);
}

/** Domingo (0) → null; Segunda (1) … Sábado (6) → slug do treino. */
export function getTodayWorkoutSlug(): string | null {
  const day = new Date().getDay();
  const map: Record<number, string | null> = {
    0: null,
    1: "segunda",
    2: "terca",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sabado",
  };
  const slug = map[day];
  if (!slug || !SLUGS.has(slug)) return null;
  return slug;
}

export function isValidWorkoutSlug(slug: string): boolean {
  return SLUGS.has(slug);
}
