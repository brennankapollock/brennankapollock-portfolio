import "@/app/globals.css";

export const metadata = {
  title: "Admin - Portfolio CMS",
  description: "Content management system",
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-white dark:bg-black">{children}</div>;
}
