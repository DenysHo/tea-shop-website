"use server";

import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";

export async function logoutAction() {
  const session = await getAdminSession();
  session.destroy();
  redirect("/admin/login");
}
