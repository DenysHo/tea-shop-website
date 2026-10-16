import { prisma } from "@/lib/prisma";

export async function getAllTeas() {
  return prisma.tea.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getFeaturedTeas() {
  return prisma.tea.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } });
}

export async function getTeaBySlug(slug) {
  return prisma.tea.findUnique({ where: { slug } });
}

export async function getTeaById(id) {
  return prisma.tea.findUnique({ where: { id } });
}
