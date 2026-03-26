const defaultUrl = "http://localhost:3000";

function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteConfig = {
  name: "Weedpal",
  description: "A social feed for weed logs, strain ratings, photos, and real user notes.",
  url: stripTrailingSlash(
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? defaultUrl,
  ),
};
