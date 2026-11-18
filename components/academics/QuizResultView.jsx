"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  BadgeCheck,
  Brain,
  Calendar,
  Check,
  CheckCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  Home,
  Lightbulb,
  MessageSquare,
  PauseCircle,
  RotateCcw,
  Timer,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { QUIZ_RESULT_BREAKDOWN, QUIZ_RESULT_SUMMARY } from "@/data/quizResult";
import { PortalShell } from "@/components/dashboard/PortalShell";

const FILTER_TABS = [
  { id: "all", label: "All Questions (15)" },
  { id: "correct", label: "Correct (13)" },
  { id: "incorrect", label: "Incorrect (1)" },
  { id: "skipped", label: "Skipped (1)" },
];

export function QuizResultView() {
  const [filter, setFilter] = useState("all");

  const visibleItems = useMemo(() => {
    if (filter === "all") return QUIZ_RESULT_BREAKDOWN;
    return QUIZ_RESULT_BREAKDOWN.filter((q) => q.status === filter);
  }, [filter]);

  return (
    <PortalShell activeRole="student" activeNav="quizzes-and-exams">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-1.5"
          >
            <Link
              href="/student/dashboard"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Dashboard</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/quiz" className="hover:text-primary transition-colors">
              Quizzes &amp; Exams
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Quiz #04 Results</span>
          </nav>

          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold tracking-wide">
              {QUIZ_RESULT_SUMMARY.moduleBadge}
            </span>
            <span className="text-on-surface-variant font-caption text-caption flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
              Assessment ID: {QUIZ_RESULT_SUMMARY.assessmentId}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-all"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>
              Retake Quiz <span className="text-secondary font-semibold text-xs ml-0.5">(1 Left)</span>
            </span>
          </Link>
          <Link
            href="/video-learning"
            className="inline-flex items-center justify-center gap-1.5 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:opacity-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Curriculum</span>
          </Link>
        </div>
      </div>

      {/* Hero Scorecard Banner */}
      <section className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden mb-space-xl">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-1/3 -bottom-24 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="flex flex-col max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm mb-3 w-fit">
              <BadgeCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Official Certified Evaluation</span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mb-2">
              {QUIZ_RESULT_SUMMARY.title}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              {QUIZ_RESULT_SUMMARY.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2.5 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-space-md py-2.5 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-on-surface font-semibold">
                  {QUIZ_RESULT_SUMMARY.studentName}
                </span>
                <span className="text-outline text-xs">{QUIZ_RESULT_SUMMARY.studentId}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{QUIZ_RESULT_SUMMARY.submittedDate}</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{QUIZ_RESULT_SUMMARY.submittedTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-container-low/70 p-space-md rounded-xl backdrop-blur-sm self-start lg:self-center">
            <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm shrink-0">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-caption text-caption text-secondary uppercase tracking-widest font-semibold">
                Evaluation Status
              </span>
              <span className="font-title-md text-title-md text-tertiary font-bold tracking-tight">
                {QUIZ_RESULT_SUMMARY.statusTitle}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {QUIZ_RESULT_SUMMARY.statusNote}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid KPIs */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-xl">
        {/* Radial Score Card */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-title-md text-title-md text-on-surface font-semibold">
              Total Score Attainment
            </span>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
              {QUIZ_RESULT_SUMMARY.grade}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-space-lg py-2">
            <div className="relative w-36 h-36 shrink-0">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-surface-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                <circle
                  className="text-tertiary"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeDasharray="314.16"
                  strokeDashoffset="41.8"
                  strokeLinecap="round"
                  strokeWidth="10"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">
                  {QUIZ_RESULT_SUMMARY.percentage}
                  <span className="text-title-md text-primary font-semibold">%</span>
                </span>
                <span className="font-caption text-caption text-on-surface-variant font-medium mt-1">
                  Accuracy
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-0 flex-1 w-full">
              <div>
                <div className="font-headline-md text-headline-md font-bold text-on-surface">
                  {QUIZ_RESULT_SUMMARY.marksObtained}{" "}
                  <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                    / {QUIZ_RESULT_SUMMARY.marksTotal} Marks
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Scored 4.2 points above the cohort median
                </p>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-tertiary h-full rounded-full w-[86.7%]" />
              </div>
              <div className="flex justify-between items-center text-caption font-caption text-on-surface-variant">
                <span>Pass: 21 Marks (70%)</span>
                <span>Target: 27 Marks (90%)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2.5 flex items-center justify-between text-body-sm font-body-sm bg-surface-container-low px-space-md py-2 rounded-lg">
            <span className="text-on-surface-variant">Cutoff Margin:</span>
            <span className="font-semibold text-tertiary flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              +5.0 Marks Safe Margin
            </span>
          </div>
        </div>

        {/* Secondary Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Correct
              </span>
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <CheckCheck className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md font-bold text-on-surface">
                13 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ 15</span>
              </div>
              <span className="font-caption text-caption text-tertiary font-semibold flex items-center gap-0.5 mt-0.5">
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                92.8% of answered
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Incorrect
              </span>
              <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                <X className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md font-bold text-on-surface">
                01 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">item</span>
              </div>
              <span className="font-caption text-caption text-error font-medium mt-0.5 block">
                -2.0 Marks penalty
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Skipped
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center">
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md font-bold text-on-surface">
                01 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">item</span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant font-medium mt-0.5 block">
                0 marks deducted
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Time Duration
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center">
                <Timer className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="font-title-md text-title-md font-bold text-on-surface">14m 22s</div>
              <span className="font-caption text-caption text-on-surface-variant mt-0.5 block">
                Allocated: 25m 00s
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between col-span-2">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Batch Standings
                </span>
                <span className="font-title-md text-title-md font-bold text-on-surface block mt-0.5">
                  Top 8% Class Percentile
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold shrink-0">
                Batch #SS-MERN-102
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex-1 bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[92%]" />
              </div>
              <span className="font-label-sm text-label-sm text-primary font-semibold whitespace-nowrap">
                92nd Percentile
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Endorsement & Next Milestone */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-xl">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row items-start md:items-center gap-space-lg relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container" />
          <div className="flex items-center gap-space-md shrink-0">
            <div className="relative">
              <Image
                src={QUIZ_RESULT_SUMMARY.mentorAvatar}
                alt={QUIZ_RESULT_SUMMARY.mentorName}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary-container/20"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
                <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface font-semibold leading-snug">
                {QUIZ_RESULT_SUMMARY.mentorName}
              </span>
              <span className="font-caption text-caption text-secondary font-medium">
                {QUIZ_RESULT_SUMMARY.mentorRole}
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                Shikhbe Shobai Faculty
              </span>
            </div>
          </div>

          <div className="flex-1 bg-surface-container-low p-space-md rounded-xl">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span className="font-label-sm text-label-sm font-semibold">
                Faculty Mentor Endorsement
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
              &ldquo;{QUIZ_RESULT_SUMMARY.mentorQuote}&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                Next Milestone
              </span>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                Unlocked
              </span>
            </div>
            <h2 className="font-title-md text-title-md font-semibold text-on-surface mb-1">
              Module 5: Microservice Gateways
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Prerequisite satisfied by achieving &gt;80% on Module 4 Auth Evaluation.
            </p>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between gap-2">
            <Link
              href="/assignments"
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:underline"
            >
              <span>Start Module 5</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <span className="text-caption font-caption text-on-surface-variant">
              Starts Monday, 8:00 PM
            </span>
          </div>
        </div>
      </section>

      {/* Detailed Question Review */}
      <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Detailed Question Review &amp; Analysis
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Inspect each question, evaluate answer rationale, and review mentor remarks.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={
                  filter === tab.id
                    ? "px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-all shadow-sm whitespace-nowrap"
                    : "px-space-md py-1.5 rounded-lg text-on-surface-variant font-label-sm text-label-sm font-medium hover:text-on-surface transition-colors whitespace-nowrap"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-space-lg">
          {visibleItems.map((item) => (
            <div key={item.id} className="bg-surface rounded-xl p-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md pb-space-xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-title-md text-title-md font-bold text-on-surface">
                    {item.number}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${
                      item.status === "correct"
                        ? "bg-tertiary-fixed text-on-tertiary-fixed"
                        : item.status === "incorrect"
                          ? "bg-error-container text-on-error-container"
                          : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {item.status === "correct" ? (
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : item.status === "incorrect" ? (
                      <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <PauseCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {item.statusBadge}
                  </span>
                  <span className="text-caption font-caption text-on-surface-variant uppercase tracking-wider">
                    {item.topic}
                  </span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.timeSpent}
                </span>
              </div>

              <p className="font-title-md text-title-md text-on-surface mb-space-md font-medium leading-relaxed">
                {item.prompt}
              </p>

              <div className="flex flex-col gap-2.5 mb-space-md">
                {item.options.map((opt) => {
                  const isCorrect = opt.state === "correct" || opt.state === "correct-picked";
                  const isWrong = opt.state === "incorrect-picked";
                  return (
                    <div
                      key={opt.letter}
                      className={`flex items-start gap-space-sm p-space-md rounded-lg font-body-md text-body-md ${
                        isCorrect
                          ? "bg-tertiary-fixed/35 text-on-surface font-medium shadow-sm"
                          : isWrong
                            ? "bg-error-container/40 text-on-surface"
                            : "bg-surface-container-lowest text-on-surface-variant opacity-80"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5 ${
                          isCorrect
                            ? "bg-tertiary text-on-tertiary"
                            : isWrong
                              ? "bg-error text-on-error"
                              : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {opt.letter}
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span>{opt.text}</span>
                        {opt.badge && (
                          <span
                            className={`inline-flex items-center gap-1 font-semibold text-label-sm whitespace-nowrap bg-surface-container-lowest px-2.5 py-0.5 rounded-full shadow-sm ${
                              isWrong ? "text-error" : "text-tertiary"
                            }`}
                          >
                            {isWrong ? (
                              <X className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            {opt.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                    {item.status === "incorrect" ? (
                      <Brain className="w-4 h-4 text-primary" aria-hidden="true" />
                    ) : (
                      <Lightbulb className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{item.explanationTitle}</span>
                  </div>
                  {item.explanationMeta && (
                    <span className="font-caption text-caption text-secondary font-medium">
                      {item.explanationMeta}
                    </span>
                  )}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PortalShell>
  );
}
