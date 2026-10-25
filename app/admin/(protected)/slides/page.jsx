import Link from "next/link";
import { getAllHeroSlides } from "@/lib/services/heroSlideService";
import { deleteSlideAction, moveSlideAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { asTranslated } from "@/lib/types";
import { getImageSrc } from "@/lib/imageUrl";

function MoveButton({ id, step, label, disabled }) {
  return (
    <form action={moveSlideAction.bind(null, id, step)}>
      <button
        type="submit"
        disabled={disabled}
        aria-label={step < 0 ? "Move up" : "Move down"}
        className="h-7 w-7 font-body text-sm text-stone hover:text-ink disabled:opacity-25"
      >
        {label}
      </button>
    </form>
  );
}

export default async function AdminSlidesPage() {
  const slides = await getAllHeroSlides();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">
          Home slider ({slides.length})
        </h1>
        <Link
          href="/admin/slides/new"
          className="bg-ink px-5 py-2.5 font-body text-sm text-paper transition-colors hover:bg-matcha"
        >
          + New slide
        </Link>
      </div>

      <div className="divide-y divide-bamboo/30 bg-paper">
        {slides.map((slide, i) => {
          const title = asTranslated(slide.title).en || "Untitled";
          return (
            <div key={slide.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex flex-col">
                <MoveButton id={slide.id} step={-1} label="↑" disabled={i === 0} />
                <MoveButton
                  id={slide.id}
                  step={1}
                  label="↓"
                  disabled={i === slides.length - 1}
                />
              </div>
              <img
                src={getImageSrc(slide.image)}
                alt=""
                className="h-14 w-24 shrink-0 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm text-ink">
                  {title}
                  {!slide.active && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-seal">
                      Hidden
                    </span>
                  )}
                </p>
                <p className="truncate font-body text-xs text-stone">
                  {slide.link || "No button"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/slides/${slide.id}/edit`}
                  className="font-body text-xs uppercase tracking-widest text-stone hover:text-ink"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteSlideAction.bind(null, slide.id)}
                  itemLabel={title}
                />
              </div>
            </div>
          );
        })}
        {slides.length === 0 && (
          <p className="px-5 py-8 font-body text-sm text-stone">
            No slides yet. The slider is hidden on the home page.
          </p>
        )}
      </div>
    </div>
  );
}
