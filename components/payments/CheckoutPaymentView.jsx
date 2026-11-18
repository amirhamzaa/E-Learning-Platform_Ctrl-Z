"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Headphones,
  Home,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Star,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  CHECKOUT_DIVISIONS,
  CHECKOUT_LOCAL_WALLETS,
  PAYMENT_ORDER_DATA,
} from "@/data/payments";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function CheckoutPaymentView() {
  const [gateway, setGateway] = useState("local");
  const [selectedWallet, setSelectedWallet] = useState("bkash");
  const [fullName, setFullName] = useState("Ariful Islam");
  const [email, setEmail] = useState("ariful.islam@shikhbeshobai.com");
  const [phone, setPhone] = useState("+880 1712-345678");
  const [division, setDivision] = useState(CHECKOUT_DIVISIONS[0]);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [couponCode, setCouponCode] = useState("SHIKHBE2024");
  const [couponApplied, setCouponApplied] = useState(true);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [notice, setNotice] = useState("");

  const handleCheckoutPreview = () => {
    if (!fullName.trim() || !email.includes("@") || !phone.trim()) {
      setNotice("Please fill in your required student billing profile fields.");
      return;
    }
    if (!termsAccepted) {
      setNotice("Please agree to the Terms of Service and Refund Policy to proceed.");
      return;
    }
    setNotice(
      `Frontend UI Preview: Ready to dispatch ${
        gateway === "local" ? selectedWallet.toUpperCase() : "Stripe Card"
      } checkout for ৳ 12,000 BDT (no real payment processed).`
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="courses" />

      <main className="w-full pt-20 flex-1">
        {/* Breadcrumb & Trust Banner */}
        <section className="w-full bg-surface-container-low py-space-md">
          <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm"
            >
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Home</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <Link href="/courses" className="hover:text-primary transition-colors">
                Courses
              </Link>
              <span className="text-outline-variant">/</span>
              <Link href="/course-details" className="hover:text-primary transition-colors">
                Full Stack MERN with Next.js 14
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Checkout &amp; Enrollment</span>
            </nav>

            <div className="flex items-center gap-4 text-on-surface-variant font-caption text-caption flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-tertiary font-medium">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Official Verified Enrollment
              </span>
              <span className="hidden sm:inline text-outline-variant">•</span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        </section>

        {/* Checkout Workspace */}
        <section className="w-full py-space-xl">
          <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter">
            {/* Header + Stepper */}
            <div className="mb-space-xl flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                  Seats filling fast: 4 of 30 remaining in Batch #102
                </div>
                <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                  Finalize Your Enrollment
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Join the premier career-track fellowship with hands-on live project labs &amp;
                  global mentorship.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm self-start md:self-auto">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-tertiary-fixed-dim text-tertiary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">
                    Curriculum
                  </span>
                </div>
                <span className="w-4 h-[2px] bg-tertiary-fixed-dim" />
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    Payment &amp; Setup
                  </span>
                </div>
                <span className="w-4 h-[2px] bg-surface-container-high" />
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center font-bold">
                    3
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    LMS Access
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              {/* Left 7 Cols */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                {/* Step 1: Student Billing Profile */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-space-md gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-secondary-fixed/40 text-primary-container flex items-center justify-center font-title-md text-title-md shrink-0">
                        1
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          Student Billing Profile
                        </h2>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Credential notifications and batch Discord invitations will be linked to
                          this data.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0">
                      Step 1 of 2
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="co-name" className="font-label-md text-label-md text-on-surface">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <User
                          aria-hidden="true"
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        />
                        <input
                          id="co-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container-low/60 text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="co-email" className="font-label-md text-label-md text-on-surface">
                        Institutional Email <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          aria-hidden="true"
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        />
                        <input
                          id="co-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container-low/60 text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="co-phone" className="font-label-md text-label-md text-on-surface">
                        Phone (SMS/WhatsApp Key) <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Smartphone
                          aria-hidden="true"
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                        />
                        <input
                          id="co-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container-low/60 text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="co-division" className="font-label-md text-label-md text-on-surface">
                        Division &amp; Country <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <MapPin
                          aria-hidden="true"
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                        />
                        <select
                          id="co-division"
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container-low/60 text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/25 cursor-pointer"
                        >
                          {CHECKOUT_DIVISIONS.map((div) => (
                            <option key={div} value={div}>
                              {div}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Toggle */}
                  <div className="mt-space-md bg-surface-container-low/70 p-3.5 rounded-lg flex items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-tertiary-container/10 text-tertiary flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-title-md text-title-md text-on-surface leading-tight">
                          Instant Batch Activation via WhatsApp
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Send course credentials, calendar sync, and private Slack/WhatsApp batch
                          key instantly.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={whatsappEnabled}
                        onChange={(e) => setWhatsappEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                    </label>
                  </div>
                </div>

                {/* Step 2: Multi-Gateway Payment Hub */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-space-md gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-secondary-fixed/40 text-primary-container flex items-center justify-center font-title-md text-title-md shrink-0">
                        2
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">
                          Payment Method
                        </h2>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Choose your preferred local mobile financial service or international card.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0">
                      Step 2 of 2
                    </span>
                  </div>

                  {/* Gateway Selector Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-space-md">
                    <button
                      type="button"
                      onClick={() => setGateway("local")}
                      className={`text-left p-3.5 rounded-xl transition-all flex flex-col justify-between ${
                        gateway === "local"
                          ? "bg-primary-fixed/35 text-on-surface shadow-sm ring-1 ring-primary-container/30"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-primary-container" aria-hidden="true" />
                          <span className="font-title-md text-title-md text-on-surface font-bold">
                            Local / MFS Gateway
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-caption text-caption uppercase tracking-wider font-semibold">
                          Fastest
                        </span>
                      </div>
                      <p className="font-caption text-caption text-on-surface-variant mb-2">
                        bKash, Nagad, Rocket, Upay &amp; Bangladesh Bank Cards
                      </p>
                      <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-semibold">
                        <Zap className="w-4 h-4" aria-hidden="true" />
                        <span>Auto-Enrolls In 60 Seconds</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGateway("global")}
                      className={`text-left p-3.5 rounded-xl transition-all flex flex-col justify-between ${
                        gateway === "global"
                          ? "bg-primary-fixed/35 text-on-surface shadow-sm ring-1 ring-primary-container/30"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-on-surface-variant" aria-hidden="true" />
                          <span className="font-title-md text-title-md font-bold text-on-surface">
                            International Cards
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-caption text-caption">
                          Stripe
                        </span>
                      </div>
                      <p className="font-caption text-caption text-on-surface-variant mb-2">
                        Visa, MasterCard, Amex, UnionPay (Global Currencies)
                      </p>
                      <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                        <Globe className="w-4 h-4" aria-hidden="true" />
                        <span>Direct Bank Clearing</span>
                      </div>
                    </button>
                  </div>

                  {/* Local Gateway Content */}
                  {gateway === "local" ? (
                    <div className="flex flex-col gap-space-md">
                      <div className="bg-surface-container-low p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                            Supported Wallets &amp; Local Gateways
                          </span>
                          <span className="text-caption font-caption text-on-surface-variant flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
                            Zero Surcharge
                          </span>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                          {CHECKOUT_LOCAL_WALLETS.map((w) => {
                            const active = selectedWallet === w.id;
                            return (
                              <button
                                key={w.id}
                                type="button"
                                onClick={() => setSelectedWallet(w.id)}
                                className={`p-2.5 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center gap-1 shadow-sm transition-all ${
                                  active
                                    ? "ring-2 ring-primary-container scale-[1.02]"
                                    : "hover:scale-[1.02]"
                                }`}
                              >
                                <span className={`font-bold text-sm ${w.colorClass} tracking-tight`}>
                                  {w.name}
                                </span>
                                <span className="font-caption text-[10px] text-on-surface-variant">
                                  {w.sub}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="p-3 bg-secondary-fixed/30 rounded-lg flex items-start gap-2.5">
                          <Zap
                            className="w-5 h-5 text-primary-container shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div className="text-on-surface font-caption text-caption">
                            <p className="font-semibold text-on-surface mb-0.5">
                              Instant Auto-Enrollment Guarantee:
                            </p>
                            <p className="text-on-surface-variant">
                              Receive your LMS Student ID and Discord/Slack Batch Community Invite
                              within 60 seconds after completing bKash/Nagad verification.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BadgeCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                          <span className="font-label-sm text-label-sm text-on-surface">
                            SSLCommerz Authorized Merchant Gateway
                          </span>
                        </div>
                        <span className="text-caption font-caption text-on-surface-variant">
                          PCI-DSS Compliant
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                          Stripe Global Processing
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-surface-container-lowest rounded text-[11px] font-bold text-primary">
                            VISA
                          </span>
                          <span className="px-2 py-0.5 bg-surface-container-lowest rounded text-[11px] font-bold text-[#eb001b]">
                            MC
                          </span>
                          <span className="px-2 py-0.5 bg-surface-container-lowest rounded text-[11px] font-bold text-[#0070d2]">
                            AMEX
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="card-name" className="font-label-sm text-label-sm text-on-surface">
                          Cardholder Name
                        </label>
                        <input
                          id="card-name"
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Ariful Islam"
                          className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="card-num" className="font-label-sm text-label-sm text-on-surface">
                          Card Number
                        </label>
                        <input
                          id="card-num"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• 4242"
                          className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="card-exp" className="font-label-sm text-label-sm text-on-surface">
                            Expiration
                          </label>
                          <input
                            id="card-exp"
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="card-cvc" className="font-label-sm text-label-sm text-on-surface">
                            CVC / CVV
                          </label>
                          <input
                            id="card-cvc"
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terms Acceptance */}
                  <div className="mt-space-md pt-space-md">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded accent-primary-container cursor-pointer"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        I agree to the{" "}
                        <a href="#footer-legal" className="text-primary font-semibold underline">
                          Terms of Service
                        </a>
                        ,{" "}
                        <a href="#footer-legal" className="text-primary font-semibold underline">
                          Academic Code of Conduct
                        </a>
                        , and the{" "}
                        <a href="#footer-legal" className="text-primary font-semibold underline">
                          7-Day Money-Back Refund Policy
                        </a>
                        .
                      </span>
                    </label>
                  </div>

                  {notice && (
                    <div className="mt-space-md p-3 rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed font-body-sm text-body-sm font-medium flex flex-col gap-2">
                      <span>{notice}</span>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href="/payment/success"
                          className="underline font-semibold text-primary"
                        >
                          Preview Payment Success Screen
                        </Link>
                        <span>•</span>
                        <Link
                          href="/payment/failed"
                          className="underline font-semibold text-error"
                        >
                          Preview Payment Failed Screen
                        </Link>
                        <span>•</span>
                        <Link
                          href="/payment/invoice"
                          className="underline font-semibold text-tertiary"
                        >
                          Preview Status &amp; Invoice Screen
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="mt-space-md">
                    <button
                      type="button"
                      onClick={handleCheckoutPreview}
                      className="w-full py-4 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md font-bold shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <Lock className="w-5 h-5" aria-hidden="true" />
                      <span>Complete Enrollment &amp; Pay ৳ 12,000 BDT</span>
                    </button>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-on-surface-variant font-caption text-caption">
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
                        Instant Receipt &amp; VAT Invoice
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-tertiary" aria-hidden="true" />
                        Zero Hidden Service Fees
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Sticky Order Summary */}
              <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                    <span className="font-title-md text-title-md text-on-surface font-semibold">
                      Cohort Order Summary
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                      Verified Live Cohort
                    </span>
                  </div>

                  {/* Course Card Preview */}
                  <div className="bg-surface-container-low p-3.5 rounded-xl mb-space-md">
                    <div className="flex gap-3">
                      <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm relative">
                        <Image
                          src={PAYMENT_ORDER_DATA.checkoutThumb}
                          alt="Course preview workspace"
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-on-surface/80 text-surface text-[9px] font-bold px-1 rounded">
                          LIVE
                        </div>
                      </div>
                      <div className="flex flex-col justify-between min-w-0">
                        <span className="font-caption text-caption text-secondary font-bold uppercase tracking-wider">
                          MERN &amp; Cloud Specialist
                        </span>
                        <h3 className="font-title-md text-title-md text-on-surface font-bold leading-tight truncate">
                          Full Stack MERN with Next.js 14
                        </h3>
                        <p className="font-caption text-caption text-on-surface-variant truncate">
                          Lead: Engr. Tanvir Hasan (Senior Cloud Solutions Architect)
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3">
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-caption text-caption">
                        <Calendar className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                        <span>Batch #SS-MERN-102 (Nov 15)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-caption text-caption">
                        <Clock className="w-4 h-4 text-tertiary shrink-0" aria-hidden="true" />
                        <span>Mon &amp; Thu, 8:30 PM BST</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-space-md">
                    <label
                      htmlFor="coupon-input"
                      className="font-label-sm text-label-sm text-on-surface font-medium block mb-1.5"
                    >
                      Promotion / Voucher Code
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <BadgeCheck
                          aria-hidden="true"
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary"
                        />
                        <input
                          id="coupon-input"
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponApplied(false);
                          }}
                          className="w-full pl-9 pr-3 py-2 bg-surface-container rounded-lg font-mono text-body-sm font-semibold text-tertiary-container focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setCouponApplied(true)}
                        className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors"
                      >
                        {couponApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {couponApplied && (
                      <span className="font-caption text-caption text-tertiary mt-1 inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        27% Early Bird Scholar Scholarship active.
                      </span>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 py-space-sm">
                    <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                      <span>Regular Tuition Fee</span>
                      <span className="line-through font-mono">৳ 16,500 BDT</span>
                    </div>
                    <div className="flex items-center justify-between text-tertiary font-body-sm text-body-sm font-medium">
                      <span className="flex items-center gap-1">
                        Early Bird Scholar Grant
                        <span className="px-1.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                          27% OFF
                        </span>
                      </span>
                      <span className="font-mono">- ৳ 4,500 BDT</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                      <span>Coupon &ldquo;{couponCode || "NONE"}&rdquo;</span>
                      <span className="font-mono text-tertiary font-semibold">- ৳ 0 BDT</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                      <span>Govt VAT &amp; Gateway Fees</span>
                      <span className="font-caption text-caption text-tertiary font-semibold uppercase">
                        Inclusive
                      </span>
                    </div>
                    <div className="pt-3 mt-3 bg-surface-container-low p-3 rounded-lg flex items-baseline justify-between">
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-bold block">
                          Total Payable Now
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Includes batch seat reservation &amp; mentorship pass
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-md text-headline-md text-primary font-bold font-mono">
                          ৳ 12,000
                        </span>
                        <span className="text-caption font-caption text-on-surface-variant block font-medium">
                          BDT / One-time
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="mt-space-md pt-space-md space-y-2.5">
                    <div className="flex items-center gap-2.5 text-on-surface font-body-sm text-body-sm">
                      <InfinityIcon className="w-5 h-5 text-tertiary shrink-0" aria-hidden="true" />
                      <span>100% Lifetime Access to Recordings &amp; Code Repos</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-on-surface font-body-sm text-body-sm">
                      <Headphones className="w-5 h-5 text-tertiary shrink-0" aria-hidden="true" />
                      <span>Dedicated 1-on-1 Mentor Support (8 PM - 11 PM BST)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-on-surface font-body-sm text-body-sm">
                      <Award className="w-5 h-5 text-tertiary shrink-0" aria-hidden="true" />
                      <span>Industry-Recognized Completion Certification</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-on-surface font-body-sm text-body-sm">
                      <ShieldCheck className="w-5 h-5 text-tertiary shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-tertiary">
                        7-Day Money-Back Satisfaction Guarantee
                      </span>
                    </div>
                  </div>

                  {/* Hotline Box */}
                  <div className="mt-space-md p-3.5 bg-surface-container rounded-lg flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0">
                        <Headphones className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Need payment assistance?
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Hotline: +880 9612-345678
                        </p>
                      </div>
                    </div>
                    <a
                      href="#footer-contact"
                      className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-colors shadow-sm font-semibold shrink-0"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 shrink-0">
                      <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-caption flex items-center justify-center font-bold">
                        R
                      </div>
                      <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary font-caption flex items-center justify-center font-bold">
                        T
                      </div>
                      <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary font-caption flex items-center justify-center font-bold">
                        S
                      </div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      18,500+ successful alumni across global tech companies
                    </span>
                  </div>
                  <div className="flex items-center text-secondary shrink-0">
                    <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span className="font-label-sm text-label-sm font-bold text-on-surface ml-1">
                      4.9/5
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
