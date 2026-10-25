"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  MessageSquare,
  Search,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Building,
  Briefcase,
  UserCheck,
  Clock,
} from "lucide-react";
import { AcademyRegistration, AcademyRegistrationStatus } from "@/lib/types";
import {
  getAcademyRegistrations,
  updateAcademyRegistrationStatus,
  deleteAcademyRegistration,
} from "@/lib/store";

interface AcademyManagerProps {
  onNotify?: (message: string) => void;
}

export default function AcademyManager({ onNotify }: AcademyManagerProps) {
  const [registrations, setRegistrations] = useState<AcademyRegistration[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState("");

  const refreshData = () => {
    setRegistrations(getAcademyRegistrations());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener("events21_academy_updated", handleUpdate);
    return () => {
      window.removeEventListener("events21_academy_updated", handleUpdate);
    };
  }, []);

  const handleStatus = (id: string, newStatus: AcademyRegistrationStatus) => {
    updateAcademyRegistrationStatus(id, newStatus);
    refreshData();
    onNotify?.(`Registration status updated to "${newStatus}".`);
  };

  const handleSaveNotes = (id: string) => {
    updateAcademyRegistrationStatus(id, undefined as any, notesInput);
    setEditingNotesId(null);
    refreshData();
    onNotify?.("Internal notes updated.");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the registration for "${name}"?`)) {
      deleteAcademyRegistration(id);
      refreshData();
      onNotify?.(`Registration for "${name}" deleted.`);
    }
  };

  const filtered = registrations.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      item.fullName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.phone.includes(term) ||
      item.experienceLevel.toLowerCase().includes(term) ||
      (item.businessName && item.businessName.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const newCount = registrations.filter((r) => r.status === "New Enquiry").length;
  const contactedCount = registrations.filter((r) => r.status === "Contacted").length;
  const enrolledCount = registrations.filter((r) => r.status === "Enrolled").length;

  const exportCSV = () => {
    if (registrations.length === 0) {
      alert("No registrations to export.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Experience Level",
      "Business Name",
      "Reason for Joining",
      "Status",
      "Submission Date",
    ];

    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.experienceLevel.replace(/"/g, '""')}"`,
      `"${(r.businessName || "").replace(/"/g, '""')}"`,
      `"${(r.reasonForJoining || "").replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Royal_Planners_Academy_Registrations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-brand-plum/50 font-semibold block">
            Total Registrations
          </span>
          <span className="font-serif text-3xl font-bold text-brand-plum">
            {registrations.length}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-amber-600 font-semibold block">
            New Enquiries
          </span>
          <span className="font-serif text-3xl font-bold text-amber-600">
            {newCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold block">
            Contacted
          </span>
          <span className="font-serif text-3xl font-bold text-blue-600">
            {contactedCount}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
          <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold block">
            Enrolled Students
          </span>
          <span className="font-serif text-3xl font-bold text-emerald-600">
            {enrolledCount}
          </span>
        </div>
      </div>

      {/* Control Bar: Search & Filter */}
      <div className="bg-white rounded-2xl border border-brand-warm-border p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-plum/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-plum/60 font-sans">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-brand-warm-border text-xs text-brand-plum font-sans focus:outline-brand-purple bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="New Enquiry">New Enquiry</option>
              <option value="Contacted">Contacted</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-warm-gray hover:bg-brand-soft-lavender text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Registrations List */}
      <div className="bg-white rounded-2xl border border-brand-warm-border shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-brand-plum/20 mx-auto mb-3" />
            <h4 className="font-serif text-xl font-bold text-brand-plum mb-1">
              No Academy Registrations Found
            </h4>
            <p className="text-xs text-brand-plum/60 font-sans max-w-md mx-auto">
              When prospective event planners register via the Royal Planners Academy registration form, their details will appear here with full contact info and experience level.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-brand-warm-border/60">
            {filtered.map((item) => {
              const whatsappPhone = item.phone.replace(/[^0-9]/g, "");
              const whatsappFormatted = whatsappPhone.startsWith("0")
                ? `234${whatsappPhone.slice(1)}`
                : whatsappPhone.startsWith("234")
                ? whatsappPhone
                : `234${whatsappPhone}`;

              const waText = `Hello ${encodeURIComponent(
                item.fullName
              )}! This is Adeola from Events 21 regarding your interest in Royal Planners Academy.`;

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 hover:bg-brand-warm-white/50 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-serif font-bold text-lg text-brand-plum">
                        {item.fullName}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider ${
                          item.status === "New Enquiry"
                            ? "bg-amber-100 text-amber-800"
                            : item.status === "Contacted"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "Enrolled"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[11px] font-mono text-brand-plum/40">
                        {item.id}
                      </span>
                    </div>

                    {/* Contact & Level info */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-brand-plum/75 font-sans">
                      <a
                        href={`mailto:${item.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-brand-purple"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-purple" />
                        <span>{item.email}</span>
                      </a>

                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 hover:text-brand-purple"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-purple" />
                        <span>{item.phone}</span>
                      </a>

                      <span className="inline-flex items-center gap-1.5 text-brand-gold font-medium">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{item.experienceLevel}</span>
                      </span>

                      {item.businessName && (
                        <span className="inline-flex items-center gap-1.5 text-brand-plum/60">
                          <Building className="w-3.5 h-3.5" />
                          <span>{item.businessName}</span>
                        </span>
                      )}
                    </div>

                    {/* Reason for Joining */}
                    {item.reasonForJoining && (
                      <div className="p-3 rounded-xl bg-brand-soft-lavender/30 border border-brand-purple/10 text-xs text-brand-plum/80 font-sans leading-relaxed">
                        <strong className="text-brand-purple block mb-0.5">
                          Why they want to join:
                        </strong>
                        &ldquo;{item.reasonForJoining}&rdquo;
                      </div>
                    )}

                    {/* Internal Notes */}
                    {editingNotesId === item.id ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={notesInput}
                          onChange={(e) => setNotesInput(e.target.value)}
                          placeholder="Add internal admissions note..."
                          className="px-3 py-1.5 rounded-lg border border-brand-purple text-xs text-brand-plum flex-1 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-brand-purple text-white text-xs font-semibold"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1.5 rounded-lg text-xs text-brand-plum/60 hover:text-brand-plum"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      item.notes && (
                        <div className="text-[11px] text-brand-plum/60 font-sans italic">
                          <strong>Internal Note:</strong> {item.notes}
                        </div>
                      )
                    )}

                    <div className="text-[11px] text-brand-plum/40 font-sans flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Registered on {new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions Right Column */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2 shrink-0 w-full lg:w-48">
                    {/* Direct WhatsApp Contact */}
                    <a
                      href={`https://wa.me/${whatsappFormatted}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatus(item.id, e.target.value as AcademyRegistrationStatus)
                      }
                      className="px-3 py-1.5 rounded-xl border border-brand-warm-border text-xs text-brand-plum bg-white font-sans focus:outline-brand-purple"
                    >
                      <option value="New Enquiry">Status: New Enquiry</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Enrolled">Status: Enrolled</option>
                      <option value="Archived">Status: Archived</option>
                    </select>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNotesId(item.id);
                          setNotesInput(item.notes || "");
                        }}
                        className="text-[11px] text-brand-purple hover:underline"
                      >
                        {item.notes ? "Edit note" : "+ Add note"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.fullName)}
                        className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1 p-1"
                        title="Delete registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
