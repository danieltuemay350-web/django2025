export interface User {
  id: number;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  bio: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
}

export interface Post {
  id: number;
  author: User;
  content: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  post: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthPayload {
  access: string;
  refresh: string;
  user: User;
}
