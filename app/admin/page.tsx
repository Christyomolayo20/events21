"use client";

import React, { useState, useEffect } from "react";
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
  getPortfolio,
  addPortfolioItem,
  getBrandConfig,
  updateBrandConfig,
} from "@/lib/store";
import { EventEnquiry, GiftRequest, PortfolioItem } from "@/lib/types";
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
  const [config, setConfig] = useState(getBrandConfig());

  // Filter & Search
  const [enquirySearch, setEnquirySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EventEnquiry | null>(null);

  // New Portfolio Modal
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
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

  // Settings form
  const [settingsSaved, setSettingsSaved] = useState(false);

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
    window.addEventListener("events21_settings_updated", handleUpdate);

    return () => {
      window.removeEventListener("events21_enquiries_updated", handleUpdate);
      window.removeEventListener("events21_gifts_updated", handleUpdate);
      window.removeEventListener("events21_portfolio_updated", handleUpdate);
      window.removeEventListener("events21_settings_updated", handleUpdate);
    };
  }, []);

  const loadData = () => {
    setEnquiries(getEnquiries());
    setGifts(getGiftRequests());
    setPortfolio(getPortfolio());
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

  const handleStatusChange = (id: string, newStatus: EventEnquiry["status"]) => {
    updateEnquiryStatus(id, newStatus);
    loadData();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this enquiry?")) {
      deleteEnquiry(id);
      loadData();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.image) return;
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

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
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
            Admin Portal
          </h1>
          <p className="text-xs text-brand-plum/70 font-sans mb-6">
            Enter the authorized admin password to access lead inquiries, Gifts by Adeola orders,
            and portfolio management.
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
              className="w-full py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
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
      <div className="bg-brand-plum text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-brand-plum-dark sticky top-0 z-30">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-sans font-medium transition-colors"
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
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
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
            onClick={() => setActiveTab("gifts")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
              activeTab === "gifts"
                ? "bg-brand-pink text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Gifts by Adeola Requests</span>
            <span className="px-1.5 py-0.5 rounded-full bg-brand-pink/15 text-brand-pink text-[10px] ml-1">
              {gifts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("portfolio")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
              activeTab === "portfolio"
                ? "bg-brand-plum text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Portfolio Manager</span>
            <span className="px-1.5 py-0.5 rounded-full bg-brand-warm-border text-brand-plum text-[10px] ml-1">
              {portfolio.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-brand-plum text-white shadow-xs"
                : "bg-white text-brand-plum/70 border border-brand-warm-border hover:bg-brand-warm-gray"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Contact Settings</span>
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
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
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-brand-warm-border hover:border-brand-purple text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
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
                                onClick={() => handleDelete(enq.id)}
                                className="p-2 inline-flex items-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* TAB 2: GIFTS BY ADEOLA REQUESTS */}
        {activeTab === "gifts" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-warm-border shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">
                  Gifts by Adeola Inquiries & Orders
                </h3>
                <p className="text-xs text-brand-plum/70 font-sans mt-1">
                  Custom gift hampers and catalogue orders submitted by clients.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gifts.map((req) => (
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

                    <a
                      href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        req.fullName
                      )}!%20This%20is%20Adeola%20from%20Gifts%20by%20Adeola%20following%20up%20on%20your%20custom%20gift%20request.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Adeola</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PORTFOLIO MANAGER */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-warm-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">
                  Portfolio Showcase Manager
                </h3>
                <p className="text-xs text-brand-plum/70 font-sans mt-1">
                  Highlight verified projects, add new gallery pieces, or manage active showcases.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPortfolioOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-brand-warm-border overflow-hidden shadow-xs space-y-3"
                >
                  <div className="relative aspect-[16/10] bg-brand-plum">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 text-brand-plum">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 pt-2">
                    <h4 className="font-serif text-lg font-bold text-brand-plum">{item.title}</h4>
                    <p className="text-xs text-brand-plum/60 font-sans mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                    <div className="text-[11px] text-brand-gold font-sans font-medium mt-2">
                      {item.location} • {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-brand-warm-border shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
              Studio Contact & Social Information
            </h3>
            <p className="text-xs text-brand-plum/70 font-sans mb-6">
              Update the official phone, email, and Instagram links shown across the website.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Studio Phone
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
                  Official Instagram URL
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
                  Location Text
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
                  className="px-8 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold uppercase tracking-widest text-xs transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Selected Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60"
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
                  Estimated Budget Range
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
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="text-xs text-red-600 hover:underline font-sans"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Portfolio Project Modal */}
      {isAddPortfolioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-warm-border relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddPortfolioOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/60"
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

              <div>
                <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                  Image URL or Path *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/ballroom-first-dance.jpg or https://..."
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-warm-border text-sm text-brand-plum focus:outline-brand-purple"
                />
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

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPortfolioOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
