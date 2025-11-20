import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if file writes are allowed
    const allowFileWrites = process.env.ALLOW_FILE_WRITES === 'true';
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_URL !== undefined;
    const isServerless = 
      process.env.VERCEL === '1' || 
      process.env.VERCEL_URL !== undefined ||
      process.env.VERCEL_REGION !== undefined ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.VERCEL_ENV === 'preview' ||
      process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;

    return NextResponse.json({
      writable: !isServerless || allowFileWrites,
      serverless: isServerless,
      vercel: isVercel,
      allowFileWrites,
      environment: process.env.NODE_ENV || 'unknown',
      message: isServerless && !allowFileWrites
        ? "Admin panel is read-only in production. Use locally or set ALLOW_FILE_WRITES=true (changes won't persist on Vercel)."
        : "File writes are enabled",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

