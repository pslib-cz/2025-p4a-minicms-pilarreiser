import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const extension = path.extname(file.name) || `.${file.type.split("/")[1] ?? "jpg"}`;
  const filename = `${randomUUID()}${extension.toLowerCase()}`;
  const filePath = path.join(uploadDir, filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, bytes);

  return NextResponse.json({
    url: `/uploads/${filename}`,
  });
}
