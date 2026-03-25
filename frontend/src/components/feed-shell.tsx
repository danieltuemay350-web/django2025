"use client";

import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  LogOut,
  MessageCircle,
  RefreshCcw,
  Search,
  Sparkles,
  UserMinus,
  UserPlus,
} from "lucide-react";
import {
  createComment,
  createPost,
  followUser,
  getComments,
  getPosts,
  getProfile,
  getUsers,
  likePost,
  unfollowUser,
  unlikePost,
} from "@/lib/api";
import { clearAuth, getAuth } from "@/lib/storage";
import { Comment, Post, User } from "@/types";

function getDisplayName(user: User) {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  return fullName || user.username;
}

function getInitials(user: User) {
  return getDisplayName(user)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatRelativeTime(value: string) {
  const date = new Date(value);
  const diff = date.getTime() - Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  if (Math.abs(diff) < hour) {
    return rtf.format(Math.round(diff / minute), "minute");
  }
  if (Math.abs(diff) < day) {
    return rtf.format(Math.round(diff / hour), "hour");
  }
  return rtf.format(Math.round(diff / day), "day");
}

export function FeedShell() {
  const router = useRouter();
  const auth = getAuth();
  const [token] = useState(auth?.access ?? "");
  const [profile, setProfile] = useState<User | null>(auth?.user ?? null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [commentsByPost, setCommentsByPost] = useState<Record<number, Comment[]>>({});
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [postDraft, setPostDraft] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const deferredSearch = useDeferredValue(search);

  const loadDashboard = useCallback(async () => {
    const [nextProfile, nextPosts, nextUsers] = await Promise.all([getProfile(token), getPosts(token), getUsers(token)]);

    startTransition(() => {
      setProfile(nextProfile);
      setPosts(nextPosts);
      setUsers(nextUsers.filter((user) => user.id !== nextProfile.id));
    });
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    loadDashboard()
      .catch((loadError) => {
        clearAuth();
        router.replace("/login");
        setError(loadError instanceof Error ? loadError.message : "Unable to load the feed.");
      })
      .finally(() => setLoading(false));
  }, [loadDashboard, router, token]);

  const suggestedUsers = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) {
      return users.slice(0, 6);
    }

    return users.filter((user) => {
      const haystack = `${user.username} ${user.first_name} ${user.last_name} ${user.bio}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [deferredSearch, users]);

  async function handleRefresh() {
    setRefreshing(true);
    setError("");

    try {
      await loadDashboard();
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Unable to refresh the feed.");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleCreatePost() {
    const trimmed = postDraft.trim();
    if (!trimmed) {
      return;
    }

    setPosting(true);
    setError("");
    setActionMessage("");

    try {
      const nextPost = await createPost(token, trimmed);
      startTransition(() => {
        setPosts((current) => [nextPost, ...current]);
        setPostDraft("");
        setActionMessage("Post published.");
      });
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to publish post.");
    } finally {
      setPosting(false);
    }
  }

  async function handleToggleLike(post: Post) {
    setError("");

    try {
      const result = post.is_liked ? await unlikePost(token, post.id) : await likePost(token, post.id);
      startTransition(() => {
        setPosts((current) =>
          current.map((item) =>
            item.id === post.id ? { ...item, is_liked: result.liked, likes_count: result.likes_count } : item
          )
        );
      });
    } catch (likeError) {
      setError(likeError instanceof Error ? likeError.message : "Unable to update like.");
    }
  }

  async function handleToggleFollow(user: User) {
    setError("");

    try {
      const result = user.is_following ? await unfollowUser(token, user.id) : await followUser(token, user.id);
      const delta = result.is_following ? 1 : -1;

      startTransition(() => {
        setUsers((current) =>
          current.map((item) =>
            item.id === user.id
              ? {
                  ...item,
                  is_following: result.is_following,
                  followers_count: result.followers_count,
                }
              : item
          )
        );
        setPosts((current) =>
          current.map((post) =>
            post.author.id === user.id
              ? {
                  ...post,
                  author: {
                    ...post.author,
                    is_following: result.is_following,
                    followers_count: result.followers_count,
                  },
                }
              : post
          )
        );
        setProfile((current) =>
          current
            ? {
                ...current,
                following_count: Math.max(0, current.following_count + delta),
              }
            : current
        );
      });
    } catch (followError) {
      setError(followError instanceof Error ? followError.message : "Unable to update follow status.");
    }
  }

  async function handleToggleComments(postId: number) {
    const nextOpenState = !expandedPosts[postId];
    setExpandedPosts((current) => ({ ...current, [postId]: nextOpenState }));

    if (nextOpenState && !commentsByPost[postId]) {
      try {
        const comments = await getComments(token, postId);
        startTransition(() => {
          setCommentsByPost((current) => ({ ...current, [postId]: comments }));
        });
      } catch (commentError) {
        setError(commentError instanceof Error ? commentError.message : "Unable to load comments.");
      }
    }
  }

  async function handleCreateComment(postId: number) {
    const content = commentDrafts[postId]?.trim();
    if (!content) {
      return;
    }

    setError("");

    try {
      const nextComment = await createComment(token, postId, content);
      startTransition(() => {
        setCommentsByPost((current) => ({
          ...current,
          [postId]: [...(current[postId] ?? []), nextComment],
        }));
        setCommentDrafts((current) => ({ ...current, [postId]: "" }));
        setPosts((current) =>
          current.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments_count: post.comments_count + 1,
                }
              : post
          )
        );
      });
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to add comment.");
    }
  }

  function handleLogout() {
    clearAuth();
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-[color:var(--muted)]">
        Loading your social feed...
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-4 md:px-6 md:py-6">
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="panel-surface h-fit p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ember">Orbit Social</p>
              <h1 className="mt-3 font-display text-4xl text-[color:var(--ink)]">Feed</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/70 text-[color:var(--ink)] transition hover:bg-white"
              aria-label="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-[color:var(--ink)] p-5 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-lg font-semibold">
                {getInitials(profile)}
              </div>
              <div>
                <p className="text-lg font-semibold">{getDisplayName(profile)}</p>
                <p className="text-sm text-white/68">@{profile.username}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/78">{profile.bio || "Write a bio from the profile API to make this card your own."}</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/75 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Followers</p>
              <p className="mt-2 font-display text-3xl text-[color:var(--ink)]">{profile.followers_count}</p>
            </div>
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/75 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">Following</p>
              <p className="mt-2 font-display text-3xl text-[color:var(--ink)]">{profile.following_count}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-5">
            <div className="flex items-center gap-3 text-sm font-semibold text-[color:var(--ink)]">
              <Sparkles size={16} className="text-ember" />
              Quick notes
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--muted)]">
              <li>Post from the center composer to test `POST /api/posts/`.</li>
              <li>Use the right rail to follow users and refresh the feed.</li>
              <li>Like and comment on posts to exercise the rest of the API.</li>
            </ul>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="panel-surface p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jade">Compose</p>
                <h2 className="mt-3 font-display text-4xl text-[color:var(--ink)]">Share something with your network.</h2>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm text-[color:var(--ink)] transition hover:bg-white disabled:opacity-60"
              >
                <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            <textarea
              value={postDraft}
              onChange={(event) => setPostDraft(event.target.value)}
              placeholder="What are you building, learning, or shipping today?"
              className="mt-6 min-h-36 w-full resize-none rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] px-5 py-4 text-sm leading-7 text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-ember focus:bg-white"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[color:var(--muted)]">Tip: short updates look great, but long-form post text works too.</p>
              <button
                onClick={handleCreatePost}
                disabled={posting}
                className="inline-flex items-center justify-center rounded-2xl bg-ember px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-float disabled:opacity-60"
              >
                {posting ? "Publishing..." : "Publish post"}
              </button>
            </div>

            {error ? <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
            {!error && actionMessage ? (
              <p className="mt-4 rounded-2xl bg-jadeSoft px-4 py-3 text-sm text-jade">{actionMessage}</p>
            ) : null}
          </div>

          <div className="space-y-5">
            {posts.length === 0 ? (
              <div className="panel-surface p-8 text-center text-[color:var(--muted)]">
                No posts yet. Publish the first one from the composer above.
              </div>
            ) : null}

            {posts.map((post) => (
              <article key={post.id} className="panel-surface p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jadeSoft text-sm font-semibold text-jade">
                    {getInitials(post.author)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-[color:var(--ink)]">{getDisplayName(post.author)}</p>
                        <p className="text-sm text-[color:var(--muted)]">
                          @{post.author.username} | {formatRelativeTime(post.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleFollow(post.author)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                          post.author.is_following
                            ? "border border-[color:var(--line)] bg-white/70 text-[color:var(--ink)] hover:bg-white"
                            : "bg-jade text-white hover:shadow-float"
                        }`}
                      >
                        {post.author.is_following ? <UserMinus size={16} /> : <UserPlus size={16} />}
                        {post.author.is_following ? "Following" : "Follow"}
                      </button>
                    </div>

                    <p className="mt-5 whitespace-pre-wrap text-[15px] leading-8 text-[color:var(--ink)]">{post.content}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleToggleLike(post)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                          post.is_liked
                            ? "bg-emberSoft text-ember"
                            : "border border-[color:var(--line)] bg-white/70 text-[color:var(--ink)] hover:bg-white"
                        }`}
                      >
                        <Heart size={16} className={post.is_liked ? "fill-current" : ""} />
                        {post.likes_count} likes
                      </button>

                      <button
                        onClick={() => handleToggleComments(post.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition hover:bg-white"
                      >
                        <MessageCircle size={16} />
                        {post.comments_count} comments
                      </button>
                    </div>

                    {expandedPosts[post.id] ? (
                      <div className="mt-6 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-4">
                        <div className="space-y-4">
                          {(commentsByPost[post.id] ?? []).map((comment) => (
                            <div key={comment.id} className="rounded-[1.25rem] bg-white/80 px-4 py-3">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-[color:var(--ink)]">{getDisplayName(comment.author)}</p>
                                <p className="text-xs text-[color:var(--muted)]">{formatRelativeTime(comment.created_at)}</p>
                              </div>
                              <p className="mt-2 text-sm leading-7 text-[color:var(--ink)]">{comment.content}</p>
                            </div>
                          ))}
                          {(commentsByPost[post.id] ?? []).length === 0 ? (
                            <p className="text-sm text-[color:var(--muted)]">No comments yet. Start the conversation.</p>
                          ) : null}
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <input
                            value={commentDrafts[post.id] ?? ""}
                            onChange={(event) =>
                              setCommentDrafts((current) => ({
                                ...current,
                                [post.id]: event.target.value,
                              }))
                            }
                            placeholder="Write a thoughtful reply..."
                            className="w-full rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-jade"
                          />
                          <button
                            onClick={() => handleCreateComment(post.id)}
                            className="rounded-2xl bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-float"
                          >
                            Add comment
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="panel-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-jade">Discover people</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-4 py-3">
              <Search size={16} className="text-[color:var(--muted)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search username or bio"
                className="w-full bg-transparent text-sm text-[color:var(--ink)] outline-none placeholder:text-[color:var(--muted)]"
              />
            </div>

            <div className="mt-5 space-y-4">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/75 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emberSoft text-sm font-semibold text-ember">
                      {getInitials(user)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[color:var(--ink)]">{getDisplayName(user)}</p>
                      <p className="truncate text-sm text-[color:var(--muted)]">@{user.username}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {user.bio || "This user has not added a bio yet."}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      {user.followers_count} followers
                    </span>
                    <button
                      onClick={() => handleToggleFollow(user)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        user.is_following
                          ? "border border-[color:var(--line)] bg-white text-[color:var(--ink)] hover:bg-[color:var(--card-strong)]"
                          : "bg-jade text-white hover:shadow-float"
                      }`}
                    >
                      {user.is_following ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              ))}
              {suggestedUsers.length === 0 ? (
                <p className="text-sm text-[color:var(--muted)]">No matches yet. Try a different search.</p>
              ) : null}
            </div>
          </div>

          <div className="panel-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ember">Why this screen helps</p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
              <li>The layout exercises the API with real authenticated requests.</li>
              <li>The feed reflects likes, follows, and comments without needing the admin panel.</li>
              <li>The styling is intentionally warmer and more editorial than the old chat scaffold.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
