"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  Code2,
  CreditCard,
  Headphones,
  MessageSquare,
  PhoneCall,
  ReceiptText,
  RotateCcw,
  ShieldAlert,
  Timer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PAYMENT_FAILED_FAQS } from "@/data/payments";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

function formatLockTimer(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function PaymentFailedView() {
  const [secondsLeft, setSecondsLeft] = useState(7184); // 01:59:44
  const [openFaqId, setOpenFaqId] = useState("faq-1");

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="courses" />

      <main className="w-full pt-20 flex-1">
        {/* Status Ribbon */}
        <section className="w-full bg-surface-container-low/70 py-space-md">
          <div className="max-w-6xl mx-auto px-gutter-mobile sm:px-gutter flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-error" aria-hidden="true" />
              <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Academic Gateway • Student Billing Registry
              </span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
              <span className="font-medium text-on-surface">
                SSLCommerz &amp; bKash Multi-Gateway Node v4.2
              </span>
            </div>
          </div>
        </section>

        {/* Diagnostic Workspace */}
        <section className="max-w-6xl mx-auto w-full px-gutter-mobile sm:px-gutter py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 w-52 h-52 bg-error-container/30 rounded-full blur-2xl pointer-events-none"
                />
                <div className="flex items-start gap-space-md relative z-10">
                  <div className="w-14 h-14 rounded-full bg-error-container/50 flex items-center justify-center text-error shrink-0">
                    <AlertCircle className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold">
                        Transaction Terminated
                      </span>
                      <span className="text-on-surface-variant text-caption">•</span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        Session #TX-984210
                      </span>
                    </div>
                    <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-semibold tracking-tight">
                      Payment Verification Unsuccessful
                    </h1>
                  </div>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant relative z-10">
                  We were unable to process your transaction for{" "}
                  <strong className="text-on-surface font-semibold">
                    Full Stack MERN with Next.js 14 Batch 48
                  </strong>
                  . Your seat reservation is temporarily held for the next 2 hours.
                </p>

                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-wrap items-center justify-between gap-space-sm relative z-10">
                  <div className="flex items-center gap-space-sm">
                    <Timer className="w-5 h-5 text-primary-container" aria-hidden="true" />
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      Temporary Seat Guarantee Active
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Time Remaining:
                    </span>
                    <span className="font-title-md text-title-md font-bold text-primary-container bg-surface-container-lowest px-space-sm py-0.5 rounded shadow-sm font-mono">
                      {secondsLeft > 0 ? formatLockTimer(secondsLeft) : "EXPIRED"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Details */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <ReceiptText className="w-5 h-5 text-secondary" aria-hidden="true" />
                    <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                      Diagnostic Transaction Details
                    </h2>
                  </div>
                  <span className="px-space-sm py-0.5 rounded-full font-label-sm text-label-sm bg-error-container/40 text-error font-medium">
                    Unsettled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-0.5">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Order Reference
                    </span>
                    <span className="font-title-md text-title-md text-on-surface font-bold tracking-tight">
                      #SS-ORD-984210
                    </span>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-0.5">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Attempted Gateway
                    </span>
                    <span className="font-title-md text-body-md text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary-container" />
                      bKash Direct Gateway (MFS) / SSLCommerz
                    </span>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-0.5 sm:col-span-2">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Diagnostic Fault Code
                    </span>
                    <div className="flex flex-wrap items-center gap-space-sm">
                      <code className="font-label-md text-label-md text-error bg-surface-container-lowest px-space-sm py-0.5 rounded font-mono font-bold">
                        ERR_GATEWAY_TIMEOUT
                      </code>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        (Insufficient balance or OTP verification timeout)
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs sm:col-span-2">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      System Audit Reason
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      The MFS wallet gateway timed out during verification.{" "}
                      <span className="font-semibold text-tertiary-container">
                        No funds were deducted from your bKash account
                      </span>
                      . If an SMS deduction appears, it will automatically roll back within 24–48
                      banking hours.
                    </p>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between sm:col-span-2">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                      Attempt Timestamp
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      Nov 02, 2024 • 10:52 AM BST
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Resolution Center */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div>
                  <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                    Action Resolution Center
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Select an instant retry path to finalize your registration and secure your seat
                    in the live studio batch.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-space-sm">
                  <Link
                    href="/checkout"
                    className="flex-1 bg-primary-container text-on-primary px-6 py-3.5 rounded-lg font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Retry Payment with bKash</span>
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex-1 bg-surface-container-low text-primary-container px-6 py-3.5 rounded-lg font-label-md text-label-md font-semibold hover:bg-surface-container transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" aria-hidden="true" />
                    <span>Choose Another Payment Method</span>
                  </Link>
                </div>

                <div className="pt-space-xs flex items-center justify-between flex-wrap gap-space-sm">
                  <Link
                    href="/checkout"
                    className="font-label-md text-label-md text-on-surface-variant hover:text-primary-container flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Return to Checkout &amp; Review Order</span>
                  </Link>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Cards / Nagad / Rocket / Stripe • 256-Bit TLS
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <div className="bg-surface-container-high rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                      Need Instant Payment Assistance?
                    </h2>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Live academic advisor desk on standby
                    </p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  If your wallet balance was held or if you need an alternative direct manual
                  deposit, contact our priority enrollment counselors immediately:
                </p>

                <div className="flex flex-col gap-space-sm">
                  <a
                    href="tel:+8801700000000"
                    className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between hover:bg-surface-bright transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-space-sm">
                      <PhoneCall className="w-5 h-5 text-primary-container" aria-hidden="true" />
                      <div>
                        <span className="font-caption text-caption text-on-surface-variant block">
                          Emergency Enrollment Hotline
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          +880 1700-000000
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary-container font-semibold">
                      Call Now
                    </span>
                  </a>

                  <a
                    href="#footer-contact"
                    className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between hover:bg-surface-bright transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-space-sm">
                      <MessageSquare className="w-5 h-5 text-tertiary-container" aria-hidden="true" />
                      <div>
                        <span className="font-caption text-caption text-on-surface-variant block">
                          WhatsApp Support Desk
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Live Chat 24/7 Available
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                      Chat
                    </span>
                  </a>
                </div>

                <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
                  <BadgeCheck className="w-4 h-4 text-tertiary-container" aria-hidden="true" />
                  <span>Average response window: &lt; 3 minutes during active enrollment runs.</span>
                </div>
              </div>

              {/* Mini Reservation Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
                  Reservation Summary
                </span>
                <div className="flex gap-space-md items-center">
                  <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary-container">
                    <Code2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface truncate">
                      Full Stack MERN with Next.js 14
                    </h3>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Lead Mentor: Abdul Halim • 6 Months Intensive
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-title-md text-title-md font-bold text-primary-container">
                        ৳ 12,500
                      </span>
                      <span className="font-caption text-caption line-through text-on-surface-variant">
                        ৳ 18,000
                      </span>
                      <span className="text-tertiary-container font-label-sm text-label-sm font-semibold ml-1">
                        30% Reserved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting FAQ Accordion */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <h2 className="font-title-md text-title-md text-on-surface font-semibold">
                  Common Troubleshooting FAQ
                </h2>
                <div className="flex flex-col gap-space-sm">
                  {PAYMENT_FAILED_FAQS.map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-surface-container-low rounded-lg overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          aria-expanded={isOpen}
                          className="w-full p-space-md text-left flex items-center justify-between gap-space-sm"
                        >
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-on-surface-variant shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        {isOpen && (
                          <div className="px-space-md pb-space-md">
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
