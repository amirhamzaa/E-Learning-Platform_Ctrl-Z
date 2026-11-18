"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  Globe,
  Headphones,
  Play,
  PlayCircle,
  Share2,
  Sparkles,
  Star,
  Terminal,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  COURSE_COMPETENCIES,
  COURSE_CURRICULUM,
  COURSE_DETAIL_HERO,
  COURSE_MENTOR,
  COURSE_PREREQUISITES,
  COURSE_RELATED,
  COURSE_REVIEWS_SUMMARY,
  COURSE_SIDEBAR,
} from "@/data/courseDetails";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

function renderSpecIcon(type) {
  const cls = "w-4 h-4 text-primary shrink-0";
  switch (type) {
    case "calendar":
      return <Calendar className={cls} aria-hidden="true" />;
    case "clock":
      return <Clock className={cls} aria-hidden="true" />;
    case "code":
      return <Code2 className={cls} aria-hidden="true" />;
    case "video":
      return <Video className={cls} aria-hidden="true" />;
    case "award":
      return <Award className={cls} aria-hidden="true" />;
    default:
      return <Headphones className={cls} aria-hidden="true" />;
  }
}

export function CourseDetailsView() {
  const [openModules, setOpenModules] = useState(["mod-1"]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(
    "Cohort #14 Orientation & Full-Stack Architecture Preview"
  );
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const allExpanded = openModules.length === COURSE_CURRICULUM.length;

  const toggleModule = (id) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandToggle = () => {
    if (allExpanded) {
      setOpenModules([]);
    } else {
      setOpenModules(COURSE_CURRICULUM.map((m) => m.id));
    }
  };

  const handleShareCourse = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <SiteHeader activePath="courses" />

      <main className="w-full pt-20 flex-1">
        {/* Editorial Hero Banner */}
        <section className="bg-surface-container-low border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-on-surface-variant font-caption text-caption mb-space-md"
            >
              {COURSE_DETAIL_HERO.breadcrumb.map((item, idx) => (
                <span key={item.label} className="inline-flex items-center gap-1.5">
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-outline" aria-hidden="true" />}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-on-surface font-semibold">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-space-md">
                {COURSE_DETAIL_HERO.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={
                      badge.tone === "secondary"
                        ? "px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold"
                        : badge.tone === "tertiary"
                          ? "px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold"
                          : "px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold"
                    }
                  >
                    {badge.label}
                  </span>
                ))}
              </div>

              <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mb-space-md">
                {COURSE_DETAIL_HERO.title}
              </h1>
              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
                {COURSE_DETAIL_HERO.subtitle}
              </p>

              {/* Key Meta Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-on-surface font-label-sm text-label-sm mb-space-lg">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-secondary fill-secondary" aria-hidden="true" />
                  <strong className="font-bold">{COURSE_DETAIL_HERO.rating}</strong>
                  <span className="text-on-surface-variant">{COURSE_DETAIL_HERO.reviewsLabel}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                  <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                  {COURSE_DETAIL_HERO.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                  <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
                  {COURSE_DETAIL_HERO.language}
                </span>
              </div>

              {/* Mentor Ribbon */}
              <div className="inline-flex items-center gap-3 p-2.5 pr-5 rounded-xl bg-surface-container-lowest shadow-sm">
                <Image
                  src={COURSE_DETAIL_HERO.mentor.avatar}
                  alt={COURSE_DETAIL_HERO.mentor.name}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-container/20"
                />
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">
                    {COURSE_DETAIL_HERO.mentor.name}
                  </p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    {COURSE_DETAIL_HERO.mentor.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main 12-Col Body + Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Left 8-Col Editorial Content */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
              {/* What You Will Master */}
              <section className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-md">
                  What You Will Master
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {COURSE_COMPETENCIES.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-5 h-5 text-tertiary shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Prerequisites */}
              <section className="rounded-2xl bg-surface-container-low p-space-lg">
                <h2 className="font-title-md text-title-md text-on-surface font-bold mb-space-sm">
                  Prerequisites & Readiness
                </h2>
                <ul className="flex flex-col gap-2">
                  {COURSE_PREREQUISITES.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 font-body-sm text-body-sm text-on-surface-variant"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Expandable Curriculum Accordion */}
              <section className="flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center justify-between gap-space-sm">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Comprehensive Curriculum
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      5 Structured Modules • 96 Live Hours • 12 Hands-on Projects
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExpandToggle}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold transition-colors"
                  >
                    {allExpanded ? "Collapse All Modules" : "Expand All Modules"}
                  </button>
                </div>

                <div className="flex flex-col gap-space-sm">
                  {COURSE_CURRICULUM.map((mod) => {
                    const isOpen = openModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          aria-expanded={isOpen}
                          className="w-full p-space-md sm:p-space-lg text-left flex items-center justify-between gap-space-md hover:bg-surface-container-low/60 transition-colors"
                        >
                          <div className="flex items-center gap-space-md min-w-0">
                            <span className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-title-md text-title-md font-bold flex items-center justify-center shrink-0">
                              {mod.number}
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                                {mod.title}
                              </h3>
                              <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                                {mod.meta}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {isOpen && (
                          <div className="px-space-md sm:px-space-lg pb-space-md flex flex-col gap-2 border-t border-surface-container pt-space-sm">
                            {mod.lessons.map((lesson) => (
                              <div
                                key={lesson.title}
                                className="p-2.5 rounded-lg bg-surface-container-low/70 flex flex-wrap items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {lesson.type === "lab" ? (
                                    <Terminal
                                      className="w-4 h-4 text-tertiary shrink-0"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlayCircle
                                      className="w-4 h-4 text-primary shrink-0"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <span className="font-body-sm text-body-sm text-on-surface">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {lesson.isPreview && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setPreviewTitle(lesson.title);
                                        setPreviewOpen(true);
                                      }}
                                      className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold hover:opacity-85 transition-opacity"
                                    >
                                      Free Preview
                                    </button>
                                  )}
                                  <span className="font-caption text-caption text-on-surface-variant">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Meet Your Lead Mentor */}
              <section className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm flex flex-col sm:flex-row items-start gap-space-lg">
                <Image
                  src={COURSE_MENTOR.avatar}
                  alt={COURSE_MENTOR.name}
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 shadow-sm"
                />
                <div className="flex flex-col gap-space-sm">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
                    Meet Your Lead Mentor
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {COURSE_MENTOR.name}
                  </h2>
                  <p className="font-label-sm text-label-sm text-primary font-medium">
                    {COURSE_MENTOR.role}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {COURSE_MENTOR.bio}
                  </p>
                  <div className="grid grid-cols-3 gap-space-md pt-space-sm">
                    {COURSE_MENTOR.stats.map((stat) => (
                      <div key={stat.label} className="p-space-sm rounded-xl bg-surface-container-low">
                        <p className="font-title-md text-title-md text-primary font-bold">
                          {stat.value}
                        </p>
                        <p className="font-caption text-caption text-on-surface-variant">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Learner Feedback & Ratings */}
              <section className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-sm flex flex-col gap-space-lg">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Student Reviews & Outcomes
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-lg items-center p-space-md rounded-xl bg-surface-container-low">
                  <div className="sm:col-span-4 text-center flex flex-col items-center">
                    <span className="font-display-hero-mobile text-display-hero-mobile text-primary font-bold">
                      {COURSE_REVIEWS_SUMMARY.average}
                    </span>
                    <div className="flex items-center gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-secondary fill-secondary"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {COURSE_REVIEWS_SUMMARY.totalLabel}
                    </span>
                  </div>

                  <div className="sm:col-span-8 flex flex-col gap-2">
                    {COURSE_REVIEWS_SUMMARY.distribution.map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="font-caption text-caption text-on-surface font-semibold w-10">
                          {row.stars} Star
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{ width: `${row.percent}%` }}
                          />
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant w-8 text-right">
                          {row.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {COURSE_REVIEWS_SUMMARY.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <Image
                              src={review.avatar}
                              alt={review.author}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-semibold">
                                {review.author}
                              </p>
                              <p className="font-caption text-caption text-on-surface-variant">
                                {review.role}
                              </p>
                            </div>
                          </div>
                          <span className="font-caption text-caption text-outline">
                            {review.date}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Related Pathways */}
              <section className="flex flex-col gap-space-md">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Related Career Pathways
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {COURSE_RELATED.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                    >
                      <div className="relative h-44 w-full bg-surface-container overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface font-caption text-caption font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-space-md flex flex-col gap-2">
                        <h3 className="font-title-md text-title-md text-on-surface font-bold group-hover:text-primary-container transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption">
                          <span>{item.duration}</span>
                          <span className="font-title-md text-title-md text-primary font-bold">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Right 4-Col Sticky Enrollment Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-space-md">
              <div className="rounded-2xl bg-surface-container-lowest shadow-md overflow-hidden">
                {/* Video Preview Thumbnail */}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewTitle("Cohort #14 Orientation & Full-Stack Architecture Preview");
                    setPreviewOpen(true);
                  }}
                  aria-label="Play course preview video"
                  className="relative aspect-video w-full bg-inverse-surface group overflow-hidden block text-left"
                >
                  <Image
                    src={COURSE_SIDEBAR.previewThumb}
                    alt="Course preview workspace"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-inverse-surface/45 group-hover:bg-inverse-surface/35 transition-colors flex flex-col items-center justify-center gap-2">
                    <span className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface/90 text-on-surface font-caption text-caption font-semibold">
                      Watch 3-min Course Preview
                    </span>
                  </div>
                </button>

                <div className="p-space-lg flex flex-col gap-space-md">
                  {/* Pricing Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-headline-lg text-headline-lg text-primary font-bold">
                        {COURSE_SIDEBAR.price}
                      </span>
                      <span className="font-body-md text-body-md text-outline line-through">
                        {COURSE_SIDEBAR.originalPrice}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                      {COURSE_SIDEBAR.discountBadge}
                    </span>
                  </div>

                  {/* Urgency Banner */}
                  <div className="p-3 rounded-xl bg-secondary-fixed/50 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-label-sm text-label-sm text-on-secondary-fixed font-bold">
                        {COURSE_SIDEBAR.urgencyTitle}
                      </p>
                      <p className="font-caption text-caption text-on-secondary-fixed-variant">
                        {COURSE_SIDEBAR.urgencySubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setEnrollModalOpen(true)}
                      className="w-full py-3 px-space-md rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Enroll in Cohort #14</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <Link
                      href="/video-learning"
                      className="w-full py-2.5 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors text-center"
                    >
                      Try Sample Video Classroom
                    </Link>
                  </div>

                  {/* Track Specifications */}
                  <div className="pt-space-sm border-t border-surface-container flex flex-col gap-3">
                    <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                      Track Specifications
                    </h3>
                    {COURSE_SIDEBAR.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between gap-2 text-body-sm font-body-sm"
                      >
                        <span className="flex items-center gap-2 text-on-surface-variant">
                          {renderSpecIcon(spec.icon)}
                          {spec.label}
                        </span>
                        <span className="font-semibold text-on-surface">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Share & Corporate Link */}
                  <div className="pt-space-sm border-t border-surface-container flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleShareCourse}
                      className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary hover:text-primary font-semibold transition-colors"
                    >
                      {copiedShare ? (
                        <>
                          <Check className="w-4 h-4 text-tertiary" aria-hidden="true" />
                          <span className="text-tertiary">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" aria-hidden="true" />
                          <span>Share Course</span>
                        </>
                      )}
                    </button>
                    <a
                      href="#footer-contact"
                      className="font-caption text-caption text-on-surface-variant hover:text-primary underline"
                    >
                      Team / Corporate Seats?
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* Video Preview Modal */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Course Video Preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/70 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container-lowest overflow-hidden shadow-2xl">
            <div className="px-space-lg py-space-md flex items-center justify-between border-b border-surface-container">
              <h3 className="font-title-md text-title-md text-on-surface font-bold truncate pr-4">
                {previewTitle}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close preview modal"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-inverse-surface">
              <Image
                src={COURSE_SIDEBAR.previewThumb}
                alt="Video preview"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-inverse-on-surface p-6 text-center">
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
                  Interactive Frontend Preview
                </span>
                <p className="font-body-md text-body-md max-w-md">
                  Explore the full interactive classroom experience with module notes, code
                  snippets, and lesson curriculum.
                </p>
                <Link
                  href="/video-learning"
                  className="px-space-lg py-2.5 rounded-xl bg-surface text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
                >
                  Open Video Learning Player
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Info Modal (UI-only, no fake payment processing) */}
      {enrollModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cohort Enrollment Summary"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-caption text-caption text-secondary uppercase font-semibold">
                  Admission Inquiry
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Reserve Seat in Cohort #14
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnrollModalOpen(false)}
                aria-label="Close enrollment dialog"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Full-Stack MERN Stack & Next.js Mastery tuition is{" "}
              <strong className="text-primary">{COURSE_SIDEBAR.price}</strong> (installment plans
              available via bKash, Nagad, and Bank Transfer). Create a student account or sign in to
              continue enrollment.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEnrollModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors"
              >
                Continue to Registration
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
