import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { auth } from "@/auth";

export const runtime = "nodejs";
const maxUploadSizeInBytes = 4 * 1024 * 1024;

function sanitizeFilename(filename: string) {
  const extension = path.extname(filename).toLowerCase();
  const baseName = path
    .basename(filename, extension)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const safeBaseName = baseName || "weedpal-upload";
  const safeExtension = extension.replace(/[^a-z0-9.]/g, "") || ".jpg";

  return `${safeBaseName}${safeExtension}`;
}

export async function POST(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const filename = searchParams.get("filename");
  const contentType = request.headers.get("content-type");
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!filename) {
    return NextResponse.json({ error: "A filename is required." }, { status: 400 });
  }

  if (!contentType?.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  if (contentLength > maxUploadSizeInBytes) {
    return NextResponse.json({ error: "Images must be 4 MB or smaller." }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: "No image body was provided." }, { status: 400 });
  }

  try {
    const blob = await put(
      `weed-logs/${session.user.id}/${Date.now()}-${sanitizeFilename(filename)}`,
      request.body,
      {
        access: "public",
        addRandomSuffix: true,
        contentType,
      },
    );

    return NextResponse.json({
      url: blob.url,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to upload the image right now." },
      { status: 500 },
    );
  }
}
