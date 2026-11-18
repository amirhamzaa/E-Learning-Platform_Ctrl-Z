"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CloudUpload,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Headphones,
  IdCard,
  Landmark,
  Laptop,
  Link2,
  LockKeyhole,
  Megaphone,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
  Upload,
  Video,
  Wallet,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  PROFILE_INITIAL_DOMAINS,
  PROFILE_INITIAL_STATE,
  PROFILE_NOTIFICATION_CHANNELS,
  PROFILE_SESSIONS,
} from "@/data/profileSettings";
import { SystemAdminShell } from "@/components/dashboard/SystemAdminShell";

const SETTINGS_TABS = [
  { id: "personal", label: "Personal Information", icon: "id" },
  { id: "credentials", label: "Instructor Credentials & Bio", icon: "school" },
  { id: "security", label: "Account Security & 2FA", icon: "lock", dot: true },
  { id: "notifications", label: "Notification Channels", icon: "bell" },
  { id: "payout", label: "Payouts & Banking", icon: "wallet", badge: "bKash Active" },
];

function renderTabIcon(icon) {
  const cls = "w-5 h-5 shrink-0";
  switch (icon) {
    case "id":
      return <IdCard className={cls} aria-hidden="true" />;
    case "school":
      return <GraduationCap className={cls} aria-hidden="true" />;
    case "lock":
      return <LockKeyhole className={cls} aria-hidden="true" />;
    case "bell":
      return <BellRing className={cls} aria-hidden="true" />;
    default:
      return <Wallet className={cls} aria-hidden="true" />;
  }
}

function renderNotifIcon(icon) {
  switch (icon) {
    case "video":
      return <Video className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />;
    case "assignment":
      return <ClipboardCheck className="w-6 h-6 text-secondary shrink-0" aria-hidden="true" />;
    case "forum":
      return <MessageSquare className="w-6 h-6 text-tertiary shrink-0" aria-hidden="true" />;
    default:
      return <Megaphone className="w-6 h-6 text-outline shrink-0" aria-hidden="true" />;
  }
}

