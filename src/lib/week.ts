/** Início da semana (segunda 00:00) no fuso local. */
export function startOfWeekMonday(date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

/** Fim da semana (domingo 23:59:59.999) no fuso local. */
export function endOfWeekSunday(date = new Date()): Date {
  const start = startOfWeekMonday(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  end.setMilliseconds(-1);
  return end;
}

export function isDateInCurrentWeek(iso: string, now = new Date()): boolean {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return t >= startOfWeekMonday(now).getTime() && t <= endOfWeekSunday(now).getTime();
}
