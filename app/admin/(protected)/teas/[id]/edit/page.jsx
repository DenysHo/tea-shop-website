import { notFound } from "next/navigation";
import { getTeaById } from "@/lib/services/teaService";
import { TeaForm } from "@/components/admin/TeaForm";

export default async function EditTeaPage({ params }) {
  const tea = await getTeaById(params.id);
  if (!tea) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl text-ink">Edit tea</h1>
      <TeaForm tea={tea} />
    </div>
  );
}
