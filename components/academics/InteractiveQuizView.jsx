"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Flag,
  LayoutGrid,
  MinusCircle,
  RotateCcw,
  Save,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  QUIZ_INITIAL_ANSWERS,
  QUIZ_INITIAL_REVIEW_FLAGS,
  QUIZ_META,
  QUIZ_QUESTIONS,
} from "@/data/quiz";
import { PortalShell } from "@/components/dashboard/PortalShell";

function formatCountdown(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function InteractiveQuizView() {
  const [currentNumber, setCurrentNumber] = useState(7);
  const [answers, setAnswers] = useState(QUIZ_INITIAL_ANSWERS);
  const [reviewFlags, setReviewFlags] = useState(QUIZ_INITIAL_REVIEW_FLAGS);
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_META.totalSeconds);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentNumber - 1];
  const selectedOption = answers[currentNumber] || null;
  const isFlagged = reviewFlags.includes(currentNumber);

  const answeredCount = Object.keys(answers).length;
  const reviewCount = reviewFlags.length;
  const remainingCount = QUIZ_META.totalQuestions - answeredCount;
  const progressPct = Math.round((answeredCount / QUIZ_META.totalQuestions) * 100);

  const handleSelectOption = (optionId) => {
    setAnswers((prev) => ({ ...prev, [currentNumber]: optionId }));
  };

  const handleClearSelection = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentNumber];
      return next;
    });
  };

  const handleToggleFlag = () => {
    setReviewFlags((prev) =>
      prev.includes(currentNumber)
        ? prev.filter((item) => item !== currentNumber)
        : [...prev, currentNumber]
    );
  };

  return (
    <PortalShell activeRole="student" activeNav="quizzes-and-exams">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface font-label-sm text-label-sm shadow-xl">
          {toast}
        </div>
      )}

      {/* Top Assessment Context Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm mb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                {QUIZ_META.courseBadge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Proctored Assessment
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-1">
              {QUIZ_META.title}
            </h1>
          </div>

          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-space-sm px-space-md py-2 bg-surface-container-low rounded-xl">
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-error animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-error relative" />
              </div>
              <div className="flex flex-col">
                <span className="font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider">
                  Remaining
                </span>
                <span className="font-headline-sm text-headline-sm text-error font-bold leading-none font-mono">
                  {formatCountdown(secondsLeft)}
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant self-end pb-0.5">
                {QUIZ_META.allocatedLabel}
              </span>
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => showToast("Quiz attempt draft saved locally.")}
                className="px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
              <Link
                href="/quiz/result"
                className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Submit Quiz</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Linear Progress Track */}
        <div className="mt-space-md pt-space-sm">
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1.5">
            <span className="font-semibold text-on-surface">
              Question {currentNumber} of {QUIZ_META.totalQuestions}
            </span>
            <span>{progressPct}% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Two-Column Assessment Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left 8 Cols: Active Question */}
        <section className="lg:col-span-8 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between gap-space-md mb-space-md pb-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md flex items-center justify-center font-bold">
                  {String(currentQuestion.number).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wide uppercase">
                    Question {currentQuestion.number} of {QUIZ_META.totalQuestions}
                  </span>
                  <span className="font-caption text-caption text-secondary">
                    {currentQuestion.type}
                  </span>
                </div>
              </div>
              <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                {currentQuestion.points}
              </span>
            </div>

            <h2 className="font-headline-sm text-headline-sm text-on-surface leading-snug mb-space-md">
              {currentQuestion.prompt}
            </h2>

            {currentQuestion.code && (
              <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface mb-space-lg shadow-inner">
                <div className="flex items-center justify-between px-space-md py-2 bg-surface-dim/20 text-inverse-on-surface/70 font-caption text-caption">
                  <span className="flex items-center gap-1.5 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-error" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
                    <span className="ml-2">{currentQuestion.codeFile}</span>
                  </span>
                  <span className="uppercase tracking-widest text-[10px]">
                    {currentQuestion.codeLang}
                  </span>
                </div>
                <pre className="p-space-md font-mono text-body-sm overflow-x-auto leading-relaxed">
                  <code>{currentQuestion.code}</code>
                </pre>
              </div>
            )}

            {/* Interactive Radio Options */}
            <div className="flex flex-col gap-space-sm">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left flex items-start gap-space-md p-space-md rounded-xl transition-all ${
                      isSelected
                        ? "bg-surface-container-lowest shadow-sm ring-2 ring-primary-container"
                        : "bg-surface-container-low hover:bg-surface-container"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? "bg-primary-container ring-4 ring-secondary-fixed"
                          : "bg-surface-container-highest"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-on-primary" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-title-md text-title-md text-on-surface font-semibold">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary-container font-label-sm text-label-sm font-semibold">
                            Selected Answer
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-body-md text-body-md leading-relaxed ${
                          isSelected ? "text-on-surface" : "text-on-surface-variant"
                        }`}
                      >
                        {opt.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Controls */}
            <div className="mt-space-xl pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <button
                  type="button"
                  disabled={currentNumber === 1}
                  onClick={() => setCurrentNumber((n) => Math.max(1, n - 1))}
                  className="px-space-md py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high disabled:opacity-40 text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`px-space-md py-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim font-label-md text-label-md flex items-center gap-1.5 transition-all ${
                    isFlagged ? "ring-2 ring-primary-container" : ""
                  }`}
                >
                  <Flag className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>{isFlagged ? "Marked for Review" : "Mark for Review"}</span>
                </button>
              </div>

              <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors"
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  disabled={currentNumber === QUIZ_META.totalQuestions}
                  onClick={() =>
                    setCurrentNumber((n) => Math.min(QUIZ_META.totalQuestions, n + 1))
                  }
                  className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary disabled:opacity-40 text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low text-on-surface-variant">
            <ShieldCheck className="w-6 h-6 text-primary-container shrink-0" aria-hidden="true" />
            <p className="font-body-sm text-body-sm leading-relaxed">
              <strong className="text-on-surface font-semibold">Integrity Protocol Active:</strong>{" "}
              Browser tab switching, developer tools inspection, and clipboard pasting are logged
              for instructor audit. Keep this window active during the assessment.
            </p>
          </div>
        </section>

        {/* Right 4 Cols: Question Palette & Rules */}
        <aside className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-primary-container" aria-hidden="true" />
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Question Palette
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-semibold">
                {QUIZ_META.totalQuestions} Questions
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2.5 mb-space-lg">
              {QUIZ_QUESTIONS.map((q) => {
                const isCurrent = q.number === currentNumber;
                const isAnswered = Boolean(answers[q.number]);
                const flagged = reviewFlags.includes(q.number);

                let btnClass =
                  "h-10 rounded-xl bg-surface-container text-on-surface-variant font-title-md text-title-md font-medium hover:bg-surface-container-high transition-colors";
                if (isCurrent) {
                  btnClass =
                    "h-10 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-bold ring-4 ring-secondary-container scale-105 shadow-sm";
                } else if (flagged) {
                  btnClass =
                    "relative h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-title-md text-title-md font-semibold hover:scale-105 transition-transform";
                } else if (isAnswered) {
                  btnClass =
                    "h-10 rounded-xl bg-tertiary-container text-on-tertiary font-title-md text-title-md font-semibold hover:scale-105 transition-transform";
                }

                return (
                  <button
                    key={q.number}
                    type="button"
                    onClick={() => setCurrentNumber(q.number)}
                    className={`flex items-center justify-center ${btnClass}`}
                  >
                    {q.number}
                    {flagged && !isCurrent && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary-container flex items-center justify-center">
                        <Flag className="w-2.5 h-2.5 text-on-secondary-container" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2 p-space-sm bg-surface-container-low rounded-xl mb-space-md">
              <div className="flex flex-col items-center text-center p-1.5">
                <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                  {answeredCount}
                </span>
                <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                  Answered
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-1.5">
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                  {reviewCount}
                </span>
                <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                  Review
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface-variant font-bold">
                  {remainingCount}
                </span>
                <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                  Remaining
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
              <span>Click question number to jump</span>
              <Link href="/quiz/result" className="text-primary hover:underline font-semibold">
                Preview Scorecard
              </Link>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-secondary" aria-hidden="true" />
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Rules &amp; Standards
              </h2>
            </div>
            <ul className="flex flex-col gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-on-surface">Passing Score:</strong> 70% threshold (minimum
                  11 / 15 correct answers required).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-on-surface">Attempts Allowed:</strong> 2 total attempts (
                  <span className="text-primary font-semibold">Attempt 1 in progress</span>).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MinusCircle className="w-4 h-4 text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-on-surface">Negative Marking:</strong> None. Unattempted
                  or incorrect answers will not deduct marks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Timer className="w-4 h-4 text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-on-surface">Time Limit:</strong> 25 minutes strict
                  countdown. No pause permissible.
                </span>
              </li>
            </ul>

            <div className="p-space-md rounded-xl bg-error-container/40 text-on-surface">
              <div className="flex items-center gap-2 text-error font-title-md text-title-md font-semibold mb-1">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                <span>Automatic Submission Notice</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                The assessment will auto-submit the moment the timer reaches{" "}
                <strong className="text-error font-semibold">00:00</strong>. All marked and answered
                items are retained in memory.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-space-md flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md">
                SS
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  Technical Proctor
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Live Help Available
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast("Technical proctor ticket opened (UI preview).")}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface font-label-sm text-label-sm font-semibold transition-colors"
            >
              Report Issue
            </button>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}
