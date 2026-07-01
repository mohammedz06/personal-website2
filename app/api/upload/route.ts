import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "@/lib/auth/session";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File must be under 5 MB." },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || ".png";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const storageBucket = process.env.SUPABASE_STORAGE_BUCKET ?? "uploads";

    if (supabaseUrl && supabaseServiceRole) {
      const supabase = createClient(supabaseUrl, supabaseServiceRole, {
        auth: { persistSession: false },
      });

      const { error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(safeName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const publicUrlData = await supabase.storage
        .from(storageBucket)
        .getPublicUrl(safeName);

      if (!publicUrlData?.data?.publicUrl) {
        throw new Error("Could not create public URL for the uploaded file.");
      }

      return NextResponse.json({ url: publicUrlData.data.publicUrl });
    }

    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error:
            "Image uploads require Supabase storage in production. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, safeName), buffer);

    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
