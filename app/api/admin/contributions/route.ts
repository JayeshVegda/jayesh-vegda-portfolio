import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { getContributions } from "@/lib/supabase/queries";
import { createContribution, updateContribution, deleteContribution } from "@/lib/supabase/admin";
import { contributionToRow } from "@/lib/supabase/transformers";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contributions = await getContributions();
    return NextResponse.json(contributions);
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
    const contributionRow = contributionToRow(data);
    
    await createContribution(contributionRow);

    return NextResponse.json({ success: true, message: "Contribution added" });
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

    const { id, repo, ...data } = await req.json();
    
    // If id is provided, use it; otherwise find by repo
    let contributionId = id;
    if (!contributionId && repo) {
      const { data: contribution } = await supabaseAdmin
        .from('contributions')
        .select('id')
        .eq('repo', repo)
        .single();
      if (contribution) contributionId = contribution.id;
    }

    if (!contributionId) {
      return NextResponse.json({ error: "Contribution ID or repo required" }, { status: 400 });
    }

    const contributionRow = contributionToRow({ ...data, repo });
    await updateContribution(contributionId, contributionRow);

    return NextResponse.json({ success: true, message: "Contribution updated" });
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
    const repo = searchParams.get("repo");

    if (!id && !repo) {
      return NextResponse.json({ error: "Contribution ID or repo required" }, { status: 400 });
    }

    let contributionId = id;
    if (!contributionId && repo) {
      const { data: contribution } = await supabaseAdmin
        .from('contributions')
        .select('id')
        .eq('repo', repo)
        .single();
      if (contribution) contributionId = contribution.id;
    }

    if (!contributionId) {
      return NextResponse.json({ error: "Contribution not found" }, { status: 404 });
    }

    await deleteContribution(contributionId);

    return NextResponse.json({ success: true, message: "Contribution deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

