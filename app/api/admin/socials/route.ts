import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getSocials } from "@/lib/supabase/queries";
import { createSocial, updateSocial, deleteSocial } from "@/lib/supabase/admin";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const socials = await getSocials();
    
    // Transform to match frontend format
    const formatted = socials.map((s) => ({
      id: s.id,
      name: s.name,
      username: s.username,
      icon: s.icon_key ? `Icons.${s.icon_key}` : undefined,
      link: s.link,
    }));

    return NextResponse.json(formatted);
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
    
    // Extract icon key from "Icons.xxx" format
    const iconKey = data.icon?.replace('Icons.', '');
    
    const socialRow = {
      name: data.name,
      username: data.username,
      icon_key: iconKey,
      link: data.link,
      display_order: data.display_order || 0,
    };
    
    await createSocial(socialRow);

    return NextResponse.json({ success: true, message: "Social link added" });
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

    const { id, name, ...data } = await req.json();
    
    // If id is provided, use it; otherwise find by name
    let socialId = id;
    if (!socialId && name) {
      const { data: social } = await supabaseAdmin
        .from('socials')
        .select('id')
        .eq('name', name)
        .single();
      if (social) socialId = social.id;
    }

    if (!socialId) {
      return NextResponse.json({ error: "Social ID or name required" }, { status: 400 });
    }

    // Extract icon key from "Icons.xxx" format
    const iconKey = data.icon?.replace('Icons.', '');
    
    const socialRow: any = {
      name: data.name || name,
      username: data.username,
      link: data.link,
    };
    
    if (iconKey !== undefined) {
      socialRow.icon_key = iconKey;
    }
    
    await updateSocial(socialId, socialRow);

    return NextResponse.json({ success: true, message: "Social link updated" });
  } catch (error: any) {
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
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json({ error: "Social ID or name required" }, { status: 400 });
    }

    let socialId = id;
    if (!socialId && name) {
      const { data: social } = await supabaseAdmin
        .from('socials')
        .select('id')
        .eq('name', name)
        .single();
      if (social) socialId = social.id;
    }

    if (!socialId) {
      return NextResponse.json({ error: "Social not found" }, { status: 404 });
    }

    await deleteSocial(socialId);

    return NextResponse.json({ success: true, message: "Social link deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

