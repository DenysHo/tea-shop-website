const languages = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export function TranslatedField({
  name,
  label,
  defaultValue,
  textarea = false,
}) {
  return (
    <fieldset className="mb-5">
      <legend className="admin-label mb-2">{label}</legend>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {languages.map(({ code, label: langLabel }) => (
          <div key={code}>
            <span className="mb-1 block font-body text-[11px] text-bamboo">
              {langLabel}
            </span>
            {textarea ? (
              <textarea
                name={`${name}_${code}`}
                defaultValue={defaultValue?.[code] ?? ""}
                rows={4}
                className="admin-input"
              />
            ) : (
              <input
                name={`${name}_${code}`}
                defaultValue={defaultValue?.[code] ?? ""}
                type="text"
                className="admin-input"
              />
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}
