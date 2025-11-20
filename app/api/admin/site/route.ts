import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getSiteConfig } from "@/lib/supabase/queries";
import { updateSiteConfig } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const siteConfig = await getSiteConfig();
    if (!siteConfig) {
      return NextResponse.json({ error: "Site config not found" }, { status: 404 });
    }

    // Transform to match frontend format
    const formatted = {
      name: siteConfig.name,
      authorName: siteConfig.author_name,
      username: siteConfig.username,
      description: siteConfig.description,
      url: siteConfig.url,
      links: {
        twitter: siteConfig.twitter_link,
        github: siteConfig.github_link,
        linkedin: siteConfig.linkedin_link,
      },
      ogImage: siteConfig.og_image,
      iconIco: siteConfig.icon_ico,
      logoIcon: siteConfig.logo_icon,
      keywords: siteConfig.keywords,
    };

    return NextResponse.json(formatted);
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
    
    // Transform from frontend format to database format
    const siteConfigRow = {
      name: data.name,
      author_name: data.authorName,
      username: data.username,
      description: data.description,
      url: data.url,
      twitter_link: data.links?.twitter,
      github_link: data.links?.github,
      linkedin_link: data.links?.linkedin,
      og_image: data.ogImage,
      icon_ico: data.iconIco,
      logo_icon: data.logoIcon,
      keywords: data.keywords || [],
    };

    await updateSiteConfig(siteConfigRow);

    return NextResponse.json({ success: true, message: "Site config updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

