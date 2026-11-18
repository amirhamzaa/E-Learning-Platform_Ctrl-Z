"use client";

import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Calendar,
  CalendarOff,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  PlayCircle,
  Search,
  TrendingUp,
  UserCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  ATTENDANCE_BATCHES,
  ATTENDANCE_HEATMAP_DAYS,
  ATTENDANCE_SESSIONS_LOG,
} from "@/data/attendance";
import { PortalShell } from "@/components/dashboard/PortalShell";

const MONTHS = ["September 2024", "October 2024", "November 2024"];

const LOG_FILTERS = [
  { id: "all", label: "All Classes (42)" },
  { id: "present", label: "Attended (38)" },
  { id: "late", label: "Late Entry (3)" },
  { id: "absent", label: "Absent (4)" },
  { id: "leave", label: "Excused Leave (3)" },
];

export function AttendanceAnalyticsView() {
  const [selectedBatch, setSelectedBatch] = useState(ATTENDANCE_BATCHES[0]);
  const [monthIdx, setMonthIdx] = useState(1); // October 2024
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const filteredLog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ATTENDANCE_SESSIONS_LOG.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (q) {
        const hay = `${row.title} ${row.module} ${row.date} ${row.instructor}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [statusFilter, searchQuery]);

  const handleLeaveSubmit = (event) => {
    event.preventDefault();
    if (!leaveReason.trim()) return;
    setLeaveModalOpen(false);
    setLeaveReason("");
    showToast("Leave of absence request submitted for faculty review (UI preview).");
  };

  return (
    <PortalShell activeRole="student" activeNav="my-attendance">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex flex-col w-full gap-space-lg">
        {/* Top Breadcrumb & Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <Link href="/student/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Academics</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-primary-container font-semibold">
                Attendance &amp; Participation
              </span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
              Student Attendance Analytics &amp; Records
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Track your live session attendance percentage, leave records, and minimum
              certification eligibility requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <select
              value={selectedBatch}
              onChange={(event) => setSelectedBatch(event.target.value)}
              aria-label="Select enrolled batch"
              className="bg-surface-container-lowest text-on-surface font-label-md text-label-md px-space-md py-2.5 rounded-lg shadow-sm focus:outline-none cursor-pointer max-w-full"
            >
              {ATTENDANCE_BATCHES.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => showToast("Generating verified Attendance Report (.PDF) preview...")}
              className="flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md px-space-md py-2.5 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Report (.PDF)</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Overall Attendance
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface">94.2%</span>
                  <span className="inline-flex items-center gap-0.5 font-label-sm text-label-sm text-tertiary-container font-semibold">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    +1.8%
                  </span>
                </div>
              </div>
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-surface-container-high"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4.5"
                  />
                  <circle
                    className="text-tertiary-container"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset="7.3"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  />
                </svg>
                <BadgeCheck className="w-5 h-5 text-tertiary-container absolute" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 pt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Min. 80% required</span>
                <span className="text-tertiary-container font-semibold">Status: Optimal</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm w-fit">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Eligible for Certificate</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Scheduled Curriculum
                </span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-1">
                <span className="font-headline-lg text-headline-lg text-on-surface">
                  48 Sessions
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Batch duration: 16 intensive academic weeks
              </p>
            </div>
            <div className="mt-4 pt-3">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                <span>Completed: 42</span>
                <span>Remaining: 6</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-primary-container rounded-full w-[87.5%]" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Classes Attended
                </span>
                <span className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <UserCheck className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-1">
                <span className="font-headline-lg text-headline-lg text-on-surface">
                  38 Sessions
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Recorded via live classroom sync log
              </p>
            </div>
            <div className="mt-4 pt-3 flex items-center justify-between font-label-sm text-label-sm">
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
                <span>Full: 35</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                <span>Late Entry: 3</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Absences &amp; Leaves
                </span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <CalendarOff className="w-5 h-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">
                  4 Sessions
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">(8.3%)</span>
              </div>
              <div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
                <span>
                  Excused: <strong className="text-on-surface font-semibold">3</strong>
                </span>
                <span>•</span>
                <span>
                  Unexcused: <strong className="text-error font-semibold">1</strong>
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3">
              <button
                type="button"
                onClick={() => setLeaveModalOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 bg-surface-container-low hover:bg-surface-container text-primary-container font-label-sm text-label-sm py-2 rounded-lg transition-colors"
              >
                <CalendarPlus className="w-4 h-4" aria-hidden="true" />
                <span>Apply for Leave of Absence</span>
              </button>
            </div>
          </div>
        </section>

        {/* Heatmap Calendar & Monthly Trajectory */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface">
                  Attendance Matrix Heatmap
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Daily session presence, tardiness logs, and scheduled off-days
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {MONTHS[monthIdx]}
                </span>
                <div className="flex items-center bg-surface-container-low rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
                    aria-label="Previous month"
                    className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
                    aria-label="Next month"
                    className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-space-sm overflow-x-auto">
              <div className="min-w-[540px]">
                <div className="grid grid-cols-7 gap-2 mb-2 text-center font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {ATTENDANCE_HEATMAP_DAYS.map((cell) => {
                    const dotClass =
                      cell.status === "present" || cell.status === "today"
                        ? "bg-tertiary-container"
                        : cell.status === "late"
                          ? "bg-secondary-container"
                          : cell.status === "leave"
                            ? "bg-primary-container"
                            : cell.status === "absent"
                              ? "bg-error"
                              : "";

                    const textClass =
                      cell.status === "present" || cell.status === "today"
                        ? "text-tertiary-container font-semibold"
                        : cell.status === "late"
                          ? "text-secondary font-semibold"
                          : cell.status === "leave"
                            ? "text-primary-container font-semibold"
                            : cell.status === "absent"
                              ? "text-error font-semibold"
                              : "text-on-surface-variant";

                    return (
                      <div
                        key={cell.day}
                        className={`h-16 rounded-lg p-2 flex flex-col justify-between ${
                          cell.muted
                            ? "bg-surface-container-low/40 opacity-40"
                            : cell.status === "today"
                              ? "bg-primary-fixed/30 shadow-sm"
                              : cell.status === "off"
                                ? "bg-surface-container-low"
                                : "bg-surface-container-lowest border border-surface-container hover:shadow-sm transition-shadow"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-caption text-caption ${
                              cell.status === "today"
                                ? "text-primary font-bold"
                                : cell.status === "off"
                                  ? "text-on-surface-variant"
                                  : "text-on-surface font-semibold"
                            }`}
                          >
                            {cell.day}
                          </span>
                          {dotClass && <span className={`w-2 h-2 rounded-full ${dotClass}`} />}
                        </div>
                        {cell.label && (
                          <span className={`font-caption text-[10px] truncate ${textClass}`}>
                            {cell.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm flex flex-wrap items-center gap-space-md font-caption text-caption text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
                Attended On-Time (&gt;90% duration)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                Late Entry (15-30m late)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                Excused Leave
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                Unexcused Absence
              </span>
            </div>
          </div>

          {/* Monthly Trajectory */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-xs">
                <div>
                  <h2 className="font-title-md text-title-md text-on-surface">
                    Monthly Trajectory
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Longitudinal participation trend
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  +4.0%
                </span>
              </div>

              <div className="mt-space-md relative w-full h-44 flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 320 140">
                  <line
                    className="text-surface-container-high"
                    stroke="currentColor"
                    strokeDasharray="3,3"
                    x1="0"
                    x2="320"
                    y1="25"
                    y2="25"
                  />
                  <line
                    className="text-surface-container-high"
                    stroke="currentColor"
                    strokeDasharray="3,3"
                    x1="0"
                    x2="320"
                    y1="65"
                    y2="65"
                  />
                  <line
                    className="text-error/40"
                    stroke="currentColor"
                    strokeDasharray="4,4"
                    strokeWidth="1.5"
                    x1="0"
                    x2="320"
                    y1="58"
                    y2="58"
                  />
                  <polygon
                    className="text-tertiary-fixed/40"
                    fill="currentColor"
                    points="20,130 20,48 105,25 190,32 280,29 280,130"
                  />
                  <polyline
                    className="text-tertiary-container"
                    fill="none"
                    points="20,48 105,25 190,32 280,29"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <circle
                    className="fill-surface-container-lowest stroke-tertiary-container"
                    cx="20"
                    cy="48"
                    r="4.5"
                    strokeWidth="2.5"
                  />
                  <circle
                    className="fill-surface-container-lowest stroke-tertiary-container"
                    cx="105"
                    cy="25"
                    r="4.5"
                    strokeWidth="2.5"
                  />
                  <circle
                    className="fill-tertiary-container stroke-surface-container-lowest"
                    cx="190"
                    cy="32"
                    r="5"
                    strokeWidth="2"
                  />
                  <circle
                    className="fill-surface-container-lowest stroke-tertiary-container"
                    cx="280"
                    cy="29"
                    r="4.5"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center mt-2 font-label-sm text-label-sm">
                <div>
                  <span className="text-on-surface-variant block">August</span>
                  <span className="font-semibold text-on-surface">91.0%</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Sept</span>
                  <span className="font-semibold text-on-surface">96.0%</span>
                </div>
                <div>
                  <span className="text-tertiary-container font-semibold block">Oct (Curr)</span>
                  <span className="font-semibold text-tertiary-container">94.2%</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Nov (Est.)</span>
                  <span className="font-semibold text-on-surface-variant">95.0%</span>
                </div>
              </div>
            </div>

            <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-start gap-2">
              <Award className="w-5 h-5 text-tertiary-container shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-label-sm text-label-sm font-semibold text-on-surface block">
                  Capstone Project Clearance
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Your current 94.2% standing qualifies you for high honors accreditation upon
                  capstone delivery.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Class-wise Attendance History Table */}
        <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h2 className="font-title-md text-title-md text-on-surface">
                Class-wise Attendance Log
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Detailed record of session logins, verification timestamps, and class video replays
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search
                aria-hidden="true"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search attendance sessions"
                placeholder="Search topic, module, or date..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {LOG_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={
                  statusFilter === f.id
                    ? "px-space-md py-1.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold whitespace-nowrap shadow-sm"
                    : "px-space-md py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm whitespace-nowrap transition-colors"
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[740px]">
              <thead>
                <tr className="bg-surface-container-low/70 text-on-surface-variant font-label-sm text-label-sm">
                  <th className="py-3 px-space-md rounded-l-lg font-semibold">SESSION &amp; TOPIC</th>
                  <th className="py-3 px-space-sm font-semibold">MODULE</th>
                  <th className="py-3 px-space-sm font-semibold">DATE &amp; TIME</th>
                  <th className="py-3 px-space-sm font-semibold">TIME IN LIVE ROOM</th>
                  <th className="py-3 px-space-sm font-semibold">STATUS</th>
                  <th className="py-3 px-space-md rounded-r-lg font-semibold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {filteredLog.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-space-md">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-label-sm text-label-sm text-primary-container font-semibold shrink-0">
                          {row.number}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-on-surface truncate">{row.title}</span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {row.instructor}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-sm">
                      <span className="px-2 py-0.5 rounded bg-surface-container font-caption text-caption text-on-surface-variant whitespace-nowrap">
                        {row.module}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-sm whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-on-surface">{row.date}</span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          {row.time}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-sm whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={row.status === "absent" ? "font-medium text-error" : "font-medium"}>
                          {row.duration}
                        </span>
                        <span
                          className={`font-caption text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                            row.status === "present"
                              ? "text-tertiary-container bg-tertiary-fixed/60"
                              : row.status === "late"
                                ? "text-secondary bg-secondary-fixed"
                                : row.status === "absent"
                                  ? "text-error bg-error-container/40"
                                  : "text-on-surface-variant bg-surface-container"
                          }`}
                        >
                          {row.percent}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-sm">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold whitespace-nowrap ${
                          row.status === "present"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : row.status === "late"
                              ? "bg-secondary-fixed text-on-secondary-fixed"
                              : row.status === "absent"
                                ? "bg-error-container text-on-error-container"
                                : "bg-surface-container-high text-on-surface"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.status === "present"
                              ? "bg-tertiary-container"
                              : row.status === "late"
                                ? "bg-secondary"
                                : row.status === "absent"
                                  ? "bg-error"
                                  : "bg-outline"
                          }`}
                        />
                        {row.statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-right whitespace-nowrap">
                      <Link
                        href={row.actionHref}
                        className="inline-flex items-center gap-1 text-primary-container hover:text-primary font-label-sm text-label-sm font-semibold transition-colors"
                      >
                        {row.status === "leave" ? (
                          <FileText className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <PlayCircle className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span>{row.actionLabel}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Certificate Requirement Banner */}
        <section className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md shadow-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  Requirement for Course Completion Certificate
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold">
                  Safely Qualified
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                A minimum of <strong>80% live attendance</strong> or verified class recording
                watch-time is required to unlock your final capstone project submission and
                certificate. Your current status is <strong className="text-on-surface">94.2%</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <Link
              href="/attendance/details"
              className="px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-colors shadow-sm"
            >
              View Detailed Audit Log
            </Link>
          </div>
        </section>
      </div>

      {/* Leave Application Modal */}
      {leaveModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Apply for Leave of Absence"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4"
        >
          <form
            onSubmit={handleLeaveSubmit}
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Apply for Leave of Absence
              </h3>
              <button
                type="button"
                onClick={() => setLeaveModalOpen(false)}
                aria-label="Close leave modal"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <textarea
              rows={3}
              value={leaveReason}
              onChange={(event) => setLeaveReason(event.target.value)}
              placeholder="Explain your medical or official absence reason (minimum 4 hours prior to class)..."
              className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container/25 resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setLeaveModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold"
              >
                Submit Leave Request
              </button>
            </div>
          </form>
        </div>
      )}
    </PortalShell>
  );
}
