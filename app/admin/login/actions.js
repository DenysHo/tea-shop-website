"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/auth";
import { getAdminSession } from "@/lib/session";
import { clientIp, isLocked, recordFailure, clearFailures } from "@/lib/loginLimit";

export async function loginAction(_prevState, formData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const ip = clientIp();
  if (await isLocked(ip)) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    await recordFailure(ip);
    return { error: "Incorrect username or password." };
  }
  await clearFailures(ip);

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  redirect("/admin/teas");
}
