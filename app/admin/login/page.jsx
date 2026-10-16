import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn) {
    redirect("/admin/teas");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm bg-paper p-8 shadow-sm">
        <p className="font-display text-2xl text-ink">Zentee Admin</p>
        <p className="mt-1 font-body text-sm text-stone">
          Sign in to manage the catalog.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
