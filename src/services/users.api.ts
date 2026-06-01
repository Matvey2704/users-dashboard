import { api } from "./api";
import {
  User,
  UsersResponse,
  UserPostsResponse,
  UserTodosResponse,
  UserCartsResponse,
} from "../types/user.types";



export class UsersApiError extends Error {
  status: number;

  constructor(
    message: string,
    status: number
  ) {
    super(message);

    this.name = "UsersApiError";
    this.status = status;
  }
}

export const usersApi = {
  getUsers: (
  limit = 250,
  skip = 0
) =>
  api<UsersResponse>(
    `/users?limit=${limit}&skip=${skip}`
  ),

  searchUsers: (query: string) =>
    api<UsersResponse>(
      `/users/search?q=${query}`
    ),

  getUserById: (id: number) =>
    api<User>(
      `/users/${id}`
    ),

  getUsersWithParams: ({
    limit = 10,
    skip = 0,
    search = "",
    sortBy,
    order,
  }: {
    limit?: number;
    skip?: number;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }) => {
    const params = new URLSearchParams();

    params.set("limit", String(limit));
    params.set("skip", String(skip));

    if (sortBy) {
      params.set("sortBy", sortBy);
    }

    if (order) {
      params.set("order", order);
    }

    const endpoint = search
      ? `/users/search?q=${search}&${params.toString()}`
      : `/users?${params.toString()}`;

    return api<UsersResponse>(endpoint);
  },
};

export const fetchUserById = (id: number) =>
  api<User>(`/users/${id}`);

export const fetchUserPosts = (id: number) =>
  api<UserPostsResponse>(`/users/${id}/posts`);

export const fetchUserTodos = (id: number) =>
  api<UserTodosResponse>(`/users/${id}/todos`);

export const fetchUserCarts = (id: number) =>
  api<UserCartsResponse>(`/users/${id}/carts`);

export const fetchAllUsers = () =>
  api<UsersResponse>("/users?limit=250");

