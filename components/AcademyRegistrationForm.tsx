"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Crown, ArrowRight } from "lucide-react";
import { saveAcademyRegistration } from "@/lib/store";
import { AcademyExperienceLevel } from "@/lib/types";

const EXPERIENCE_OPTIONS: AcademyExperienceLevel[] = [
  "Aspiring Planner — Just Starting Out",
  "Emerging Planner — Already Have Some Experience",
  "Business Owner — Looking to Grow My Business",
  "Related Professional — Exploring Event Management",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export default function AcademyRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceLevel: "" as AcademyExperienceLevel | "",
    businessName: "",
    reasonForJoining: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.trim()) {
      setError("Please provide your full name.");
      return;
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }

    const cleanPhone = formData.phone.trim().replace(/\s+/g, "");
    if (!formData.phone.trim() || !PHONE_REGEX.test(cleanPhone) || cleanPhone.replace(/\D/g, "").length < 8) {
      setError("Please provide a valid phone number (e.g., +234 806 054 9596 or 08060549596).");
      return;
    }

    if (!formData.experienceLevel) {
      setError("Please select your current experience level.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to server API for server-side validation and Supabase sync
      const response = await fetch("/api/academy/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          experienceLevel: formData.experienceLevel,
          businessName: formData.businessName.trim() || undefined,
          reasonForJoining: formData.reasonForJoining.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit registration. Please try again.");
      }

      // 2. Persist locally to store & IndexedDB for admin visibility
      const saved = saveAcademyRegistration({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        experienceLevel: formData.experienceLevel as AcademyExperienceLevel,
        businessName: formData.businessName.trim() || undefined,
        reasonForJoining: formData.reasonForJoining.trim() || undefined,
      });

      setRegisteredId(result.registration?.id || saved.id);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error("Academy registration error:", err);
      setIsSubmitting(false);
      setError(
        err?.message ||
          "Unable to save registration at this time. Please check your internet connection or register directly with our admissions coordinator via WhatsApp."
      );
    }
  };

  const getWhatsAppRegistrationLink = () => {
    const text = `Hello Royal Planners Academy! I would like to register my interest.%0A%0A*Name:* ${encodeURIComponent(
      formData.fullName || "Prospective Student"
    )}%0A*Experience Level:* ${encodeURIComponent(
      formData.experienceLevel || "Aspiring Planner"
    )}%0A*Email:* ${encodeURIComponent(
      formData.email || "Pending"
    )}%0A*Phone:* ${encodeURIComponent(
      formData.phone || "Pending"
    )}%0A%0APlease provide information about the next cohort and registration details.`;

    return `https://wa.me/2348060549596?text=${text}`;
  };

  if (registeredId) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-elevated text-center animate-fade-in relative overflow-hidden max-w-2xl mx-auto">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-soft-lavender/50 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-brand-soft-lavender text-brand-purple rounded-full flex items-center justify-center mx-auto mb-5 border border-brand-purple/20 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-gold font-semibold">
          Registration of Interest Received
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mt-2 mb-3">
          Thank You, {formData.fullName.split(" ")[0]}!
        </h3>

        <p className="text-sm text-brand-plum/75 font-sans leading-relaxed mb-4">
          Your interest in Royal Planners Academy has been recorded successfully.
        </p>

        <div className="p-4 rounded-xl bg-brand-soft-lavender/40 border border-brand-purple/15 text-xs text-brand-plum/80 font-sans mb-8">
          <span className="text-brand-purple font-sans font-bold tracking-wider block text-sm mb-1">
            Registration Reference: {registeredId}
          </span>
          Our team will contact you at <strong className="text-brand-plum">{formData.email}</strong> and <strong className="text-brand-plum">{formData.phone}</strong> with full syllabus details, schedule, and next steps for the upcoming cohort.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppRegistrationLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp for Immediate Enquiries</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setRegisteredId(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                experienceLevel: "",
                businessName: "",
                reasonForJoining: "",
              });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-brand-warm-border text-brand-plum hover:bg-brand-warm-gray text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl p-5 sm:p-10 lg:p-12 border border-brand-warm-border shadow-subtle max-w-2xl mx-auto text-left relative"
    >
      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-start gap-2.5 animate-fade-in"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-semibold block mb-0.5">Registration Incomplete:</span>
            {error}
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Full Name (Required) */}
        <div>
          <label
            htmlFor="rpa-full-name"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="rpa-full-name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Oluwaseun Adeleke"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans placeholder:text-brand-plum/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* Email Address & Phone Number (Required Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="rpa-email"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="rpa-email"
              type="email"
              required
              autoComplete="email"
              placeholder="e.g. seun@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans placeholder:text-brand-plum/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all shadow-2xs"
            />
          </div>

          <div>
            <label
              htmlFor="rpa-phone"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="rpa-phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="e.g. 08060549596 or +234..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans placeholder:text-brand-plum/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Current Experience Level (Required Dropdown) */}
        <div>
          <label
            htmlFor="rpa-experience-level"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
          >
            Current Experience Level <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="rpa-experience-level"
              required
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experienceLevel: e.target.value as AcademyExperienceLevel,
                })
              }
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all appearance-none cursor-pointer shadow-2xs"
            >
              <option value="" disabled>
                Select your experience level...
              </option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-plum/60">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Business or Organisation Name (Optional) */}
        <div>
          <label
            htmlFor="rpa-business-name"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
          >
            Business or Organisation Name <span className="text-brand-plum/40 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="rpa-business-name"
            type="text"
            placeholder="e.g. Royal Events Studio (if registered or trading)"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans placeholder:text-brand-plum/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* Why do you want to join the academy? (Optional) */}
        <div>
          <label
            htmlFor="rpa-reason"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum mb-2"
          >
            Why do you want to join the academy? <span className="text-brand-plum/40 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="rpa-reason"
            rows={4}
            placeholder="Share your goals, what you hope to achieve, or specific questions you have about the training programme..."
            value={formData.reasonForJoining}
            onChange={(e) => setFormData({ ...formData, reasonForJoining: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-white text-brand-plum text-sm font-sans placeholder:text-brand-plum/40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all shadow-2xs resize-y"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-register-academy"
            disabled={isSubmitting}
            className={`w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full text-xs font-semibold uppercase tracking-widest text-white transition-all shadow-elevated ${
              isSubmitting
                ? "bg-brand-purple/70 cursor-not-allowed"
                : "bg-brand-purple hover:bg-brand-purple-hover hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <span>Register for Royal Planners Academy</span>
                <ArrowRight className="w-4 h-4 text-brand-gold-light" />
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-brand-plum/60 text-center font-sans mt-3">
          Your personal details are kept strictly confidential and used solely for admissions communication.
        </p>
      </div>
    </form>
  );
}
