import { fullName } from "@/lib/analytics";
import type { User } from "@/types/user.types";

export type UsersSortField =
  | "name"
  | "email"
  | "age"
  | "company"
  | "role"
  | "country";

export function filterUsersByFacets(
  users: User[],
  gender: "all" | "male" | "female",
  role: string
) {
  return users.filter((u) => {
    if (gender !== "all" && u.gender?.toLowerCase() !== gender) {
      return false;
    }
    if (role !== "all" && u.role !== role) {
      return false;
    }
    return true;
  });
}

export function sortUsers(
  users: User[],
  sort: UsersSortField,
  order: "asc" | "desc"
) {
  const dir = order === "asc" ? 1 : -1;
  const sorted = [...users];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (sort) {
      case "name":
        cmp = fullName(a).localeCompare(fullName(b));
        break;
      case "email":
        cmp = a.email.localeCompare(b.email);
        break;
      case "age":
        cmp = a.age - b.age;
        break;
      case "company":
        cmp = a.company.name.localeCompare(b.company.name);
        break;
      case "role":
        cmp = a.role.localeCompare(b.role);
        break;
      case "country":
        cmp = a.address.country.localeCompare(b.address.country);
        break;
      default:
        cmp = 0;
    }
    return cmp * dir;
  });
  return sorted;
}

export function uniqueRoles(users: User[]) {
  const set = new Set(users.map((u) => u.role).filter(Boolean));
  return [...set].sort((a, b) => a.localeCompare(b));
}
