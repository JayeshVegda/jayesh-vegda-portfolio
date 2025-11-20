import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-utils";
import { contributionsUnsorted } from "@/config/contributions";
import { writeContributionsConfig } from "@/lib/config-writer";

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get("x-admin-password") || "";
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(contributionsUnsorted);
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
    const newContributions = [...contributionsUnsorted, data];
    await writeContributionsConfig(newContributions);

    return NextResponse.json({ success: true, message: "Contribution added" });
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

    const { repo, ...data } = await req.json();
    const updatedContributions = contributionsUnsorted.map((c) =>
      c.repo === repo ? { ...c, ...data, repo } : c
    );
    await writeContributionsConfig(updatedContributions);

    return NextResponse.json({ success: true, message: "Contribution updated" });
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
    const repo = searchParams.get("repo");

    if (!repo) {
      return NextResponse.json({ error: "Contribution repo required" }, { status: 400 });
    }

    const filteredContributions = contributionsUnsorted.filter((c) => c.repo !== repo);
    await writeContributionsConfig(filteredContributions);

    return NextResponse.json({ success: true, message: "Contribution deleted" });
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

