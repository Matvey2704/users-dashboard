"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fullName } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user.types";

const columnHelper = createColumnHelper<User>();

const roleStyles: Record<
  "admin" | "moderator" | "user",
  string
> = {
  admin:
    "border-red-500/20 bg-red-500/10 text-red-500",

  moderator:
    "border-amber-500/20 bg-amber-500/10 text-amber-500",

  user:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
};

export function UsersDataTable({
  users,
  isLoading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRowClick,
}: {
  users: User[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onRowClick: (user: User) => void;
}) {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "avatar",
        header: "",
        cell: ({ row }) => (
          <Avatar className="size-9 ring-2 ring-border shadow-sm">
            <AvatarImage src={row.original.image} alt="" />

            <AvatarFallback className="text-xs font-medium">
              {row.original.firstName[0]}
              {row.original.lastName[0]}
            </AvatarFallback>
          </Avatar>
        ),
        size: 56,
      }),

      columnHelper.accessor((row) => fullName(row), {
        id: "name",
        header: "Full name",

        cell: ({ getValue, row }) => (
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              {getValue()}
            </span>

            <span className="text-muted-foreground text-xs">
              @{row.original.username}
            </span>
          </div>
        ),
      }),

      columnHelper.accessor("email", {
        header: "Email",

        cell: ({ getValue }) => (
          <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            {getValue()}
          </span>
        ),
      }),

      columnHelper.accessor("age", {
        header: "Age",

        cell: ({ getValue }) => (
          <span className="tabular-nums">
            {getValue()}
          </span>
        ),
      }),

      columnHelper.accessor("gender", {
        header: "Gender",

        cell: ({ getValue }) => (
          <Badge
            variant="secondary"
            className="rounded-full capitalize"
          >
            {getValue()}
          </Badge>
        ),
      }),

      columnHelper.accessor((row) => row.company.name, {
        id: "company",
        header: "Company",

        cell: ({ getValue }) => (
          <span className="max-w-[180px] truncate text-sm font-medium">
            {getValue()}
          </span>
        ),
      }),

      columnHelper.accessor("role", {
        header: "Role",

        cell: ({ getValue }) => (
          <Badge
            variant="outline"
            className={cn(
              "rounded-full border font-medium capitalize",
              roleStyles[getValue() as keyof typeof roleStyles]
            )}
          >
            {getValue()}
          </Badge>
        ),
      }),

      columnHelper.accessor((row) => row.address.country, {
        id: "country",
        header: "Country",

        cell: ({ getValue }) => (
          <span className="flex items-center gap-2">
            <span className="bg-muted/70 text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-border/60">
              <MapPin
                className="size-3.5"
                aria-hidden
              />
            </span>

            <span className="truncate">
              {getValue()}
            </span>
          </span>
        ),
      }),
    ],
    []
  );

  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex: Math.max(0, page - 1),
      pageSize,
    }),
    [page, pageSize]
  );

  const table = useReactTable({
    data: users,
    columns,

    state: {
      pagination,
    },

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater(pagination)
          : updater;

      if (next.pageIndex !== pagination.pageIndex) {
        onPageChange(next.pageIndex + 1);
      }

      if (
        next.pageSize !== pagination.pageSize &&
        onPageSizeChange
      ) {
        onPageSizeChange(next.pageSize);
      }
    },

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:
      getPaginationRowModel(),

    manualPagination: false,
  });

  if (isLoading) {
    return (
      <div className="hidden rounded-2xl border border-border/80 bg-card p-4 lg:block">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-12 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  const pageCount = table.getPageCount();
  const rowModel = table.getRowModel().rows;

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-border/40 lg:block">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className="border-border/80 hover:bg-transparent"
            >
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground h-11 text-[11px] font-medium uppercase tracking-[0.12em]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef
                          .header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rowModel.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-28 text-center text-sm"
              >
                <div className="flex flex-col items-center gap-2 py-10">
                  <p className="font-medium">
                    No users found
                  </p>

                  <p className="text-muted-foreground text-sm">
                    Try adjusting your filters
                    or search query.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            rowModel.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "group border-border/60 cursor-pointer transition-all duration-200 hover:bg-muted/40 hover:shadow-sm"
                )}
                onClick={() =>
                  onRowClick(row.original)
                }
              >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-border/80 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs">
          Page{" "}
          <span className="text-foreground font-medium tabular-nums">
            {page}
          </span>{" "}
          of{" "}
          <span className="text-foreground font-medium tabular-nums">
            {Math.max(1, pageCount)}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!table.getCanPreviousPage()}
            onClick={() =>
              onPageChange(page - 1)
            }
          >
            <ChevronLeft className="size-4" />
            Prev
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={!table.getCanNextPage()}
            onClick={() =>
              onPageChange(page + 1)
            }
          >
            Next

            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}