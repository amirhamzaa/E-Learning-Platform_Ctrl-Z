"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  FileText,
  Megaphone,
  MessageSquare,
  PlusCircle,
  Presentation,
  Radio,
  Reply,
  Send,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  INSTRUCTOR_COURSES_TABLE,
  INSTRUCTOR_MENTOR,
  INSTRUCTOR_QA_ALERTS,
  INSTRUCTOR_REVIEW_QUEUE,
  INSTRUCTOR_UPCOMING_BATCHES,
} from "@/data/instructorDashboard";
import { PortalShell } from "@/components/dashboard/PortalShell";

export function InstructorDashboardView() {
  const [courseFilter, setCourseFilter] = useState("All");
  const [reviewQueue, setReviewQueue] = useState(INSTRUCTOR_REVIEW_QUEUE);
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [gradeScore, setGradeScore] = useState("94");
  const [gradeNote, setGradeNote] = useState("");
  const [replyingId, setReplyingId] = useState(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [repliedMap, setRepliedMap] = useState({});
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const filteredCourses = useMemo(() => {
    if (courseFilter === "All") return INSTRUCTOR_COURSES_TABLE;
    return INSTRUCTOR_COURSES_TABLE.filter((c) => c.status === courseFilter);
  }, [courseFilter]);

  const handleGradeSubmit = (event) => {
    event.preventDefault();
    if (!activeSubmission) return;
    setReviewQueue((prev) => prev.filter((item) => item.id !== activeSubmission.id));
    showToast(`Graded ${activeSubmission.student} (${gradeScore}/100)`);
    setActiveSubmission(null);
    setGradeNote("");
  };

  const handleQaReplySubmit = (qaId) => {
    const trimmed = replyDraft.trim();
    if (!trimmed) return;
    setRepliedMap((prev) => ({ ...prev, [qaId]: trimmed }));
    setReplyingId(null);
    setReplyDraft("");
    showToast("Reply posted to student discussion.");
  };

  const handleBroadcastSubmit = (event) => {
    event.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastOpen(false);
    setBroadcastMessage("");
    showToast("Announcement queued for all active batches (UI preview).");
  };

  return (
    <PortalShell
      activeRole="instructor"
      activeNav="overview"
      userName="Ariful Islam"
      userMeta="ID: INST-4091"
      userAvatar={INSTRUCTOR_MENTOR.avatar}
    >
      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-tertiary-fixed" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Ambient Banner & Mentor Highlight */}
      <section className="relative w-full rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-space-lg shadow-sm overflow-hidden mb-space-xl">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-48 -bottom-16 w-72 h-72 rounded-full bg-tertiary-fixed-dim/30 blur-2xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
            <div className="relative shrink-0">
              <Image
                src={INSTRUCTOR_MENTOR.avatar}
                alt={INSTRUCTOR_MENTOR.name}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-caption text-caption flex items-center gap-0.5 shadow-sm">
                <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                Pro
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs flex-wrap mb-1">
                <span className="px-space-sm py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  {INSTRUCTOR_MENTOR.badge}
                </span>
                <span className="text-outline font-caption text-caption">
                  • ID: {INSTRUCTOR_MENTOR.id}
                </span>
                <span className="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  {INSTRUCTOR_MENTOR.status}
                </span>
              </div>
              <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                {INSTRUCTOR_MENTOR.name}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <Brain className="w-[18px] h-[18px] text-secondary shrink-0" aria-hidden="true" />
                <span>{INSTRUCTOR_MENTOR.headline}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <Link
              href="/live-class"
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md shadow-sm"
            >
              <Video className="w-[18px] h-[18px] text-secondary" aria-hidden="true" />
              <span>Schedule Live Session</span>
            </Link>
            <button
              type="button"
              onClick={() => showToast("Course Builder workspace ready (UI preview).")}
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md shadow-md"
            >
              <PlusCircle className="w-[18px] h-[18px]" aria-hidden="true" />
              <span>+ Create New Course</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
        {/* Stat 1 */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Total Enrolled
            </span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                2,450
              </span>
              <span className="font-label-sm text-label-sm text-tertiary flex items-center font-semibold">
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                +18.4%
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Active learners across 14 modules
            </p>
          </div>
          <div className="mt-space-sm pt-space-xs">
            <svg className="w-full h-8 text-secondary" fill="none" viewBox="0 0 120 28">
              <path
                d="M0 22 C 20 24, 30 15, 50 18 C 70 21, 80 8, 100 12 C 110 14, 115 4, 120 2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <path
                d="M0 22 C 20 24, 30 15, 50 18 C 70 21, 80 8, 100 12 C 110 14, 115 4, 120 2 L 120 28 L 0 28 Z"
                fill="currentColor"
                fillOpacity="0.08"
              />
            </svg>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Active Live Batches
            </span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <Presentation className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                4 Batches
              </span>
              <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption">
                Ongoing
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Next session starting in 2h 45m
            </p>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-2 mt-space-md overflow-hidden">
            <div className="bg-tertiary h-2 rounded-full w-3/4" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Gross Revenue (Month)
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <CreditCard className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                ৳ 4,85,000
              </span>
              <span className="font-caption text-caption text-secondary">BDT</span>
            </div>
            <p className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              +৳ 62,000 vs last month
            </p>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption mt-space-sm pt-space-xs">
            <span>Payout: 1st of next month</span>
            <span className="text-secondary font-semibold">bKash/Bank</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Learner Rating
            </span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                  4.92
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">/ 5.0</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Based on 1,820 reviews
              </p>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
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
                  strokeDasharray="98.4, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-label-sm text-label-sm font-bold text-on-surface">
                98%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 text-secondary mt-space-sm">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            ))}
            <span className="text-on-surface-variant font-caption text-caption ml-1.5 font-medium">
              Top Rated Mentor
            </span>
          </div>
        </div>
      </section>

      {/* Primary 12-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl mb-space-xl">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          {/* Upcoming Live Batches */}
          <section className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-space-md mb-space-sm">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Upcoming Live Batches
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Scheduled live studio interactive teaching sessions
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("Faculty calendar synced with Dhaka (BDT) timezone.")}
                className="px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1.5"
              >
                <span>View Calendar</span>
                <Calendar className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-space-md">
              {INSTRUCTOR_UPCOMING_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-surface-container transition-all"
                >
                  <div className="flex items-start gap-space-md min-w-0">
                    <div
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 ${
                        batch.imminent
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      <span className="font-caption text-[10px] font-bold uppercase leading-none">
                        {batch.dayLabel}
                      </span>
                      <span className="font-headline-sm text-headline-sm font-bold leading-tight">
                        {batch.hour}
                      </span>
                      <span className="font-caption text-[9px] uppercase leading-none">
                        {batch.period}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-space-xs flex-wrap mb-1">
                        {batch.imminent ? (
                          <span className="px-1.5 py-0.5 rounded bg-tertiary/10 text-tertiary font-caption text-caption font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                            {batch.liveBadge}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-caption text-caption font-medium">
                            {batch.batchCode}
                          </span>
                        )}
                        <span className="font-caption text-caption text-secondary">
                          {batch.imminent ? batch.batchCode : batch.liveBadge}
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface truncate">
                        {batch.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-space-md text-on-surface-variant font-caption text-caption mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" aria-hidden="true" />
                          {batch.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {batch.metaRight}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-sm shrink-0">
                    <button
                      type="button"
                      onClick={() => showToast(`${batch.secondaryCta} opened for ${batch.batchCode}.`)}
                      className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors"
                    >
                      {batch.secondaryCta}
                    </button>
                    {batch.primaryCta && batch.primaryHref && (
                      <Link
                        href={batch.primaryHref}
                        className={`px-space-md py-2 rounded-lg font-label-md text-label-md shadow-sm transition-all flex items-center gap-1.5 ${
                          batch.imminent
                            ? "bg-tertiary text-on-tertiary hover:bg-tertiary-container"
                            : "bg-secondary text-on-secondary hover:bg-primary"
                        }`}
                      >
                        {batch.imminent && <Radio className="w-4 h-4" aria-hidden="true" />}
                        <span>{batch.primaryCta}</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Course Performance Overview Table */}
          <section className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md mb-space-xs">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Course Performance Overview
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Real-time engagement, completion metrics, and revenue generated
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {["All", "Live Batch Running", "Published"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCourseFilter(status)}
                    className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm transition-colors ${
                      courseFilter === status
                        ? "bg-primary-container text-on-primary font-semibold"
                        : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {status === "All" ? "All Courses" : status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto -mx-space-lg px-space-lg">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="text-outline font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-space-sm font-semibold">Course Title</th>
                    <th className="py-3 px-space-sm font-semibold">Status</th>
                    <th className="py-3 px-space-sm font-semibold text-center">Active Learners</th>
                    <th className="py-3 px-space-sm font-semibold">Completion</th>
                    <th className="py-3 px-space-sm font-semibold text-right">Revenue (BDT)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-surface-container-low transition-colors rounded-lg"
                    >
                      <td className="py-3.5 px-space-sm">
                        <div className="flex items-center gap-space-sm">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-title-md text-title-md text-on-surface font-medium truncate">
                              {course.title}
                            </span>
                            <span className="font-caption text-caption text-on-surface-variant">
                              {course.meta}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-sm">
                        {course.status === "Live Batch Running" ? (
                          <span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                            Live Batch Running
                          </span>
                        ) : (
                          <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                            Published
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-space-sm text-center font-body-sm text-body-sm text-on-surface font-medium">
                        {course.learners}
                      </td>
                      <td className="py-3.5 px-space-sm">
                        <div className="flex flex-col gap-1 w-28">
                          <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                            <span>Rate</span>
                            <span className="font-semibold text-on-surface">
                              {course.completion}%
                            </span>
                          </div>
                          <div className="w-full bg-surface-container-high rounded-full h-1.5">
                            <div
                              className={`${course.barColor} h-1.5 rounded-full`}
                              style={{ width: `${course.completion}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-space-sm text-right font-title-md text-title-md text-primary font-semibold whitespace-nowrap">
                        {course.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right 4 Cols */}
        <div className="lg:col-span-4 flex flex-col gap-space-xl min-w-0">
          {/* Review Queue */}
          <section className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between pb-space-md mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Review Queue</h2>
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-caption text-[11px] flex items-center justify-center font-bold">
                  {reviewQueue.length}
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                18 Total
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Submissions awaiting feedback and rubrics grading
            </p>

            {reviewQueue.length === 0 ? (
              <div className="p-space-md rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed text-center font-body-sm text-body-sm font-medium">
                All queued submissions graded! Great work.
              </div>
            ) : (
              <div className="flex flex-col gap-space-md">
                {reviewQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-space-sm"
                  >
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <Image
                          src={item.avatar}
                          alt={item.student}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface leading-snug truncate">
                            {item.student}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {item.batch}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded font-caption text-caption font-semibold shrink-0 ${
                          item.tagTone === "tertiary"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : "bg-secondary-fixed text-on-secondary-fixed"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-between gap-2 text-on-surface-variant font-caption text-caption">
                      <span className="flex items-center gap-1.5 text-on-surface font-medium truncate">
                        {item.fileIcon === "code" ? (
                          <Code2 className="w-4 h-4 text-tertiary shrink-0" aria-hidden="true" />
                        ) : (
                          <FileText
                            className="w-4 h-4 text-secondary shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate">{item.file}</span>
                      </span>
                      <span className="shrink-0">{item.timeAgo}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" aria-hidden="true" />
                        {item.rubric}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveSubmission(item)}
                        className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all flex items-center gap-1 ${
                          item.featured
                            ? "bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                            : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                        }`}
                      >
                        <span>Review & Grade</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Community Q&A */}
          <section className="flex flex-col bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between pb-space-md mb-space-xs">
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Community Q&amp;A
                </h2>
                <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-caption text-caption font-semibold">
                  3 Unanswered
                </span>
              </div>
              <MessageSquare className="w-5 h-5 text-secondary" aria-hidden="true" />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Urgent forum queries posted by enrolled learners
            </p>

            <div className="flex flex-col gap-space-md">
              {INSTRUCTOR_QA_ALERTS.map((qa) => (
                <div
                  key={qa.id}
                  className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs hover:bg-surface-container transition-all"
                >
                  <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption">
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        qa.urgent ? "text-secondary" : "text-tertiary"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          qa.urgent ? "bg-error" : "bg-tertiary"
                        }`}
                      />
                      {qa.context}
                    </span>
                    <span>{qa.timeAgo}</span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">
                    {qa.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    &ldquo;{qa.excerpt}&rdquo;
                  </p>

                  {repliedMap[qa.id] && (
                    <div className="p-2.5 rounded-lg bg-tertiary-fixed/40 text-on-tertiary-fixed font-caption text-caption mt-1">
                      <strong>Your Reply:</strong> {repliedMap[qa.id]}
                    </div>
                  )}

                  {replyingId === qa.id ? (
                    <div className="flex flex-col gap-2 pt-2">
                      <textarea
                        rows={2}
                        value={replyDraft}
                        onChange={(event) => setReplyDraft(event.target.value)}
                        placeholder="Write mentor guidance..."
                        className="w-full p-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/25 resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingId(null);
                            setReplyDraft("");
                          }}
                          className="px-2.5 py-1 rounded bg-surface-container-high font-caption text-caption text-on-surface"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQaReplySubmit(qa.id)}
                          className="px-3 py-1 rounded bg-primary text-on-primary font-caption text-caption font-semibold"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-space-xs mt-1">
                      <span className="font-caption text-caption text-on-surface font-medium">
                        By: {qa.author}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingId(qa.id);
                          setReplyDraft("");
                        }}
                        className="px-space-sm py-1 rounded-lg bg-surface-container-lowest text-secondary hover:text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1"
                      >
                        <span>Reply Now</span>
                        <Reply className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Mentor Utility Strip */}
      <section className="w-full rounded-2xl bg-surface-container-high p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <Megaphone className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">
              Broadcast Announcement to All Active Batches
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Send instant SMS, Portal notification, or email update to all 2,450 students
              simultaneously.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => showToast("2 saved announcement drafts available.")}
            className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface font-label-md text-label-md transition-colors shadow-sm"
          >
            Drafts (2)
          </button>
          <button
            type="button"
            onClick={() => setBroadcastOpen(true)}
            className="px-space-md py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Create Announcement</span>
          </button>
        </div>
      </section>

      {/* Review & Grade Modal */}
      {activeSubmission && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Review and Grade Submission"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4"
        >
          <form
            onSubmit={handleGradeSubmit}
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-caption text-caption text-secondary uppercase font-semibold">
                  {activeSubmission.batch} • {activeSubmission.tag}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Grade {activeSubmission.student}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubmission(null)}
                aria-label="Close grading dialog"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg">
              Submission: <strong>{activeSubmission.file}</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rubric-score"
                className="font-label-sm text-label-sm text-on-surface font-semibold"
              >
                Rubric Score (out of 100)
              </label>
              <input
                id="rubric-score"
                type="number"
                min="0"
                max="100"
                value={gradeScore}
                onChange={(event) => setGradeScore(event.target.value)}
                className="px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/25"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="rubric-note"
                className="font-label-sm text-label-sm text-on-surface font-semibold"
              >
                Mentor Critique Note
              </label>
              <textarea
                id="rubric-note"
                rows={3}
                value={gradeNote}
                onChange={(event) => setGradeNote(event.target.value)}
                placeholder="Clean component tokens and responsive spacing..."
                className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/25 resize-none"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveSubmission(null)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold"
              >
                Submit Grade
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {broadcastOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Broadcast Batch Announcement"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4"
        >
          <form
            onSubmit={handleBroadcastSubmit}
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Broadcast to Active Batches
              </h3>
              <button
                type="button"
                onClick={() => setBroadcastOpen(false)}
                aria-label="Close announcement modal"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <textarea
              rows={4}
              value={broadcastMessage}
              onChange={(event) => setBroadcastMessage(event.target.value)}
              placeholder="Write your class schedule reminder, resource link, or holiday notice..."
              className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/25 resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setBroadcastOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Notice</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </PortalShell>
  );
}
