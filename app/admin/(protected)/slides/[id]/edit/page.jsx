import { notFound } from "next/navigation";
import { getHeroSlideById } from "@/lib/services/heroSlideService";
import { SlideForm } from "@/components/admin/SlideForm";

export default async function EditSlidePage({ params }) {
  const slide = await getHeroSlideById(params.id);
  if (!slide) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-ink">Edit slide</h1>
      <SlideForm slide={slide} />
    </div>
  );
}
