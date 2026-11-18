"use client";

import Link from "next/link";
import {
  ArrowUp,
  Award,
  BadgeCheck,
  Calendar,
  CalendarCheck2,
  CalendarOff,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Info,
  LogIn,
  Search,
  ShieldCheck,
  User,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  STUDENT_ATTENDANCE_PROFILE,
  STUDENT_ATTENDANCE_ROWS,
} from "@/data/attendanceDetails";
import { PortalShell } from "@/components/dashboard/PortalShell";

export function StudentAttendanceDetailsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveNote, setLeaveNote] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STUDENT_ATTENDANCE_ROWS.filter((row) => {
      if (statusFilter !== "ALL" && row.status !== statusFilter) return false;
      if (q) {
        const hay = `${row.title} ${row.module} ${row.date} ${row.remarks}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [searchQuery, statusFilter]);

  const handleLeaveSubmit = (event) => {
    event.preventDefault();
    if (!leaveNote.trim()) return;
    setLeaveModalOpen(false);
    setLeaveNote("");
    showToast("Leave request logged for Batch #SS-MERN-102 (UI preview).");
  };

  return (
    <PortalShell activeRole="student" activeNav="my-attendance">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex flex-col w-full pb-space-xl">
        {/* Top Breadcrumb & Metadata Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm flex-wrap">
            <Link href="/student/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <Link href="/attendance" className="hover:text-primary transition-colors">
              Attendance Analytics
            </Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-primary font-semibold">Course Details: Full Stack MERN</span>
          </div>

          <div className="flex items-center gap-space-sm self-start md:self-auto flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              {STUDENT_ATTENDANCE_PROFILE.termBadge}
            </span>
            <span className="font-caption text-caption text-on-surface-variant">
              {STUDENT_ATTENDANCE_PROFILE.lastSynced}
            </span>
          </div>
        </div>

        {/* Hero Profile Banner */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm mb-space-lg">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-12 -bottom-16 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"
          />

          <div className="relative p-space-md md:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center shadow-inner text-primary-container">
                  <span className="font-display-hero-mobile text-display-hero-mobile font-bold tracking-tight">
                    {STUDENT_ATTENDANCE_PROFILE.initials}
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 p-1 bg-tertiary text-on-tertiary rounded-full shadow-sm">
                  <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-space-xs mb-1">
                  <h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                    {STUDENT_ATTENDANCE_PROFILE.name}
                  </h1>
                  <span className="px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    {STUDENT_ATTENDANCE_PROFILE.studentId}
                  </span>
                  <span className="px-space-sm py-0.5 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-label-sm font-semibold">
                    {STUDENT_ATTENDANCE_PROFILE.cohortTag}
                  </span>
                </div>
                <p className="font-title-md text-title-md text-primary font-medium mb-1">
                  {STUDENT_ATTENDANCE_PROFILE.courseTitle}
                </p>
                <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-outline" aria-hidden="true" />
                    Batch:{" "}
                    <strong className="text-on-surface font-medium">
                      {STUDENT_ATTENDANCE_PROFILE.batch}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-outline" aria-hidden="true" />
                    Instructor:{" "}
                    <strong className="text-on-surface font-medium">
                      {STUDENT_ATTENDANCE_PROFILE.instructor}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-outline" aria-hidden="true" />
                    Schedule:{" "}
                    <strong className="text-on-surface font-medium">
                      {STUDENT_ATTENDANCE_PROFILE.schedule}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm">
              <button
                type="button"
                onClick={() => setLeaveModalOpen(true)}
                className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CalendarOff className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Apply for Leave</span>
              </button>
              <button
                type="button"
                onClick={() => showToast("Downloading certified course attendance report (.PDF)...")}
                className="w-full sm:w-auto px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Report (.PDF)</span>
              </button>
            </div>
          </div>

          <div className="px-space-md md:px-space-lg py-2.5 bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm font-caption text-caption text-on-surface-variant">
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center gap-1 text-tertiary font-semibold">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Academic Status: Certified Regular Attendee
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Biometric Web Log &amp; Zoom Auth Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Curriculum Authority:</span>
              <strong className="text-on-surface">Shikhbe Shobai Faculty Senate</strong>
            </div>
          </div>
        </section>

        {/* Primary 4-Column Metric Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Attendance Rate
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    94.2%
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center">
                    <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                    +3.2%
                  </span>
                </div>
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
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
                    strokeDasharray="94.2, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <Award className="w-4 h-4 text-tertiary absolute" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-space-md bg-surface-container-low/70 rounded-lg p-2 flex items-center justify-between">
              <span className="font-caption text-caption text-on-surface-variant">
                Min. 80% to Certify
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                Qualified <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Sessions Progress
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    42
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                    / 48
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-space-md">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-1.5">
                <div className="bg-primary-container h-full rounded-full w-[87.5%]" />
              </div>
              <div className="flex justify-between font-caption text-caption text-on-surface-variant">
                <span>87.5% Completed</span>
                <span className="text-primary font-medium">6 Remaining</span>
              </div>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Total Attended
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-tertiary">
                    38
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">Sessions</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <UserCheck className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-space-md grid grid-cols-2 gap-2 bg-surface-container-low/70 p-2 rounded-lg">
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">
                  On-Time
                </span>
                <span className="font-title-md text-title-md font-semibold text-tertiary">35</span>
              </div>
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">
                  Late (&gt;15m)
                </span>
                <span className="font-title-md text-title-md font-semibold text-secondary">3</span>
              </div>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Absence Summary
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    4
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Sessions Missed
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <UserX className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-space-md grid grid-cols-2 gap-2 bg-surface-container-low/70 p-2 rounded-lg">
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">
                  Approved Leave
                </span>
                <span className="font-title-md text-title-md font-semibold text-on-surface">3</span>
              </div>
              <div>
                <span className="font-caption text-caption text-on-surface-variant block">
                  Unexcused
                </span>
                <span className="font-title-md text-title-md font-semibold text-error">1</span>
              </div>
            </div>
          </div>
        </section>

        {/* Middle Longitudinal Trend & Certificate Eligibility */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
          <div className="lg:col-span-8 p-space-md md:p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                  Monthly Participation &amp; Attendance Trend
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Class participation stability tracked against the cohort benchmark (78.0%).
                </p>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-primary-container" />
                  Student %
                </span>
                <span className="inline-flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                  <span className="w-3 h-0.5 bg-outline" />
                  Cohort Avg
                </span>
              </div>
            </div>

            <div className="relative w-full h-44 my-space-xs">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 140">
                <line stroke="#EBE7E1" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="20" y2="20" />
                <line stroke="#EBE7E1" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="60" y2="60" />
                <line stroke="#EBE7E1" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="600" y1="100" y2="100" />
                <line opacity="0.6" stroke="#8BA888" strokeDasharray="6 4" strokeWidth="1.5" x1="0" x2="600" y1="56" y2="56" />
                <path d="M 60,40 L 220,18 L 380,26 L 540,22" stroke="#6B4226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                <circle cx="60" cy="40" fill="#FAF9F6" r="5" stroke="#6B4226" strokeWidth="3" />
                <circle cx="220" cy="18" fill="#FAF9F6" r="5" stroke="#6B4226" strokeWidth="3" />
                <circle cx="380" cy="26" fill="#6B4226" r="6" stroke="#FAF9F6" strokeWidth="2" />
                <circle cx="540" cy="22" fill="#FAF9F6" r="5" stroke="#8BA888" strokeWidth="2" />
              </svg>
            </div>

            <div className="grid grid-cols-4 text-center pt-2 font-label-sm text-label-sm text-on-surface-variant">
              <div>
                <span className="block font-semibold text-on-surface">August</span>
                <span className="font-caption text-caption text-secondary">91.0% • 12/13</span>
              </div>
              <div>
                <span className="block font-semibold text-on-surface">September</span>
                <span className="font-caption text-caption text-secondary">96.0% • 15/15</span>
              </div>
              <div>
                <span className="block font-semibold text-primary">October</span>
                <span className="font-caption text-caption text-secondary">94.2% • 15/16</span>
              </div>
              <div>
                <span className="block font-semibold text-on-surface-variant">November</span>
                <span className="font-caption text-caption text-secondary">95.0% Proj.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="p-space-md rounded-xl bg-tertiary-container text-on-tertiary shadow-sm flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-space-sm">
                  <ShieldCheck className="w-5 h-5 text-on-tertiary-container" aria-hidden="true" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
                    Certification Metric
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm font-semibold leading-snug">
                  Certificate Eligibility: Approved
                </h2>
                <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1">
                  Ariful has achieved <strong>94.2%</strong> aggregate attendance, safely exceeding
                  the mandatory 80.0% threshold.
                </p>
              </div>
              <div className="mt-space-md bg-tertiary/40 rounded-lg p-space-sm">
                <div className="flex items-center justify-between text-caption font-caption text-on-tertiary-container mb-1">
                  <span>Minimum Target: 80%</span>
                  <span className="font-semibold text-on-tertiary">Safe Margin: +14.2%</span>
                </div>
                <div className="w-full bg-tertiary h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary-fixed h-full rounded-full w-[94.2%]" />
                </div>
                <p className="font-caption text-caption text-on-tertiary-container mt-2">
                  Final capstone review will unlock with Certificate on Nov 15.
                </p>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="font-title-md text-title-md font-semibold text-on-surface">
                  Batch Guidelines
                </span>
              </div>
              <ul className="font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-1.5">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Logging &gt;15 minutes after session initiation flags as{" "}
                    <strong>Late Entry</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Leaves must be requested 4 hours prior to class kickoff.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Session Attendance Log */}
        <section className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
          <div className="p-space-md md:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                Session Attendance Log &amp; Class Participation
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Comprehensive audit trail of online attendance, room log timings, and faculty notes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
              <div className="relative w-full sm:w-64">
                <Search
                  aria-hidden="true"
                  className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search topic or date"
                  placeholder="Search topic or date..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
                className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses (42)</option>
                <option value="PRESENT">Present (35)</option>
                <option value="LATE">Late Entry (3)</option>
                <option value="EXCUSED">Excused Leave (3)</option>
                <option value="ABSENT">Unexcused Absent (1)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm min-w-[760px]">
              <thead className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-space-md font-semibold">Session # &amp; Topic</th>
                  <th className="py-3 px-space-md font-semibold">Date &amp; Schedule</th>
                  <th className="py-3 px-space-md font-semibold">Duration / Room Log</th>
                  <th className="py-3 px-space-md font-semibold">Attendance Status</th>
                  <th className="py-3 px-space-md font-semibold">Faculty Remarks &amp; Notes</th>
                  <th className="py-3 px-space-md font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-on-surface">
                {filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface transition-colors border-t border-surface-container/60">
                    <td className="py-3.5 px-space-md">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-7 rounded bg-surface-container flex items-center justify-center font-label-sm text-label-sm font-semibold text-on-surface-variant shrink-0">
                          {row.number}
                        </span>
                        <div>
                          <div className="font-title-md text-title-md font-medium text-on-surface">
                            {row.title}
                          </div>
                          <div className="font-caption text-caption text-secondary">
                            {row.module}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <div className="font-medium text-on-surface">{row.date}</div>
                      <div className="font-caption text-caption text-on-surface-variant">
                        {row.schedule}
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <div
                        className={`font-medium ${
                          row.status === "ABSENT" ? "text-error" : "text-on-surface"
                        }`}
                      >
                        {row.duration}
                      </div>
                      <div
                        className={`font-caption text-caption flex items-center gap-1 ${
                          row.status === "PRESENT"
                            ? "text-tertiary"
                            : row.status === "LATE"
                              ? "text-secondary"
                              : row.status === "ABSENT"
                                ? "text-error"
                                : "text-outline"
                        }`}
                      >
                        {row.status === "PRESENT" && <LogIn className="w-3 h-3" aria-hidden="true" />}
                        {row.status === "LATE" && <Clock className="w-3 h-3" aria-hidden="true" />}
                        <span>{row.logNote}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
                          row.status === "PRESENT"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : row.status === "LATE"
                              ? "bg-secondary-fixed text-on-secondary-fixed"
                              : row.status === "EXCUSED"
                                ? "bg-surface-container-high text-on-surface-variant"
                                : "bg-error-container text-on-error-container"
                        }`}
                      >
                        {row.status === "EXCUSED" ? (
                          <CalendarCheck2 className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.status === "PRESENT"
                                ? "bg-tertiary"
                                : row.status === "LATE"
                                  ? "bg-secondary"
                                  : "bg-error"
                            }`}
                          />
                        )}
                        {row.statusLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-on-surface-variant max-w-xs truncate">
                      {row.remarks}
                    </td>
                    <td className="py-3.5 px-space-md text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Session ${row.number}: ${row.remarks}`)}
                        aria-label={`View log details for session ${row.number}`}
                        className="p-1.5 rounded-md hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {row.status === "EXCUSED" ? (
                          <FileText className="w-4 h-4" aria-hidden="true" />
                        ) : row.status === "ABSENT" ? (
                          <HelpCircle className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Info className="w-4 h-4" aria-hidden="true" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Leave Application Modal */}
      {leaveModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Apply for Course Leave"
          className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4"
        >
          <form
            onSubmit={handleLeaveSubmit}
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Request Excused Leave
              </h3>
              <button
                type="button"
                onClick={() => setLeaveModalOpen(false)}
                aria-label="Close modal"
                className="p-1.5 rounded-lg bg-surface-container text-on-surface"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <textarea
              rows={3}
              value={leaveNote}
              onChange={(event) => setLeaveNote(event.target.value)}
              placeholder="Specify session date and reason for leave..."
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
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </PortalShell>
  );
}
