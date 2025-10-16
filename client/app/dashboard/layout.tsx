import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — KraftersLink",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen p-6 bg-background">
      <header className="max-w-6xl mx-auto py-4">Dashboard</header>
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
