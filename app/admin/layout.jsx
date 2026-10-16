import { SITE } from "@/lib/site";
4;
export const metadata = {
  title: "Admin — Zentee",
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-linen">{children}</div>;
}
