"use client";

import { useState } from "react";
import { linkType } from "@/lib/slideLink";

const PLACEHOLDERS = {
  internal: "/tea",
  external: "https://instagram.com/…",
};

const SITE_PAGES = ["/tea", "/teaware", "/philosophy", "/contact"];

export function SlideLinkField({ link = "" }) {
  const [type, setType] = useState(linkType(link));

  return (
    <fieldset className="mb-6">
      <legend className="admin-label mb-2">Button link</legend>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <select
          name="linkType"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="admin-input"
        >
          <option value="none">No button</option>
          <option value="internal">Page on this site</option>
          <option value="external">External link (Instagram etc.)</option>
        </select>
        {type !== "none" && (
          <input
            name="link"
            defaultValue={link}
            required
            list={type === "internal" ? "site-pages" : undefined}
            placeholder={PLACEHOLDERS[type]}
            className="admin-input md:col-span-2"
          />
        )}
      </div>
      <datalist id="site-pages">
        {SITE_PAGES.map((page) => (
          <option key={page} value={page} />
        ))}
      </datalist>
      {type === "internal" && (
        <p className="mt-1 font-body text-xs text-stone">
          Without language, e.g. /tea or /tea/long-jing. External links open in a new tab.
        </p>
      )}
    </fieldset>
  );
}
