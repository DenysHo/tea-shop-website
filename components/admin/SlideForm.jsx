import { saveSlideAction } from "@/app/admin/(protected)/slides/actions";
import { TranslatedField } from "@/components/admin/TranslatedField";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { SlideImageField } from "@/components/admin/SlideImageField";
import { SlideLinkField } from "@/components/admin/SlideLinkField";
import { asTranslated } from "@/lib/types";

export function SlideForm({ slide }) {
  const value = (field) => (slide ? asTranslated(slide[field]) : undefined);

  return (
    <form action={saveSlideAction} className="max-w-3xl">
      {slide && <input type="hidden" name="id" value={slide.id} />}

      <label className="mb-6 flex items-center gap-2 font-body text-sm text-ink">
        <input type="checkbox" name="active" defaultChecked={slide?.active ?? true} />
        Show on home page
      </label>

      <SlideImageField image={slide?.image} imagePosition={slide?.imagePosition} />

      <TranslatedField name="script" label="Small script line (e.g. Welcome to Zentee)" defaultValue={value("script")} />
      <TranslatedField name="title" label="Title" defaultValue={value("title")} />
      <div className="mb-5">
        <label className="admin-label" htmlFor="temp">
          Temperature (optional, e.g. 70–80 °C)
        </label>
        <input id="temp" name="temp" defaultValue={slide?.temp ?? ""} className="admin-input max-w-xs" />
      </div>
      <TranslatedField name="text" label="Text" defaultValue={value("text")} />
      <TranslatedField name="cta" label="Button text" defaultValue={value("cta")} />

      <SlideLinkField link={slide?.link} />

      <TranslatedField name="alt" label="Photo description (for screen readers)" defaultValue={value("alt")} />

      <AdminSubmitButton label={slide ? "Save changes" : "Create slide"} />
    </form>
  );
}
