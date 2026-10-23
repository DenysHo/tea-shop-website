"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { reorderSpring } from "@/lib/motion";
import { getDomainsImageUrl } from "@/lib/imageUrl";

const MAX_IMAGES = 20;
const MAX_SIZE = 8 * 1024 * 1024;

let counter = 0;
const nextId = () => `new-${counter++}`;

export default function ImagesField({ images = [] }) {
  const [items, setItems] = useState(() =>
    (images ?? []).map((key) => ({
      id: key,
      key,
      url: getDomainsImageUrl(key),
    })),
  );
  const [dragId, setDragId] = useState(null);
  const [overFiles, setOverFiles] = useState(false);
  const [error, setError] = useState("");

  const pickerRef = useRef(null);
  const submitRef = useRef(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const dt = new DataTransfer();
    items.forEach((it) => it.file && dt.items.add(it.file));
    if (submitRef.current) submitRef.current.files = dt.files;
  }, [items]);

  useEffect(
    () => () => {
      itemsRef.current.forEach((it) => it.file && URL.revokeObjectURL(it.url));
    },
    [],
  );

  function addFiles(fileList) {
    const incoming = Array.from(fileList ?? []);
    const valid = incoming.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_SIZE,
    );
    const room = MAX_IMAGES - itemsRef.current.length;
    const accepted = valid.slice(0, Math.max(room, 0));

    setError(
      accepted.length < incoming.length
        ? `Some files were skipped (images only, max 8 MB each, up to ${MAX_IMAGES} total).`
        : "",
    );

    const added = accepted.map((file) => ({
      id: nextId(),
      file,
      url: URL.createObjectURL(file),
    }));
    if (added.length) setItems((prev) => [...prev, ...added]);
  }

  function removeItem(id) {
    const item = itemsRef.current.find((it) => it.id === id);
    if (item?.file) URL.revokeObjectURL(item.url);
    setItems((prev) => prev.filter((it) => it.id !== id));
    setError("");
  }

  function moveTo(overId) {
    if (!dragId || dragId === overId) return;
    setItems((prev) => {
      const from = prev.findIndex((it) => it.id === dragId);
      const to = prev.findIndex((it) => it.id === overId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  let newIndex = 0;

  return (
    <div className="mb-8">
      <span className="admin-label">Product images</span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (e.dataTransfer.types.includes("Files")) setOverFiles(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOverFiles(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setOverFiles(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        className={`rounded-lg border border-dashed p-4 transition-colors ${
          overFiles ? "border-matcha bg-matcha/5" : "border-bamboo"
        }`}
      >
        <ul className="flex flex-wrap gap-3">
          <li>
            <button
              type="button"
              onClick={() => pickerRef.current?.click()}
              disabled={items.length >= MAX_IMAGES}
              className="flex aspect-[4/5] w-24 flex-col items-center justify-center gap-1.5 rounded border border-ink/15 bg-white text-center text-xs font-semibold text-matcha transition hover:border-matcha hover:bg-matcha/5 disabled:cursor-not-allowed disabled:opacity-40 sm:w-28"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Add images
            </button>
          </li>

          {items.map((item, i) => {
            const token = item.file ? `new:${newIndex++}` : item.key;
            const isMain = i === 0;

            return (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", item.id);
                  setDragId(item.id);
                }}
                onDragOver={() => moveTo(item.id)}
                onDragEnd={() => setDragId(null)}
                className={`group relative cursor-grab transition-opacity ${
                  dragId === item.id ? "opacity-40" : ""
                }`}
              >
                <motion.div
                  layout
                  transition={reorderSpring}
                  className={`relative aspect-[4/5] w-24 overflow-hidden rounded border bg-linen sm:w-28 ${
                    isMain
                      ? "border-matcha ring-2 ring-matcha/40"
                      : "border-ink/15"
                  }`}
                >
                  <img
                    src={item.url}
                    alt=""
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                  />

                  {isMain && (
                    <span className="absolute bottom-1 left-1 rounded bg-matcha px-2 py-0.5 text-[11px] font-semibold text-white">
                      Main photo
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove image"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-white transition hover:bg-seal focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>

                <input type="hidden" name="imageOrder" value={token} />
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-xs text-ink/60">
          ↔ Drag to change the order. The first photo is the main one.{" "}
          {items.length}/{MAX_IMAGES}
        </p>
        {error && <p className="mt-1 text-xs text-seal">{error}</p>}
      </div>

      <input
        ref={pickerRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <input
        ref={submitRef}
        type="file"
        name="newImages"
        multiple
        className="hidden"
        tabIndex={-1}
      />
      <input type="hidden" name="imagesField" value="1" />
    </div>
  );
}
