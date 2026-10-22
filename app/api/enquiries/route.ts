import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, eventType, eventDate, eventLocation, guestCount, budgetRange, message } = body;

    if (!fullName || !email || !phone || !eventType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a production setup, this could also email the host or send to CRM
    const newEnquiry = {
      id: `enq-${Date.now().toString(36).toUpperCase()}`,
      fullName,
      email,
      phone,
      eventType,
      eventDate: eventDate || "TBD",
      eventLocation: eventLocation || "Lagos, Nigeria",
      guestCount: guestCount || "Not specified",
      budgetRange: budgetRange || "Not specified",
      message: message || "",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}
