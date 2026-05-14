"use client";

import { useEffect } from "react";

import { UsersDataTable } from "@/components/users/users-data-table";
import { UserDetailSheet } from "@/components/users/user-detail-sheet";
import { UsersMobileCards } from "@/components/users/users-mobile-cards";
import { UsersToolbar } from "@/components/users/users-toolbar";

import { useUsersDirectory } from "@/hooks/use-users-directory";
import { useUsersUrlState } from "@/hooks/use-users-url-state";

import type { User } from "@/types/user.types";
import type { UsersSortField } from "@/lib/users-directory";

export function UsersView() {
  const [state, setParams] =
    useUsersUrlState();

  const {
    q,
    gender,
    role,
    page,
    pageSize,
    sort,
    order,
    userId,
  } = state;

  const {
    users,
    totalFiltered,
    roleOptions,
    isLoading,
    isFetching,
    error,
  } = useUsersDirectory(
  q,
  gender,
  role,
  sort as UsersSortField,
  order,
  page,
  pageSize
);

  const maxPage = Math.max(
    1,
    Math.ceil(totalFiltered / pageSize)
  );

  useEffect(() => {
    if (page > maxPage) {
      setParams({
        page: maxPage,
      });
    }
  }, [page, maxPage]);

  const sheetOpen = userId != null;

  function openUser(user: User) {
    setParams({
      userId: user.id,
    });
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Failed to load users
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <UsersToolbar
        q={q}
        onQChange={(value) =>
          setParams({
            q: value,
            page: 1,
          })
        }
        gender={gender}
        onGenderChange={(value) =>
          setParams({
            gender: value,
            page: 1,
          })
        }
        role={role}
        onRoleChange={(value) =>
          setParams({
            role: value,
            page: 1,
          })
        }
        roleOptions={roleOptions}
        sort={sort as UsersSortField}
        onSortChange={(value) =>
          setParams({
            sort: value,
            page: 1,
          })
        }
        order={order}
        onOrderToggle={() =>
          setParams({
            order:
              order === "asc"
                ? "desc"
                : "asc",
          })
        }
        pageSize={pageSize}
        onPageSizeChange={(value) =>
          setParams({
            pageSize: value,
            page: 1,
          })
        }
        onResetFilters={() =>
          setParams({
            q: "",
            gender: "all",
            role: "all",
            page: 1,
            pageSize: 10,
            sort: "name",
            order: "asc",
          })
        }
        totalShown={totalFiltered}
      />

      <UsersDataTable
        users={users}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        onPageChange={(p) =>
          setParams({
            page: p,
          })
        }
        onPageSizeChange={(size) =>
          setParams({
            pageSize: size,
            page: 1,
          })
        }
        onRowClick={openUser}
      />

      <UsersMobileCards
        users={users}
        page={page}
        pageSize={pageSize}
        total={totalFiltered}
        onPageChange={(p) =>
          setParams({
            page: p,
          })
        }
        onOpen={openUser}
        isLoading={isLoading}
      />

      <UserDetailSheet
        userId={userId}
        open={sheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            setParams({
              userId: null,
            });
          }
        }}
      />

      {isFetching && (
        <div className="text-xs text-muted-foreground">
          Updating...
        </div>
      )}
    </div>
  );
}