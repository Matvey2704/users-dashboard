"use client";

import { ChevronRight, MapPin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fullName } from "@/lib/analytics";
import type { User } from "@/types/user.types";

export function UsersMobileCards({
  users,
  page,
  pageSize,
  total,
  onPageChange,
  onOpen,
  isLoading,
}: {
  users: User[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
  onOpen: (user: User) => void;
  isLoading: boolean;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const slice = users.slice(start, start + pageSize);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 lg:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  if (slice.length === 0) {
    return (
      <div className="lg:hidden">
        <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-10 text-center text-sm">
          <p className="font-medium">No users match your filters</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Adjust search or filters to broaden results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {slice.map((user) => (
        <button
          key={user.id}
          type="button"
          onClick={() => onOpen(user)}
          className="flex w-full items-start gap-3 rounded-xl border border-border/80 bg-card p-4 text-left shadow-sm ring-1 ring-border/40 transition-all hover:border-border hover:shadow-md active:scale-[0.99]"
        >
          <Avatar className="size-12 ring-2 ring-border shadow-sm">
            <AvatarImage src={user.image} alt="" />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-semibold">{fullName(user)}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
              <ChevronRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="rounded-full capitalize">
                {user.gender}
              </Badge>
              <Badge variant="outline" className="rounded-full font-normal">
                {user.role}
              </Badge>
            </div>
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="tabular-nums">Age {user.age}</span>
              <span className="max-w-[140px] truncate">{user.company.name}</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3" aria-hidden />
                {user.address.country}
              </span>
            </div>
          </div>
        </button>
      ))}

      <div className="flex items-center justify-between pt-1">
        <p className="text-muted-foreground text-xs">
          Page <span className="text-foreground font-medium">{page}</span> /{" "}
          {pageCount}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
