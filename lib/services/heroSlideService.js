import { prisma } from "@/lib/prisma";

export async function getAllHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getActiveHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getHeroSlideById(id) {
  return prisma.heroSlide.findUnique({ where: { id } });
}
