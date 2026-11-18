"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Heart,
  Landmark,
  Mail,
  Quote,
  Share2,
  Terminal,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  BLOG_ARTICLE,
  BLOG_CODE_SNIPPET,
  BLOG_PORTFOLIO_CHECKLIST,
  BLOG_RELATED_ARTICLES,
  BLOG_TOC,
} from "@/data/blogDetails";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export function BlogDetailsView() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("section-1");
  const [claps, setClaps] = useState(BLOG_ARTICLE.initialClaps);
  const [clapPulse, setClapPulse] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() =>
    BLOG_PORTFOLIO_CHECKLIST.filter((i) => i.defaultChecked).map((i) => i.id)
  );
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }

      const scrollPos = window.scrollY + 180;
      for (let i = BLOG_TOC.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(BLOG_TOC[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(BLOG_TOC[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setClapPulse(true);
    setTimeout(() => setClapPulse(false), 160);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyCode = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(BLOG_CODE_SNIPPET).catch(() => {});
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleChecklist = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setNewsletterStatus("Please enter a valid email address.");
      return;
    }
    setNewsletterStatus("Subscribed to The Remote Engineer dispatch!");
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="blog" />

      {/* Live Scroll Reading Progress Bar */}
      <div className="fixed top-20 left-0 right-0 h-1 bg-surface-container z-40">
        <div
          className="h-full bg-primary-container transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="w-full pt-24 flex-1">
        <article className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-lg">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-on-surface-variant font-caption text-caption mb-space-md"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" aria-hidden="true" />
            <span>Journal</span>
            <ChevronRight className="w-3.5 h-3.5 text-outline" aria-hidden="true" />
            <span className="text-primary font-semibold">{BLOG_ARTICLE.category}</span>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mb-space-xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold mb-space-md">
              {BLOG_ARTICLE.category}
            </span>
            <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-headline-lg text-on-surface tracking-tight mb-space-md">
              {BLOG_ARTICLE.title}
            </h1>
            <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
              {BLOG_ARTICLE.subtitle}
            </p>

            {/* Author & Share Strip */}
            <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md border-t border-surface-container">
              <div className="flex items-center gap-3">
                <Image
                  src={BLOG_ARTICLE.author.avatar}
                  alt={BLOG_ARTICLE.author.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container/20"
                />
                <div>
                  <p className="font-title-md text-title-md text-on-surface font-bold">
                    {BLOG_ARTICLE.author.name}
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    {BLOG_ARTICLE.publishedAt} • {BLOG_ARTICLE.readTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
                      <span className="text-tertiary">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setBookmarked((prev) => !prev)}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarked
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </header>

          {/* Editorial Cover Figure */}
          <figure className="mb-space-xl">
            <div className="relative aspect-[16/9] max-h-[520px] w-full rounded-2xl overflow-hidden bg-surface-container shadow-md">
              <Image
                src={BLOG_ARTICLE.coverImage}
                alt="Editorial developer workstation"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2.5 font-caption text-caption text-on-surface-variant text-center">
              {BLOG_ARTICLE.coverCaption}
            </figcaption>
          </figure>

          {/* 2-Column Reading Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left Sticky Rail (4 Cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-space-lg">
              {/* Table of Contents */}
              <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
                <h2 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-space-sm">
                  Table of Contents
                </h2>
                <nav aria-label="Article sections" className="flex flex-col gap-1">
                  {BLOG_TOC.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`px-3 py-2 rounded-lg font-body-sm text-body-sm transition-all border-l-2 ${
                          isActive
                            ? "border-primary-container bg-surface-container-low text-primary font-semibold"
                            : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50"
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Author Spotlight */}
              <div className="rounded-2xl bg-surface-container-low p-space-lg flex flex-col gap-space-sm">
                <div className="flex items-center gap-3">
                  <Image
                    src={BLOG_ARTICLE.author.spotlightAvatar}
                    alt={BLOG_ARTICLE.author.name}
                    width={52}
                    height={52}
                    className="w-13 h-13 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-title-md text-title-md text-on-surface font-bold">
                      {BLOG_ARTICLE.author.name}
                    </p>
                    <p className="font-caption text-caption text-secondary">
                      {BLOG_ARTICLE.author.role}
                    </p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {BLOG_ARTICLE.author.bio}
                </p>
              </div>

              {/* Newsletter Card */}
              <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center gap-2 text-primary font-title-md text-title-md font-bold">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  <span>The Remote Engineer</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Weekly architectural breakdowns and remote hiring leads curated for Bangladeshi
                  engineers.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    aria-label="Email for newsletter"
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-colors"
                  >
                    Subscribe Weekly
                  </button>
                </form>
                {newsletterStatus && (
                  <p className="font-caption text-caption text-tertiary font-semibold">
                    {newsletterStatus}
                  </p>
                )}
              </div>
            </aside>

            {/* Right Article Body (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
              {/* Section 1 */}
              <section id="section-1" className="scroll-mt-28 flex flex-col gap-space-md">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  1. The 2025 Remote Landscape for Bangladeshi Engineers
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Global hiring has shifted decisively away from generic full-stack generalists
                  toward product-minded engineers who can own vertical slices end-to-end. Startups in
                  Europe, North America, and Singapore increasingly evaluate candidates on written
                  clarity, system reliability, and deployment maturity rather than raw algorithmic
                  memorization alone.
                </p>
                <blockquote className="p-space-lg rounded-2xl bg-surface-container-low border-l-4 border-primary-container flex flex-col gap-2">
                  <Quote className="w-6 h-6 text-secondary" aria-hidden="true" />
                  <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface italic">
                    &ldquo;International engineering leaders don&apos;t hire remote developers just
                    to cut payroll—they hire engineers who communicate cleanly in pull requests and
                    ship resilient software without micro-management.&rdquo;
                  </p>
                </blockquote>
              </section>

              {/* Section 2 */}
              <section id="section-2" className="scroll-mt-28 flex flex-col gap-space-md">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  2. Core Technical Stack & Production Code Depth
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Demonstrating security-first middleware, clean edge routing, and explicit cookie
                  boundary handling immediately separates production-ready engineers from tutorial
                  learners. Below is a minimal session boundary pattern we audit in every capstone
                  review:
                </p>

                <div className="rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-md">
                  <div className="px-space-md py-2.5 bg-on-surface/40 flex items-center justify-between border-b border-surface/10">
                    <span className="inline-flex items-center gap-2 font-mono text-caption text-inverse-on-surface/80">
                      <Terminal className="w-4 h-4 text-secondary-fixed" aria-hidden="true" />
                      middleware.js
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface/10 hover:bg-surface/20 font-caption text-caption text-secondary-fixed transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-space-md overflow-x-auto font-mono text-caption leading-relaxed text-inverse-on-surface">
                    <code>{BLOG_CODE_SNIPPET}</code>
                  </pre>
                </div>
              </section>

              {/* Section 3: Interactive Project Checklist */}
              <section id="section-3" className="scroll-mt-28 flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    3. 2025 Proof-of-Work Portfolio Checklist
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                    {checkedItems.length} / {BLOG_PORTFOLIO_CHECKLIST.length} Completed
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm">
                  {BLOG_PORTFOLIO_CHECKLIST.map((item) => {
                    const checked = checkedItems.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`p-space-md rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                          checked
                            ? "bg-tertiary-fixed/35 ring-1 ring-tertiary/30"
                            : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-low"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleChecklist(item.id)}
                          className="w-4 h-4 mt-1 rounded accent-tertiary cursor-pointer"
                        />
                        <div>
                          <p
                            className={`font-title-md text-title-md font-semibold ${
                              checked ? "text-tertiary line-through" : "text-on-surface"
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* Section 4: SVG Donut Charts */}
              <section id="section-4" className="scroll-mt-28 flex flex-col gap-space-md">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  4. Global Remote vs Local Agency Hiring Demand
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex items-center gap-space-md">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-container-high"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          className="text-tertiary"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="84, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        />
                      </svg>
                      <span className="absolute font-title-md text-title-md font-bold text-tertiary">
                        84%
                      </span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        Global Product Teams
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Prioritize async architecture notes, Next.js/Node depth, and automated tests.
                      </p>
                    </div>
                  </div>

                  <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex items-center gap-space-md">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-container-high"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          className="text-secondary"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="29, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        />
                      </svg>
                      <span className="absolute font-title-md text-title-md font-bold text-secondary">
                        29%
                      </span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        Traditional Local Agencies
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Focus primarily on rapid template delivery with lower architectural ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Payment & Tax Playbook */}
              <section id="section-5" className="scroll-mt-28 flex flex-col gap-space-md">
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  5. Payment, Tax & Remittance Playbook
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <Wallet className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Payoneer, Wise & Direct SWIFT
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Maintain clean monthly invoices matching your foreign contractor agreement so
                      receiving banks issue instant Remittance Certificates (Form C).
                    </p>
                  </div>
                  <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                      <Landmark className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Bangladesh Bank IT Export Compliance
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Route software service income via authorized banking channels to stay eligible
                      for IT export documentation, credit facilities, and zero friction tax filing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tags + Clap & Bookmark Footer */}
              <div className="pt-space-lg border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="flex flex-wrap gap-2">
                  {BLOG_ARTICLE.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-caption text-caption font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleClap}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold transition-transform ${
                      clapPulse ? "scale-105" : ""
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>{claps} claps</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookmarked((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                      bookmarked
                        ? "bg-primary-container text-on-primary"
                        : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                      aria-hidden="true"
                    />
                    <span>{bookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Author Fellowship CTA Card */}
              <section className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm flex flex-col sm:flex-row items-center gap-space-lg">
                <Image
                  src={BLOG_ARTICLE.author.ctaAvatar}
                  alt={BLOG_ARTICLE.author.name}
                  width={112}
                  height={112}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span className="font-caption text-caption text-secondary uppercase font-semibold tracking-wider">
                    Shikhbe Shobai Fellowship Track
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 mb-2">
                    Ready to Build a Global-Standard Portfolio with Live Mentorship?
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Join Engr. Tanvir Hasan&apos;s next Full-Stack MERN & Next.js Cohort with weekly
                    PR reviews and mock international interviews.
                  </p>
                  <Link
                    href="/course-details"
                    className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors"
                  >
                    <span>Explore Cohort #14 Syllabus</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </div>
          </div>

          {/* Related Articles Grid */}
          <section className="mt-space-xl pt-space-xl border-t border-surface-container">
            <div className="flex items-center justify-between mb-space-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Continue Reading from the Journal
              </h2>
              <Link
                href="/courses"
                className="font-label-sm text-label-sm text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Explore Tracks</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {BLOG_RELATED_ARTICLES.map((post) => (
                <Link
                  key={post.id}
                  href={post.href}
                  className="group flex flex-col rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
                    <div className="space-y-1.5">
                      <span className="font-caption text-caption text-on-surface-variant">
                        {post.date}
                      </span>
                      <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors font-semibold">
                        {post.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
