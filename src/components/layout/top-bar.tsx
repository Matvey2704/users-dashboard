"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function TopBar({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border/80 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <nav
          className="flex shrink-0 items-center gap-1 rounded-full border border-border/70 bg-muted/40 p-0.5 lg:hidden"
          aria-label="Mobile workspace"
        >
          <Link
            href="/"
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              pathname === "/" ?
                "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/users"
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
              pathname.startsWith("/users") ?
                "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
            )}
          >
            Users
          </Link>
        </nav>
        <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground hidden truncate text-xs sm:block">
            {description}
          </p>
        ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden max-w-xs md:block">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            readOnly
            placeholder="Jump to…"
            className="h-9 rounded-full bg-muted/60 pr-3 pl-9 text-sm shadow-inner"
            aria-hidden
          />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>
        <Avatar className="size-8 ring-2 ring-border shadow-sm">
          <AvatarImage src="" alt="" />
          <AvatarFallback className="bg-muted text-xs font-medium">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
