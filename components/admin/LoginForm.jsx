"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/app/admin/login/actions";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full bg-ink px-6 py-3 font-body text-sm tracking-wide text-paper transition-colors duration-300 hover:bg-matcha disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="admin-label" htmlFor="username">Username</label>
        <input id="username" name="username" type="text" required autoComplete="username" className="admin-input" />
      </div>
      <div>
        <label className="admin-label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="admin-input" />
      </div>

      {state?.error && <p className="text-sm text-seal">{state.error}</p>}

      <SubmitButton />
    </form>
  );
}
