"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  FileText,
  Palette,
  Play,
  PlayCircle,
  Terminal,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SECONDARY_COURSES } from "@/data/studentDashboard";

const INITIAL_COUNTDOWN_SECONDS = 2 * 3600 + 37 * 60 + 42; // 02:37:42

function splitCountdown(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function StudentLearningAndLive() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_COUNTDOWN_SECONDS);
  const [actionHint, setActionHint] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const time = splitCountdown(secondsLeft);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      {/* Left: Continue Learning Feature Card (7 Cols) */}
      <div
        id="continue-learning"
        className="lg:col-span-7 flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-space-xs">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-primary-container"
            />
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Continue Learning
            </h2>
          </div>
          <a
            href="#continue-learning"
            className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-0.5"
          >
            <span>My Course Library</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row gap-space-md">
            {/* Thumbnail with Video Indicator */}
            <div className="relative w-full md:w-56 h-44 md:h-36 rounded-lg overflow-hidden shrink-0 group">
              <Image
                src="/images/student-redux-lesson.jpg"
                alt="Developer workspace displaying React code and Redux Toolkit slices in warm studio lighting"
                fill
                sizes="(max-width: 768px) 100vw, 224px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-surface-container-lowest/90 text-primary flex items-center justify-center shadow-md">
                  <Play
                    className="w-5 h-5 fill-current ml-0.5"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-inverse-surface/85 text-inverse-on-surface font-caption text-caption font-semibold">
                42:15
              </span>
            </div>

            {/* Content Details */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-caption text-caption uppercase px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
                    MERN Batch 22
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Updated 2 days ago
                  </span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mt-1.5">
                  Module 4: Redux Toolkit &amp; RTK Query
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                  Deep dive into global store slices, asynchronous
                  createAsyncThunk lifecycles, and cache invalidation workflows.
                </p>
              </div>

              <div className="mt-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-caption font-caption mb-1 text-on-surface-variant">
                  <span>Progress: Lesson 28 of 42</span>
                  <span className="font-semibold text-primary">
                    68% Finished
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={68}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="MERN Batch 22 module progress"
                  className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden"
                >
                  <div
                    className="bg-primary-container h-full rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card Footprint Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-sm bg-surface-container-low p-space-sm rounded-lg">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <FileText
                className="w-[18px] h-[18px] text-tertiary shrink-0"
                aria-hidden="true"
              />
              <span>Includes 2 Code Repos &amp; Lecture Slides PDF</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setActionHint(
                  "Video Learning Player page will be connected in an upcoming stage."
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-colors shrink-0"
            >
              <PlayCircle className="w-[18px] h-[18px]" aria-hidden="true" />
              <span>Resume Lesson 28 (Video 42 min)</span>
            </button>
          </div>
        </div>

        {/* Secondary Mini Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {SECONDARY_COURSES.map((course) => (
            <div
              key={course.id}
              className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center ${course.iconColorClass} shrink-0`}
                >
                  {course.icon === "palette" ? (
                    <Palette className="w-[18px] h-[18px]" aria-hidden="true" />
                  ) : (
                    <Terminal
                      className="w-[18px] h-[18px]"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                    {course.title}
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant truncate">
                    {course.nextLesson}
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold shrink-0">
                {course.progress}
              </span>
            </div>
          ))}
        </div>

        {actionHint && (
          <p
            role="status"
            className="font-caption text-caption text-on-secondary-fixed bg-secondary-fixed/50 px-space-md py-2 rounded-lg"
          >
            {actionHint}
          </p>
        )}
      </div>

      {/* Right: Upcoming Live Class Widget with Countdown (5 Cols) */}
      <div id="live-room" className="lg:col-span-5 flex flex-col gap-space-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-space-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Upcoming Live Class
            </h2>
          </div>
          <span className="font-caption text-caption bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2 py-0.5 rounded-full">
            Zoom Premium
          </span>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-md">
          {/* Live Alert Header Inside Card */}
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Today at 8:30 PM (BDT)</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                Live Debugging &amp; Next.js API Routes
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Interactive pair programming session: resolving CORS issues,
                Edge runtimes, and securing route handlers.
              </p>
            </div>
          </div>

          {/* Instructor Row */}
          <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
            <Image
              src="/images/mentor-fahim.jpg"
              alt="Portrait of senior Bangladeshi software engineer mentor Fahim Chowdhury"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-title-md text-title-md text-on-surface font-bold truncate">
                  Fahim Chowdhury
                </span>
                <BadgeCheck
                  className="w-4 h-4 text-secondary shrink-0"
                  aria-hidden="true"
                />
              </div>
              <span className="font-caption text-caption text-on-surface-variant truncate">
                Lead Full-Stack Mentor @ Shikhbe Shobai
              </span>
            </div>
          </div>

          {/* Meeting Countdown Matrix */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center justify-between gap-1 text-caption font-caption text-on-surface-variant">
              <span>Session Starts In:</span>
              <span className="font-semibold text-secondary">
                Meeting Room #842-192-302
              </span>
            </div>
            <div
              id="countdown-grid"
              className="grid grid-cols-3 gap-2 text-center"
            >
              <div className="p-space-xs bg-surface-container rounded-lg">
                <div
                  id="hours-val"
                  className="font-headline-md text-headline-md text-primary font-bold"
                >
                  {time.hours}
                </div>
                <div className="font-caption text-caption text-on-surface-variant">
                  Hours
                </div>
              </div>
              <div className="p-space-xs bg-surface-container rounded-lg">
                <div
                  id="minutes-val"
                  className="font-headline-md text-headline-md text-primary font-bold"
                >
                  {time.minutes}
                </div>
                <div className="font-caption text-caption text-on-surface-variant">
                  Minutes
                </div>
              </div>
              <div className="p-space-xs bg-surface-container rounded-lg">
                <div
                  id="seconds-val"
                  className="font-headline-md text-headline-md text-primary font-bold"
                >
                  {time.seconds}
                </div>
                <div className="font-caption text-caption text-on-surface-variant">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          {/* High-Impact Join Button */}
          <button
            type="button"
            onClick={() =>
              setActionHint(
                "Live Class Room page will be connected in an upcoming stage."
              )
            }
            className="w-full relative overflow-hidden group flex items-center justify-center gap-space-sm px-space-md py-3 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md font-bold shadow-md hover:bg-tertiary-container transition-all"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary-fixed" />
            </span>
            <span>Join Live Class via Zoom / Meet</span>
            <ArrowRight
              className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform shrink-0"
              aria-hidden="true"
            />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-2 text-caption font-caption text-on-surface-variant px-1">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>48 Classmates registered</span>
            </span>
            <a
              href="#live-room"
              className="text-secondary font-semibold hover:underline"
            >
              Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
