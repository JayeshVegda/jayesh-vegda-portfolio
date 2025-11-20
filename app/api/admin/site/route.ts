import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { siteConfig } from "@/config/site";
import { writeSiteConfig } from "@/lib/config-writer";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(siteConfig);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await writeSiteConfig(data);

    return NextResponse.json({ success: true, message: "Site config updated" });
  } catch (error: any) {
    if (error.code === 'SERVERLESS_WRITE_DISABLED' || error.message?.startsWith('SERVERLESS_WRITE_DISABLED')) {
      return NextResponse.json({ 
        error: "The admin panel is read-only in production. Please update config files manually via Git or use a database for runtime updates.",
        code: "SERVERLESS_WRITE_DISABLED"
      }, { status: 403 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

