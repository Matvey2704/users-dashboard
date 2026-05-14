"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  useDeferredValue,
  useMemo,
} from "react";

import {
  uniqueRoles,
  type UsersSortField,
} from "@/lib/users-directory";

import { usersApi } from "@/services/users.api";

import type { User } from "@/types/user.types";

export function useUsersDirectory(
  q: string,
  gender: "all" | "male" | "female",
  roleFilter: string,
  sort: UsersSortField,
  order: "asc" | "desc",
  page: number,
  pageSize: number
) {
  const deferredQ =
    useDeferredValue(q.trim());

  const skip =
    (page - 1) * pageSize;

  const usersQuery = useQuery({
    queryKey: [
      "users",
      deferredQ,
      gender,
      roleFilter,
      sort,
      order,
      page,
      pageSize,
    ],

    queryFn: async () => {
      const res =
        await usersApi.getUsersWithParams({
          limit: pageSize,
          skip,
          search: deferredQ,
          sortBy:
            sort === "name"
              ? "firstName"
              : sort,
          order,
        });

      return res;
    },

    placeholderData:
      keepPreviousData,
  });

  const apiUsers =
    usersQuery.data?.users ?? [];

  const filteredUsers =
    useMemo(() => {
      return apiUsers.filter((u) => {
        const genderMatch =
          gender === "all"
            ? true
            : u.gender === gender;

        const roleMatch =
          roleFilter === "all"
            ? true
            : u.role === roleFilter;

        return (
          genderMatch &&
          roleMatch
        );
      });
    }, [
      apiUsers,
      gender,
      roleFilter,
    ]);

  const roleOptions =
    useMemo(() => {
      return uniqueRoles(
        apiUsers as User[]
      );
    }, [apiUsers]);

  return {
    users:
      filteredUsers as User[],

    totalFiltered:
      usersQuery.data?.total ?? 0,

    roleOptions,

    isLoading:
      usersQuery.isLoading,

    isFetching:
      usersQuery.isFetching,

    error:
      usersQuery.error,
  };
}