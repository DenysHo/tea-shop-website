import Link from "next/link";
import { logoutAction } from "@/app/admin/(protected)/actions";
import { SITE } from "@/lib/site";

export function AdminSidebar({ username }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-bamboo/30 bg-paper p-6">
      <p className="font-display text-xl text-ink">{SITE.name}</p>
      <p className="mt-1 font-body text-xs text-stone">Admin</p>

      <nav className="mt-10 flex flex-col gap-3 font-body text-sm">
        <Link href="/admin/slides" className="text-stone hover:text-ink">
          Home slider
        </Link>
        <Link href="/admin/teas" className="text-stone hover:text-ink">
          Tea
        </Link>
        <Link href="/admin/teaware" className="text-stone hover:text-ink">
          Tea Ware
        </Link>
        <Link href="/admin/orders" className="text-stone hover:text-ink">
          Orders
        </Link>
      </nav>

      <div className="mt-auto pt-10">
        {username && (
          <p className="mb-2 font-body text-xs text-stone">
            Signed in as {username}
          </p>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="font-body text-xs uppercase tracking-widest text-stone hover:text-seal"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
