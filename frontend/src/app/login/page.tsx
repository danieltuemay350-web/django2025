"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { login } from "@/lib/api";
import { saveAuth } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 md:px-10">
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-8 text-white shadow-float lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Welcome back</p>
            <h1 className="mt-6 font-display text-5xl leading-tight">
              Your community is waiting on the other side of this sign-in.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/72">
              Step back into your feed, post updates, follow creators, and keep the conversation moving.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-semibold">Designed for the API you just built</p>
              <p className="mt-2 text-sm text-white/70">Login lands directly in the styled social feed.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-semibold">JWT-powered sessions</p>
              <p className="mt-2 text-sm text-white/70">Access and refresh tokens are stored locally for this demo app.</p>
            </div>
          </div>
        </section>

        <AuthForm
          title="Sign in to your social dashboard"
          subtitle="Use the account you created from the API to open the styled feed and interact with posts, follows, and comments."
          submitLabel="Login"
          fields={[
            { name: "username", label: "Username", placeholder: "Enter your username", autoComplete: "username" },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
              autoComplete: "current-password",
            },
          ]}
          onSubmit={async (values) => {
            const auth = await login(values.username, values.password);
            saveAuth(auth);
            router.push("/feed");
          }}
          footer={
            <p>
              New here?{" "}
              <Link href="/register" className="font-medium text-ember">
                Create an account
              </Link>
            </p>
          }
        />
      </div>
    </main>
  );
}
