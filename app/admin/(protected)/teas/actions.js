"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { processImagesForSave, deleteImagesFromR2 } from "@/lib/productImages";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");
}

function readTranslated(formData, prefix) {
  return {
    en: String(formData.get(`${prefix}_en`) ?? ""),
    de: String(formData.get(`${prefix}_de`) ?? ""),
    ru: String(formData.get(`${prefix}_ru`) ?? ""),
  };
}

function readFlavorNotes(formData) {
  const split = (key) =>
    String(formData.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const en = split("flavorNotes_en");
  const de = split("flavorNotes_de");
  const ru = split("flavorNotes_ru");
  const length = Math.max(en.length, de.length, ru.length);
  return Array.from({ length }, (_, i) => ({
    en: en[i] ?? "",
    de: de[i] ?? "",
    ru: ru[i] ?? "",
  }));
}

function revalidateSite() {
  revalidatePath("/[locale]", "layout");
}

export async function saveTeaAction(formData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const existing = id ? await prisma.tea.findUnique({ where: { id } }) : null;
  const oldKeys = existing?.images ?? [];

  const { images, cleanupAfterSave, cleanupOnError } =
    await processImagesForSave(formData, oldKeys);

  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    teaType: String(formData.get("teaType") ?? ""),
    harvest: String(formData.get("harvest") ?? ""),
    caffeineLevel: String(formData.get("caffeineLevel") ?? ""),
    accentColor: String(formData.get("accentColor") ?? "#6B7A5E"),
    featured: formData.get("featured") === "on",
    name: readTranslated(formData, "name"),
    shortDescription: readTranslated(formData, "shortDescription"),
    description: readTranslated(formData, "description"),
    origin: readTranslated(formData, "origin"),
    flavorNotes: readFlavorNotes(formData),
    legalName: readTranslated(formData, "legalName"),
    ingredients: readTranslated(formData, "ingredients"),
    allergens: readTranslated(formData, "allergens"),
    images,
    priceCents: Math.round(Number(formData.get("price") ?? 0) * 100),
    saleUnitGrams: parseInt(formData.get("saleUnitGrams") ?? "0", 10),
  };

  try {
    if (id) {
      await prisma.tea.update({ where: { id }, data });
    } else {
      await prisma.tea.create({ data });
    }
  } catch (err) {
    await cleanupOnError();
    throw err;
  }

  await cleanupAfterSave();

  revalidateSite();
  revalidatePath("/admin/teas");
  redirect("/admin/teas");
}

export async function deleteTeaAction(id) {
  await requireAdmin();

  const tea = await prisma.tea.findUnique({
    where: { id },
    select: { images: true },
  });

  await prisma.tea.delete({ where: { id } });
  await deleteImagesFromR2(tea?.images ?? []);

  revalidateSite();
  revalidatePath("/admin/teas");
}