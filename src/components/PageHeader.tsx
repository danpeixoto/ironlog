import Link from "next/link";
import { Dumbbell } from "lucide-react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  className?: string;
  title?: string;
};

export function PageHeader({ className, title = "IronLog" }: PageHeaderProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-foreground hover:text-primary",
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
        <Dumbbell className="size-5" aria-hidden />
      </span>
      <span>{title}</span>
    </Link>
  );
}
