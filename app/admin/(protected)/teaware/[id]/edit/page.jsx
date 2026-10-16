import { notFound } from "next/navigation";
import { getTeawareById } from "@/lib/services/teawareService";
import { TeaWareForm } from "@/components/admin/TeaWareForm";

export default async function EditTeawarePage({ params }) {
  const item = await getTeawareById(params.id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-ink">Edit tea ware</h1>
      <TeaWareForm item={item} />
    </div>
  );
}
