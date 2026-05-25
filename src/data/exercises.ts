/** Nomes canônicos alinhados à configuração e aos treinos (exclui peso corporal). */
export const CONFIGURABLE_EXERCISES = [
  "Supino reto com barra",
  "Supino inclinado com halter",
  "Peck deck",
  "Tríceps pulley",
  "Tríceps francês com halter",
  "Puxada alta na frente",
  "Remada baixa na polia",
  "Remada máquina articulada",
  "Pulldown reto na polia",
  "Rosca direta barra W",
  "Rosca martelo com halter",
  "Agachamento livre",
  "Leg press",
  "Cadeira extensora",
  "Mesa flexora",
  "Panturrilha sentado",
  "Panturrilha em pé",
  "Desenvolvimento com halter",
  "Elevação lateral",
  "Elevação frontal",
  "Encolhimento para trapézio",
] as const;

export type ConfigurableExerciseName = (typeof CONFIGURABLE_EXERCISES)[number];
