import { NextResponse } from "next/server";
import { AcademyExperienceLevel } from "@/lib/types";

const VALID_EXPERIENCE_LEVELS: AcademyExperienceLevel[] = [
  "Aspiring Planner — Just Starting Out",
  "Emerging Planner — Already Have Some Experience",
  "Business Owner — Looking to Grow My Business",
  "Related Professional — Exploring Event Management",
];

// Email validation regex (RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number regex supporting Nigerian (+234, 080..., 090..., 070..., 081...) and international formats
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      experienceLevel,
      businessName,
      reasonForJoining,
    } = body;

    // Required field validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email Address is required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone Number is required." },
        { status: 400 }
      );
    }

    const cleanedPhone = phone.trim().replace(/\s+/g, "");
    if (!PHONE_REGEX.test(cleanedPhone) || cleanedPhone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { error: "Please provide a valid phone number (e.g. +234 806 054 9596 or 08060549596)." },
        { status: 400 }
      );
    }

    if (!experienceLevel || !VALID_EXPERIENCE_LEVELS.includes(experienceLevel as AcademyExperienceLevel)) {
      return NextResponse.json(
        { error: "Please select your current experience level from the provided options." },
        { status: 400 }
      );
    }

    // Structure sanitized registration object
    const registration = {
      id: `rpa-${Date.now().toString(36).toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      experienceLevel: experienceLevel as AcademyExperienceLevel,
      businessName: (businessName && typeof businessName === "string" ? businessName.trim() : "") || undefined,
      reasonForJoining: (reasonForJoining && typeof reasonForJoining === "string" ? reasonForJoining.trim() : "") || undefined,
      status: "New Enquiry" as const,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Your registration for Royal Planners Academy has been received successfully.",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Academy registration submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your registration. Please try again or contact us directly via WhatsApp." },
      { status: 500 }
    );
  }
}
