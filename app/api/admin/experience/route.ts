import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { experiences } from "@/config/experience";
import { writeExperienceConfig } from "@/lib/config-writer";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const currentExperiences = experiences.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString().split("T")[0],
      endDate: e.endDate === "Present" ? "Present" : e.endDate.toISOString().split("T")[0],
    }));

    const newExperiences = [...currentExperiences, data];
    await writeExperienceConfig(newExperiences);

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
    const currentExperiences = experiences.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString().split("T")[0],
      endDate: e.endDate === "Present" ? "Present" : e.endDate.toISOString().split("T")[0],
    }));

    const updatedExperiences = currentExperiences.map((e) => (e.id === id ? { ...e, ...data, id } : e));
    await writeExperienceConfig(updatedExperiences);

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

    const currentExperiences = experiences.map((e) => ({
      ...e,
      startDate: e.startDate.toISOString().split("T")[0],
      endDate: e.endDate === "Present" ? "Present" : e.endDate.toISOString().split("T")[0],
    }));

    const filteredExperiences = currentExperiences.filter((e) => e.id !== id);
    await writeExperienceConfig(filteredExperiences);

    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

