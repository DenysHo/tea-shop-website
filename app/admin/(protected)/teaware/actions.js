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
  };
}

function readOptionalTranslated(formData, prefix) {
  const value = readTranslated(formData, prefix);
  const isEmpty = !value.en && !value.de && !value.ru;
  return isEmpty ? null : value;
}

function revalidateSite() {
  revalidatePath("/[locale]", "layout");
}

export async function saveTeawareAction(formData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const capacityRaw = String(formData.get("capacityMl") ?? "").trim();

  const existing = id
    ? await prisma.teaWare.findUnique({ where: { id } })
    : null;
  const oldKeys = existing?.images ?? [];

  const { images, cleanupAfterSave, cleanupOnError } =
    await processImagesForSave(formData, oldKeys);

  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    teaWareType: String(formData.get("teaWareType") ?? ""),
    accentColor: String(formData.get("accentColor") ?? "#8C5A3C"),
    featured: formData.get("featured") === "on",
    name: readTranslated(formData, "name"),
    shortDescription: readTranslated(formData, "shortDescription"),
    description: readTranslated(formData, "description"),
    material: readTranslated(formData, "material"),
    origin: readTranslated(formData, "origin"),
    craftsman: readOptionalTranslated(formData, "craftsman"),
    capacityMl: capacityRaw ? parseInt(capacityRaw, 10) : null,
    manufacturer: String(formData.get("manufacturer") ?? "").trim(),
    manufacturerContact: String(formData.get("manufacturerContact") ?? "").trim(),
    itemNumber: String(formData.get("itemNumber") ?? "").trim(),
    warnings: readTranslated(formData, "warnings"),
    images,
    priceCents: Math.round(Number(formData.get("price") ?? 0) * 100),
    pieceCount: parseInt(formData.get("pieceCount") ?? "1", 10),
  };

  try {
    if (id) {
      await prisma.teaWare.update({ where: { id }, data });
    } else {
      await prisma.teaWare.create({ data });
    }
  } catch (err) {
    await cleanupOnError();
    throw err;
  }

  await cleanupAfterSave();

  revalidateSite();
  revalidatePath("/admin/teaware");
  redirect("/admin/teaware");
}

export async function deleteTeawareAction(id) {
  await requireAdmin();

  const teaware = await prisma.teaWare.findUnique({
    where: { id },
    select: { images: true },
  });

  await prisma.teaWare.delete({ where: { id } });
  await deleteImagesFromR2(teaware?.images ?? []);

  revalidateSite();
  revalidatePath("/admin/teaware");
}