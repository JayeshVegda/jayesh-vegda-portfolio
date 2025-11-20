import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { SocialLinks } from "@/config/socials";
import { writeSocialConfig } from "@/lib/config-writer";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert icon to string representation
    // For admin purposes, we'll return the icon as a string that can be edited
    // The admin should provide icon in format "Icons.gitHub", "Icons.linkedin", etc.
    const socials = SocialLinks.map((s) => ({
      ...s,
      icon: typeof s.icon === "string" ? s.icon : `Icons.${s.name === "Github" ? "gitHub" : s.name === "LinkedIn" ? "linkedin" : s.name === "LeetCode" ? "zap" : s.name === "Gmail" ? "gmail" : "gitHub"}`,
    }));

    return NextResponse.json(socials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const currentSocials = SocialLinks.map((s) => ({
      ...s,
      icon: typeof s.icon === "string" ? s.icon : `Icons.${s.name === "Github" ? "gitHub" : s.name === "LinkedIn" ? "linkedin" : s.name === "LeetCode" ? "zap" : s.name === "Gmail" ? "gmail" : "gitHub"}`,
    }));

    const newSocials = [...currentSocials, data];
    await writeSocialConfig(newSocials);

    return NextResponse.json({ success: true, message: "Social link added" });
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

export async function PUT(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, ...data } = await req.json();
    const currentSocials = SocialLinks.map((s) => ({
      ...s,
      icon: typeof s.icon === "string" ? s.icon : `Icons.${s.name === "Github" ? "gitHub" : s.name === "LinkedIn" ? "linkedin" : s.name === "LeetCode" ? "zap" : s.name === "Gmail" ? "gmail" : "gitHub"}`,
    }));

    const updatedSocials = currentSocials.map((s) => (s.name === name ? { ...s, ...data, name } : s));
    await writeSocialConfig(updatedSocials);

    return NextResponse.json({ success: true, message: "Social link updated" });
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

export async function DELETE(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ error: "Social link name required" }, { status: 400 });
    }

    const currentSocials = SocialLinks.map((s) => ({
      ...s,
      icon: typeof s.icon === "string" ? s.icon : `Icons.${s.name === "Github" ? "gitHub" : s.name === "LinkedIn" ? "linkedin" : s.name === "LeetCode" ? "zap" : s.name === "Gmail" ? "gmail" : "gitHub"}`,
    }));

    const filteredSocials = currentSocials.filter((s) => s.name !== name);
    await writeSocialConfig(filteredSocials);

    return NextResponse.json({ success: true, message: "Social link deleted" });
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