export function ProfileSettingsView() {
  const [activeTab, setActiveTab] = useState("personal");
  const [form, setForm] = useState(PROFILE_INITIAL_STATE);
  const [domains, setDomains] = useState(PROFILE_INITIAL_DOMAINS);
  const [addingDomain, setAddingDomain] = useState(false);
  const [newDomainText, setNewDomainText] = useState("");
  const [passwords, setPasswords] = useState({
    current: "••••••••••••••",
    next: "",
    confirm: "",
  });
  const [sessions, setSessions] = useState(PROFILE_SESSIONS);
  const [notifPrefs, setNotifPrefs] = useState(() => {
    const initial = {};
    PROFILE_NOTIFICATION_CHANNELS.forEach((channel) => {
      initial[channel.id] = {};
      channel.options.forEach((opt) => {
        initial[channel.id][opt.key] = opt.defaultChecked;
      });
    });
    return initial;
  });
  const [editingBank, setEditingBank] = useState(false);
  const [bankRouting, setBankRouting] = useState("225271829");
  const [saveMessage, setSaveMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const avatarInputRef = useRef(null);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setValidationError("");
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("avatar", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddDomain = (event) => {
    event.preventDefault();
    const trimmed = newDomainText.trim();
    if (!trimmed) return;
    setDomains((prev) => [
      ...prev,
      { id: `dom-${Date.now()}`, label: trimmed, primary: false },
    ]);
    setNewDomainText("");
    setAddingDomain(false);
  };

  const removeDomain = (id) => {
    setDomains((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleNotif = (channelId, optKey) => {
    setNotifPrefs((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [optKey]: !prev[channelId][optKey],
      },
    }));
  };

  const handleSave = () => {
    if (!form.fullNameEn.trim() || !form.email.includes("@")) {
      setValidationError("Full Name (English) and a valid Email Address are required.");
      setActiveTab("personal");
      return;
    }
    if (passwords.next && passwords.next !== passwords.confirm) {
      setValidationError("New password and confirmation do not match.");
      setActiveTab("security");
      return;
    }
    setValidationError("");
    setSaveMessage("Profile updated successfully!");
    setTimeout(() => setSaveMessage(""), 2500);
  };

  const handleDiscard = () => {
    setForm(PROFILE_INITIAL_STATE);
    setDomains(PROFILE_INITIAL_DOMAINS);
    setPasswords({ current: "••••••••••••••", next: "", confirm: "" });
    setSessions(PROFILE_SESSIONS);
    setValidationError("");
    setSaveMessage("Draft changes discarded.");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const passwordStrength = (() => {
    const val = passwords.next;
    if (!val) return { label: "Strong", score: "82/100", segments: 3 };
    let score = 0;
    if (val.length >= 8) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;
    const labels = ["Weak", "Fair", "Good", "Strong", "Excellent"];
    return {
      label: labels[score],
      score: `${score * 24 + 4}/100`,
      segments: Math.max(1, score),
    };
  })();

  return (
    <SystemAdminShell activeNav="profile-settings">
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg">
        <div>
          <div className="flex items-center gap-space-xs font-caption text-caption text-outline uppercase tracking-wider mb-1">
            <span>Settings</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Account &amp; Faculty</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-primary font-semibold">Faculty Profile</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline-md text-headline-md text-on-surface">
              Faculty Account &amp; Preferences
            </h1>
            <span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-container/15 text-tertiary font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              Profile 94% Complete
            </span>
          </div>
        </div>

        {/* Active Role Meta Badge */}
        <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-2 rounded-xl self-start md:self-auto">
          <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-[18px] h-[18px]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-caption text-caption text-outline uppercase">Active Mode</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Instructor &amp; Faculty Member
            </span>
          </div>
          <span className="ml-space-xs px-2 py-0.5 rounded bg-surface-container-highest font-caption text-caption text-on-surface-variant font-mono">
            ID: INST-4091
          </span>
        </div>
      </div>

      {validationError && (
        <div className="mb-space-md p-3.5 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
          {validationError}
        </div>
      )}

      {/* Main Settings Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Navigation Pill Tabs */}
        <div className="lg:col-span-3 flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
          <div className="px-space-sm py-2 mb-1">
            <span className="font-caption text-caption text-outline uppercase tracking-wider">
              Account Sections
            </span>
          </div>

          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  isActive
                    ? "w-full flex items-center justify-between px-space-md py-3 rounded-lg text-left transition-all bg-primary-container text-on-primary font-title-md text-title-md"
                    : "w-full flex items-center justify-between px-space-md py-3 rounded-lg text-left text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
                }
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  {renderTabIcon(tab.icon)}
                  <span className="font-label-md text-label-md truncate">{tab.label}</span>
                </div>
                {isActive ? (
                  <ArrowRight className="w-4 h-4 opacity-80 shrink-0" aria-hidden="true" />
                ) : tab.dot ? (
                  <span className="w-2 h-2 rounded-full bg-secondary-container shrink-0" />
                ) : tab.badge ? (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface-container font-caption text-outline shrink-0">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          {/* Faculty Helpdesk Box */}
          <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
              <Headphones className="w-5 h-5" aria-hidden="true" />
              <span>Faculty Helpdesk</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Need verification badges or changes to registered tax ID? Contact Academy Operations
              directly.
            </p>
            <a
              href="mailto:support@shikhbeshobai.com"
              className="font-label-sm text-label-sm text-secondary hover:underline font-semibold mt-1 flex items-center gap-1"
            >
              <span>Contact Support</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right 9-Col Content Panels */}
        <div className="lg:col-span-9 flex flex-col gap-space-lg min-w-0">
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === "personal" && (
            <section className="flex flex-col gap-space-lg">
              {/* Header Banner & Avatar Card */}
              <div className="relative bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="h-44 sm:h-56 w-full relative bg-surface-container-high overflow-hidden">
                  <Image
                    src={form.coverImage}
                    alt="Workspace header banner"
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <button
                    type="button"
                    onClick={() => {
                      setSaveMessage("Cover preview is up to date.");
                      setTimeout(() => setSaveMessage(""), 2000);
                    }}
                    className="absolute top-4 right-4 bg-surface-container-lowest/85 backdrop-blur-md hover:bg-surface-container-lowest text-on-surface px-3 py-1.5 rounded-lg font-label-sm text-label-sm flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Camera className="w-4 h-4" aria-hidden="true" />
                    <span>Change Cover Image</span>
                  </button>
                  <div className="absolute bottom-4 left-6 hidden sm:block text-white/90">
                    <span className="font-caption text-caption uppercase tracking-wider font-semibold opacity-80">
                      Workspace Header
                    </span>
                    <p className="font-label-sm text-label-sm font-medium">
                      Dhaka Studio Campus • Faculty Hub
                    </p>
                  </div>
                </div>

                {/* Avatar & Identity Bar */}
                <div className="px-space-lg pb-space-lg pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md -mt-14 sm:-mt-14 mb-space-md relative z-10">
                    <div className="flex items-end gap-space-md">
                      <div className="relative shrink-0">
                        <img
                          src={form.avatar}
                          alt={form.fullNameEn}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-md bg-surface-container p-1 ring-4 ring-white"
                        />
                        <button
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                          aria-label="Upload new photo"
                          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-all shadow-md"
                        >
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </div>

                      <div className="flex flex-col mb-1">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                            {form.fullNameEn}
                          </h2>
                          <span className="px-2 py-0.5 rounded font-caption text-caption bg-surface-container-high text-on-surface-variant font-medium">
                            {form.displayNameBn}
                          </span>
                          <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            Verified Mentor
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Senior UI/UX Instructor &amp; Figma Curriculum Designer at শিখবে সবাই
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-xs self-start sm:self-end">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-all flex items-center gap-1.5"
                      >
                        <Upload className="w-4 h-4" aria-hidden="true" />
                        <span>Upload New</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("avatar", PROFILE_INITIAL_STATE.avatar)}
                        aria-label="Reset avatar to default"
                        className="px-space-sm py-2 rounded-lg text-error hover:bg-error-container hover:text-on-error-container font-label-sm text-label-sm transition-all flex items-center"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="font-caption text-caption text-outline">
                    Supported format: JPG, WebP, or PNG (Max 2MB). Recommended square aspect ratio
                    1:1.
                  </p>
                </div>
              </div>

              {/* Primary Identification Form */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Primary Identification
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Update your public identity and direct student contact routes.
                    </p>
                  </div>
                  <span className="font-caption text-caption text-outline bg-surface-container px-2 py-1 rounded">
                    Language Sync: EN / BN
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="full-name-en"
                      className="font-label-sm text-label-sm text-on-surface font-medium flex items-center justify-between"
                    >
                      <span>
                        Full Name (English) <span className="text-error">*</span>
                      </span>
                      <span className="font-caption text-caption text-outline">
                        Official records
                      </span>
                    </label>
                    <input
                      id="full-name-en"
                      type="text"
                      value={form.fullNameEn}
                      onChange={(event) => updateField("fullNameEn", event.target.value)}
                      className="w-full px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md bg-surface-container-low/70 focus:bg-surface-container-low focus:ring-2 focus:ring-primary-container/25 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="display-name-bn"
                      className="font-label-sm text-label-sm text-on-surface font-medium flex items-center justify-between"
                    >
                      <span>Display Name in Bangla (বাংলা নাম)</span>
                      <span className="font-caption text-caption text-outline">Student view</span>
                    </label>
                    <input
                      id="display-name-bn"
                      type="text"
                      value={form.displayNameBn}
                      onChange={(event) => updateField("displayNameBn", event.target.value)}
                      className="w-full px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md bg-surface-container-low/70 focus:bg-surface-container-low focus:ring-2 focus:ring-primary-container/25 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profile-email"
                        className="font-label-sm text-label-sm text-on-surface font-medium"
                      >
                        Email Address <span className="text-error">*</span>
                      </label>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Verified Primary
                      </span>
                    </div>
                    <input
                      id="profile-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="w-full bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary-container/25 outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profile-phone"
                        className="font-label-sm text-label-sm text-on-surface font-medium"
                      >
                        Contact Number <span className="text-error">*</span>
                      </label>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        OTP Verified
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-20 flex items-center justify-center bg-surface-container-high rounded-lg font-body-sm text-body-sm font-semibold text-on-surface shrink-0">
                        +880
                      </div>
                      <input
                        id="profile-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className="flex-1 bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary-container/25 outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label
                      htmlFor="profile-headline"
                      className="font-label-sm text-label-sm text-on-surface font-medium"
                    >
                      Professional Headline
                    </label>
                    <input
                      id="profile-headline"
                      type="text"
                      value={form.headline}
                      onChange={(event) => updateField("headline", event.target.value)}
                      className="w-full bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary-container/25 outline-none"
                    />
                    <p className="font-caption text-caption text-outline">
                      Displays under your name across course landing pages, search results, and
                      student batch dashboards.
                    </p>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profile-bio"
                        className="font-label-sm text-label-sm text-on-surface font-medium"
                      >
                        Faculty Bio &amp; Teaching Philosophy
                      </label>
                      <span className="font-caption text-caption text-outline">
                        {form.bio.length} / 600 characters
                      </span>
                    </div>
                    <textarea
                      id="profile-bio"
                      rows={4}
                      maxLength={600}
                      value={form.bio}
                      onChange={(event) => updateField("bio", event.target.value)}
                      className="w-full bg-surface-container-low/70 p-space-md rounded-lg text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary-container/25 outline-none leading-relaxed resize-none"
                    />
                  </div>
                </div>

                {/* Social & Portfolio Links */}
                <div className="pt-space-md flex flex-col gap-space-md">
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-2">
                    <Link2 className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
                    <span>Professional Portfolio &amp; Social Links</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {[
                      { code: "IN", key: "linkedin", placeholder: "LinkedIn URL" },
                      { code: "GH", key: "github", placeholder: "GitHub URL" },
                      { code: "BE", key: "behance", placeholder: "Portfolio / Behance" },
                      { code: "FB", key: "facebook", placeholder: "Facebook Profile" },
                    ].map((social) => (
                      <div
                        key={social.key}
                        className="flex items-center bg-surface-container-low/70 rounded-lg px-3 py-2"
                      >
                        <span className="w-8 text-outline font-caption text-caption font-bold">
                          {social.code}
                        </span>
                        <input
                          type="url"
                          value={form[social.key]}
                          onChange={(event) => updateField(social.key, event.target.value)}
                          placeholder={social.placeholder}
                          aria-label={social.placeholder}
                          className="w-full bg-transparent outline-none font-body-sm text-body-sm text-on-surface"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: INSTRUCTOR CREDENTIALS & BIO */}
          {activeTab === "credentials" && (
            <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Teaching Domain &amp; Mentorship Spec
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Classify your batch allocations, course subject taxonomies, and 1-on-1
                  availability.
                </p>
              </div>

              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface font-medium">
                  Primary Specialization Tags
                </span>
                <div className="flex flex-wrap gap-2 p-space-sm bg-surface-container-low rounded-lg">
                  {domains.map((dom) => (
                    <span
                      key={dom.id}
                      className={`px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 ${
                        dom.primary
                          ? "bg-primary-container text-on-primary"
                          : "bg-surface-container-highest text-on-surface"
                      }`}
                    >
                      <span>{dom.label}</span>
                      <button
                        type="button"
                        onClick={() => removeDomain(dom.id)}
                        aria-label={`Remove ${dom.label}`}
                        className="hover:opacity-75"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                  {addingDomain ? (
                    <form onSubmit={handleAddDomain} className="inline-flex items-center gap-1">
                      <input
                        type="text"
                        value={newDomainText}
                        onChange={(event) => setNewDomainText(event.target.value)}
                        placeholder="e.g. React Native"
                        className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm outline-none w-36"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-caption text-caption font-semibold"
                      >
                        Add
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingDomain(true)}
                      className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-lowest text-primary flex items-center gap-1 hover:bg-surface-container-high transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Add Domain</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-outline uppercase">
                    Industry Experience
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    7+ Years
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Validated via portfolio audit
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-outline uppercase">
                    Active Batches
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                    4 Running
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Batch 402, 408, 411, VIP-12
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-outline uppercase">
                    Graduated Trainees
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary">
                    1,840+
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    88.4% job placement rate
                  </span>
                </div>
              </div>

              {/* 1-on-1 Availability Toggle */}
              <div className="p-space-md rounded-xl bg-tertiary-container/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface font-semibold">
                      Available for 1-on-1 Student Counseling
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Allows active batch learners to book 20-minute portfolio critique slots.
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={form.counselingAvailable}
                    onChange={(event) => updateField("counselingAvailable", event.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary-container" />
                </label>
              </div>

              {/* CV Attachment */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface font-medium">
                  Curriculum Vitae &amp; Accreditation Record
                </span>
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-space-md min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                      <FileText className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                        Ariful_Islam_Lead_Instructor_CV_2025.pdf
                      </span>
                      <span className="font-caption text-caption text-outline">
                        2.4 MB • Uploaded on Jan 14, 2025 • Verified by Academic Dean
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSaveMessage("CV verification record is active.");
                        setTimeout(() => setSaveMessage(""), 2000);
                      }}
                      aria-label="Preview CV"
                      className="p-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaveMessage("Upload dialog is UI-only in frontend preview.");
                        setTimeout(() => setSaveMessage(""), 2000);
                      }}
                      aria-label="Replace CV"
                      className="p-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors"
                    >
                      <CloudUpload className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: ACCOUNT SECURITY & 2FA */}
          {activeTab === "security" && (
            <section className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
                <div>
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Password &amp; Credentials
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Ensure your faculty account uses a robust multi-character passphrase.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="pw-current"
                      className="font-label-sm text-label-sm text-on-surface font-medium"
                    >
                      Current Password
                    </label>
                    <input
                      id="pw-current"
                      type="password"
                      value={passwords.current}
                      onChange={(event) =>
                        setPasswords((p) => ({ ...p, current: event.target.value }))
                      }
                      className="bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="pw-new"
                      className="font-label-sm text-label-sm text-on-surface font-medium"
                    >
                      New Password
                    </label>
                    <input
                      id="pw-new"
                      type="password"
                      placeholder="At least 8 characters"
                      value={passwords.next}
                      onChange={(event) =>
                        setPasswords((p) => ({ ...p, next: event.target.value }))
                      }
                      className="bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="pw-confirm"
                      className="font-label-sm text-label-sm text-on-surface font-medium"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="pw-confirm"
                      type="password"
                      placeholder="Re-enter password"
                      value={passwords.confirm}
                      onChange={(event) =>
                        setPasswords((p) => ({ ...p, confirm: event.target.value }))
                      }
                      className="bg-surface-container-low/70 px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md outline-none"
                    />
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">
                      Passphrase Strength:{" "}
                      <span className="text-tertiary font-bold">{passwordStrength.label}</span>
                    </span>
                    <span className="font-caption text-caption text-outline">
                      Entropy {passwordStrength.score}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className={`h-full w-1/4 rounded-full ${
                          seg <= passwordStrength.segments ? "bg-tertiary" : "bg-surface-dim"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-caption text-caption text-outline">
                    Includes lowercase, uppercase, numerals, and special characters.
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface font-semibold">
                      Two-Factor Authentication (2FA)
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Secured via Authenticator App (Google / 1Password) &amp; SMS Fallback (+880
                      1712-***678)
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                  Enforced Active
                </span>
              </div>

              {/* Active Device Sessions */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Active Device Sessions
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Devices currently logged into your শিখবে সবাই faculty portal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSessions((prev) => prev.filter((s) => s.current))}
                    className="px-space-md py-1.5 rounded-lg bg-error-container text-on-error-container hover:opacity-90 font-label-sm text-label-sm font-semibold transition-all"
                  >
                    Log Out Other Sessions
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[540px]">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase">
                        <th className="py-2.5 px-space-md rounded-l-lg">Device &amp; Browser</th>
                        <th className="py-2.5 px-space-md">Location</th>
                        <th className="py-2.5 px-space-md">IP Address</th>
                        <th className="py-2.5 px-space-md">Last Active</th>
                        <th className="py-2.5 px-space-md rounded-r-lg text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-sm text-body-sm text-on-surface">
                      {sessions.map((sess) => (
                        <tr key={sess.id} className="hover:bg-surface-bright transition-colors">
                          <td className="py-3 px-space-md flex items-center gap-2">
                            {sess.type === "laptop" ? (
                              <Laptop className="w-4 h-4 text-tertiary" aria-hidden="true" />
                            ) : (
                              <Smartphone className="w-4 h-4 text-outline" aria-hidden="true" />
                            )}
                            <span className={sess.current ? "font-semibold" : ""}>
                              {sess.device}
                            </span>
                          </td>
                          <td className="py-3 px-space-md text-on-surface-variant">
                            {sess.location}
                          </td>
                          <td className="py-3 px-space-md font-mono text-caption text-outline">
                            {sess.ip}
                          </td>
                          <td className="py-3 px-space-md">{sess.lastActive}</td>
                          <td className="py-3 px-space-md text-right">
                            {sess.current ? (
                              <span className="px-2 py-0.5 rounded-full font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                                Current Device
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setSessions((prev) => prev.filter((item) => item.id !== sess.id))
                                }
                                className="font-label-sm text-label-sm text-error hover:underline"
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: NOTIFICATION CHANNELS */}
          {activeTab === "notifications" && (
            <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Faculty Notification Channels
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Control delivery methods for real-time course operations and student inquiries.
                </p>
              </div>
              <div className="flex flex-col gap-space-md">
                {PROFILE_NOTIFICATION_CHANNELS.map((channel) => (
                  <div
                    key={channel.id}
                    className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-space-md">
                      {renderNotifIcon(channel.icon)}
                      <div>
                        <h3 className="font-label-md text-label-md text-on-surface font-semibold">
                          {channel.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {channel.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-md shrink-0">
                      {channel.options.map((opt) => (
                        <label
                          key={opt.key}
                          className="flex items-center gap-2 font-caption text-caption text-on-surface cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(notifPrefs[channel.id]?.[opt.key])}
                            onChange={() => toggleNotif(channel.id, opt.key)}
                            className="rounded accent-primary w-4 h-4 cursor-pointer"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 5: PAYOUTS & BANKING */}
          {activeTab === "payout" && (
            <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Faculty Payout &amp; Remittance Channels
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Monthly honorarium and course commission settlement accounts (Bangladeshi Taka /
                  BDT).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-[#E2136E] text-white flex items-center justify-center font-bold text-xs tracking-tighter shrink-0">
                        bKash
                      </div>
                      <div>
                        <h3 className="font-label-md text-label-md text-on-surface font-bold">
                          bKash Mobile Wallet
                        </h3>
                        <span className="font-caption text-caption text-outline">
                          Primary Payout Method
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-caption text-caption text-outline block">
                        Registered Wallet Number
                      </span>
                      <span className="font-title-md text-title-md font-mono text-on-surface font-bold">
                        +880 1712-345678
                      </span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-tertiary" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                        <Landmark className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-label-md text-label-md text-on-surface font-bold">
                          City Bank Ltd.
                        </h3>
                        <span className="font-caption text-caption text-outline">
                          Dhanmondi Branch, Dhaka
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-caption text-caption bg-surface-container-highest text-on-surface-variant font-medium">
                      Secondary
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between gap-2">
                    <div>
                      <span className="font-caption text-caption text-outline block">
                        A/C Number: 1102****8920
                      </span>
                      {editingBank ? (
                        <input
                          type="text"
                          value={bankRouting}
                          onChange={(event) => setBankRouting(event.target.value)}
                          aria-label="Bank routing number"
                          className="mt-1 px-2 py-0.5 rounded bg-surface-container-low font-mono text-label-sm text-on-surface outline-none w-32"
                        />
                      ) : (
                        <span className="font-label-sm text-label-sm text-on-surface font-medium">
                          Routing: {bankRouting}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingBank((prev) => !prev)}
                      className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
                    >
                      {editingBank ? "Done" : "Edit"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Persistent Sticky Action Bar */}
          <div className="sticky bottom-4 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-md flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
              <span className="font-caption text-caption">All draft changes cached locally</span>
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all"
              >
                Discard Changes
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" aria-hidden="true" />
                  <span>Save Changes</span>
                </button>

                {saveMessage && (
                  <div className="absolute right-0 -top-11 bg-on-surface text-surface px-3 py-1.5 rounded-lg font-caption text-caption whitespace-nowrap shadow-lg">
                    {saveMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SystemAdminShell>
  );
}
