import Link from "next/link";
import { getAllTeas } from "@/lib/services/teaService";
import { deleteTeaAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { asTranslated } from "@/lib/types";

export default async function AdminTeasPage() {
  const teas = await getAllTeas();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Tea ({teas.length})</h1>
        <Link
          href="/admin/teas/new"
          className="bg-ink px-5 py-2.5 font-body text-sm text-paper transition-colors hover:bg-matcha"
        >
          + New tea
        </Link>
      </div>

      <div className="divide-y divide-bamboo/30 bg-paper">
        {teas.map((tea) => {
          const name = asTranslated(tea.name).en || tea.slug;
          return (
            <div key={tea.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-body text-sm text-ink">
                  {name} {tea.featured && <span className="ml-2 text-[10px] uppercase tracking-widest text-matcha">Featured</span>}
                </p>
                <p className="font-body text-xs text-stone">/{tea.slug} · {tea.teaType}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/teas/${tea.id}/edit`} className="font-body text-xs uppercase tracking-widest text-stone hover:text-ink">
                  Edit
                </Link>
                <DeleteButton action={deleteTeaAction.bind(null, tea.id)} itemLabel={name} />
              </div>
            </div>
          );
        })}
        {teas.length === 0 && <p className="px-5 py-8 font-body text-sm text-stone">No teas yet.</p>}
      </div>
    </div>
  );
}
