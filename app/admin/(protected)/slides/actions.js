"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import {
  isValidImage,
  uploadImageFile,
  deleteImagesFromR2,
} from "@/lib/productImages";
import { normalizeLink } from "@/lib/slideLink";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
}

function readTranslated(formData, prefix) {
  return {
    en: String(formData.get(`${prefix}_en`) ?? "").trim(),
    de: String(formData.get(`${prefix}_de`) ?? "").trim(),
  };
}

function r2Keys(...images) {
  return images.filter((image) => image && !image.startsWith("/"));
}

function revalidateSlides() {
  revalidatePath("/[locale]", "layout");
  revalidatePath("/admin/slides");
}

async function nextSortOrder() {
  const last = await prisma.heroSlide.findFirst({
    orderBy: { sortOrder: "desc" },
  });
  return last ? last.sortOrder + 1 : 0;
}

export async function saveSlideAction(formData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const existing = id
    ? await prisma.heroSlide.findUnique({ where: { id } })
    : null;

  const file = formData.get("image");
  const uploaded = isValidImage(file)
    ? await uploadImageFile(file, "hero")
    : null;
  const image = uploaded ?? existing?.image;
  if (!image) throw new Error("Slide image is required");

  const data = {
    active: formData.get("active") === "on",
    image,
    imagePosition:
      String(formData.get("imagePosition") ?? "").trim() || "50% 50%",
    script: readTranslated(formData, "script"),
    title: readTranslated(formData, "title"),
    temp: String(formData.get("temp") ?? "").trim(),
    text: readTranslated(formData, "text"),
    cta: readTranslated(formData, "cta"),
    alt: readTranslated(formData, "alt"),
    link: normalizeLink(
      String(formData.get("linkType") ?? "none"),
      String(formData.get("link") ?? ""),
    ),
  };

  try {
    if (existing) {
      await prisma.heroSlide.update({ where: { id }, data });
    } else {
      await prisma.heroSlide.create({
        data: { ...data, sortOrder: await nextSortOrder() },
      });
    }
  } catch (err) {
    await deleteImagesFromR2(r2Keys(uploaded));
    throw err;
  }

  if (uploaded) await deleteImagesFromR2(r2Keys(existing?.image));

  revalidateSlides();
  redirect("/admin/slides");
}

export async function deleteSlideAction(id) {
  await requireAdmin();

  const slide = await prisma.heroSlide.delete({ where: { id } });
  await deleteImagesFromR2(r2Keys(slide.image));

  revalidateSlides();
}

export async function moveSlideAction(id, step) {
  await requireAdmin();

  const slides = await prisma.heroSlide.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const from = slides.findIndex((s) => s.id === id);
  const to = from + step;
  if (from < 0 || to < 0 || to >= slides.length) return;

  [slides[from], slides[to]] = [slides[to], slides[from]];
  await prisma.$transaction(
    slides.map((s, i) =>
      prisma.heroSlide.update({ where: { id: s.id }, data: { sortOrder: i } }),
    ),
  );

  revalidateSlides();
}
