import { Suspense } from "react";

import { UsersView } from "@/components/users/users-view";
import { UsersViewSkeleton } from "@/components/users/users-view-skeleton";

export default function UsersPage() {
  return (
    <Suspense fallback={<UsersViewSkeleton />}>
      <UsersView />
    </Suspense>
  );
}
