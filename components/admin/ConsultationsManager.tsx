"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ConsultationBooking } from "@/lib/types";
import {
  getConsultations,
  updateConsultationStatus,
  deleteConsultation,
} from "@/lib/store";

interface ConsultationsManagerProps {
  onNotify?: (message: string) => void;
}

export default function ConsultationsManager({ onNotify }: ConsultationsManagerProps) {
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const refreshData = () => {
    setConsultations(getConsultations());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener("events21_consultations_updated", handleUpdate);
    return () => {
      window.removeEventListener("events21_consultations_updated", handleUpdate);
    };
  }, []);

  const handleStatus = (id: string, newStatus: ConsultationBooking["status"]) => {
    updateConsultationStatus(id, newStatus);
    refreshData();
    onNotify?.(`Booking status updated to "${newStatus}".`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove consultation reservation for "${name}"?`)) {
      deleteConsultation(id);
      refreshData();
      onNotify?.(`Consultation for "${name}" deleted.`);
    }
  };

  const filtered = consultations.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      item.fullName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.phone.includes(term) ||
      item.eventType.toLowerCase().includes(term) ||
      item.date.includes(term);
    return matchesStatus && matchesSearch;
  });

  const confirmedCount = consultations.filter((c) => c.status === "Confirmed").length;
  const completedCount = consultations.filter((c) => c.status === "Completed").length;
  const cancelledCount = consultations.filter((c) => c.status === "Cancelled").length;

  return (
    <div className="space-y-6">
      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-brand-plum/50 font-semibold block">
            Total Sessions
          </span>
          <span className="font-serif text-3xl font-bold text-brand-plum">
            {consultations.length}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
            Confirmed Slots
          </span>
          <span className="font-serif text-3xl font-bold text-emerald-700">
            {confirmedCount}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold block">
            Completed
          </span>
          <span className="font-serif text-3xl font-bold text-blue-600">
            {completedCount}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-brand-plum/40 font-semibold block">
            Cancelled
          </span>
          <span className="font-serif text-3xl font-bold text-brand-plum/40">
            {cancelledCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-warm-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-plum/40" />
          <input
            type="text"
            placeholder="Search by client, date, event type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-warm-border bg-brand-warm-white text-xs text-brand-plum placeholder:text-brand-plum/40 focus:outline-brand-purple"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["All", "Confirmed", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-brand-plum text-white font-semibold"
                  : "bg-brand-warm-gray text-brand-plum/70 hover:bg-brand-warm-border"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Consultations List */}
      <div className="bg-white rounded-2xl border border-brand-warm-border shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-10 h-10 text-brand-plum/30 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-brand-plum mb-1">
              No Consultation Appointments Found
            </h4>
            <p className="text-xs text-brand-plum/60 font-sans max-w-sm mx-auto">
              {consultations.length === 0
                ? "No client consultations have been booked yet. When visitors book through the Contact page, slots will appear here."
                : "No bookings match your current search and status filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="bg-brand-warm-white border-b border-brand-warm-border text-brand-plum/70 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Client & Event</th>
                  <th className="py-3.5 px-4">Date & Time Slot</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-warm-border">
                {filtered.map((booking) => {
                  const cleanPhone = booking.phone.replace(/[^0-9]/g, "");
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    booking.fullName
                  )}!%20This%20is%20Events%2021%20following%20up%20on%20your%20consultation%20booked%20for%20${encodeURIComponent(
                    booking.date
                  )}%20at%20${encodeURIComponent(booking.timeSlot)}.`;

                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-brand-warm-white/60 transition-colors"
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="font-semibold text-brand-plum text-sm">
                          {booking.fullName}
                        </div>
                        <div className="text-[11px] text-brand-purple font-medium mt-0.5">
                          {booking.eventType}
                        </div>
                        <div className="text-[10px] text-brand-plum/40 font-mono mt-1">
                          Ref: {booking.id}
                        </div>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-1.5 font-semibold text-brand-plum">
                          <Calendar className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-brand-plum/70 text-[11px] mt-1">
                          <Clock className="w-3 h-3 text-brand-plum/40 shrink-0" />
                          <span>{booking.timeSlot}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <div className="text-brand-plum/90">{booking.phone}</div>
                        <div className="text-brand-plum/60 text-[11px] truncate max-w-[160px]">
                          {booking.email}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-[10px] transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${booking.email}?subject=Events%2021%20Consultation%20Confirmation`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 font-medium text-[10px] transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Email</span>
                          </a>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-top">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatus(booking.id, e.target.value as ConsultationBooking["status"])
                          }
                          className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold focus:outline-hidden ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                              : booking.status === "Completed"
                              ? "bg-blue-50 border-blue-300 text-blue-800"
                              : "bg-gray-50 border-gray-300 text-gray-600"
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 align-top max-w-[200px]">
                        <p className="text-[11px] text-brand-plum/70 line-clamp-3">
                          {booking.message || "No additional message provided."}
                        </p>
                      </td>

                      <td className="py-4 px-4 align-top text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(booking.id, booking.fullName)}
                          className="p-1.5 rounded-lg text-brand-plum/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
