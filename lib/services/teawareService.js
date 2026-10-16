import { prisma } from "@/lib/prisma";

export async function getAllTeawares() {
  return prisma.teaWare.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getFeaturedTeawares() {
  return prisma.teaWare.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } });
}

export async function getTeawareBySlug(slug) {
  return prisma.teaWare.findUnique({ where: { slug } });
}

export async function getTeawareById(id) {
  return prisma.teaWare.findUnique({ where: { id } });
}
