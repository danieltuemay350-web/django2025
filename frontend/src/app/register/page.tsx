"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { register } from "@/lib/api";
import { saveAuth } from "@/lib/storage";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 md:px-10">
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <AuthForm
          title="Build your profile"
          subtitle="Create an account, write a short bio, and step straight into the social feed UI."
          submitLabel="Register"
          fields={[
            { name: "username", label: "Username", placeholder: "Choose a username", autoComplete: "username" },
            { name: "email", label: "Email", type: "email", placeholder: "Email address", autoComplete: "email" },
            {
              name: "first_name",
              label: "First name",
              placeholder: "Your first name",
              required: false,
              autoComplete: "given-name",
            },
            {
              name: "last_name",
              label: "Last name",
              placeholder: "Your last name",
              required: false,
              autoComplete: "family-name",
            },
            {
              name: "bio",
              label: "Bio",
              placeholder: "Share a short intro",
              required: false,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Create a secure password",
              autoComplete: "new-password",
            },
          ]}
          onSubmit={async (values) => {
            const auth = await register({
              username: values.username,
              email: values.email,
              password: values.password,
              first_name: values.first_name,
              last_name: values.last_name,
              bio: values.bio,
            });
            saveAuth(auth);
            router.push("/feed");
          }}
          footer={
            <p>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-ember">
                Sign in
              </Link>
            </p>
          }
        />

        <section className="hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card)] p-8 shadow-panel lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-jade">New profile</p>
            <h1 className="mt-6 font-display text-5xl leading-tight text-[color:var(--ink)]">
              Start with a profile that already feels like yours.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[color:var(--muted)]">
              Add your name, write a short bio, and publish your first post from a feed designed to showcase the API features.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-5">
              <p className="text-sm font-semibold text-[color:var(--ink)]">Profile fields</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Username, email, name, bio, and secure password.</p>
            </div>
            <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card-strong)] p-5">
              <p className="text-sm font-semibold text-[color:var(--ink)]">After signup</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">You land in the feed with your JWT session already saved.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
