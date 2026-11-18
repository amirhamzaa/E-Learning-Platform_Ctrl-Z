"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  GraduationCap,
  MessageSquare,
  PlayCircle,
  ShieldCheck,
  Terminal,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { PAYMENT_ORDER_DATA } from "@/data/payments";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function PaymentSuccessView() {
  const [copiedTrx, setCopiedTrx] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const handleCopyTrx = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PAYMENT_ORDER_DATA.trxId).catch(() => {});
    }
    setCopiedTrx(true);
    showToast(`TRXID copied: ${PAYMENT_ORDER_DATA.trxId}`);
    setTimeout(() => setCopiedTrx(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="courses" />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" aria-hidden="true" />
          <span className="font-body-sm text-body-sm">{toast}</span>
        </div>
      )}

      <main className="w-full pt-20 flex-1">
        <div className="relative w-full overflow-hidden py-10 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none"
          />

          <div className="max-w-6xl mx-auto px-gutter-mobile sm:px-gutter relative z-10 flex flex-col gap-12">
            {/* Admissions Verification Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest/85 backdrop-blur-md px-6 py-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Accredited Career Track Admissions
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                Verified Payment · SSLCommerz Secured
              </span>
            </div>

            {/* Celebration Hero */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div className="relative flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-tertiary-container/15 flex items-center justify-center text-tertiary shadow-sm">
                  <CheckCircle2 className="w-11 h-11" aria-hidden="true" />
                </div>
                <span className="absolute -bottom-2 bg-surface-container-lowest shadow-sm text-tertiary px-3.5 py-0.5 rounded-full font-label-sm text-label-sm whitespace-nowrap">
                  Payment &amp; Enrollment Confirmed
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary-container font-semibold">
                  {PAYMENT_ORDER_DATA.batchLabel} Active
                </span>
                <h1 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight">
                  Congratulations, {PAYMENT_ORDER_DATA.studentName}!
                </h1>
                <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                  You are officially enrolled in{" "}
                  <span className="font-title-md text-on-surface font-semibold">
                    {PAYMENT_ORDER_DATA.courseTitle}
                  </span>
                  . We have generated your dynamic student profile and reserved your seat.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/student/dashboard"
                  className="flex items-center gap-2 bg-primary-container text-on-primary px-6 py-3.5 rounded-xl font-title-md text-title-md shadow-md hover:bg-primary transition-all"
                >
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  <span>Go to Student Dashboard</span>
                </Link>
                <Link
                  href="/video-learning"
                  className="flex items-center gap-2 bg-tertiary-container text-on-primary px-6 py-3.5 rounded-xl font-title-md text-title-md shadow-md hover:opacity-95 transition-all"
                >
                  <PlayCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Start Learning</span>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    showToast(`Compiling official tax invoice ${PAYMENT_ORDER_DATA.orderId}.pdf...`)
                  }
                  className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-6 py-3.5 rounded-xl font-title-md text-title-md shadow-sm hover:bg-surface-container-low transition-all"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  <span>Download Invoice (.PDF)</span>
                </button>
              </div>
            </div>

            {/* 2-Column Receipt & Cohort Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Receipt Card */}
              <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-md p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-4 gap-2">
                    <div>
                      <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant">
                        Merchant Reference
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Official Transaction Receipt
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-tertiary-container/15 text-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm shrink-0">
                      <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                      Paid &amp; Verified
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Order ID
                      </span>
                      <span className="font-title-md text-title-md text-on-surface font-mono">
                        {PAYMENT_ORDER_DATA.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Gateway TRXID
                      </span>
                      <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-lg">
                        <span className="font-title-md text-sm text-on-surface font-mono">
                          {PAYMENT_ORDER_DATA.trxId}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyTrx}
                          aria-label="Copy transaction ID"
                          className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                          {copiedTrx ? (
                            <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
                          ) : (
                            <Copy className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5 gap-2">
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Payment Method
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e2136e]" />
                        <span className="font-title-md text-body-md text-on-surface">
                          {PAYMENT_ORDER_DATA.method}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        Timestamp
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">
                        {PAYMENT_ORDER_DATA.timestamp}
                      </span>
                    </div>
                    <div className="h-px bg-surface-container-high my-2" />
                    <div className="space-y-2 py-2">
                      <div className="flex justify-between items-center">
                        <span className="font-body-md text-body-md text-on-surface-variant">
                          Standard Course Tuition
                        </span>
                        <span className="font-body-md text-body-md text-on-surface">
                          {PAYMENT_ORDER_DATA.regularFee}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-tertiary">
                        <span className="font-body-md text-body-md">
                          {PAYMENT_ORDER_DATA.discountLabel}
                        </span>
                        <span className="font-body-md text-body-md font-medium">
                          {PAYMENT_ORDER_DATA.discountAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-surface-container-low rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Settled Total Amount
                    </span>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Inclusive of all local payment taxes
                    </p>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary-container font-bold">
                    {PAYMENT_ORDER_DATA.totalPaid}
                  </span>
                </div>
              </div>

              {/* Cohort Details Card */}
              <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-md p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-4">
                    <div>
                      <span className="font-caption text-caption uppercase tracking-wider text-on-surface-variant">
                        Curriculum Roster
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Course &amp; Cohort Details
                      </h2>
                    </div>
                    <span className="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">
                      Batch #102
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary-container shrink-0">
                        <Terminal className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface">
                          {PAYMENT_ORDER_DATA.courseTitle}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Comprehensive Production-grade Track · 36 High-Impact Live Sessions
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-surface-container-low p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-primary-container mb-1">
                          <UserCheck className="w-4 h-4" aria-hidden="true" />
                          <span className="font-label-sm text-label-sm">Primary Mentor</span>
                        </div>
                        <p className="font-title-md text-title-md text-on-surface">
                          {PAYMENT_ORDER_DATA.mentorName}
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {PAYMENT_ORDER_DATA.mentorRole}
                        </p>
                      </div>
                      <div className="bg-surface-container-low p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-primary-container mb-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span className="font-label-sm text-label-sm">Live Class Rhythm</span>
                        </div>
                        <p className="font-title-md text-title-md text-on-surface">
                          Mon &amp; Thu @ 8:30 PM BST
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Duration: 5 Months Track
                        </p>
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                          Cohort Communication Keys
                        </span>
                        <span className="font-caption text-caption text-tertiary bg-tertiary-container/10 px-2 py-0.5 rounded">
                          Active Invite
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg">
                          <span className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
                            <MessageSquare className="w-4 h-4 text-primary" aria-hidden="true" />
                            Discord Server
                          </span>
                          <span className="font-mono text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                            #mern102-hq
                          </span>
                        </div>
                        <div className="flex-1 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg">
                          <span className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
                            <MessageSquare className="w-4 h-4 text-tertiary" aria-hidden="true" />
                            WhatsApp Group
                          </span>
                          <span className="font-mono text-caption text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                            Verified Key
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl">
                  <BellRing className="w-5 h-5 text-primary-container shrink-0" aria-hidden="true" />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Orientation link &amp; GitHub repository credentials have been dispatched to{" "}
                    <span className="font-medium text-on-surface">
                      {PAYMENT_ORDER_DATA.studentEmail}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Orientation Roadmap */}
            <div className="flex flex-col gap-6 bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container">
                    Orientation Roadmap
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Next Steps After Successful Enrollment
                  </h2>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-tertiary" aria-hidden="true" />
                  Complete within the next 48 hours
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-headline-sm flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface">
                      Join Official Discord &amp; WhatsApp
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Meet your batchmates, mentors, and assigned technical Teaching Assistants. All
                      daily project announcements are posted in Discord.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Community invite copied to clipboard.")}
                    className="inline-flex items-center gap-1 text-primary-container font-label-md text-label-md hover:underline"
                  >
                    <span>Accept Server Invite</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-primary font-headline-sm flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface">
                      First Live Class &amp; Calendar Sync
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      The inaugural orientation lecture kicks off Thursday at 8:30 PM BST. Add all 36
                      live lecture dates directly into your Google Calendar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Cohort live class schedule synced to calendar.")}
                    className="inline-flex items-center gap-1 text-tertiary font-label-md text-label-md hover:underline text-left"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Sync to Google Calendar</span>
                  </button>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface">
                      Access Starter Pre-work Modules
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Get your local development workspace configured: Node v20+, Git branch
                      conventions, VS Code extension pack, and terminal configurations.
                    </p>
                  </div>
                  <Link
                    href="/video-learning"
                    className="inline-flex items-center gap-1 text-secondary font-label-md text-label-md hover:underline"
                  >
                    <span>Open Pre-work Modules</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 7-Day Guarantee Banner */}
            <div className="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-tertiary-container/15 flex items-center justify-center text-tertiary shrink-0">
                  <ShieldCheck className="w-9 h-9" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-title-md text-title-md text-on-surface">
                      Shikhbe Shobai 7-Day Money-Back Guarantee
                    </span>
                    <span className="bg-tertiary-container/15 text-tertiary px-2 py-0.5 rounded font-caption text-caption">
                      100% Risk Free
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Attend the first two live orientation masterclasses. If the instruction format
                    does not meet your expectations, request a prompt, zero-friction refund.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/payment/invoice"
                  className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors"
                >
                  View Full Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
