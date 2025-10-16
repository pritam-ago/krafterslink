import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth — KraftersLink",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="min-h-screen p-8">{children}</section>;
}
