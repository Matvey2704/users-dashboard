"use client";

import {
  Activity,
  Building2,
  PieChartIcon,
  Users,
} from "lucide-react";

import { GenderRatioChart, RoleDistributionChart } from "@/components/dashboard/analytics-charts";
import { RecentUsers } from "@/components/dashboard/recent-users";
import { StatCard } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUsersCatalog } from "@/hooks/use-users-catalog";

export function DashboardHome() {
  const { users, stats, isLoading, error } = useUsersCatalog();

  if (error) {
    return (
      <div className="border-destructive/40 bg-destructive/5 rounded-xl border p-6 text-sm">
        <p className="font-medium text-destructive">
          Could not load analytics
        </p>
        <p className="text-muted-foreground mt-1">
          Check your connection and try again. DummyJSON must be reachable from
          the browser.
        </p>
      </div>
    );
  }

  if (isLoading || !stats) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[118px] rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[320px] rounded-xl" />
          <Skeleton className="h-[320px] rounded-xl" />
        </div>
        <Skeleton className="h-[280px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total users"
          value={String(stats.totalUsers)}
          subtitle="Across DummyJSON dataset"
          icon={Users}
        />
        <StatCard
          title="Average age"
          value={`${stats.averageAge}`}
          subtitle="Mean across population"
          icon={Activity}
        />
        <StatCard
          title="Male / female"
          value={`${stats.malePercent}% · ${stats.femalePercent}%`}
          subtitle={`${stats.maleCount} male · ${stats.femaleCount} female`}
          icon={PieChartIcon}
        />
        <StatCard
          title="Companies"
          value={String(stats.uniqueCompanies)}
          subtitle="Distinct employer names"
          icon={Building2}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-base">Gender mix</CardTitle>
            <CardDescription>
              Distribution weighted across all imported profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenderRatioChart stats={stats} />
          </CardContent>
        </Card>
        <Card className="shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-base">Users by role</CardTitle>
            <CardDescription>
              Role concentration from directory metadata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RoleDistributionChart stats={stats} />
          </CardContent>
        </Card>
      </div>

      <RecentUsers users={users} />
    </div>
  );
}
