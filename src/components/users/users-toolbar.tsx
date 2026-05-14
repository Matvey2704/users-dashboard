"use client";

import { ArrowDownAZ, ArrowUpAZ, RotateCcw, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UsersSortField } from "@/lib/users-directory";

const sortLabels: Record<UsersSortField, string> = {
  name: "Full name",
  email: "Email",
  age: "Age",
  company: "Company",
  role: "Role",
  country: "Country",
};

export function UsersToolbar({
  q,
  onQChange,
  gender,
  onGenderChange,
  role,
  onRoleChange,
  roleOptions,
  sort,
  onSortChange,
  order,
  onOrderToggle,
  pageSize,
  onPageSizeChange,
  onResetFilters,
  totalShown,
}: {
  q: string;
  onQChange: (value: string) => void;
  gender: "all" | "male" | "female";
  onGenderChange: (value: "all" | "male" | "female") => void;
  role: string;
  onRoleChange: (value: string) => void;
  roleOptions: string[];
  sort: UsersSortField;
  onSortChange: (value: UsersSortField) => void;
  order: "asc" | "desc";
  onOrderToggle: () => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onResetFilters: () => void;
  totalShown: number;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-sm ring-1 ring-border/40">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Label htmlFor="user-search" className="sr-only">
            Search users
          </Label>
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="user-search"
            value={q}
            onChange={(e) => onQChange(e.target.value)}
            placeholder="Search by name, email, username…"
            className="h-10 rounded-lg bg-muted/40 pl-10 shadow-inner"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground tabular-nums ring-1 ring-border">
    {totalShown} match{totalShown === 1 ? "" : "es"}
  </span>

  <Button
    type="button"
    variant="ghost"
    size="sm"
    className="h-8 rounded-full text-xs"
    onClick={onResetFilters}
  >
    <RotateCcw className="mr-1 size-3.5" />
    Reset
  </Button>

  <ThemeToggle />
</div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            Gender
          </span>
          <Select
            value={gender}
            onValueChange={(v) => {
              if (v == null) return;
              onGenderChange(v as "all" | "male" | "female");
            }}
          >
            <SelectTrigger className="h-9 w-full rounded-lg bg-muted/40">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            Role
          </span>
          <Select
            value={role}
            onValueChange={(v) => {
              if (v == null) return;
              onRoleChange(v);
            }}
          >
            <SelectTrigger className="h-9 w-full rounded-lg bg-muted/40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {roleOptions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            Sort by
          </span>
          <Select
            value={sort}
            onValueChange={(v) => {
              if (v == null) return;
              onSortChange(v as UsersSortField);
            }}
          >
            <SelectTrigger className="h-9 w-full rounded-lg bg-muted/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(sortLabels) as UsersSortField[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {sortLabels[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            Order
          </span>
          <Button
            type="button"
            variant="outline"
            className="h-9 justify-between rounded-lg bg-muted/30"
            onClick={onOrderToggle}
          >
            {order === "asc" ? (
              <>
                Ascending <ArrowDownAZ className="size-4 opacity-70" />
              </>
            ) : (
              <>
                Descending <ArrowUpAZ className="size-4 opacity-70" />
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">
            Rows per page
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              if (v == null) return;
              onPageSizeChange(Number(v));
            }}
          >
            <SelectTrigger className="h-9 w-full rounded-lg bg-muted/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
