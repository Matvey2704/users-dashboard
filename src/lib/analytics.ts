import type { User } from "@/types/user.types";

export interface DashboardStats {
  totalUsers: number;
  averageAge: number;
  maleCount: number;
  femaleCount: number;
  malePercent: number;
  femalePercent: number;
  uniqueCompanies: number;
  roleBreakdown: { role: string; count: number }[];
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function computeDashboardStats(users: User[]): DashboardStats {
  const totalUsers = users.length;
  if (totalUsers === 0) {
    return {
      totalUsers: 0,
      averageAge: 0,
      maleCount: 0,
      femaleCount: 0,
      malePercent: 0,
      femalePercent: 0,
      uniqueCompanies: 0,
      roleBreakdown: [],
    };
  }

  const maleCount = users.filter(
    (u) => u.gender?.toLowerCase() === "male"
  ).length;
  const femaleCount = users.filter(
    (u) => u.gender?.toLowerCase() === "female"
  ).length;
  const sumAge = users.reduce((acc, u) => acc + (u.age ?? 0), 0);

  const companies = new Set(users.map((u) => u.company?.name).filter(Boolean));

  const roleMap = new Map<string, number>();
  for (const u of users) {
    const r = u.role || "unknown";
    roleMap.set(r, (roleMap.get(r) ?? 0) + 1);
  }
  const roleBreakdown = [...roleMap.entries()]
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalUsers,
    averageAge: round1(sumAge / totalUsers),
    maleCount,
    femaleCount,
    malePercent: round1((maleCount / totalUsers) * 100),
    femalePercent: round1((femaleCount / totalUsers) * 100),
    uniqueCompanies: companies.size,
    roleBreakdown,
  };
}

export function fullName(user: Pick<User, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`.trim();
}
