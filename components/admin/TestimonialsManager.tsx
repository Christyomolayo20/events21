"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  X,
  MessageSquareQuote,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Quote,
  ExternalLink,
} from "lucide-react";
import { Testimonial } from "@/lib/types";
import {
  getTestimonials,
  reconcileTestimonialsFromServer,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  compressImageFile,
  syncTestimonialsToServer,
} from "@/lib/store";

interface TestimonialsManagerProps {
  onNotify?: (message: string) => void;
}

export default function TestimonialsManager({ onNotify }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [newForm, setNewForm] = useState({
    clientName: "",
    clientRole: "",
    eventName: "",
    rating: 5,
    quote: "",
    image: "",
    isPublished: true,
  });

  const refreshData = () => {
    setTestimonials(getTestimonials());
  };

  useEffect(() => {
    refreshData();

    const syncServer = async () => {
      const res = await reconcileTestimonialsFromServer();
      setTestimonials(res.testimonials);
    };

    syncServer();

    const handleUpdate = () => refreshData();
    const handleFocus = () => {
      syncServer();
    };

    window.addEventListener("events21_testimonials_updated", handleUpdate);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("events21_testimonials_updated", handleUpdate);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleFileConversion = async (file: File, callback: (dataUrl: string) => void) => {
    setErrorBanner(null);
    try {
      setIsProcessingPhoto(true);
      const compressed = await compressImageFile(file, 960, 960, 0.85);
      callback(compressed);
    } catch (err) {
      console.error("Testimonial image error:", err);
      setErrorBanner("Could not process image file. Please choose a valid image.");
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    if (!newForm.clientName.trim() || !newForm.quote.trim()) {
      setErrorBanner("Please provide at least a client name and their testimonial review.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await addTestimonial({
        clientName: newForm.clientName.trim(),
        clientRole: newForm.clientRole.trim() || undefined,
        eventName: newForm.eventName.trim() || undefined,
        roleOrEvent:
          [newForm.clientRole.trim(), newForm.eventName.trim()].filter(Boolean).join(" • ") ||
          undefined,
        rating: Number(newForm.rating) || 5,
        text: newForm.quote.trim(),
        quote: newForm.quote.trim(),
        image: newForm.image.trim() || undefined,
        isPublished: newForm.isPublished,
      });

      if (!res.ok) {
        setErrorBanner(res.error || "Could not save testimonial. Please try again.");
        return;
      }

      setTestimonials(res.testimonials);
      setIsAddOpen(false);
      setNewForm({
        clientName: "",
        clientRole: "",
        eventName: "",
        rating: 5,
        quote: "",
        image: "",
        isPublished: true,
      });
      onNotify?.("New client testimonial added successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setErrorBanner(null);

    const reviewText = (editingItem.quote || editingItem.text || "").trim();
    if (!editingItem.clientName.trim() || !reviewText) {
      setErrorBanner("Please provide at least a client name and their testimonial review.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateTestimonial(editingItem.id, {
        clientName: editingItem.clientName.trim(),
        clientRole: editingItem.clientRole?.trim() || undefined,
        eventName: editingItem.eventName?.trim() || undefined,
        roleOrEvent:
          [editingItem.clientRole?.trim(), editingItem.eventName?.trim()]
            .filter(Boolean)
            .join(" • ") || undefined,
        rating: Number(editingItem.rating) || 5,
        text: reviewText,
        quote: reviewText,
        image: editingItem.image?.trim() || undefined,
        isPublished: editingItem.isPublished,
      });

      if (!res.ok) {
        setErrorBanner(res.error || "Could not update testimonial. Please try again.");
        return;
      }

      setTestimonials(res.testimonials);
      setEditingItem(null);
      onNotify?.("Testimonial updated successfully!");
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublish = async (item: Testimonial) => {
    setErrorBanner(null);
    setIsSaving(true);
    try {
      const res = await updateTestimonial(item.id, { isPublished: !item.isPublished });
      if (!res.ok) {
        setErrorBanner(res.error || "Could not update testimonial visibility.");
        return;
      }
      setTestimonials(res.testimonials);
      onNotify?.(
        item.isPublished
          ? `Testimonial from "${item.clientName}" unpublished from public site.`
          : `Testimonial from "${item.clientName}" is now live on the public site.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    setErrorBanner(null);
    if (!confirm(`Are you sure you want to delete the testimonial from "${clientName}"?`)) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await deleteTestimonial(id);
      if (!res.ok) {
        setErrorBanner(res.error || `Failed to delete testimonial from "${clientName}".`);
        return;
      }
      setTestimonials(res.testimonials);
      onNotify?.(`Testimonial from "${clientName}" deleted.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncLive = async () => {
    setErrorBanner(null);
    setIsSyncing(true);
    try {
      const res = await syncTestimonialsToServer(testimonials);
      if (res.ok) {
        setTestimonials(res.testimonials);
        onNotify?.("Testimonials synchronized across desktop and mobile!");
      } else {
        setErrorBanner(res.error || "Could not synchronize testimonials to live backend.");
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const publishedCount = testimonials.filter((t) => t.isPublished !== false).length;

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {errorBanner && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorBanner}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-red-600 hover:text-red-800 p-1 rounded-lg cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Policy Banner */}
      <div className="p-4 rounded-2xl bg-brand-soft-lavender/40 border border-brand-purple/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
          <div className="text-xs font-sans">
            <p className="font-semibold text-brand-plum">
              Genuine Client Reviews &amp; Testimonials Manager
            </p>
            <p className="text-brand-plum/70 mt-0.5">
              Published testimonials display identically across desktop and mobile with each client&apos;s uploaded photo featured as the card background.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Link
            href="/testimonials"
            target="_blank"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white hover:bg-brand-warm-gray border border-brand-warm-border text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            title="Open public /testimonials page in a new tab"
          >
            <span>View Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-purple" />
          </Link>

          <button
            type="button"
            onClick={handleSyncLive}
            disabled={isSyncing || isSaving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-brand-soft-lavender/40 border border-brand-purple/30 text-brand-purple text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            title="Sync all testimonials to server API so mobile devices immediately show the identical list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-brand-gold" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync to Mobile & Web"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setErrorBanner(null);
              setIsAddOpen(true);
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-brand-plum/50 font-semibold block">
            Total Reviews
          </span>
          <span className="font-serif text-3xl font-bold text-brand-plum">
            {testimonials.length}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
            Published Live
          </span>
          <span className="font-serif text-3xl font-bold text-emerald-700">
            {publishedCount}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase tracking-wider text-brand-plum/40 font-semibold block">
            Drafts / Unpublished
          </span>
          <span className="font-serif text-3xl font-bold text-brand-plum/40">
            {testimonials.length - publishedCount}
          </span>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-2xl border border-brand-warm-border shadow-sm p-6">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquareQuote className="w-12 h-12 text-brand-plum/20 mx-auto mb-3" />
            <h4 className="font-serif text-xl font-bold text-brand-plum mb-2">
              No Client Testimonials Added Yet
            </h4>
            <p className="text-xs text-brand-plum/60 font-sans max-w-md mx-auto mb-6">
              In accordance with our brand standards, no fabricated reviews are shown publicly. Publish verified feedback from your wedding and celebration clients below.
            </p>
            <button
              type="button"
              onClick={() => {
                setErrorBanner(null);
                setIsAddOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Testimonial</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden border border-brand-warm-border p-5 flex flex-col justify-between transition-all hover:border-brand-purple/30 bg-white shadow-sm"
              >
                {item.image && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.clientName}
                      className="w-full h-full object-cover object-[50%_25%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/90" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-purple/30 bg-brand-warm-gray shrink-0 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.clientName}
                            className="w-full h-full object-cover object-[50%_25%]"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-soft-lavender text-brand-purple font-serif font-bold text-base flex items-center justify-center shrink-0">
                          {item.clientName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-serif font-bold text-base text-brand-plum">
                          {item.clientName}
                        </h4>
                        {(item.roleOrEvent || item.clientRole || item.eventName) && (
                          <p className="text-[11px] text-brand-plum/60 font-sans">
                            {item.roleOrEvent || [item.clientRole, item.eventName].filter(Boolean).join(" • ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => togglePublish(item)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 ${
                        item.isPublished !== false
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      title={item.isPublished !== false ? "Click to unpublish" : "Click to publish"}
                    >
                      {item.isPublished !== false ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-600" />
                          <span>Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-gray-500" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= item.rating
                            ? "fill-brand-gold text-brand-gold"
                            : "text-brand-warm-border fill-brand-warm-border/30"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-brand-plum/40 font-mono ml-1">
                      ({item.rating}.0)
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-brand-plum/85 font-sans italic leading-relaxed mb-4">
                    &ldquo;{item.quote || item.text}&rdquo;
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-brand-warm-border flex items-center justify-between text-xs font-sans">
                  <span className="text-[10px] text-brand-plum/50">
                    Added: {new Date(item.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => {
                        setErrorBanner(null);
                        setEditingItem(item);
                      }}
                      className="p-1.5 rounded-lg text-brand-plum/60 hover:text-brand-purple hover:bg-brand-warm-gray transition-colors cursor-pointer disabled:opacity-50"
                      title="Edit testimonial"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleDelete(item.id, item.clientName)}
                      className="p-1.5 rounded-lg text-brand-plum/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                      title="Delete testimonial"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: Add Testimonial */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-sm">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setErrorBanner(null);
                setIsAddOpen(false);
              }}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Add Client Testimonial
              </h3>
              <p className="text-xs text-brand-plum/60 font-sans mt-0.5">
                Share authentic feedback from an event client. Uploaded photos serve as the card background across desktop and mobile.
              </p>
            </div>

            {errorBanner && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorBanner}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. & Mrs. Adewale"
                  value={newForm.clientName}
                  onChange={(e) => setNewForm({ ...newForm, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Client Role / Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bride, Groom, Host"
                    value={newForm.clientRole}
                    onChange={(e) => setNewForm({ ...newForm, clientRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Event Name / Category (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Luxury Wedding"
                    value={newForm.eventName}
                    onChange={(e) => setNewForm({ ...newForm, eventName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Star Rating (1 - 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewForm({ ...newForm, rating: star })}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= newForm.rating
                            ? "fill-brand-gold text-brand-gold"
                            : "text-brand-warm-border"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-brand-plum ml-2">
                    {newForm.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Testimonial Quote / Review *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share the client's genuine words about Events 21's styling, coordination, and execution..."
                  value={newForm.quote}
                  onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-2.5">
                <label className="block uppercase font-semibold text-brand-plum/80 text-[10px]">
                  Client Photo — Card Background Image (Optional)
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={addFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setNewForm((prev) => ({ ...prev, image: dataUrl }));
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => addFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isProcessingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isProcessingPhoto ? "Processing..." : "Upload Photo"}</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or enter image URL below</span>
                </div>

                <input
                  type="text"
                  placeholder="https://... or /images/client.jpg"
                  value={newForm.image}
                  onChange={(e) => setNewForm({ ...newForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />

                {newForm.image && (
                  <div className="pt-2 space-y-2">
                    <div className="relative h-32 rounded-xl overflow-hidden border border-brand-warm-border bg-[#15051B] p-4 flex flex-col justify-between text-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newForm.image}
                        alt="Background Card Preview"
                        className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120418]/90 via-[#180720]/70 to-[#120418]/60" />
                      <div className="relative z-10 flex items-center justify-between">
                        <Quote className="w-4 h-4 text-brand-gold" />
                        <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold">
                          Card Background Preview
                        </span>
                      </div>
                      <p className="relative z-10 font-serif text-xs line-clamp-2 text-white/95">
                        &ldquo;{newForm.quote || "Client review preview over uploaded backdrop."}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewForm({ ...newForm, image: "" })}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-brand-plum font-semibold">
                  <input
                    type="checkbox"
                    checked={newForm.isPublished}
                    onChange={(e) => setNewForm({ ...newForm, isPublished: e.target.checked })}
                    className="rounded text-brand-purple focus:ring-brand-purple"
                  />
                  <span>Publish immediately to landing page &amp; testimonials page</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrorBanner(null);
                    setIsAddOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingPhoto || isSaving}
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? "Saving..." : "Save Testimonial"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Testimonial */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-sm">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setErrorBanner(null);
                setEditingItem(null);
              }}
              aria-label="Close edit modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Edit Testimonial
              </h3>
              <p className="text-xs text-brand-plum/60 font-sans mt-0.5">
                Update client feedback, backdrop photograph, or publish visibility.
              </p>
            </div>

            {errorBanner && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorBanner}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.clientName}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, clientName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.clientRole || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, clientRole: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Event Name / Category
                  </label>
                  <input
                    type="text"
                    value={editingItem.eventName || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, eventName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Star Rating (1 - 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, rating: star })}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= editingItem.rating
                            ? "fill-brand-gold text-brand-gold"
                            : "text-brand-warm-border"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-brand-plum ml-2">
                    {editingItem.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Testimonial Quote / Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingItem.quote || editingItem.text || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quote: e.target.value,
                      text: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-2.5">
                <label className="block uppercase font-semibold text-brand-plum/80 text-[10px]">
                  Client Photo — Card Background Image
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setEditingItem((prev) => (prev ? { ...prev, image: dataUrl } : null));
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => editFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isProcessingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isProcessingPhoto ? "Processing..." : "Upload New Photo"}</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or edit URL below</span>
                </div>

                <input
                  type="text"
                  value={editingItem.image || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />

                {editingItem.image && (
                  <div className="pt-2 space-y-2">
                    <div className="relative h-32 rounded-xl overflow-hidden border border-brand-warm-border bg-[#15051B] p-4 flex flex-col justify-between text-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingItem.image}
                        alt="Background Card Preview"
                        className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120418]/90 via-[#180720]/70 to-[#120418]/60" />
                      <div className="relative z-10 flex items-center justify-between">
                        <Quote className="w-4 h-4 text-brand-gold" />
                        <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold">
                          Card Background Preview
                        </span>
                      </div>
                      <p className="relative z-10 font-serif text-xs line-clamp-2 text-white/95">
                        &ldquo;{editingItem.quote || editingItem.text}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, image: "" })}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-brand-plum font-semibold">
                  <input
                    type="checkbox"
                    checked={editingItem.isPublished !== false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isPublished: e.target.checked })
                    }
                    className="rounded text-brand-purple focus:ring-brand-purple"
                  />
                  <span>Published Live to Landing Page Carousel</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrorBanner(null);
                    setEditingItem(null);
                  }}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingPhoto || isSaving}
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
