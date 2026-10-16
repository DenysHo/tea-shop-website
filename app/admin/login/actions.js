"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/auth";
import { getAdminSession } from "@/lib/session";

export async function loginAction(_prevState, formData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    return { error: "Incorrect username or password." };
  }

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  redirect("/admin/teas");
}
