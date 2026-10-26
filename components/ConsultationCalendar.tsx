"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  bookConsultation,
  getAvailableTimeSlots,
  STANDARD_CONSULTATION_SLOTS,
} from "@/lib/store";
import { ConsultationBooking, EventType } from "@/lib/types";

interface ConsultationCalendarProps {
  initialService?: string;
}

export default function ConsultationCalendar({
  initialService = "",
}: ConsultationCalendarProps) {
  // Today's date YYYY-MM-DD
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split("T")[0], [today]);

  // Selected date defaults to tomorrow
  const tomorrowStr = useMemo(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split("T")[0];
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM");
  const [availableSlots, setAvailableSlots] = useState<{ slot: string; available: boolean }[]>([]);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: (initialService ? "Wedding" : "") as EventType | "",
    message: initialService ? `Interested in: ${initialService}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  const eventTypes: EventType[] = [
    "Wedding",
    "Traditional Engagement",
    "Romantic Proposal",
    "Retirement Party",
    "Milestone Birthday",
    "Corporate Event & Gala",
    "Bridal / Baby Shower",
    "Private Soirée",
    "Other",
  ];

  // Refresh slots whenever selectedDate changes or consultations update
  useEffect(() => {
    const updateSlots = () => {
      const slots = getAvailableTimeSlots(selectedDate);
      setAvailableSlots(slots);

      // If currently selected slot is not available, pick first available
      const currentAvailable = slots.find((s) => s.slot === selectedSlot && s.available);
      if (!currentAvailable) {
        const firstAvail = slots.find((s) => s.available);
        if (firstAvail) setSelectedSlot(firstAvail.slot);
      }
    };

    updateSlots();
    window.addEventListener("events21_consultations_updated", updateSlots);
    return () => window.removeEventListener("events21_consultations_updated", updateSlots);
  }, [selectedDate, selectedSlot]);

  // Month view state (defaults to current month or month of selected date)
  const [viewDate, setViewDate] = useState<Date>(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return new Date(tm.getFullYear(), tm.getMonth(), 1);
  });

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("en-US", { month: "long" });

  const prevMonthDisabled = useMemo(() => {
    const prev = new Date(currentYear, currentMonth - 1, 1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return prev < thisMonth;
  }, [currentYear, currentMonth, today]);

  const handlePrevMonth = () => {
    if (prevMonthDisabled) return;
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Calendar cells calculation for conventional 7-column grid
  const calendarCells = useMemo(() => {
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun ... 6 = Sat
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells: {
      type: "empty" | "day";
      dayNum?: number;
      dateStr?: string;
      isPast?: boolean;
      isToday?: boolean;
      isSunday?: boolean;
      isSelectable?: boolean;
    }[] = [];

    // Empty leading padding cells
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ type: "empty" });
    }

    // Days in current month
    for (let d = 1; d <= totalDays; d++) {
      const mStr = String(currentMonth + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      const dateStr = `${currentYear}-${mStr}-${dStr}`;
      const dayOfWeek = new Date(currentYear, currentMonth, d).getDay();
      const isPast = dateStr < todayStr;
      const isToday = dateStr === todayStr;
      const isSunday = dayOfWeek === 0;
      const isSelectable = !isPast && !isSunday;

      cells.push({
        type: "day",
        dayNum: d,
        dateStr,
        isPast,
        isToday,
        isSunday,
        isSelectable,
      });
    }

    return cells;
  }, [currentYear, currentMonth, todayStr]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    if (!formData.eventType) {
      setError("Please select an event category.");
      return;
    }

    if (!selectedDate || selectedDate < todayStr) {
      setError("Please select a valid upcoming consultation date.");
      return;
    }

    if (!selectedSlot) {
      setError("Please choose an available consultation time slot.");
      return;
    }

    setIsSubmitting(true);

    const result = bookConsultation({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      eventType: formData.eventType,
      date: selectedDate,
      timeSlot: selectedSlot,
      message: formData.message.trim(),
    });

    setIsSubmitting(false);

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
    } else {
      setError(result.error || "Could not reserve this consultation slot. Please try another slot.");
    }
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return "";
    const [year, month, day] = confirmedBooking.date.split("-");
    // Parse time slot (e.g. "10:30 AM")
    const [time, modifier] = confirmedBooking.timeSlot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const start = new Date(Number(year), Number(month) - 1, Number(day), hours, minutes);
    const end = new Date(start.getTime() + 45 * 60 * 1000); // 45 min consultation

    const formatGTime = (date: Date) =>
      date.toISOString().replace(/-|:|\.\d+/g, "");

    const title = encodeURIComponent(`Events 21 Consultation - ${confirmedBooking.fullName}`);
    const details = encodeURIComponent(
      `Consultation with Events 21 for ${confirmedBooking.eventType}.\nReference: ${confirmedBooking.id}\nPhone: ${confirmedBooking.phone}\nStudio: Ojodu Berger, Lagos (Serving Clients Nationwide & Available to Travel).`
    );
    const location = encodeURIComponent("Events 21 Studio / Virtual WhatsApp Call");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGTime(
      start
    )}/${formatGTime(end)}&details=${details}&location=${location}`;
  };

  const getWhatsAppConfirmationLink = () => {
    if (!confirmedBooking) return "";
    const text = `Hello Events 21! I have reserved a consultation appointment.%0A%0A*Reference:* ${confirmedBooking.id}%0A*Name:* ${encodeURIComponent(
      confirmedBooking.fullName
    )}%0A*Date:* ${confirmedBooking.date}%0A*Time:* ${confirmedBooking.timeSlot}%0A*Event Category:* ${encodeURIComponent(
      confirmedBooking.eventType
    )}`;
    return `https://wa.me/2348060549596?text=${text}`;
  };

  if (confirmedBooking) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-brand-purple/30 shadow-elevated text-center animate-fade-in relative overflow-hidden">
        <div className="w-16 h-16 bg-brand-soft-lavender text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-purple/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-gold font-semibold block mb-1">
          Consultation Slot Reserved
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum mb-2">
          Appointment Confirmed!
        </h3>

        <p className="text-sm text-brand-plum/75 font-sans max-w-md mx-auto mb-6 leading-relaxed">
          Your 1-on-1 consultation appointment is reserved.
        </p>

        {/* Appointment Summary Box */}
        <div className="max-w-md mx-auto bg-brand-warm-white rounded-2xl p-6 border border-brand-warm-border text-left mb-8 space-y-3 font-sans">
          <div className="flex items-center justify-between pb-3 border-b border-brand-warm-border/60">
            <span className="text-xs text-brand-plum/60 uppercase tracking-wider font-semibold">
              Booking Reference
            </span>
            <span className="font-mono font-bold text-brand-purple text-sm">
              {confirmedBooking.id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-plum/60">Host Name</span>
            <span className="text-sm font-semibold text-brand-plum">
              {confirmedBooking.fullName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-plum/60">Event Category</span>
            <span className="text-sm font-semibold text-brand-plum">
              {confirmedBooking.eventType}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-plum/60">Consultation Date</span>
            <span className="text-sm font-bold text-brand-purple flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              {new Date(confirmedBooking.date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-plum/60">Time Slot</span>
            <span className="text-sm font-bold text-brand-purple flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {confirmedBooking.timeSlot}
            </span>
          </div>
        </div>

        {/* Fast-Track Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-purple text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-purple-hover transition-all shadow-sm"
          >
            <span>Add to Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={getWhatsAppConfirmationLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify on WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setConfirmedBooking(null);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              eventType: "",
              message: "",
            });
          }}
          className="mt-6 text-xs text-brand-plum/60 hover:text-brand-purple transition-colors uppercase tracking-wider font-semibold"
        >
          Book Another Consultation
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-5 sm:p-10 lg:p-12 border border-brand-warm-border shadow-elevated relative overflow-hidden"
    >
      {/* Service Pre-selection notice */}
      {initialService && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-soft-lavender/70 border border-brand-purple/30 text-xs text-brand-purple font-sans flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0 text-brand-gold" />
            <span>
              Enquiring About Package: <strong className="font-bold text-brand-plum">{initialService}</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-brand-purple text-white shrink-0">
            Selected
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Select Consultation Date (Clean, conventional calendar view) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <label className="text-xs uppercase tracking-wider font-bold text-brand-plum flex items-center gap-2 font-sans">
            <CalendarIcon className="w-4 h-4 text-brand-purple" />
            <span>1. Choose Consultation Date</span>
            <span className="text-brand-pink">*</span>
          </label>
          <span className="text-[11px] text-brand-plum/60 font-sans">
            Mon – Sat (Sundays closed)
          </span>
        </div>

        {/* Conventional Monthly Calendar Component */}
        <div className="bg-brand-warm-white rounded-2xl border border-brand-warm-border/80 p-3.5 sm:p-5 max-w-xl">
          {/* Header with Month/Year and Prev/Next Navigation */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-warm-border/60">
            <div className="font-serif text-lg sm:text-xl font-bold text-brand-plum flex items-center gap-2">
              <span>{monthName}</span>
              <span className="text-brand-purple font-sans font-semibold text-sm sm:text-base">
                {currentYear}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={prevMonthDisabled}
                aria-label="Previous month"
                className="p-2 rounded-lg text-brand-plum hover:text-brand-purple hover:bg-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                className="p-2 rounded-lg text-brand-plum hover:text-brand-purple hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of the Week Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div
                key={day}
                className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-sans py-1 ${
                  idx === 0 ? "text-brand-plum/35" : "text-brand-plum/70"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 7-Column Dates Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarCells.map((cell, idx) => {
              if (cell.type === "empty") {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const isSelected = selectedDate === cell.dateStr;

              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  disabled={!cell.isSelectable}
                  onClick={() => cell.dateStr && setSelectedDate(cell.dateStr)}
                  className={`aspect-square w-full rounded-xl flex flex-col items-center justify-center text-xs sm:text-sm font-sans transition-all relative ${
                    !cell.isSelectable
                      ? "text-brand-plum/25 bg-transparent cursor-not-allowed"
                      : isSelected
                      ? "bg-brand-purple text-white font-bold shadow-xs scale-102 z-10 ring-2 ring-brand-purple/20"
                      : "text-brand-plum hover:bg-white hover:text-brand-purple hover:shadow-2xs border border-transparent hover:border-brand-purple/30 cursor-pointer"
                  } ${cell.isToday && !isSelected ? "border border-brand-purple/40 font-bold text-brand-purple" : ""}`}
                >
                  <span>{cell.dayNum}</span>
                  {cell.isToday && (
                    <span
                      className={`w-1 h-1 rounded-full mt-0.5 ${
                        isSelected ? "bg-brand-gold-light" : "bg-brand-purple"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-brand-plum/60 font-sans mt-4 pt-3 border-t border-brand-warm-border/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple inline-block" />
              <span>Selected Date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-brand-purple inline-block" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-plum/20 inline-block" />
              <span>Unavailable / Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Select Time Slot (Genuinely Available Only) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <label className="text-xs uppercase tracking-wider font-bold text-brand-plum flex items-center gap-2 font-sans">
            <Clock className="w-4 h-4 text-brand-purple" />
            <span>2. Select Available Time Slot</span>
            <span className="text-brand-pink">*</span>
          </label>
          <span className="text-[11px] text-brand-purple font-sans font-medium">
            {selectedDate
              ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : "45-minute 1-on-1 session"}
          </span>
        </div>

        {availableSlots.filter((s) => s.available).length === 0 ? (
          <div className="p-4 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200/80 font-sans">
            No consultation slots are available for this date. Please choose another date on the calendar above.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
            {availableSlots.map(({ slot, available }) => {
              const isSelected = selectedSlot === slot && available;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!available}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-3 px-2 rounded-xl text-xs font-sans font-semibold tracking-wide border transition-all text-center ${
                    !available
                      ? "opacity-35 bg-brand-warm-gray border-transparent line-through cursor-not-allowed text-brand-plum/50"
                      : isSelected
                      ? "bg-brand-purple text-white border-brand-purple shadow-xs"
                      : "bg-brand-warm-white text-brand-plum border-brand-warm-border hover:border-brand-purple/40 hover:bg-white"
                  }`}
                >
                  <span>{slot}</span>
                  {!available && (
                    <span className="block text-[9px] font-normal no-underline text-red-500 mt-0.5">
                      Reserved
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Step 3: Visitor Contact & Event Details */}
      <div className="border-t border-brand-warm-border/60 pt-6">
        <label className="text-xs uppercase tracking-wider font-bold text-brand-plum block mb-4 font-sans">
          3. Host Information &amp; Celebration Category
        </label>

        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
              Full Name <span className="text-brand-pink">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chief & Mrs. Adeleke"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
              Email Address <span className="text-brand-pink">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. adeleke@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Row 2: Phone & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
              Phone / WhatsApp <span className="text-brand-pink">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 08060549596"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
              Event Category <span className="text-brand-pink">*</span>
            </label>
            <select
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
              className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
            >
              <option value="" disabled>
                Select event category...
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Brief Message */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Brief Message or Event Vision (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about your celebration city or destination, estimated guest count, or special vision..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-warm-border/60">
          <div className="text-xs text-brand-plum/70 font-sans">
            Selected: <strong className="text-brand-purple">{selectedDate}</strong> at{" "}
            <strong className="text-brand-purple">{selectedSlot}</strong>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Confirm Consultation Reservation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
