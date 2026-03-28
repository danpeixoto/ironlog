import { notFound } from "next/navigation";

import { getWorkoutBySlug, isValidWorkoutSlug } from "@/data/workouts";
import { WorkoutDetail } from "./workout-detail";

export default async function TreinoPage({
  params,
}: {
  params: Promise<{ dia: string }>;
}) {
  const { dia } = await params;
  if (!isValidWorkoutSlug(dia)) notFound();
  const workout = getWorkoutBySlug(dia);
  if (!workout) notFound();
  return <WorkoutDetail workout={workout} />;
}
