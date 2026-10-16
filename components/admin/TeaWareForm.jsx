import { saveTeawareAction } from "@/app/admin/(protected)/teaware/actions";
import { TranslatedField } from "@/components/admin/TranslatedField";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { asTranslated } from "@/lib/types";
import ImagesField from "./ImagesField";

const TEAWARE_TYPES = ["teapot", "gaiwan", "cup", "tray", "accessory"];

export function TeaWareForm({ item }) {
  return (
    <form action={saveTeawareAction} className="max-w-3xl">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor="slug">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={item?.slug}
            required
            className="admin-input"
            placeholder="celadon-gaiwan"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="accentColor">
            Accent color (hex)
          </label>
          <input
            id="accentColor"
            name="accentColor"
            defaultValue={item?.accentColor ?? "#8C5A3C"}
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="teaWareType">
            Type
          </label>
          <select
            id="teaWareType"
            name="teaWareType"
            defaultValue={item?.teaWareType ?? "teapot"}
            className="admin-input"
          >
            {TEAWARE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="capacityMl">
            Capacity (ml, optional)
          </label>
          <input
            id="capacityMl"
            name="capacityMl"
            type="number"
            defaultValue={item?.capacityMl ?? ""}
            className="admin-input"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 font-body text-sm text-ink">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={item?.featured}
            />
            Featured on home page
          </label>
        </div>
      </div>

      <TranslatedField
        name="name"
        label="Name"
        defaultValue={item ? asTranslated(item.name) : undefined}
      />
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
          defaultValue={item ? (item.priceCents / 100).toFixed(2) : ""}
          required
          className="admin-input"
          placeholder="29.00"
        />
      </div>
      <div>
        <label className="admin-label" htmlFor="pieceCount">
          Pieces in set
        </label>
        <input
          id="pieceCount"
          name="pieceCount"
          type="number"
          min="1"
          defaultValue={item?.pieceCount ?? 1}
          required
          className="admin-input"
          placeholder="1"
        />
      </div>
      <TranslatedField
        name="shortDescription"
        label="Short description"
        defaultValue={item ? asTranslated(item.shortDescription) : undefined}
      />
      <TranslatedField
        name="description"
        label="Full description"
        defaultValue={item ? asTranslated(item.description) : undefined}
        textarea
      />
      <TranslatedField
        name="material"
        label="Material"
        defaultValue={item ? asTranslated(item.material) : undefined}
      />
      <TranslatedField
        name="origin"
        label="Origin"
        defaultValue={item ? asTranslated(item.origin) : undefined}
      />
      <TranslatedField
        name="craftsman"
        label="Craftsman (optional)"
        defaultValue={
          item?.craftsman ? asTranslated(item.craftsman) : undefined
        }
      />

      <ImagesField images={item?.images} />

      <AdminSubmitButton label={item ? "Save changes" : "Create tea ware"} />
    </form>
  );
}
