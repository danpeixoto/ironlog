"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { getTodayWorkoutSlug } from "@/data/workouts";

const links = [
  { href: "/", label: "Início", icon: CalendarDays },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/configuracoes", label: "Config", icon: Settings },
] as const;

export function AppNav() {
  const pathname = usePathname();
  const today = getTodayWorkoutSlug();
  const workoutHref = today ? `/treino/${today}` : "/";

  return (
    <nav className="flex flex-wrap items-center justify-end gap-1 text-sm">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex min-h-10 items-center gap-1 rounded-md px-2 py-1.5 transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        );
      })}
      <Link
        href={workoutHref}
        className={cn(
          "inline-flex min-h-10 items-center rounded-md px-3 py-1.5 font-medium transition-colors",
          pathname.startsWith("/treino/")
            ? "bg-primary text-primary-foreground"
            : "bg-primary/90 text-primary-foreground hover:bg-primary",
        )}
      >
        Treino
      </Link>
    </nav>
  );
}
