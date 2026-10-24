"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Video,
  User,
  Users,
  CheckCircle2,
  Upload,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Sparkles,
  Camera,
} from "lucide-react";
import { FounderInfo, TeamMember } from "@/lib/types";
import {
  getBrandConfig,
  updateBrandConfig,
  getFounderInfo,
  updateFounderInfo,
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  compressImageFile,
} from "@/lib/store";

interface BrandAndTeamManagerProps {
  onNotify?: (message: string) => void;
}

export default function BrandAndTeamManager({ onNotify }: BrandAndTeamManagerProps) {
  // Brand Config (Hero Video & Poster)
  const [config, setConfig] = useState(getBrandConfig());
  const [heroSaved, setHeroSaved] = useState(false);

  // Founder Info
  const [founder, setFounder] = useState<FounderInfo>(getFounderInfo());
  const [founderSaved, setFounderSaved] = useState(false);
  const founderFileRef = useRef<HTMLInputElement>(null);

  // Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
  });
  const teamAddFileRef = useRef<HTMLInputElement>(null);
  const teamEditFileRef = useRef<HTMLInputElement>(null);

  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  const refreshAll = () => {
    setConfig(getBrandConfig());
    setFounder(getFounderInfo());
    setTeamMembers(getTeamMembers());
  };

  useEffect(() => {
    refreshAll();
    const handleSettings = () => setConfig(getBrandConfig());
    const handleFounder = () => setFounder(getFounderInfo());
    const handleTeam = () => setTeamMembers(getTeamMembers());

    window.addEventListener("events21_settings_updated", handleSettings);
    window.addEventListener("events21_founder_updated", handleFounder);
    window.addEventListener("events21_team_updated", handleTeam);

    return () => {
      window.removeEventListener("events21_settings_updated", handleSettings);
      window.removeEventListener("events21_founder_updated", handleFounder);
      window.removeEventListener("events21_team_updated", handleTeam);
    };
  }, []);

  const handleImageConversion = async (file: File, callback: (dataUrl: string) => void) => {
    try {
      setIsProcessingPhoto(true);
      const compressed = await compressImageFile(file, 1200, 1200, 0.85);
      callback(compressed);
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Could not process image. Please try another image file.");
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  // Hero Video Save
  const handleSaveHeroVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandConfig({
      heroVideoUrl: config.heroVideoUrl,
      heroPosterUrl: config.heroPosterUrl,
    });
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 3000);
    onNotify?.("Hero background video settings saved!");
  };

  // Founder Profile Save
  const handleSaveFounder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founder.name.trim()) {
      alert("Please provide the founder's name.");
      return;
    }
    updateFounderInfo(founder);
    setFounderSaved(true);
    setTimeout(() => setFounderSaved(false), 3000);
    onNotify?.("Founder profile updated successfully!");
  };

  // Team Member Add
  const handleAddTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.name.trim() || !newTeamMember.role.trim()) {
      alert("Please enter both name and role for the team member.");
      return;
    }

    addTeamMember({
      name: newTeamMember.name.trim(),
      role: newTeamMember.role.trim(),
      image: newTeamMember.image.trim() || "/images/founder-events21.jpg",
      bio: newTeamMember.bio.trim() || undefined,
    });

    setIsAddTeamOpen(false);
    setNewTeamMember({ name: "", role: "", image: "", bio: "" });
    setTeamMembers(getTeamMembers());
    onNotify?.(`Team member "${newTeamMember.name}" added successfully!`);
  };

  // Team Member Edit
  const handleEditTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;

    updateTeamMember(editingTeam.id, {
      name: editingTeam.name.trim(),
      role: editingTeam.role.trim(),
      image: editingTeam.image.trim(),
      bio: editingTeam.bio?.trim() || undefined,
    });

    setEditingTeam(null);
    setTeamMembers(getTeamMembers());
    onNotify?.("Team member profile updated!");
  };

  const handleDeleteTeam = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from team profiles?`)) {
      deleteTeamMember(id);
      setTeamMembers(getTeamMembers());
      onNotify?.(`Team member "${name}" removed.`);
    }
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: HERO BACKGROUND VIDEO */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-warm-border shadow-xs">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Video className="w-5 h-5 text-brand-purple" />
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Hero Section Video Background
              </h3>
            </div>
            <p className="text-xs text-brand-plum/70 font-sans max-w-xl">
              Manage the cinematic, soundless looping video that plays on the landing page hero. Enter a local file path (e.g. <code>/images/hero-video.mp4</code>) or a direct web link.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-brand-soft-lavender text-brand-purple text-[10px] font-semibold uppercase tracking-wider shrink-0">
            Cinematic 720p
          </span>
        </div>

        <form onSubmit={handleSaveHeroVideo} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                Video Asset URL (MP4 / WebM)
              </label>
              <input
                type="text"
                required
                value={config.heroVideoUrl || "/images/hero-video.mp4"}
                onChange={(e) => setConfig({ ...config, heroVideoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple font-mono"
              />
              <p className="text-[10px] text-brand-plum/50 mt-1">
                Optimized 45s audio-free clip stored at <code>/images/hero-video.mp4</code>.
              </p>
            </div>

            <div>
              <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                Fallback Poster Frame Image URL
              </label>
              <input
                type="text"
                required
                value={config.heroPosterUrl || "/images/hero-poster.jpg"}
                onChange={(e) => setConfig({ ...config, heroPosterUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple font-mono"
              />
              <p className="text-[10px] text-brand-plum/50 mt-1">
                High-resolution still frame used before video loads or on low-power devices.
              </p>
            </div>
          </div>

          {/* Video Preview Player */}
          <div className="mt-4 p-4 rounded-2xl bg-brand-warm-white border border-brand-warm-border">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-plum/70 block mb-2">
              Live Hero Video Preview:
            </span>
            <div className="relative aspect-video max-h-56 rounded-xl overflow-hidden bg-black shadow-inner">
              <video
                key={config.heroVideoUrl}
                src={config.heroVideoUrl || "/images/hero-video.mp4"}
                poster={config.heroPosterUrl || "/images/hero-poster.jpg"}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono tracking-wider">
                Muted Autoplay Loop
              </div>
            </div>
          </div>

          {heroSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Hero background video updated successfully!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold uppercase tracking-widest text-xs transition-colors shadow-sm cursor-pointer"
            >
              Update Hero Video
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: MEET THE FOUNDER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-warm-border shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-5 h-5 text-brand-purple" />
          <h3 className="font-serif text-2xl font-bold text-brand-plum">
            Meet the Founder Profile (About Page)
          </h3>
        </div>
        <p className="text-xs text-brand-plum/70 font-sans mb-6">
          Edit the founder name, official title, portrait photograph, bio, and creative vision displayed on the About page.
        </p>

        <form onSubmit={handleSaveFounder} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                Founder Name *
              </label>
              <input
                type="text"
                required
                value={founder.name}
                onChange={(e) => setFounder({ ...founder, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                Founder Title / Role *
              </label>
              <input
                type="text"
                required
                value={founder.title}
                onChange={(e) => setFounder({ ...founder, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
              />
            </div>
          </div>

          {/* Founder Photo */}
          <div className="p-4 rounded-2xl bg-brand-warm-white border border-brand-warm-border space-y-3">
            <label className="block uppercase font-semibold text-brand-plum/80 text-[10px]">
              Founder Portrait Photograph
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {founder.image && (
                <div className="w-20 h-24 rounded-xl overflow-hidden border border-brand-warm-border bg-black/5 shrink-0 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-3">
                  <input
                    ref={founderFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageConversion(file, (dataUrl) => {
                          setFounder((prev) => ({ ...prev, image: dataUrl }));
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => founderFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isProcessingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isProcessingPhoto ? "Processing..." : "Upload New Portrait"}</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or edit URL below</span>
                </div>

                <input
                  type="text"
                  value={founder.image}
                  onChange={(e) => setFounder({ ...founder, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
              Short Biography *
            </label>
            <textarea
              required
              rows={4}
              value={founder.bio}
              onChange={(e) => setFounder({ ...founder, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple leading-relaxed"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
              Founder Vision & Philosophy Quote *
            </label>
            <textarea
              required
              rows={3}
              value={founder.vision}
              onChange={(e) => setFounder({ ...founder, vision: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple leading-relaxed"
            />
          </div>

          {founderSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Founder profile updated successfully!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold uppercase tracking-widest text-xs transition-colors shadow-sm cursor-pointer"
            >
              Save Founder Profile
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 3: TEAM MEMBERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-warm-border shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-brand-purple" />
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Meet the Team Profiles
              </h3>
            </div>
            <p className="text-xs text-brand-plum/70 font-sans">
              Manage the event coordinators, floral designers, and production leads featured on the About page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddTeamOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>

        {teamMembers.length === 0 ? (
          <div className="p-8 text-center bg-brand-warm-white rounded-2xl border border-brand-warm-border">
            <p className="text-xs text-brand-plum/60 font-sans">
              No additional team members listed. Click &ldquo;Add Team Member&rdquo; to add coordinators and leads.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl border border-brand-warm-border bg-brand-warm-white/40 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden border border-brand-warm-border bg-black/5 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-base text-brand-plum">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-brand-purple font-medium mt-0.5">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-xs text-brand-plum/70 font-sans mt-2 line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-brand-warm-border flex items-center justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingTeam(member)}
                    className="p-1.5 rounded-lg text-brand-plum/60 hover:text-brand-purple hover:bg-brand-warm-gray transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTeam(member.id, member.name)}
                    className="p-1.5 rounded-lg text-brand-plum/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: Add Team Member */}
      {isAddTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddTeamOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-1">
              Add Team Member
            </h3>
            <p className="text-xs text-brand-plum/60 font-sans mb-4">
              Add a genuine team member or coordinator to the About page.
            </p>

            <form onSubmit={handleAddTeamSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Olatunji"
                  value={newTeamMember.name}
                  onChange={(e) =>
                    setNewTeamMember({ ...newTeamMember, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Role / Specialisation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Logistics & Protocol Manager"
                  value={newTeamMember.role}
                  onChange={(e) =>
                    setNewTeamMember({ ...newTeamMember, role: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-2">
                <label className="block uppercase font-semibold text-brand-plum/80 text-[10px]">
                  Team Member Photo
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={teamAddFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageConversion(file, (dataUrl) => {
                          setNewTeamMember((prev) => ({ ...prev, image: dataUrl }));
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => teamAddFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isProcessingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isProcessingPhoto ? "Processing..." : "Upload Photo"}</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or enter URL</span>
                </div>

                <input
                  type="text"
                  placeholder="/images/... or https://..."
                  value={newTeamMember.image}
                  onChange={(e) =>
                    setNewTeamMember({ ...newTeamMember, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Brief Bio / Background
                </label>
                <textarea
                  rows={3}
                  placeholder="A short note on their role and dedication to client success..."
                  value={newTeamMember.bio}
                  onChange={(e) =>
                    setNewTeamMember({ ...newTeamMember, bio: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddTeamOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Team Member */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingTeam(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-1">
              Edit Team Member
            </h3>
            <p className="text-xs text-brand-plum/60 font-sans mb-4">
              Update team profile information.
            </p>

            <form onSubmit={handleEditTeamSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingTeam.name}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Role / Specialisation *
                </label>
                <input
                  type="text"
                  required
                  value={editingTeam.role}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, role: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-2">
                <label className="block uppercase font-semibold text-brand-plum/80 text-[10px]">
                  Team Member Photo
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={teamEditFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageConversion(file, (dataUrl) => {
                          setEditingTeam((prev) => (prev ? { ...prev, image: dataUrl } : null));
                        });
                      }
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => teamEditFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isProcessingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isProcessingPhoto ? "Processing..." : "Upload Photo"}</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or edit URL below</span>
                </div>

                <input
                  type="text"
                  value={editingTeam.image}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Brief Bio / Background
                </label>
                <textarea
                  rows={3}
                  value={editingTeam.bio || ""}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, bio: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTeam(null)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
