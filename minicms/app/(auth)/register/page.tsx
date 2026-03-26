import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthShell } from "@/components/auth-shell";
import { RegisterForm } from "@/components/register-form";
import { getSafeRedirect } from "@/lib/auth-redirect";

type RegisterPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = getSafeRedirect(params.callbackUrl);

  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  return (
    <AuthShell
      eyebrow="Weedpal"
      title="Create account"
      description="Use your email and password."
      asideTitle="Create account"
      asideDescription="Set up an account to post and manage weed logs."
    >
      <RegisterForm
        callbackUrl={callbackUrl}
        githubEnabled={Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET)}
      />
    </AuthShell>
  );
}
