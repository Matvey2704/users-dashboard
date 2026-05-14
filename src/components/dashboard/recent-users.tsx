"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fullName } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user.types";

export function RecentUsers({ users }: { users: User[] }) {
  const recent = [...users]
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  return (
    <Card className="shadow-sm ring-1 ring-border/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Recent profiles</CardTitle>
          <CardDescription>Newest records by identifier</CardDescription>
        </div>
        <Link
          href="/users"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "inline-flex rounded-full gap-1"
          )}
        >
          View all
          <ArrowUpRight className="size-3.5 opacity-70" />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {recent.map((user) => (
          <Link
            key={user.id}
            href={`/users?userId=${user.id}`}
            className="hover:bg-muted/80 flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:shadow-sm"
          >
            <Avatar className="size-10 ring-2 ring-border shadow-sm">
              <AvatarImage src={user.image} alt="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{fullName(user)}</p>
              <p className="text-muted-foreground truncate text-xs">
                {user.company.name} · {user.role}
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
