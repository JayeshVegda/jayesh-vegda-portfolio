import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getExperiences } from "@/lib/supabase/queries";
import { createExperience, updateExperience, deleteExperience } from "@/lib/supabase/admin";
import { experienceToRow } from "@/lib/supabase/transformers";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experiences = await getExperiences();
    
    const experienceData = experiences.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString().split("T")[0],
      endDate: e.endDate === "Present" ? "Present" : e.endDate.toISOString().split("T")[0],
    }));

    return NextResponse.json(experienceData);
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
    const experienceRow = experienceToRow(data);
    
    await createExperience(experienceRow);

    return NextResponse.json({ success: true, message: "Experience added" });
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

    const { id, ...data } = await req.json();
    const experienceRow = experienceToRow(data);
    
    await updateExperience(id, experienceRow);

    return NextResponse.json({ success: true, message: "Experience updated" });
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

    if (!id) {
      return NextResponse.json({ error: "Experience ID required" }, { status: 400 });
    }

    await deleteExperience(id);

    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

