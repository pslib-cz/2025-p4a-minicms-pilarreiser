import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DashboardNav } from "@/components/dashboard-nav";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-[2rem] border border-[color:var(--border-strong)] bg-[color:var(--surface)] p-6 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.8)]">
        <div className="mb-6">
          <p className="text-sm text-[color:var(--muted-foreground)]">Signed in as</p>
          <p className="mt-2 font-medium text-[color:var(--foreground)]">
            {session.user.name ?? session.user.email}
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[color:var(--accent-bright)]">
            {session.user.role}
          </p>
        </div>
        <DashboardNav />
      </aside>
      <div>{children}</div>
    </div>
  );
}
