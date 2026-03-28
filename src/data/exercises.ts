/** Nomes canônicos alinhados à configuração e aos treinos. */
export const CONFIGURABLE_EXERCISES = [
  "Fly",
  "Supino reto",
  "Supino hammer inclinado máquina",
  "Desenvolvimento",
  "Puxada alta aberta",
  "Remada cavalinho máquina",
  "Remada baixa triângulo",
  "Banco romano",
  "Pulley barra W",
  "Rosca martelo",
  "Francês",
  "Scott máquina",
  "Elevação lateral",
  "Agachamento livre",
  "Mesa flexora",
  "Leg press",
  "Cadeira extensora",
  "Elevação frontal",
  "Crucifixo no fly",
  "Levantamento terra",
] as const;

export type ConfigurableExerciseName = (typeof CONFIGURABLE_EXERCISES)[number];
