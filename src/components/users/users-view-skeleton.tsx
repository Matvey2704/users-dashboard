import { Skeleton } from "@/components/ui/skeleton";

export function UsersViewSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-40 rounded-xl" />
      <Skeleton className="hidden h-[420px] rounded-xl lg:block" />
      <div className="flex flex-col gap-3 lg:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
