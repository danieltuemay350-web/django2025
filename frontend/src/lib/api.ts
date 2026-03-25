import { API_BASE_URL } from "@/lib/config";
import { AuthPayload, Comment, PaginatedResponse, Post, User } from "@/types";

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed." }));
    throw new Error(getErrorMessage(error));
  }

  return response.json();
}

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return "Request failed.";
  }

  const raw = error as {
    detail?: string;
    errors?: Record<string, string | string[]>;
  };

  if (typeof raw.detail === "string") {
    return raw.detail;
  }

  const detail = raw.errors?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail) && detail.length > 0) {
    return detail[0];
  }

  if (raw.errors) {
    const firstError = Object.values(raw.errors)[0];
    if (typeof firstError === "string") {
      return firstError;
    }
    if (Array.isArray(firstError) && firstError.length > 0) {
      return firstError[0];
    }
  }

  return "Request failed.";
}

export async function login(username: string, password: string): Promise<AuthPayload> {
  return request<AuthPayload>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function register(data: {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
}) {
  const response = await request<{
    user: User;
    tokens: {
      access: string;
      refresh: string;
    };
  }>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return {
    access: response.tokens.access,
    refresh: response.tokens.refresh,
    user: response.user,
  } satisfies AuthPayload;
}

export async function getProfile(token: string) {
  return request<User>("/users/me/", {}, token);
}

export async function getUsers(token: string, search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await request<PaginatedResponse<User>>(`/users/${query}`, {}, token);
  return response.results;
}

export async function updateProfile(
  token: string,
  data: Partial<Pick<User, "first_name" | "last_name" | "bio">> & { email?: string }
) {
  return request<User>(
    "/users/me/",
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
    token
  );
}

export async function getPosts(token?: string) {
  const response = await request<PaginatedResponse<Post>>("/posts/", {}, token);
  return response.results;
}

export async function createPost(token: string, content: string) {
  return request<Post>(
    "/posts/",
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token
  );
}

export async function likePost(token: string, postId: number) {
  return request<{ liked: boolean; likes_count: number; detail: string }>(
    `/posts/${postId}/like/`,
    {
      method: "POST",
    },
    token
  );
}

export async function unlikePost(token: string, postId: number) {
  return request<{ liked: boolean; likes_count: number; detail: string }>(
    `/posts/${postId}/like/`,
    {
      method: "DELETE",
    },
    token
  );
}

export async function getComments(token: string, postId: number) {
  const response = await request<PaginatedResponse<Comment>>(`/posts/${postId}/comments/`, {}, token);
  return response.results;
}

export async function createComment(token: string, postId: number, content: string) {
  return request<Comment>(
    `/posts/${postId}/comments/`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token
  );
}

export async function followUser(token: string, userId: number) {
  return request<{ is_following: boolean; followers_count: number; detail: string }>(
    `/users/${userId}/follow/`,
    {
      method: "POST",
    },
    token
  );
}

export async function unfollowUser(token: string, userId: number) {
  return request<{ is_following: boolean; followers_count: number; detail: string }>(
    `/users/${userId}/follow/`,
    {
      method: "DELETE",
    },
    token
  );
}
