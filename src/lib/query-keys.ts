export const queryKeys = {
  usersAll: ["users", "all"] as const,
  user: (id: number) => ["users", "detail", id] as const,
  userPosts: (id: number) => ["users", id, "posts"] as const,
  userTodos: (id: number) => ["users", id, "todos"] as const,
  userCarts: (id: number) => ["users", id, "carts"] as const,
};
