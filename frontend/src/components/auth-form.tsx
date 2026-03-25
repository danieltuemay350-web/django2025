"use client";

import { FormEvent, useState } from "react";

interface AuthFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  fields: Array<{
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    autoComplete?: string;
  }>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  footer: React.ReactNode;
}

export function AuthForm({ title, subtitle, submitLabel, fields, onSubmit, footer }: AuthFormProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formValues);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card)]/95 p-8 shadow-panel backdrop-blur xl:p-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-ember">Orbit Social</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-[color:var(--ink)]">{title}</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[color:var(--muted)]">{subtitle}</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--ink)]">{field.label}</span>
            <input
              type={field.type || "text"}
              required={field.required ?? true}
              autoComplete={field.autoComplete}
              value={formValues[field.name] ?? ""}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--card-strong)] px-4 py-3.5 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-ember focus:bg-white"
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  [field.name]: event.target.value,
                }))
              }
            />
          </label>
        ))}

        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[color:var(--ink)] px-4 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-float disabled:opacity-60"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>
      </form>

      <div className="mt-6 text-sm text-[color:var(--muted)]">{footer}</div>
    </div>
  );
}
