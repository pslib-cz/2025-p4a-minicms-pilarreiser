import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "@/components/login-form";
import { getSafeRedirect } from "@/lib/auth-redirect";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = getSafeRedirect(params.callbackUrl);

  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  return (
    <AuthShell
      eyebrow="Weedpal"
      title="Sign in"
      description="Use your email and password."
      asideTitle="Sign in"
      asideDescription="Access your dashboard and weed logs."
    >
      <LoginForm
        callbackUrl={callbackUrl}
        githubEnabled={Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET)}
      />
    </AuthShell>
  );
}
