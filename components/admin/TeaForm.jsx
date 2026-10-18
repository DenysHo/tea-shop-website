import { saveTeaAction } from "@/app/admin/(protected)/teas/actions";
import { TranslatedField } from "@/components/admin/TranslatedField";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { asTranslated, asTranslatedArray } from "@/lib/types";
import ImagesField from "./ImagesField";

const TEA_TYPES = [
  "green",
  "oolong",
  "white",
  "puerh",
  "black",
  "yellow",
  "red",
  "herbal",
  "blended",
  "light oolong",
  "dark oolong",
  "other",
];
const CAFFEINE_LEVELS = ["none", "low", "medium", "high"];

export function TeaForm({ tea }) {
  const flavorNotes = tea ? asTranslatedArray(tea.flavorNotes) : [];
  const flavorNotesByLang = (lang) =>
    flavorNotes
      .map((n) => n[lang])
      .filter(Boolean)
      .join(", ");

  return (
    <form
      action={saveTeaAction}
      className="max-w-3xl"
      encType="multipart/form-data"
    >
      {tea && <input type="hidden" name="id" value={tea.id} />}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor="slug">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={tea?.slug}
            required
            className="admin-input"
            placeholder="dragon-well-green"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="accentColor">
            Accent color (hex)
          </label>
          <input
            id="accentColor"
            name="accentColor"
            type="text"
            defaultValue={tea?.accentColor ?? "#6B7A5E"}
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="teaType">
            Tea type
          </label>
          <select
            id="teaType"
            name="teaType"
            defaultValue={tea?.teaType ?? "green"}
            className="admin-input"
          >
            {TEA_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="caffeineLevel">
            Caffeine level
          </label>
          <select
            id="caffeineLevel"
            name="caffeineLevel"
            defaultValue={tea?.caffeineLevel ?? "medium"}
            className="admin-input"
          >
            {CAFFEINE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="harvest">
            Harvest
          </label>
          <input
            id="harvest"
            name="harvest"
            defaultValue={tea?.harvest}
            className="admin-input"
            placeholder="Spring 2025"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 font-body text-sm text-ink">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={tea?.featured}
            />
            Featured on home page
          </label>
        </div>
      </div>

      <TranslatedField
        name="name"
        label="Name"
        defaultValue={tea ? asTranslated(tea.name) : undefined}
      />
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor="price">
            Price (€)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={tea ? (tea.priceCents / 100).toFixed(2) : ""}
            required
            className="admin-input"
            placeholder="2.30"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="saleUnitGrams">
            Sale unit (grams, 0 = sold as a whole piece)
          </label>
          <input
            id="saleUnitGrams"
            name="saleUnitGrams"
            type="number"
            min="0"
            defaultValue={tea?.saleUnitGrams ?? 10}
            required
            className="admin-input"
            placeholder="10"
          />
        </div>
      </div>
      <TranslatedField
        name="shortDescription"
        label="Short description"
        defaultValue={tea ? asTranslated(tea.shortDescription) : undefined}
      />
      <TranslatedField
        name="description"
        label="Full description"
        defaultValue={tea ? asTranslated(tea.description) : undefined}
        textarea
      />
      <TranslatedField
        name="origin"
        label="Origin"
        defaultValue={tea ? asTranslated(tea.origin) : undefined}
      />

      <fieldset className="mb-5">
        <legend className="admin-label mb-2">
          Flavor notes (comma-separated, per language)
        </legend>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <span className="mb-1 block font-body text-[11px] text-bamboo">
              EN
            </span>
            <input
              name="flavorNotes_en"
              defaultValue={flavorNotesByLang("en")}
              className="admin-input"
              placeholder="Honey, Melon, Cool finish"
            />
          </div>
          <div>
            <span className="mb-1 block font-body text-[11px] text-bamboo">
              DE
            </span>
            <input
              name="flavorNotes_de"
              defaultValue={flavorNotesByLang("de")}
              className="admin-input"
            />
          </div>
        </div>
      </fieldset>

      <TranslatedField
        name="legalName"
        label="Legal name (e.g. Grüner Tee, Oolong-Tee)"
        defaultValue={tea ? asTranslated(tea.legalName) : undefined}
      />
      <TranslatedField
        name="ingredients"
        label="Ingredients (e.g. 100 % grüner Tee)"
        defaultValue={tea ? asTranslated(tea.ingredients) : undefined}
      />
      <TranslatedField
        name="allergens"
        label="Allergens (empty = none)"
        defaultValue={tea ? asTranslated(tea.allergens) : undefined}
      />

      <ImagesField images={tea?.images} />

      <AdminSubmitButton label={tea ? "Save changes" : "Create tea"} />
    </form>
  );
}
