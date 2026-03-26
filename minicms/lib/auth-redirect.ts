import { siteConfig } from "@/lib/site";

export function getSafeRedirect(
  value: FormDataEntryValue | string | null | undefined,
  fallback = "/dashboard",
) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const baseUrl = new URL(siteConfig.url);
    const nextUrl = new URL(value, baseUrl);

    if (nextUrl.origin !== baseUrl.origin) {
      return fallback;
    }

    return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
  } catch {
    return fallback;
  }
}
