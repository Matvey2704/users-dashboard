"use client";

import {
  LayoutDashboard,
  UsersRound,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: UsersRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/80 bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background shadow-sm">
          <Sparkles className="size-4" aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">Lattice</p>
          <p className="text-muted-foreground text-xs">People Ops</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        <p className="text-muted-foreground px-2 pb-2 text-[11px] font-medium tracking-wider uppercase">
          Workspace
        </p>
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-muted/80 p-3 text-xs leading-relaxed shadow-inner ring-1 ring-border/60">
          <p className="font-medium text-foreground">DummyJSON live</p>
          <p className="text-muted-foreground mt-1">
            Connected to public demo API — optimized caching via TanStack Query.
          </p>
        </div>
      </div>
    </aside>
  );
}
