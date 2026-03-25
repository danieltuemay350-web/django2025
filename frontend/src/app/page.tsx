import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8 md:px-10">
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card)]/90 p-8 shadow-panel backdrop-blur lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-ember">
                Orbit Social
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-[color:var(--ink)] md:text-7xl">
                Style, structure, and a real social feed front end.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                A warm, editorial interface for your Django REST social media API, with auth, profile data,
                posting, likes, follows, and comments designed to feel finished rather than scaffolded.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-[color:var(--ink)] px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-float"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/70 px-6 py-4 text-sm font-medium text-[color:var(--ink)] transition hover:bg-white"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["JWT auth", "Secure access and refresh token flow."],
                ["Live profile data", "Users, follows, counts, and ownership rules."],
                ["Content actions", "Posts, likes, and comments in one feed."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/65 p-4">
                  <p className="text-sm font-semibold text-[color:var(--ink)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 top-10 h-24 w-24 rounded-full bg-ember/15 blur-3xl" />
            <div className="absolute left-8 top-0 h-28 w-28 rounded-full bg-jade/15 blur-3xl" />

            <div className="space-y-5">
              <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-6 text-white shadow-float">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/65">Featured Post</p>
                    <h2 className="mt-3 font-display text-3xl leading-tight">
                      &quot;Shipping the backend is only half the story. The interface should feel alive.&quot;
                    </h2>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">New</span>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
                  <span>184 likes</span>
                  <span>27 comments</span>
                  <span>6 follows today</span>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-white/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-jade">Profiles</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jadeSoft text-sm font-semibold text-jade">
                      OS
                    </div>
                    <div>
                      <p className="font-semibold text-[color:var(--ink)]">Olive Stone</p>
                      <p className="text-sm text-[color:var(--muted)]">Designing creator-first tools</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">Activity</p>
                  <ul className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                    <li>Liked a post about backend architecture.</li>
                    <li>Commented on an API design thread.</li>
                    <li>Followed two new creators.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            "Editorial landing page with a richer visual language",
            "Styled authentication screens that match the backend contract",
            "Social feed dashboard with profile, follow, like, and comment actions",
          ].map((item) => (
            <div key={item} className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--card)]/85 p-6 text-[color:var(--ink)] shadow-panel">
              {item}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
