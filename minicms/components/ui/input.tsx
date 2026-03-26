import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-elevated)] px-4 py-2 text-sm text-[color:var(--foreground)] shadow-sm outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)] file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[color:var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}
