import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (verifyAdminPassword(password)) {
      return NextResponse.json({ success: true, message: "Authenticated" });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

