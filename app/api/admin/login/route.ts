import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === "Event$21") {
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication error" }, { status: 500 });
  }
}
