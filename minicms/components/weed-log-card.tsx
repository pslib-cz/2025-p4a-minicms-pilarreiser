import Image from "next/image";
import Link from "next/link";

import type { WeedLogSummary } from "@/lib/weed-logs";
import { formatDate } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type WeedLogCardProps = {
  weedLog: WeedLogSummary;
};

export function WeedLogCard({ weedLog }: WeedLogCardProps) {
  const authorName = weedLog.author.name ?? "Anonymous";
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[color:var(--surface)]">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(119,181,112,0.24),rgba(222,237,214,0.95))] text-sm font-semibold text-[color:var(--foreground)]">
            {authorInitial}
          </div>
          <div className="space-y-1">
            <p className="font-medium text-[color:var(--foreground)]">{authorName}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              {formatDate(weedLog.createdAt)}
            </p>
          </div>
        </div>
        <Badge className="bg-[color:var(--accent)]/18 text-[color:var(--accent-bright)]">
          {weedLog.rating}/10
        </Badge>
      </div>

      <div className="space-y-4 px-5 pb-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{weedLog.type}</Badge>
            <Badge className="bg-[color:var(--surface-elevated)] text-[color:var(--foreground)]">
              {weedLog.strain}
            </Badge>
          </div>
          <h2 className="text-xl font-semibold">
            <Link href={`/logs/${weedLog.slug}`} className="hover:text-[color:var(--accent)]">
              {weedLog.title}
            </Link>
          </h2>
        </div>

        {weedLog.imageUrl ? (
          <Link href={`/logs/${weedLog.slug}`} className="block overflow-hidden rounded-[1.75rem]">
            <Image
              src={weedLog.imageUrl}
              alt={weedLog.title}
              width={1200}
              height={900}
              className="h-auto max-h-[34rem] w-full object-cover"
            />
          </Link>
        ) : (
          <div className="flex min-h-40 items-end rounded-[1.75rem] bg-[radial-gradient(circle_at_top,_rgba(120,201,92,0.22),_transparent_42%),linear-gradient(180deg,_rgba(240,247,235,1),_rgba(227,239,220,1))] p-5">
            <Badge className="bg-white/70 text-[color:var(--foreground)]">No photo</Badge>
          </div>
        )}

        <p className="line-clamp-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
          {weedLog.content}
        </p>

        <div className="flex flex-wrap gap-2">
          {weedLog.tags.map((tag) => (
            <Badge
              key={tag.id}
              className="bg-[color:var(--surface-elevated)] text-[color:var(--muted-foreground)]"
            >
              #{tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
