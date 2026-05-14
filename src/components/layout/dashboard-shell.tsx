"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const meta =
    pathname.startsWith("/users") ?
      {
        title: "Users",
        description:
          "Search, filter, and inspect directory records synced from DummyJSON.",
      }
    : {
        title: "Overview",
        description:
          "Population insights and engagement proxies from the connected dataset.",
      };

  return <AppShell {...meta}>{children}</AppShell>;
}
