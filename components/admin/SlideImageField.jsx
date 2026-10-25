"use client";

import { useEffect, useState } from "react";
import { getImageSrc } from "@/lib/imageUrl";

const MAX_SIZE = 8 * 1024 * 1024;

function Preview({ src, position, className, label }) {
  return (
    <div>
      <span className="mb-1 block font-body text-[11px] text-bamboo">{label}</span>
      <div className={`overflow-hidden rounded border border-ink/15 bg-linen ${className}`}>
        {src && (
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        )}
      </div>
    </div>
  );
}

function parsePosition(position) {
  const [x = 50, y = 50] = position.split(" ").map((v) => parseFloat(v));
  return { x, y };
}

function FocusPicker({ src, position, onChange }) {
  const { x, y } = parsePosition(position);

  function pick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const py = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onChange(`${px}% ${py}%`);
  }

  return (
    <div>
      <span className="mb-1 block font-body text-[11px] text-bamboo">
        Click on the main subject
      </span>
      <div onClick={pick} className="relative inline-block cursor-crosshair">
        <img src={src} alt="" draggable={false} className="block max-h-72 max-w-full rounded border border-ink/15" />
        <span
          className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-matcha/70 shadow"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      </div>
    </div>
  );
}

export function SlideImageField({ image, imagePosition = "50% 50%" }) {
  const [src, setSrc] = useState(() => (image ? getImageSrc(image) : null));
  const [position, setPosition] = useState(imagePosition);
  const [error, setError] = useState("");

  useEffect(() => () => src?.startsWith("blob:") && URL.revokeObjectURL(src), [src]);

  function pick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > MAX_SIZE) {
      setError("Images only, max 8 MB.");
      e.target.value = "";
      return;
    }
    setError("");
    setSrc(URL.createObjectURL(file));
  }

  return (
    <fieldset className="mb-6">
      <legend className="admin-label mb-2">Photo</legend>
      <input
        type="file"
        name="image"
        accept="image/*"
        required={!image}
        onChange={pick}
        className="font-body text-sm"
      />
      {error && <p className="mt-1 text-xs text-seal">{error}</p>}

      {src && (
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <FocusPicker src={src} position={position} onChange={setPosition} />
          <div className="flex flex-wrap items-end gap-4">
            <Preview src={src} position={position} label="Desktop" className="aspect-[3/1] w-80" />
            <Preview src={src} position={position} label="Mobile" className="aspect-[2/3] w-28" />
          </div>
        </div>
      )}
      <input type="hidden" name="imagePosition" value={position} />
    </fieldset>
  );
}
