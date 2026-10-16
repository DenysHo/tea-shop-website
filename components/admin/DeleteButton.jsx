"use client";

export function DeleteButton({ action, itemLabel }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${itemLabel}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="font-body text-xs uppercase tracking-widest text-stone hover:text-seal">
        Delete
      </button>
    </form>
  );
}
