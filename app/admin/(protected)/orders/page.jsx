import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";
import { OrdersList } from "@/components/admin/OrdersList";

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) redirect("/admin/login");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl py-10">
      <h1 className="mb-6 font-display text-2xl text-ink">Orders</h1>
      <OrdersList orders={orders} />
    </div>
  );
}
