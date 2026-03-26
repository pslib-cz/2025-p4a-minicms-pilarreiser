import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  asideTitle: string;
  asideDescription: string;
  children: React.ReactNode;
};

export function AuthShell({
  title,
  description,
  eyebrow,
  asideTitle,
  asideDescription,
  children,
}: AuthShellProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
      <section className="rounded-[2.5rem] border border-[color:var(--border-strong)] bg-[color:var(--surface)] p-8 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.8)] lg:p-12">
        <span className="inline-flex rounded-full bg-[color:var(--surface-subtle)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)]">
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {asideTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)]">
          {asideDescription}
        </p>
      </section>

      <Card className="self-center">
        <CardHeader>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
}
