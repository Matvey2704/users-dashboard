"use client";

import { useQuery } from "@tanstack/react-query";

import { computeDashboardStats } from "@/lib/analytics";
import { queryKeys } from "@/lib/query-keys";
import { usersApi } from "@/services/users.api";

export function useUsersCatalog() {
  const query = useQuery({
    queryKey: queryKeys.usersAll,

    queryFn: async () => {
      const response =
        await usersApi.getUsers(30, 0);

      return response.users;
    },
  });

  const users = query.data ?? [];

  const stats =
    computeDashboardStats(users);

  return {
    users,
    stats,
    isLoading: query.isLoading,
    error: query.error,
  };
}