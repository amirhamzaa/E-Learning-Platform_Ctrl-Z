"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  CalendarCheck2,
  CalendarPlus,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  GraduationCap,
  Headphones,
  Lock,
  MessageSquare,
  PhoneCall,
  PlayCircle,
  ReceiptText,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  TimerOff,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { PAYMENT_ORDER_DATA } from "@/data/payments";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function PaymentStatusInvoiceView() {
  const [viewState, setViewState] = useState("success");
  const [copiedTrx, setCopiedTrx] = useState(false);

  const handleCopyTrx = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PAYMENT_ORDER_DATA.trxId).catch(() => {});
    }
    setCopiedTrx(true);
    setTimeout(() => setCopiedTrx(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="courses" />

      <main className="w-full pt-20 flex-1">
        <div className="relative w-full max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-lg">
          {/* State Switcher Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
            <div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-widest uppercase mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary" />
                <span>Checkout &amp; Gateway Dispatch</span>
                <span className="text-outline-variant">•</span>
                <span className="text-primary font-semibold">Verification System</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Payment Verification Status
              </h1>
            </div>

            <div className="inline-flex flex-wrap p-1.5 rounded-xl bg-surface-container shadow-sm self-start md:self-auto gap-1">
              <button
                type="button"
                onClick={() => setViewState("success")}
                className={
                  viewState === "success"
                    ? "flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm font-semibold"
                    : "flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface"
                }
              >
                <CheckCircle2 className="w-4 h-4 text-tertiary" aria-hidden="true" />
                <span>Order Confirmed (Success View)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewState("failed")}
                className={
                  viewState === "failed"
                    ? "flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all bg-surface-container-lowest text-on-surface shadow-sm font-semibold"
                    : "flex items-center gap-1.5 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface"
                }
              >
                <AlertCircle className="w-4 h-4 text-error" aria-hidden="true" />
                <span>Transaction Declined (Failed Preview)</span>
              </button>
            </div>
          </div>

          {/* STATE 1: SUCCESS & INVOICE */}
          {viewState === "success" ? (
            <section className="flex flex-col gap-space-lg">
              {/* Celebration Hero Banner */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-md p-space-md md:p-space-xl">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="relative shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-tertiary-fixed text-tertiary shadow-sm">
                      <BadgeCheck className="w-10 h-10" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-tertiary font-label-sm text-label-sm w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                        <span>Payment &amp; Enrollment Confirmed</span>
                      </div>
                      <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mt-1">
                        Congratulations, {PAYMENT_ORDER_DATA.studentName}!
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                        Welcome to the Shikhbe Shobai family. You are officially enrolled in{" "}
                        <span className="font-semibold text-primary">
                          Full Stack MERN with Next.js 14
                        </span>{" "}
                        <span className="inline-block px-2 py-0.5 ml-1 rounded bg-surface-container font-mono text-body-sm text-on-surface">
                          {PAYMENT_ORDER_DATA.batchLabel}
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm w-full md:w-auto shrink-0">
                    <Link
                      href="/student/dashboard"
                      className="inline-flex items-center justify-center gap-1.5 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm"
                    >
                      <span>Go to Student Dashboard</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => typeof window !== "undefined" && window.print()}
                      className="inline-flex items-center justify-center gap-1.5 px-space-md py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all shadow-sm"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Download Invoice (.PDF)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bento Grid: Invoice & Course Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm p-space-lg">
                  <div>
                    <div className="flex items-center justify-between mb-space-md bg-surface-container-low px-space-md py-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <ReceiptText className="w-5 h-5 text-primary" aria-hidden="true" />
                        <span className="font-title-md text-title-md text-on-surface">
                          Official Transaction Receipt
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                        Paid &amp; Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                      <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-low/60">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Order Reference ID
                        </span>
                        <span className="font-title-md text-title-md text-on-surface font-mono font-bold mt-1">
                          {PAYMENT_ORDER_DATA.orderId}
                        </span>
                      </div>
                      <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-low/60">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Gateway Transaction ID (TrxID)
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-title-md text-title-md text-on-surface font-mono font-bold">
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
                      <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-low/60">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Date &amp; Time
                        </span>
                        <span className="font-body-md text-body-md text-on-surface font-medium mt-1">
                          {PAYMENT_ORDER_DATA.timestamp}
                        </span>
                      </div>
                      <div className="flex flex-col p-space-sm rounded-lg bg-surface-container-low/60">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Payment Method
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 font-mono text-[11px] font-bold">
                            bKash
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface">
                            Mobile Wallet (01712-***678)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-space-md rounded-lg bg-surface-container-low p-space-md flex flex-col gap-2">
                      <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
                        <span>Tuition Fee (MERN + Next.js 14 Immersive)</span>
                        <span className="font-mono text-on-surface">
                          {PAYMENT_ORDER_DATA.regularFee}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
                        <span>Early Bird Scholarship Rebate (25%)</span>
                        <span className="font-mono text-tertiary">
                          {PAYMENT_ORDER_DATA.discountAmount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
                        <span>Digital Courseware &amp; Cloud Sandbox Setup</span>
                        <span className="font-mono text-tertiary">FREE (Inclusive)</span>
                      </div>
                      <div className="h-px bg-outline-variant/30 my-1" />
                      <div className="flex justify-between items-center font-title-md text-title-md">
                        <span className="text-on-surface font-bold">Total Paid Amount</span>
                        <span className="font-mono font-bold text-primary text-headline-sm">
                          {PAYMENT_ORDER_DATA.totalPaid}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-space-md text-caption text-on-surface-variant">
                    <span>
                      A certified VAT receipt copy has been dispatched to{" "}
                      <strong className="text-on-surface">ariful.islam@example.com</strong>
                    </span>
                    <span className="flex items-center gap-1 text-tertiary">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      Encrypted 256-bit SSL
                    </span>
                  </div>
                </div>

                {/* Course Summary & Mentor Card */}
                <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm p-space-lg">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center gap-1.5 text-primary">
                      <GraduationCap className="w-5 h-5" aria-hidden="true" />
                      <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                        Enrolled Program
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          Live Interactive
                        </span>
                        <span className="text-caption text-on-surface-variant">
                          {PAYMENT_ORDER_DATA.batchLabel}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {PAYMENT_ORDER_DATA.courseTitle}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Master modern full-stack web applications, SSR, React server components,
                        Tailwind CSS, REST &amp; GraphQL APIs, and production deployment on AWS.
                      </p>
                    </div>

                    <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <Image
                        src={PAYMENT_ORDER_DATA.mentorAvatar}
                        alt="Tanvir Hasan"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface font-semibold leading-tight">
                          Tanvir Hasan
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Lead Solutions Architect &amp; Head Mentor
                        </span>
                        <span className="font-caption text-caption text-primary font-medium mt-0.5">
                          8+ Yrs Tech Lead • Ex-Shohoz
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-body-sm">
                      <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
                        <span className="text-caption text-outline">Duration</span>
                        <span className="font-semibold text-on-surface">5 Months (36 Sessions)</span>
                      </div>
                      <div className="p-2.5 rounded bg-surface-container-low flex flex-col">
                        <span className="text-caption text-outline">Class Timing</span>
                        <span className="font-semibold text-on-surface">Mon &amp; Thu @ 8:30 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-space-md flex items-center gap-1.5 text-body-sm text-on-surface-variant">
                    <CalendarCheck2 className="w-4 h-4 text-tertiary" aria-hidden="true" />
                    <span>
                      Seats Remaining in Batch: <strong className="text-on-surface">3 of 25</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Next Steps Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-title-md flex items-center justify-center font-bold">
                        1
                      </span>
                      <MessageSquare className="w-5 h-5 text-secondary" aria-hidden="true" />
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                      Join Official Community
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Direct invite links to interact with Lead Mentor Tanvir Hasan, teaching
                      assistants, and 24 fellow enrolled batchmates.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-space-md">
                    <Link
                      href="/live-class"
                      className="inline-flex items-center justify-between px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                    >
                      <span>Discord Server #102</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary font-title-md flex items-center justify-center font-bold">
                        2
                      </span>
                      <Calendar className="w-5 h-5 text-tertiary" aria-hidden="true" />
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                      First Live Class Schedule
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Orientation session kicks off Monday, Nov 15, 2024 • 8:30 PM – 10:30 PM BST.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-space-md w-full inline-flex items-center justify-center gap-1.5 px-space-sm py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                    <span>Add to Google / iCal</span>
                  </button>
                </div>

                <div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface font-title-md flex items-center justify-center font-bold">
                        3
                      </span>
                      <Terminal className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                      Access Starter Pre-work
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Complete HTML5 semantic layout &amp; Modern ES6+ refresher modules before
                      orientation.
                    </p>
                  </div>
                  <Link
                    href="/video-learning"
                    className="mt-space-md w-full inline-flex items-center justify-center gap-1.5 px-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Launch Pre-work Modules</span>
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            /* STATE 2: DECLINED PREVIEW */
            <section className="flex flex-col gap-space-lg">
              <div className="rounded-xl bg-surface-container-lowest shadow-md p-space-md md:p-space-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-error-container text-on-error-container shadow-sm">
                    <XCircle className="w-9 h-9" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      Transaction Declined • Status Code: ERR_GATEWAY_TIMEOUT_09
                    </span>
                    <h2 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mt-1">
                      Payment Incomplete or Declined
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                      We could not complete your enrollment payment of{" "}
                      <span className="font-semibold text-error font-mono">৳ 12,000 BDT</span>. No
                      funds were permanently deducted from your account.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewState("success")}
                  className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm shrink-0"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  <span>Try Again with Another Method</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm p-space-lg gap-space-md">
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <TimerOff className="w-5 h-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold">
                          OTP Verification Timeout
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          The 2-minute bKash/Card security window expired before confirmation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <Wallet className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold">
                          Potential Insufficient Balance or Daily Limit
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Verify that your bKash, Nagad, or credit limit accommodates ৳ 12,000.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <ShieldAlert className="w-5 h-5 text-outline shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold">
                          Bank E-Commerce Transaction Clearance
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Ensure online/e-commerce privileges are enabled on your Visa/Mastercard.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <Link
                      href="/checkout"
                      className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold hover:underline"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      <span>Return to Checkout &amp; Change Method</span>
                    </Link>
                    <span className="text-caption text-on-surface-variant">
                      Reservation held for: <strong className="text-error font-mono">23m 15s</strong>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-surface-container-lowest shadow-sm p-space-lg gap-space-md">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center gap-2 text-primary">
                      <Headphones className="w-5 h-5" aria-hidden="true" />
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                        Priority Student Support
                      </span>
                    </div>
                    <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                        <PhoneCall className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="font-caption text-caption text-outline uppercase font-semibold block">
                          Official Billing Hotline
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold font-mono">
                          +880 9612-345678
                        </span>
                      </div>
                    </div>
                    <a
                      href="#footer-contact"
                      className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-tertiary" aria-hidden="true" />
                        <div>
                          <span className="font-title-md text-title-md font-semibold block">
                            WhatsApp Billing Desk
                          </span>
                          <span className="text-caption text-on-surface-variant">
                            +880 1700-000000
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewState("success")}
                    className="w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                  >
                    Switch Back to Success View
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Money-Back Guarantee Footer Strip */}
          <div className="mt-space-lg rounded-xl bg-surface-container-low p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md text-body-sm text-on-surface-variant">
            <div className="flex items-center gap-space-sm">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="font-semibold text-on-surface">
                  Shikhbe Shobai Money-Back &amp; Academic Guarantee:
                </span>{" "}
                Attend the first 3 classes without risk. If you are unsatisfied, receive a 100% full
                refund with zero deductions.
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <a href="#footer-legal" className="font-label-sm text-label-sm text-primary hover:underline font-semibold">
                Refund Policy
              </a>
              <a href="#footer-contact" className="font-label-sm text-label-sm text-primary hover:underline font-semibold">
                Campus Visit
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
