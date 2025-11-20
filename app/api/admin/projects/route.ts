import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getProjects } from "@/lib/supabase/queries";
import { createProject, updateProject, deleteProject } from "@/lib/supabase/admin";
import { projectToRow, rowToProject } from "@/lib/supabase/transformers";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await getProjects();
    
    // Convert to admin format (with dates as strings)
    const formattedProjects = projects.map((p) => ({
      ...p,
      startDate: p.startDate.toISOString().split("T")[0],
      endDate: p.endDate.toISOString().split("T")[0],
    }));

    return NextResponse.json(formattedProjects);
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
    const projectRow = projectToRow(data);
    
    await createProject(projectRow);

    return NextResponse.json({ success: true, message: "Project added" });
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
    const projectRow = projectToRow(data);
    
    await updateProject(id, projectRow);

    return NextResponse.json({ success: true, message: "Project updated" });
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
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    await deleteProject(id);

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

