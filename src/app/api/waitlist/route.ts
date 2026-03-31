import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "waitlist.json");

type WaitlistEntry = {
  email: string;
  apps: string[];
  timestamp: string;
};

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { email, apps } = await req.json();

    if (!email || !apps || !Array.isArray(apps) || apps.length === 0) {
      return NextResponse.json(
        { error: "Email and at least one app are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const entries = await readWaitlist();
    entries.push({
      email,
      apps,
      timestamp: new Date().toISOString(),
    });
    await writeWaitlist(entries);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
