import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { WeedLogForm } from "@/components/weed-log-form";
import { canManageWeedLog } from "@/lib/permissions";
import { getWeedLogByIdForEditing } from "@/lib/weed-logs";

type EditWeedLogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWeedLogPage({ params }: EditWeedLogPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard/logs");
  }

  const { id } = await params;
  const weedLog = await getWeedLogByIdForEditing(id);

  if (!weedLog || !canManageWeedLog(session.user, weedLog.authorId)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit log</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">Update the photo, rating, or notes.</p>
      </div>
      <WeedLogForm
        mode="edit"
        weedLogId={weedLog.id}
        initialValues={{
          title: weedLog.title,
          slug: weedLog.slug,
          strain: weedLog.strain,
          type: weedLog.type,
          rating: weedLog.rating,
          content: weedLog.content,
          tags: weedLog.tags.map(({ tag }) => tag.name).join(", "),
          imageUrl: weedLog.imageUrl ?? "",
        }}
      />
    </div>
  );
}
