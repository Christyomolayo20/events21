"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  checkAdminAuth,
  loginAdmin,
  logoutAdmin,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getGiftRequests,
  updateGiftStatus,
  deleteGiftRequest,
  getPortfolio,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getGiftCatalogue,
  addGiftItem,
  updateGiftItem,
  deleteGiftItem,
  getBrandConfig,
  updateBrandConfig,
} from "@/lib/store";
import { EventEnquiry, GiftRequest, PortfolioItem, GiftItem } from "@/lib/types";
import {
  Lock,
  LogOut,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Archive,
  MessageSquare,
  Sparkles,
  Gift,
  Image as ImageIcon,
  Settings,
  Trash2,
  ExternalLink,
  ChevronRight,
  X,
  Plus,
  Pencil,
  Upload,
  Check,
  Eye,
  ShoppingBag,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"enquiries" | "gifts" | "portfolio" | "settings">("enquiries");

  // State data
  const [enquiries, setEnquiries] = useState<EventEnquiry[]>([]);
  const [gifts, setGifts] = useState<GiftRequest[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [giftCatalogue, setGiftCatalogue] = useState<GiftItem[]>([]);
  const [config, setConfig] = useState(getBrandConfig());

  // Filter & Search
  const [enquirySearch, setEnquirySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EventEnquiry | null>(null);

  // Gifts Sub-Tab
  const [giftsSubTab, setGiftsSubTab] = useState<"catalogue" | "orders">("catalogue");

  // Portfolio Modals State
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    subtitle: "",
    category: "Weddings" as PortfolioItem["category"],
    year: new Date().getFullYear().toString(),
    location: "Lagos, Nigeria",
    image: "",
    description: "",
    featured: false,
  });

  // Gift Item Modals State
  const [isAddGiftOpen, setIsAddGiftOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<GiftItem | null>(null);
  const [newGift, setNewGift] = useState({
    name: "",
    category: "Wrapping of EruIyawo" as GiftItem["category"],
    price: 35000,
    description: "",
    image: "",
    inStock: true,
    popular: false,
  });

  // Settings form
  const [settingsSaved, setSettingsSaved] = useState(false);

  // File input refs
  const portfolioAddFileRef = useRef<HTMLInputElement>(null);
  const portfolioEditFileRef = useRef<HTMLInputElement>(null);
  const giftAddFileRef = useRef<HTMLInputElement>(null);
  const giftEditFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const authed = checkAdminAuth();
    setIsAuthenticated(authed);
    if (authed) {
      loadData();
    }

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("events21_enquiries_updated", handleUpdate);
    window.addEventListener("events21_gifts_updated", handleUpdate);
    window.addEventListener("events21_portfolio_updated", handleUpdate);
    window.addEventListener("events21_gift_catalogue_updated", handleUpdate);
    window.addEventListener("events21_settings_updated", handleUpdate);

    return () => {
      window.removeEventListener("events21_enquiries_updated", handleUpdate);
      window.removeEventListener("events21_gifts_updated", handleUpdate);
      window.removeEventListener("events21_portfolio_updated", handleUpdate);
      window.removeEventListener("events21_gift_catalogue_updated", handleUpdate);
      window.removeEventListener("events21_settings_updated", handleUpdate);
    };
  }, []);

  const loadData = () => {
    setEnquiries(getEnquiries());
    setGifts(getGiftRequests());
    setPortfolio(getPortfolio());
    setGiftCatalogue(getGiftCatalogue());
    setConfig(getBrandConfig());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (loginAdmin(passwordInput)) {
      setIsAuthenticated(true);
      loadData();
    } else {
      setLoginError("Incorrect admin password. Please try again.");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // --- Helper: Read local image file as Base64 Data URI ---
  const handleFileConversion = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Enquiries handlers ---
  const handleStatusChange = (id: string, newStatus: EventEnquiry["status"]) => {
    updateEnquiryStatus(id, newStatus);
    loadData();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm("Are you sure you want to remove this enquiry?")) {
      deleteEnquiry(id);
      loadData();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  // --- Portfolio handlers ---
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.image) {
      alert("Please provide both a project title and an image.");
      return;
    }
    addPortfolioItem(newProject);
    setIsAddPortfolioOpen(false);
    setNewProject({
      title: "",
      subtitle: "",
      category: "Weddings",
      year: new Date().getFullYear().toString(),
      location: "Lagos, Nigeria",
      image: "",
      description: "",
      featured: false,
    });
    loadData();
  };

  const handleSaveEditedProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    updatePortfolioItem(editingProject.id, editingProject);
    setEditingProject(null);
    loadData();
  };

  const handleDeletePortfolioProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the portfolio?`)) {
      deletePortfolioItem(id);
      loadData();
    }
  };

  // --- Gifts handlers ---
  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGift.name || !newGift.image) {
      alert("Please provide a gift package title and an image.");
      return;
    }
    addGiftItem({
      name: newGift.name,
      category: newGift.category,
      price: Number(newGift.price) || 0,
      description: newGift.description,
      details: ["Curated by Adeola", "Quality guaranteed", "Custom presentation"],
      image: newGift.image,
      inStock: newGift.inStock,
      popular: newGift.popular,
    });
    setIsAddGiftOpen(false);
    setNewGift({
      name: "",
      category: "Wrapping of EruIyawo",
      price: 35000,
      description: "",
      image: "",
      inStock: true,
      popular: false,
    });
    loadData();
  };

  const handleSaveEditedGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGift) return;
    updateGiftItem(editingGift.id, editingGift);
    setEditingGift(null);
    loadData();
  };

  const handleDeleteGiftItem = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the Gifts catalogue?`)) {
      deleteGiftItem(id);
      loadData();
    }
  };

  const handleDeleteGiftRequest = (id: string) => {
    if (confirm("Are you sure you want to delete this gift request?")) {
      deleteGiftRequest(id);
      loadData();
    }
  };

  // --- Settings handler ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandConfig(config);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const exportEnquiriesCSV = () => {
    const headers = [
      "ID",
      "Date Submitted",
      "Full Name",
      "Email",
      "Phone",
      "Event Type",
      "Event Date",
      "Location",
      "Guests",
      "Budget",
      "Status",
      "Message",
    ];

    const rows = enquiries.map((enq) => [
      enq.id,
      new Date(enq.createdAt).toLocaleDateString(),
      `"${enq.fullName.replace(/"/g, '""')}"`,
      enq.email,
      `"${enq.phone}"`,
      enq.eventType,
      enq.eventDate,
      `"${enq.eventLocation.replace(/"/g, '""')}"`,
      `"${enq.guestCount}"`,
      `"${enq.budgetRange}"`,
      enq.status,
      `"${(enq.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `events21_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesSearch =
      item.fullName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.phone.includes(enquirySearch) ||
      item.eventType.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      item.eventLocation.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // If not logged in, show Password Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-brand-warm-white">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-brand-warm-border shadow-elevated text-center">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mb-2">
            Admin Studio Portal
          </h1>
          <p className="text-xs text-brand-plum/70 font-sans mb-6">
            Enter the authorized admin password to manage leads, portfolio showcases, and Gifts by Adeola catalogue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum text-center tracking-widest placeholder:tracking-normal placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 font-sans">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-warm-border/60">
            <Link
              href="/"
              className="text-xs text-brand-plum/60 hover:text-brand-purple font-sans transition-colors inline-flex items-center gap-1"
            >
              <span>← Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="pt-24 pb-20 bg-brand-warm-white min-h-screen">
      {/* Top Admin Sub-Header */}
      <div className="bg-brand-plum text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-brand-plum-dark sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-serif text-lg font-bold">Event 21 Studio Admin</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 text-[10px] uppercase font-sans tracking-wider text-brand-gold">
              Live Control Room
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-sans font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-brand-warm-border pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("enquiries")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "enquiries"
                ? "bg-brand-purple text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Event Enquiries</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] ml-1">
              {enquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("portfolio")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "portfolio"
                ? "bg-brand-plum text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Portfolio Manager</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] ml-1">
              {portfolio.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gifts")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "gifts"
                ? "bg-brand-pink text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Gifts by Adeola</span>
            <span className="px-1.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink text-[10px] ml-1">
              {giftCatalogue.length + gifts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "settings"
                ? "bg-brand-plum text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Studio Settings</span>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-brand-plum/50 font-semibold block">
                  Total Leads
                </span>
                <span className="font-serif text-3xl font-bold text-brand-plum">
                  {enquiries.length}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-brand-purple font-semibold block">
                  New (Unanswered)
                </span>
                <span className="font-serif text-3xl font-bold text-brand-purple">
                  {enquiries.filter((e) => e.status === "New").length}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold block">
                  Contacted
                </span>
                <span className="font-serif text-3xl font-bold text-blue-600">
                  {enquiries.filter((e) => e.status === "Contacted").length}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
                <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold block">
                  Booked Events
                </span>
                <span className="font-serif text-3xl font-bold text-green-600">
                  {enquiries.filter((e) => e.status === "Booked").length}
                </span>
              </div>
            </div>

            {/* Filter Bar & Export */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-warm-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-plum/40" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, city..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-warm-border bg-brand-warm-white text-xs text-brand-plum placeholder:text-brand-plum/40 focus:outline-brand-purple"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {["All", "New", "Contacted", "In Review", "Booked", "Archived"].map((st) => (
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

              {/* CSV Export */}
              <button
                type="button"
                onClick={exportEnquiriesCSV}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-brand-warm-border hover:border-brand-purple text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-brand-purple" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Enquiries List / Table */}
            <div className="bg-white rounded-2xl border border-brand-warm-border shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-brand-warm-gray border-b border-brand-warm-border text-brand-plum/60 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Client & Event</th>
                      <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                      <th className="py-3.5 px-4 font-semibold">Date & Location</th>
                      <th className="py-3.5 px-4 font-semibold">Budget / Guests</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-warm-border/60">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-brand-plum/50">
                          No enquiries found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => {
                        const statusColors: Record<EventEnquiry["status"], string> = {
                          New: "bg-purple-100 text-brand-purple border-purple-200",
                          Contacted: "bg-blue-100 text-blue-700 border-blue-200",
                          "In Review": "bg-amber-100 text-amber-700 border-amber-200",
                          Booked: "bg-emerald-100 text-emerald-700 border-emerald-200",
                          Archived: "bg-gray-100 text-gray-600 border-gray-200",
                        };

                        return (
                          <tr
                            key={enq.id}
                            className="hover:bg-brand-warm-white transition-colors cursor-pointer"
                            onClick={() => setSelectedEnquiry(enq)}
                          >
                            <td className="py-4 px-4">
                              <span className="font-serif font-bold text-sm text-brand-plum block">
                                {enq.fullName}
                              </span>
                              <span className="text-[11px] text-brand-purple font-medium">
                                {enq.eventType}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-brand-plum/80 space-y-0.5">
                              <div>{enq.email}</div>
                              <div className="font-mono text-[11px] text-brand-plum/60">{enq.phone}</div>
                            </td>
                            <td className="py-4 px-4 text-brand-plum/80 space-y-0.5">
                              <div className="font-medium">{enq.eventDate || "TBD"}</div>
                              <div className="text-[11px] text-brand-plum/60 line-clamp-1">
                                {enq.eventLocation}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-brand-plum/80 space-y-0.5">
                              <div className="text-brand-purple font-semibold">{enq.budgetRange}</div>
                              <div className="text-[11px] text-brand-plum/60">{enq.guestCount}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                                  statusColors[enq.status]
                                }`}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td
                              className="py-4 px-4 text-right space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a
                                href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                  enq.fullName
                                )}!%20This%20is%20Event%2021%20following%20up%20on%20your%20${encodeURIComponent(
                                  enq.eventType
                                )}%20enquiry.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 inline-flex items-center text-[#25D366] hover:bg-[#E8F8EE] rounded-lg transition-colors"
                                title="Reply via WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                              <a
                                href={`mailto:${enq.email}?subject=Event%2021%20Enquiry%20-%20${encodeURIComponent(
                                  enq.eventType
                                )}`}
                                className="p-2 inline-flex items-center text-brand-purple hover:bg-brand-soft-lavender rounded-lg transition-colors"
                                title="Reply via Email"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-2 inline-flex items-center text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO SHOWCASE MANAGER (EDIT & DELETE ENABLED) */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-warm-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">
                  Portfolio Showcase Manager
                </h3>
                <p className="text-xs text-brand-plum/70 font-sans mt-1">
                  Upload new projects, edit titles and images, or remove existing projects from the live portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPortfolioOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-brand-warm-border overflow-hidden shadow-xs flex flex-col justify-between group hover:border-brand-purple/40 transition-colors"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-brand-plum overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 text-brand-plum shadow-xs">
                          {item.category}
                        </span>
                        {item.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold uppercase tracking-wider bg-brand-purple text-white shadow-xs">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-3">
                      <h4 className="font-serif text-lg font-bold text-brand-plum leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-plum/60 font-sans mt-1 line-clamp-2">
                        {item.subtitle}
                      </p>
                      <div className="text-[11px] text-brand-gold font-sans font-medium mt-2">
                        {item.location} • {item.year}
                      </div>
                    </div>
                  </div>

                  {/* Edit and Delete Actions */}
                  <div className="p-4 pt-2 border-t border-brand-warm-border/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingProject(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-soft-lavender hover:bg-brand-purple hover:text-white text-brand-purple text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Project</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeletePortfolioProject(item.id, item.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GIFTS BY ADEOLA (CATALOGUE UPLOADS & CUSTOM ORDERS) */}
        {activeTab === "gifts" && (
          <div className="space-y-6">
            {/* Sub-Tabs Selector */}
            <div className="bg-white p-4 rounded-2xl border border-brand-warm-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGiftsSubTab("catalogue")}
                  className={`px-4 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    giftsSubTab === "catalogue"
                      ? "bg-brand-pink text-white shadow-xs"
                      : "bg-brand-warm-gray text-brand-plum/70 hover:bg-brand-warm-border"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 inline-block mr-1.5" />
                  <span>Gift Catalogue & Image Uploader ({giftCatalogue.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGiftsSubTab("orders")}
                  className={`px-4 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    giftsSubTab === "orders"
                      ? "bg-brand-plum text-white shadow-xs"
                      : "bg-brand-warm-gray text-brand-plum/70 hover:bg-brand-warm-border"
                  }`}
                >
                  <Users className="w-3.5 h-3.5 inline-block mr-1.5" />
                  <span>Client Gift Orders ({gifts.length})</span>
                </button>
              </div>

              {giftsSubTab === "catalogue" && (
                <button
                  type="button"
                  onClick={() => setIsAddGiftOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Gift Item</span>
                </button>
              )}
            </div>

            {/* Sub-View 1: Gift Catalogue Manager */}
            {giftsSubTab === "catalogue" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {giftCatalogue.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-brand-pink/20 overflow-hidden shadow-xs flex flex-col justify-between group hover:border-brand-pink/40 transition-colors"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-brand-blush-pink overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 text-brand-pink shadow-xs">
                            {item.category}
                          </span>
                          {item.inStock ? (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
                              In Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold uppercase tracking-wider bg-gray-500 text-white shadow-xs">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5 pt-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-lg font-bold text-brand-plum leading-snug">
                            {item.name}
                          </h4>
                          <span className="text-xs font-bold text-brand-purple shrink-0">
                            ₦{item.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-brand-plum/60 font-sans mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-4 pt-2 border-t border-brand-warm-border/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setEditingGift(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blush-pink hover:bg-brand-pink hover:text-white text-brand-pink text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit Item</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGiftItem(item.id, item.name)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-View 2: Client Custom Gift Orders */}
            {giftsSubTab === "orders" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gifts.length === 0 ? (
                  <div className="col-span-2 bg-white p-12 text-center text-brand-plum/50 rounded-2xl border border-brand-warm-border">
                    No custom gift orders recorded yet.
                  </div>
                ) : (
                  gifts.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-2xl p-6 border border-brand-pink/20 shadow-xs space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-brand-pink font-semibold">
                            {req.id}
                          </span>
                          <h4 className="font-serif text-xl font-bold text-brand-plum">
                            {req.fullName}
                          </h4>
                          <p className="text-xs text-brand-plum/70 font-sans">
                            Occasion: <strong>{req.occasion}</strong> • For: <strong>{req.recipientName}</strong>
                          </p>
                        </div>

                        <select
                          value={req.status}
                          onChange={(e) =>
                            updateGiftStatus(req.id, e.target.value as GiftRequest["status"])
                          }
                          className="text-xs font-sans px-2.5 py-1 rounded-full border border-brand-pink/30 bg-brand-blush-pink text-brand-pink font-semibold focus:outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Sourcing">Sourcing</option>
                          <option value="Assembled">Assembled</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <div className="space-y-2 text-xs font-sans bg-brand-warm-white p-4 rounded-xl border border-brand-warm-border/60">
                        <div>
                          <strong className="text-brand-plum">Budget: </strong>
                          <span className="text-brand-purple font-semibold">{req.budget}</span>
                        </div>
                        <div>
                          <strong className="text-brand-plum">Target Delivery: </strong>
                          <span>{req.deliveryDate || "Not set"}</span>
                        </div>
                        <div>
                          <strong className="text-brand-plum">Address: </strong>
                          <span>{req.deliveryAddress || "Lagos"}</span>
                        </div>
                        {req.itemsRequested && (
                          <div>
                            <strong className="text-brand-plum">Items / Theme: </strong>
                            <p className="text-brand-plum/80 mt-0.5">{req.itemsRequested}</p>
                          </div>
                        )}
                        {req.personalMessage && (
                          <div>
                            <strong className="text-brand-plum">Calligraphy Note: </strong>
                            <p className="italic text-brand-plum/80 mt-0.5">"{req.personalMessage}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-brand-warm-border">
                        <span className="text-[11px] text-brand-plum/50 font-sans">
                          {req.phone} • {req.email}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteGiftRequest(req.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <a
                            href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                              req.fullName
                            )}!%20This%20is%20Adeola%20from%20Gifts%20by%20Adeola%20following%20up%20on%20your%20custom%20gift%20request.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-brand-warm-border shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
              Studio Contact & Social Information
            </h3>
            <p className="text-xs text-brand-plum/70 font-sans mb-6">
              Update the official phone, email, address, and Instagram links shown across the website.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Studio Phone / Hotline
                </label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  WhatsApp Number (with country code, digits only)
                </label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Official Instagram URL (Event 21)
                </label>
                <input
                  type="url"
                  value={config.instagramUrl}
                  onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Physical Studio Address
                </label>
                <input
                  type="text"
                  value={config.location}
                  onChange={(e) => setConfig({ ...config, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold uppercase tracking-widest text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* MODAL 1: Selected Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono text-brand-purple font-semibold">
                Reference: {selectedEnquiry.id}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mt-1">
                {selectedEnquiry.fullName}
              </h3>
              <p className="text-xs text-brand-plum/60 font-sans mt-0.5">
                Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Status Selector */}
            <div className="mb-6 p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border/80 flex items-center justify-between">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-brand-plum/70">
                Enquiry Status:
              </span>
              <select
                value={selectedEnquiry.status}
                onChange={(e) =>
                  handleStatusChange(selectedEnquiry.id, e.target.value as EventEnquiry["status"])
                }
                className="text-xs font-sans px-3 py-1.5 rounded-lg border border-brand-purple/30 bg-white font-semibold text-brand-purple focus:outline-hidden"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Review">In Review</option>
                <option value="Booked">Booked</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6">
              <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/60">
                <span className="text-brand-plum/50 block text-[10px] uppercase font-semibold">
                  Event Category
                </span>
                <span className="font-semibold text-brand-purple text-sm">
                  {selectedEnquiry.eventType}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/60">
                <span className="text-brand-plum/50 block text-[10px] uppercase font-semibold">
                  Preferred Date
                </span>
                <span className="font-semibold text-brand-plum text-sm">
                  {selectedEnquiry.eventDate || "TBD"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/60">
                <span className="text-brand-plum/50 block text-[10px] uppercase font-semibold">
                  Location / City
                </span>
                <span className="font-semibold text-brand-plum">
                  {selectedEnquiry.eventLocation}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/60">
                <span className="text-brand-plum/50 block text-[10px] uppercase font-semibold">
                  Estimated Guests
                </span>
                <span className="font-semibold text-brand-plum">{selectedEnquiry.guestCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/60 col-span-2">
                <span className="text-brand-plum/50 block text-[10px] uppercase font-semibold">
                  Estimated Budget
                </span>
                <span className="font-semibold text-brand-purple text-sm">
                  {selectedEnquiry.budgetRange}
                </span>
              </div>
            </div>

            {/* Client Message */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-brand-plum/80 font-sans mb-2">
                Client Message & Vision:
              </h4>
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border text-sm text-brand-plum/85 font-sans leading-relaxed">
                {selectedEnquiry.message || "No specific message provided."}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-brand-warm-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                    selectedEnquiry.fullName
                  )}!%20This%20is%20Event%2021%20following%20up%20on%20your%20${encodeURIComponent(
                    selectedEnquiry.eventType
                  )}%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Reply</span>
                </a>
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Event%2021%20Planning%20Consultation`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-purple text-white text-xs font-semibold uppercase tracking-wider"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                className="text-xs text-red-600 hover:underline font-sans cursor-pointer"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New Portfolio Project */}
      {isAddPortfolioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddPortfolioOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-4">
              Add New Project to Gallery
            </h3>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Adelekes: Royal Grand Ballroom"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g. An opulent 500-guest celebration with cascading florals"
                  value={newProject.subtitle}
                  onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        category: e.target.value as PortfolioItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Ballrooms & Decor">Ballrooms & Decor</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="Proposals">Proposals</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={newProject.year}
                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Image Upload from Computer OR URL */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-3">
                <label className="block uppercase font-semibold text-brand-plum/80">
                  Project Photograph *
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={portfolioAddFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setNewProject({ ...newProject, image: dataUrl });
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => portfolioAddFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-plum hover:bg-brand-purple text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or enter image URL below</span>
                </div>

                <input
                  type="text"
                  required
                  placeholder="/images/... or https://..."
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />

                {newProject.image && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-brand-warm-border bg-black/5 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newProject.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the styling, decor elements, and special moments..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                  className="rounded text-brand-purple focus:ring-brand-purple"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-brand-plum font-medium">
                  Feature on homepage highlights
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPortfolioOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Existing Portfolio Project */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-4">
              Edit Portfolio Project
            </h3>

            <form onSubmit={handleSaveEditedProject} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as PortfolioItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Ballrooms & Decor">Ballrooms & Decor</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="Proposals">Proposals</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, location: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              {/* Image Upload or URL */}
              <div className="p-4 rounded-xl bg-brand-warm-white border border-brand-warm-border space-y-3">
                <label className="block uppercase font-semibold text-brand-plum/80">
                  Project Photograph
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={portfolioEditFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setEditingProject({ ...editingProject, image: dataUrl });
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => portfolioEditFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-plum hover:bg-brand-purple text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or edit URL below</span>
                </div>

                <input
                  type="text"
                  required
                  value={editingProject.image}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, image: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-purple"
                />

                {editingProject.image && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-brand-warm-border bg-black/5 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingProject.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="edit-featured-checkbox"
                  checked={editingProject.featured || false}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, featured: e.target.checked })
                  }
                  className="rounded text-brand-purple focus:ring-brand-purple"
                />
                <label htmlFor="edit-featured-checkbox" className="text-xs text-brand-plum font-medium">
                  Feature on homepage highlights
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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

      {/* MODAL 4: Add New Gift Catalogue Item (Image Upload Enabled) */}
      {isAddGiftOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddGiftOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-4">
              Add New Item to Gifts by Adeola
            </h3>

            <form onSubmit={handleAddGift} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Package / Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal EruIyawo Velvet & Acrylic Wrapping"
                  value={newGift.name}
                  onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Category
                  </label>
                  <select
                    value={newGift.category}
                    onChange={(e) =>
                      setNewGift({
                        ...newGift,
                        category: e.target.value as GiftItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  >
                    <option value="Wrapping of EruIyawo">Wrapping of EruIyawo</option>
                    <option value="Corporate Gifts">Corporate Gifts</option>
                    <option value="Hampers">Hampers</option>
                    <option value="Souvenirs">Souvenirs</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Bespoke">Bespoke</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Price (in NGN ₦)
                  </label>
                  <input
                    type="number"
                    value={newGift.price}
                    onChange={(e) => setNewGift({ ...newGift, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                  />
                </div>
              </div>

              {/* Image Upload for Gift by Adeola */}
              <div className="p-4 rounded-xl bg-brand-blush-pink/30 border border-brand-pink/20 space-y-3">
                <label className="block uppercase font-semibold text-brand-plum/80">
                  Gift Photograph *
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={giftAddFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setNewGift({ ...newGift, image: dataUrl });
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => giftAddFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or enter image URL below</span>
                </div>

                <input
                  type="text"
                  required
                  placeholder="/images/... or https://..."
                  value={newGift.image}
                  onChange={(e) => setNewGift({ ...newGift, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-pink"
                />

                {newGift.image && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-brand-warm-border bg-black/5 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newGift.image}
                      alt="Gift Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the materials, items included, or budget suitability..."
                  value={newGift.description}
                  onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-pink"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-brand-plum font-medium">
                  <input
                    type="checkbox"
                    checked={newGift.inStock}
                    onChange={(e) => setNewGift({ ...newGift, inStock: e.target.checked })}
                    className="rounded text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Currently Available / In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-brand-plum font-medium">
                  <input
                    type="checkbox"
                    checked={newGift.popular}
                    onChange={(e) => setNewGift({ ...newGift, popular: e.target.checked })}
                    className="rounded text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Highlight as Bestseller</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddGiftOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Add Gift Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Edit Existing Gift Catalogue Item */}
      {editingGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingGift(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-4">
              Edit Gift Item
            </h3>

            <form onSubmit={handleSaveEditedGift} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Package / Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingGift.name}
                  onChange={(e) => setEditingGift({ ...editingGift, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-pink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Category
                  </label>
                  <select
                    value={editingGift.category}
                    onChange={(e) =>
                      setEditingGift({
                        ...editingGift,
                        category: e.target.value as GiftItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-pink"
                  >
                    <option value="Wrapping of EruIyawo">Wrapping of EruIyawo</option>
                    <option value="Corporate Gifts">Corporate Gifts</option>
                    <option value="Hampers">Hampers</option>
                    <option value="Souvenirs">Souvenirs</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Bespoke">Bespoke</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                    Price (in NGN ₦)
                  </label>
                  <input
                    type="number"
                    value={editingGift.price}
                    onChange={(e) =>
                      setEditingGift({ ...editingGift, price: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-pink"
                  />
                </div>
              </div>

              {/* Upload image for gift */}
              <div className="p-4 rounded-xl bg-brand-blush-pink/30 border border-brand-pink/20 space-y-3">
                <label className="block uppercase font-semibold text-brand-plum/80">
                  Gift Photograph
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={giftEditFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileConversion(file, (dataUrl) => {
                          setEditingGift({ ...editingGift, image: dataUrl });
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => giftEditFileRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <span className="text-[11px] text-brand-plum/50">or edit URL below</span>
                </div>

                <input
                  type="text"
                  required
                  value={editingGift.image}
                  onChange={(e) => setEditingGift({ ...editingGift, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-brand-warm-border text-xs text-brand-plum focus:outline-brand-pink"
                />

                {editingGift.image && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-brand-warm-border bg-black/5 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingGift.image}
                      alt="Gift Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingGift.description}
                  onChange={(e) =>
                    setEditingGift({ ...editingGift, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-pink"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-brand-plum font-medium">
                  <input
                    type="checkbox"
                    checked={editingGift.inStock}
                    onChange={(e) =>
                      setEditingGift({ ...editingGift, inStock: e.target.checked })
                    }
                    className="rounded text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Currently Available / In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-brand-plum font-medium">
                  <input
                    type="checkbox"
                    checked={editingGift.popular || false}
                    onChange={(e) =>
                      setEditingGift({ ...editingGift, popular: e.target.checked })
                    }
                    className="rounded text-brand-pink focus:ring-brand-pink"
                  />
                  <span>Highlight as Bestseller</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGift(null)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
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
