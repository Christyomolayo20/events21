import { NextResponse } from "next/server";
import { AcademyExperienceLevel } from "@/lib/types";
import { sendEmail, OFFICIAL_EMAIL, OWNER_EMAIL } from "@/lib/email";
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

    // 1. Send confirmation to student
    const studentSubject = `Royal Planners Academy Application Received: ${registration.fullName} (#${registration.id})`;
    const studentHtml = `
      <div style="font-family: sans-serif; background-color: #FAF8F5; padding: 24px; color: #2A1736;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #E8DFD5; padding: 28px;">
          <h1 style="font-family: Georgia, serif; color: #4A1E4A; margin-top: 0; font-size: 22px;">Royal Planners Academy</h1>
          <p style="font-size: 11px; text-transform: uppercase; tracking: 0.15em; color: #C5A265; font-weight: bold;">Application Received</p>
          <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${registration.fullName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #44354C;">
            Thank you for applying to the <strong>Royal Planners Academy</strong>. Your registration details have been received and our admissions team is reviewing your cohort application.
          </p>
          <div style="background: #F8F5F1; border-radius: 10px; padding: 16px 20px; margin: 20px 0; font-size: 13px;">
            <p style="margin: 4px 0;"><strong>Registration Ref:</strong> #${registration.id}</p>
            <p style="margin: 4px 0;"><strong>Experience Level:</strong> ${registration.experienceLevel}</p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${registration.phone}</p>
            ${registration.businessName ? `<p style="margin: 4px 0;"><strong>Brand:</strong> ${registration.businessName}</p>` : ""}
          </div>
          <p style="font-size: 13px; line-height: 1.6; color: #44354C;">
            Our coordinator will connect with you via WhatsApp and email regarding the upcoming schedule, materials, and onboarding.
          </p>
          <p style="font-size: 12px; color: #786B80; margin-top: 24px;">EVENTS21 — Professional Event Training & Mentorship</p>
        </div>
      </div>
    `;

    // 2. Send alert to admin
    const adminSubject = `🔔 New Academy Application: ${registration.fullName} (${registration.experienceLevel})`;
    const adminHtml = `
      <div style="font-family: sans-serif; padding: 20px; background: #FAF8F5;">
        <h2>New Royal Planners Academy Student Registration</h2>
        <p><strong>Ref:</strong> #${registration.id}</p>
        <p><strong>Student Name:</strong> ${registration.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${registration.email}">${registration.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${registration.phone}">${registration.phone}</a></p>
        <p><strong>Experience Level:</strong> ${registration.experienceLevel}</p>
        <p><strong>Brand / Business:</strong> ${registration.businessName || "None"}</p>
        <p><strong>Aspiration:</strong> ${registration.reasonForJoining || "None"}</p>
        <p><a href="https://events21.vercel.app/admin">Open Admin Control Room</a></p>
      </div>
    `;

    const studentPromise = sendEmail({
      to: registration.email,
      from: `Royal Planners Academy <${OFFICIAL_EMAIL}>`,
      replyTo: OFFICIAL_EMAIL,
      subject: studentSubject,
      html: studentHtml,
    });

    const adminPromise = sendEmail({
      to: [OFFICIAL_EMAIL, OWNER_EMAIL],
      from: `Academy Admissions <${OFFICIAL_EMAIL}>`,
      replyTo: registration.email,
      subject: adminSubject,
      html: adminHtml,
    });

    const [studentRes, adminRes] = await Promise.all([studentPromise, adminPromise]);

    // 3. Sync to Supabase in background
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("academy_registrations").upsert({
          id: registration.id,
          full_name: registration.fullName,
          email: registration.email,
          phone: registration.phone,
          experience_level: registration.experienceLevel,
          business_name: registration.businessName || null,
          reason_for_joining: registration.reasonForJoining || null,
          status: registration.status,
          created_at: registration.createdAt,
        });
      } catch (err) {
        console.warn("Supabase academy registration sync skipped:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your registration for Royal Planners Academy has been received successfully.",
        registration,
        studentEmailDelivered: studentRes.success,
        adminEmailDelivered: adminRes.success,
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
