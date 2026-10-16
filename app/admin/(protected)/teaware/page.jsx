import Link from "next/link";
import { getAllTeawares } from "@/lib/services/teawareService";
import { deleteTeawareAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { asTranslated } from "@/lib/types";

export default async function AdminTeawarePage() {
  const items = await getAllTeawares();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Tea Ware ({items.length})</h1>
        <Link
          href="/admin/teaware/new"
          className="bg-ink px-5 py-2.5 font-body text-sm text-paper transition-colors hover:bg-matcha"
        >
          + New item
        </Link>
      </div>

      <div className="divide-y divide-bamboo/30 bg-paper">
        {items.map((item) => {
          const name = asTranslated(item.name).en || item.slug;
          return (
            <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-body text-sm text-ink">
                  {name} {item.featured && <span className="ml-2 text-[10px] uppercase tracking-widest text-matcha">Featured</span>}
                </p>
                <p className="font-body text-xs text-stone">/{item.slug} · {item.teaWareType}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/teaware/${item.id}/edit`} className="font-body text-xs uppercase tracking-widest text-stone hover:text-ink">
                  Edit
                </Link>
                <DeleteButton action={deleteTeawareAction.bind(null, item.id)} itemLabel={name} />
              </div>
            </div>
          );
        })}
        {items.length === 0 && <p className="px-5 py-8 font-body text-sm text-stone">No tea ware yet.</p>}
      </div>
    </div>
  );
}
