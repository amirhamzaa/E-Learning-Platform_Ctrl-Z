"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  IdCard,
  KeyRound,
  Link2,
  Lock,
  LockOpen,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

const AUTH_TABS = [
  { id: "login", label: "Student Login", icon: "login" },
  { id: "register", label: "Student Register", icon: "register" },
  { id: "instructor", label: "Instructor Apply", icon: "instructor" },
  { id: "recovery", label: "Password & OTP", icon: "recovery" },
];

export function AuthSuiteView() {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["4", "8", "9", "2", "1", "0"]);
  const [countdown, setCountdown] = useState(45);
  const [resetNewPw, setResetNewPw] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const otpRefs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return undefined;
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const showAlert = (msg) => {
    setAlertMsg(msg);
  };

  const handleOtpChange = (index, val) => {
    const cleaned = val.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[index] = cleaned;
    setOtpDigits(next);
    if (cleaned && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const strengthLevel = (() => {
    if (!resetNewPw) return { label: "Strong (Recommended)", bars: 3 };
    let score = 1;
    if (resetNewPw.length >= 8) score = 2;
    if (resetNewPw.length >= 8 && /[A-Z]/.test(resetNewPw) && /[0-9]/.test(resetNewPw)) score = 3;
    return {
      label: score === 1 ? "Weak" : score === 2 ? "Moderate" : "Strong (Recommended)",
      bars: score,
    };
  })();

  const handleFormSubmit = (event, message) => {
    event.preventDefault();
    showAlert(message);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader />

      <main className="w-full pt-20 flex-1">
        {/* Top Auxiliary Navigation */}
        <div className="w-full max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-sm flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary-container font-label-md text-label-md transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
            <span>Back to Homepage</span>
          </Link>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-caption text-caption">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
            <span>Secure TLS 1.3 Certified Environment</span>
          </div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-gutter-mobile md:px-gutter pb-space-xl">
          {/* Eyebrow Subtitle (Logo already cleanly displayed in SiteHeader) */}
          <div className="flex flex-col items-center justify-center pt-space-xs pb-space-md text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm font-caption text-caption text-on-surface-variant uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              Unified Academic Identity • Bangladesh
            </span>
          </div>

          {/* Interactive Segmented Auth Tabs */}
          <div className="w-full max-w-2xl mx-auto mb-space-lg">
            <div
              role="tablist"
              aria-label="Authentication Suite Tabs"
              className="bg-surface-container-high/70 p-1.5 rounded-xl backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-1 shadow-inner"
            >
              {AUTH_TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setAlertMsg("");
                    }}
                    className={`w-full py-2.5 px-3 rounded-lg font-label-md text-label-md text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      active
                        ? "bg-primary-container text-on-primary shadow-sm font-semibold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {tab.icon === "login" && <LockOpen className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    {tab.icon === "register" && <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    {tab.icon === "instructor" && <Award className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    {tab.icon === "recovery" && <Shield className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Auth Master Card */}
          <div className="relative w-full max-w-2xl mx-auto bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary-container via-secondary to-tertiary-container" />

            {/* VIEW A: STUDENT LOGIN */}
            {activeTab === "login" && (
              <section className="p-space-md sm:p-space-xl flex flex-col gap-space-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm mb-space-xs">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Welcome Back Learner</span>
                  </div>
                  <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-semibold">
                    Sign in to your learning vault
                  </h1>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Access your registered courses, live Zoom classrooms, mentor critiques, and peer
                    projects.
                  </p>
                </div>

                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "Student login inputs validated (frontend preview only — no backend auth)."
                    )
                  }
                  className="flex flex-col gap-space-md"
                >
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="suite-login-id"
                      className="font-label-md text-label-md text-on-surface font-medium flex items-center justify-between"
                    >
                      <span>Email Address or Student ID</span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        e.g. SS-89420
                      </span>
                    </label>
                    <div className="relative">
                      <IdCard
                        aria-hidden="true"
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                      />
                      <input
                        id="suite-login-id"
                        type="text"
                        required
                        placeholder="name@shikhbeshobai.com or SS-ID"
                        className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="suite-login-pw"
                        className="font-label-md text-label-md text-on-surface font-medium"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveTab("recovery")}
                        className="font-label-sm text-label-sm text-primary-container hover:text-primary underline underline-offset-2"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound
                        aria-hidden="true"
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                      />
                      <input
                        id="suite-login-pw"
                        type={showLoginPw ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPw((p) => !p)}
                        aria-label="Toggle password visibility"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showLoginPw ? (
                          <EyeOff className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-md flex items-center justify-center gap-2 mt-space-xs"
                  >
                    <span>Sign In to Student Dashboard</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>

                <div className="pt-space-xs border-t border-surface-container text-center">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Don&apos;t have an enrolled profile yet?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      className="text-primary-container font-semibold hover:underline"
                    >
                      Register as Student
                    </button>
                  </p>
                </div>
              </section>
            )}

            {/* VIEW B: STUDENT REGISTER */}
            {activeTab === "register" && (
              <section className="p-space-md sm:p-space-xl flex flex-col gap-space-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm mb-space-xs">
                    <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Batch Enrolment Portal</span>
                  </div>
                  <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-semibold">
                    Start Your Tech Career Journey
                  </h2>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Join 45,000+ graduates across Web Development, UI/UX Engineering, Data Analysis,
                    and Modern DevOps.
                  </p>
                </div>

                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "Student registration validated! OTP step preview available in Password & OTP tab."
                    )
                  }
                  className="flex flex-col gap-space-md"
                >
                  <div className="flex flex-col gap-1">
                    <label htmlFor="suite-reg-name" className="font-label-md text-label-md text-on-surface font-medium">
                      Full Name (English as per NID / Passport)
                    </label>
                    <div className="relative">
                      <User aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input
                        id="suite-reg-name"
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed Chowdhury"
                        className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="suite-reg-email" className="font-label-md text-label-md text-on-surface font-medium">
                        Active Email Address
                      </label>
                      <div className="relative">
                        <Mail aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          id="suite-reg-email"
                          type="email"
                          required
                          placeholder="tanvir.dev@gmail.com"
                          className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="suite-reg-phone" className="font-label-md text-label-md text-on-surface font-medium">
                        Phone (+880 BD Mobile)
                      </label>
                      <div className="relative">
                        <Phone aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          id="suite-reg-phone"
                          type="tel"
                          required
                          placeholder="+880 1712345678"
                          className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="suite-reg-pw" className="font-label-md text-label-md text-on-surface font-medium">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          id="suite-reg-pw"
                          type={showRegPw ? "text" : "password"}
                          required
                          placeholder="Min. 8 characters"
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPw((p) => !p)}
                          aria-label="Toggle registration password visibility"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        >
                          {showRegPw ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="suite-reg-cpw" className="font-label-md text-label-md text-on-surface font-medium">
                        Confirm Password
                      </label>
                      <input
                        id="suite-reg-cpw"
                        type="password"
                        required
                        placeholder="Re-type password"
                        className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Create Student Account &amp; Verify OTP</span>
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              </section>
            )}

            {/* VIEW C: INSTRUCTOR APPLY */}
            {activeTab === "instructor" && (
              <section className="p-space-md sm:p-space-xl flex flex-col gap-space-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm mb-space-xs">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Faculty &amp; Mentor Recruitment</span>
                  </div>
                  <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-semibold">
                    Join Shikhbe Shobai as a Mentor
                  </h2>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    Inspire the next wave of engineers and creatives with industry-tested curricula
                    and competitive compensation.
                  </p>
                </div>

                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "Faculty application received in UI preview. Academic board responds within 48 hours."
                    )
                  }
                  className="flex flex-col gap-space-md"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <input
                      type="text"
                      required
                      aria-label="Instructor Legal Name"
                      placeholder="Instructor Legal Name"
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                    />
                    <input
                      type="email"
                      required
                      aria-label="Corporate Email"
                      placeholder="mentor@company.com"
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="relative">
                      <Briefcase aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input
                        type="text"
                        required
                        aria-label="Professional Headline"
                        placeholder="e.g. Lead Staff Architect at Pathao"
                        className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                    </div>
                    <div className="relative">
                      <Smartphone aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input
                        type="tel"
                        required
                        aria-label="WhatsApp Number"
                        placeholder="+880 1XXXXXXXXX"
                        className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Link2 aria-hidden="true" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="url"
                      required
                      aria-label="Portfolio or LinkedIn URL"
                      placeholder="https://linkedin.com/in/username or https://github.com/..."
                      className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-space-lg rounded-lg bg-secondary hover:bg-primary-container text-on-primary font-title-md text-title-md transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Submit Faculty Application &amp; Portfolio for Review</span>
                  </button>
                </form>
              </section>
            )}

            {/* VIEW D: PASSWORD & 6-DIGIT OTP */}
            {activeTab === "recovery" && (
              <section className="p-space-md sm:p-space-xl flex flex-col gap-space-lg">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm mb-space-xs">
                    <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Two-Factor Authentication &amp; Recovery</span>
                  </div>
                  <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-semibold">
                    Account Recovery &amp; 6-Digit OTP
                  </h2>
                  <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">
                    We will dispatch an instantaneous one-time passcode to your registered mobile
                    and secondary security email.
                  </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex flex-col items-center justify-center gap-space-sm py-space-xs">
                  <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                    Enter 6-Digit OTP Security Code
                  </span>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otpDigits.map((digit, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2">
                        {idx === 3 && (
                          <span className="text-on-surface-variant font-bold text-lg select-none">
                            •
                          </span>
                        )}
                        <input
                          ref={(el) => {
                            otpRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          aria-label={`OTP digit ${idx + 1}`}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-10 h-12 sm:w-12 sm:h-14 text-center font-headline-md text-headline-md font-bold text-primary-container bg-surface-container-low rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                        />
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-caption text-caption">
                    <Timer className="w-4 h-4 text-tertiary" aria-hidden="true" />
                    <span>
                      Resend Code in{" "}
                      <span className="font-bold text-on-surface font-mono">
                        00:{String(countdown).padStart(2, "0")}s
                      </span>
                    </span>
                    <button
                      type="button"
                      disabled={countdown > 0}
                      onClick={() => {
                        setCountdown(45);
                        showAlert("Fresh 6-digit OTP dispatched (UI preview).");
                      }}
                      className="ml-2 text-primary-container underline font-semibold disabled:opacity-40 disabled:no-underline"
                    >
                      Resend Now
                    </button>
                  </div>
                </div>

                {/* New Password & Strength */}
                <form
                  onSubmit={(e) =>
                    handleFormSubmit(
                      e,
                      "Password strength & OTP format validated (frontend UI preview)."
                    )
                  }
                  className="flex flex-col gap-space-md"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <input
                      type="password"
                      required
                      value={resetNewPw}
                      onChange={(e) => setResetNewPw(e.target.value)}
                      aria-label="New Secure Password"
                      placeholder="New Secure Password"
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                    />
                    <input
                      type="password"
                      required
                      aria-label="Confirm New Password"
                      placeholder="Confirm New Password"
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20"
                    />
                  </div>

                  <div className="bg-surface-container-low/60 p-3 rounded-lg flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-caption text-caption">
                      <span className="text-on-surface-variant">Complexity Assessment:</span>
                      <span className="font-bold text-secondary">{strengthLevel.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full">
                      {[1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className={`h-full rounded-full ${
                            idx <= strengthLevel.bars
                              ? idx === 3
                                ? "bg-tertiary-container"
                                : "bg-secondary"
                              : "bg-surface-container-high"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" aria-hidden="true" />
                    <span>Update Password &amp; Log In</span>
                  </button>
                </form>
              </section>
            )}

            {/* Inline Alert Banner */}
            {alertMsg && (
              <div className="mx-space-md sm:mx-space-xl mb-space-md p-space-sm rounded-lg bg-tertiary-container text-on-tertiary font-body-sm text-body-sm flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{alertMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAlertMsg("")}
                  aria-label="Dismiss notification"
                  className="hover:opacity-80"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {/* Security Trust Badges */}
          <div className="w-full max-w-2xl mx-auto mt-space-lg grid grid-cols-1 md:grid-cols-3 gap-space-sm text-center">
            <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-sm flex flex-col items-center gap-1">
              <Lock className="w-5 h-5 text-tertiary" aria-hidden="true" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                256-Bit SSL Enforced
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                End-to-end payload encryption
              </span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-sm flex flex-col items-center gap-1">
              <BadgeCheck className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Verified BD Academic Portal
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                45,000+ certified alumni
              </span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-sm flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                2FA &amp; OTP Protected
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                SMS &amp; Email recovery guard
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
