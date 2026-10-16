import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function verifyAdminCredentials(username, password) {
  if (!username || !password) return false;

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) {
    await bcrypt.compare(password, "$2a$12$invalidsaltinvalidsaltinvalidsalt");
    return false;
  }

  return bcrypt.compare(password, user.passwordHash);
}
