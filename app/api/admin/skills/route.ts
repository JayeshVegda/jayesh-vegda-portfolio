import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getSkills } from "@/lib/supabase/queries";
import { createSkill, updateSkill, deleteSkill } from "@/lib/supabase/admin";
import { skillToRow } from "@/lib/supabase/transformers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skills = await getSkills();
    return NextResponse.json(skills);
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
    const skillRow = skillToRow(data);
    
    await createSkill(skillRow);

    return NextResponse.json({ success: true, message: "Skill added" });
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
    let skillId = id;
    if (!skillId && name) {
      const { data: skills } = await supabaseAdmin
        .from('skills')
        .select('id')
        .eq('name', name)
        .single();
      if (skills) skillId = skills.id;
    }

    if (!skillId) {
      return NextResponse.json({ error: "Skill ID or name required" }, { status: 400 });
    }

    const skillRow = skillToRow({ ...data, name });
    await updateSkill(skillId, skillRow);

    return NextResponse.json({ success: true, message: "Skill updated" });
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
      return NextResponse.json({ error: "Skill ID or name required" }, { status: 400 });
    }

    let skillId = id;
    if (!skillId && name) {
      const { data: skill } = await supabaseAdmin
        .from('skills')
        .select('id')
        .eq('name', name)
        .single();
      if (skill) skillId = skill.id;
    }

    if (!skillId) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await deleteSkill(skillId);

    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

