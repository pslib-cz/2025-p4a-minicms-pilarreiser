import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { WeedLogForm } from "@/components/weed-log-form";

export default async function NewWeedLogPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard/logs/new");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New log</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          Add the basics and post it straight to the feed.
        </p>
      </div>
      <WeedLogForm mode="create" />
    </div>
  );
}
