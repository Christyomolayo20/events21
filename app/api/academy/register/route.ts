import { NextResponse } from "next/server";
import { AcademyExperienceLevel } from "@/lib/types";
import { getAdminEmail, getEmailFrom, sendEmail } from "@/lib/email";
import {
  buildAcademyAdminEmail,
  buildAcademyApplicantEmail,
} from "@/lib/emailTemplates";
import { checkRateLimit, getClientIp, isDuplicateSubmission } from "@/lib/rateLimit";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const VALID_EXPERIENCE_LEVELS: AcademyExperienceLevel[] = [
  "Aspiring Planner — Just Starting Out",
  "Emerging Planner — Already Have Some Experience",
  "Business Owner — Looking to Grow My Business",
  "Related Professional — Exploring Event Management",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const limit = checkRateLimit("academy-register", clientIp, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions received. Please wait ${limit.retryAfterSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      experienceLevel,
      businessName,
      reasonForJoining,
    } = body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email Address is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone Number is required." }, { status: 400 });
    }

    const cleanedPhone = phone.trim().replace(/\s+/g, "");
    if (!PHONE_REGEX.test(cleanedPhone) || cleanedPhone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid phone number (e.g. +234 806 054 9596 or 08060549596).",
        },
        { status: 400 }
      );
    }

    if (
      !experienceLevel ||
      !VALID_EXPERIENCE_LEVELS.includes(experienceLevel as AcademyExperienceLevel)
    ) {
      return NextResponse.json(
        {
          error: "Please select your current experience level from the provided options.",
        },
        { status: 400 }
      );
    }

    if (isDuplicateSubmission("academy-register", [cleanEmail, experienceLevel], 60_000)) {
      return NextResponse.json(
        {
          error:
            "Your academy application was just received. Please wait a minute before resubmitting.",
        },
        { status: 409 }
      );
    }

    const registration = {
      id: `rpa-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName, 120),
      email: cleanEmail,
      phone: sanitize(phone, 30),
      experienceLevel: experienceLevel as AcademyExperienceLevel,
      businessName: sanitize(businessName, 120) || undefined,
      reasonForJoining: sanitize(reasonForJoining, 1000) || undefined,
      status: "New Enquiry" as const,
      createdAt: new Date().toISOString(),
    };

    // 1. Persist application to Supabase FIRST so email failure never deletes/drops record
    let savedToDatabase = false;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: dbErr } = await supabase.from("academy_registrations").upsert({
          id: registration.id,
          full_name: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          experience_level: registration.experienceLevel,
          business_name: registration.businessName || "",
          reason_for_joining: registration.reasonForJoining || "",
          status: registration.status,
          created_at: registration.createdAt,
        });
        if (!dbErr) {
          savedToDatabase = true;
        } else {
          console.warn("Supabase academy registration notice:", dbErr.message);
        }
      } catch (err) {
        console.warn("Supabase academy registration sync skipped:", err);
      }
    }

    // 2. Dispatch confirmation to applicant and complete notification to admin
    const adminEmail = getAdminEmail();
    const sender = getEmailFrom();
    const studentTemplate = buildAcademyApplicantEmail(registration, adminEmail);
    const adminTemplate = buildAcademyAdminEmail(registration, adminEmail);

    const [studentOutcome, adminOutcome] = await Promise.allSettled([
      sendEmail({
        to: registration.email,
        from: sender,
        replyTo: adminEmail,
        subject: studentTemplate.subject,
        html: studentTemplate.html,
        text: studentTemplate.text,
      }),
      sendEmail({
        to: adminEmail,
        from: sender,
        replyTo: registration.email,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
      }),
    ]);

    const studentRes =
      studentOutcome.status === "fulfilled"
        ? studentOutcome.value
        : { success: false, messageId: undefined };
    const adminRes =
      adminOutcome.status === "fulfilled"
        ? adminOutcome.value
        : { success: false, messageId: undefined };

    return NextResponse.json(
      {
        success: true,
        message: studentRes.success
          ? "Your registration for Events21 Planners Academy has been received and confirmed via email."
          : "Your registration for Events21 Planners Academy has been received.",
        registration,
        savedToDatabase,
        studentEmailDelivered: studentRes.success,
        adminEmailDelivered: adminRes.success,
        studentMessageId: studentRes.messageId || null,
        adminMessageId: adminRes.messageId || null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Academy registration submission error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your registration. Please try again or contact us directly via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
