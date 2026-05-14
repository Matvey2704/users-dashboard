"use client";

import { useState } from "react";

export function useUsersUrlState() {
  const [state, setState] = useState({
    q: "",
    gender: "all" as "all" | "male" | "female",
    role: "all",
    page: 1,
    pageSize: 10,
    sort: "name",
    order: "asc" as "asc" | "desc",
    userId: null as number | null,
  });

  function setParams(
    values: Partial<typeof state>
  ) {
    setState((prev) => ({
      ...prev,
      ...values,
    }));
  }

  return [state, setParams] as const;
}