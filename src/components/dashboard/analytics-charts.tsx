"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardStats } from "@/lib/analytics";

const GENDER_COLORS = ["#64748b", "#94a3b8"];

export function GenderRatioChart({
  stats,
}: {
  stats: Pick<
    DashboardStats,
    "maleCount" | "femaleCount" | "malePercent" | "femalePercent"
  >;
}) {
  const data = [
    { name: "Male", value: stats.maleCount, pct: stats.malePercent },
    { name: "Female", value: stats.femaleCount, pct: stats.femalePercent },
  ];

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={82}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid oklch(0.922 0 0)",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RoleDistributionChart({
  stats,
}: {
  stats: Pick<DashboardStats, "roleBreakdown">;
}) {
  const data = stats.roleBreakdown.map((r) => ({
    role: r.role.length > 14 ? `${r.role.slice(0, 12)}…` : r.role,
    full: r.role,
    count: r.count,
  }));

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.4} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="role"
            width={88}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid oklch(0.922 0 0)",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="count"
            radius={[0, 6, 6, 0]}
            fill="oklch(0.556 0 0)"
            barSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
