"use client";

import { useFormStatus } from "react-dom";

export function AdminSubmitButton({ label = "Save" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink px-8 py-3 font-body text-sm tracking-wide text-paper transition-colors duration-300 hover:bg-matcha disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
