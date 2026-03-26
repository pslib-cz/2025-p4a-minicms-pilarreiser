import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardOverview } from "@/lib/weed-logs";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const overview = await getDashboardOverview(session.user.id, session.user.role);
  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {isAdmin ? "Forum overview" : "My overview"}
          </h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            {isAdmin ? "Forum totals and recent activity." : "Your totals and latest updates."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/logs/new">New log</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>{isAdmin ? "Total logs" : "My logs"}</CardDescription>
            <CardTitle className="text-4xl">{overview.logCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>With photos</CardDescription>
            <CardTitle className="text-4xl">{overview.photoCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Average rating</CardDescription>
            <CardTitle className="text-4xl">
              {overview.averageRating ? overview.averageRating.toFixed(1) : "-"}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent logs</CardTitle>
          <CardDescription>Most recently updated posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {overview.recentLogs.length > 0 ? (
            <div className="space-y-4">
              {overview.recentLogs.map((weedLog) => (
                <div
                  key={weedLog.id}
                  className="flex flex-col gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface-elevated)] p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium">{weedLog.title}</p>
                    <p className="text-sm text-[color:var(--muted-foreground)]">
                      {weedLog.strain} - {weedLog.type} - {formatDate(weedLog.updatedAt)}
                    </p>
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/dashboard/logs/${weedLog.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[color:var(--muted-foreground)]">
              No logs yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
