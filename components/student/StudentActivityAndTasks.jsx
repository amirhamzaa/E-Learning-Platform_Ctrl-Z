"use client";

import { AlarmClock, CheckCircle2, Eye, Upload } from "lucide-react";
import { useState } from "react";
import { WEEKLY_HIGHLIGHTS, WEEKLY_STUDY_DATA } from "@/data/studentDashboard";

export function StudentActivityAndTasks() {
  const [selectedDay, setSelectedDay] = useState("Thu");
  const [taskFeedback, setTaskFeedback] = useState(null);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      {/* Weekly Study Hours & Activity Breakdown (7 Cols) */}
      <div
        id="weekly-activity"
        className="lg:col-span-7 flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-space-xs">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-secondary"
            />
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Weekly Learning Activity
            </h2>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span>Total:</span>
            <strong className="text-primary font-bold">18.4 Hours</strong>
          </div>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md">
          {/* Bar Chart Mon to Sun */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-1 text-caption font-caption text-on-surface-variant">
              <span>Study Hours distribution (Target: 2.5h / day)</span>
              <span className="text-tertiary font-semibold">
                Goal met 5/7 days
              </span>
            </div>

            <div className="w-full h-48 flex items-end justify-between gap-1.5 sm:gap-2 pt-6 pb-2 px-2 bg-surface-container-low rounded-lg">
              {WEEKLY_STUDY_DATA.map((item) => {
                const isSelected = selectedDay === item.day;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelectedDay(item.day)}
                    aria-label={`${item.day}: ${item.hoursLabel}`}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group focus:outline-none"
                  >
                    <span
                      className={`font-caption text-caption transition-opacity ${
                        item.tooltipClass
                      } ${
                        isSelected
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      }`}
                    >
                      {item.hoursLabel}
                    </span>
                    <div
                      className={`w-full max-w-[36px] ${item.barClass} rounded-t-md transition-colors`}
                      style={{ height: `${item.heightPercent}%` }}
                    />
                    <span
                      className={`font-label-sm text-label-sm ${item.labelClass}`}
                    >
                      {item.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weekly Highlights Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
            {WEEKLY_HIGHLIGHTS.map((stat) => (
              <div
                key={stat.label}
                className="p-space-sm rounded-lg bg-surface-container flex flex-col"
              >
                <span className="font-caption text-caption text-on-surface-variant">
                  {stat.label}
                </span>
                <span
                  className={`font-title-md text-title-md font-bold ${stat.valueClass}`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Assignments & Quizzes (5 Cols) */}
      <div
        id="assignments-desk"
        className="lg:col-span-5 flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-space-xs">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-error"
            />
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Pending Tasks &amp; Tests
            </h2>
          </div>
          <a
            href="#assignments-desk"
            className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
          >
            All Tasks (3)
          </a>
        </div>

        <div className="flex flex-col gap-space-sm">
          {/* Critical Pending Assignment */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
                <AlarmClock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Due Tomorrow, 11:59 PM</span>
              </span>
              <span className="font-caption text-caption text-on-surface-variant font-medium">
                Batch 22 • Assignment #06
              </span>
            </div>

            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                E-Commerce Cart Reducer Assignment
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Implement pure function actions for incrementing quantity,
                coupon calculations, and local storage state persistence.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Max Score: 100 Pts
              </span>
              <button
                type="button"
                onClick={() =>
                  setTaskFeedback(
                    "Assignment submission portal will be connected in an upcoming stage."
                  )
                }
                className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Upload Solution</span>
              </button>
            </div>
          </div>

          {/* Quiz Evaluated Item */}
          <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
                <CheckCircle2
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Evaluated</span>
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                Completed Oct 21
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex flex-col min-w-0">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Quiz 4: Async/Await &amp; Promises
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  JavaScript ES6+ Deep Evaluation
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                  90%
                </span>
                <span className="block font-caption text-caption text-on-surface-variant">
                  18/20 Correct
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-space-xs mt-1">
              <button
                type="button"
                onClick={() =>
                  setTaskFeedback(
                    "Quiz Result Summary page will be connected in an upcoming stage."
                  )
                }
                className="font-label-sm text-label-sm text-secondary hover:underline inline-flex items-center gap-1"
              >
                <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Review Answer Key</span>
              </button>
              <span className="font-caption text-caption text-tertiary font-medium">
                Rank #4 in Batch
              </span>
            </div>
          </div>

          {taskFeedback && (
            <p
              role="status"
              className="font-caption text-caption text-on-secondary-fixed bg-secondary-fixed/50 px-space-md py-2 rounded-lg"
            >
              {taskFeedback}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
