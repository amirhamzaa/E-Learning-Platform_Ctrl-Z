import { Calendar, FileUp, Video } from "lucide-react";
import { STUDENT_PROFILE } from "@/data/studentDashboard";

export function StudentWelcomeBanner() {
  return (
    <section
      id="welcome-bar"
      className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"
    >
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute right-48 -bottom-16 w-52 h-52 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <Calendar
              className="w-4 h-4 text-secondary shrink-0"
              aria-hidden="true"
            />
            <span>{STUDENT_PROFILE.dateLabel}</span>
            <span aria-hidden="true" className="mx-1.5 opacity-40">
              /
            </span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-caption">
              {STUDENT_PROFILE.academicWeek}
            </span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary tracking-tight mt-1">
            Welcome back, {STUDENT_PROFILE.fullName}! 🎓
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant italic mt-0.5">
            {STUDENT_PROFILE.quote}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm pt-2 lg:pt-0">
          <a
            href="#live-room"
            className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all duration-200"
          >
            <Video className="w-[18px] h-[18px]" aria-hidden="true" />
            <span>Join Next Class</span>
          </a>
          <a
            href="#assignments-desk"
            className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors"
          >
            <FileUp
              className="w-[18px] h-[18px] text-secondary"
              aria-hidden="true"
            />
            <span>Submit Assignment</span>
          </a>
        </div>
      </div>
    </section>
  );
}
