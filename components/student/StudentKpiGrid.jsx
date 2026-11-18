import {
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";

const ATTENDANCE_SLOTS = [true, true, true, true, true, false];

export function StudentKpiGrid() {
  return (
    <section
      id="kpi-overview"
      aria-label="Learning Metrics Overview"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md"
    >
      {/* Metric 1: Active Cohorts */}
      <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Active Cohorts
          </span>
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            03
          </div>
          <div className="flex items-center gap-1.5 mt-1 font-body-sm text-body-sm text-secondary">
            <RefreshCw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>MERN, UI/UX, Python QA</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between text-caption font-caption text-on-surface-variant bg-surface-container-low px-2.5 py-1.5 rounded-lg">
          <span>Batch 22, 19 &amp; 08</span>
          <span className="font-semibold text-primary">In Track</span>
        </div>
      </div>

      {/* Metric 2: Syllabus Progress */}
      <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Syllabus Progress
          </span>
          <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              70%
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              84 / 120 Units
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={70}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall syllabus progress"
            className="w-full bg-surface-container h-2 rounded-full mt-2.5 overflow-hidden"
          >
            <div
              className="bg-primary-container h-full rounded-full transition-all duration-500"
              style={{ width: "70%" }}
            />
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between text-caption font-caption text-on-surface-variant bg-surface-container-low px-2.5 py-1.5 rounded-lg">
          <span>36 remaining units</span>
          <span className="text-tertiary font-semibold">+6 this week</span>
        </div>
      </div>

      {/* Metric 3: Class Attendance */}
      <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Class Attendance
          </span>
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
            <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              96%
            </span>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">
              Exemplary
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {ATTENDANCE_SLOTS.map((present, idx) => (
              <div
                key={idx}
                aria-hidden="true"
                className={`w-3 h-3 rounded-sm ${
                  present ? "bg-tertiary-container" : "bg-surface-container-high"
                }`}
              />
            ))}
            <span className="font-caption text-caption text-on-surface-variant ml-1">
              24 / 25 Sessions
            </span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between text-caption font-caption text-on-surface-variant bg-surface-container-low px-2.5 py-1.5 rounded-lg">
          <span>Eligible for Graduation</span>
          <span className="text-tertiary font-bold">100% Viva Pass</span>
        </div>
      </div>

      {/* Metric 4: Earned Credentials */}
      <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-space-sm">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Credentials
          </span>
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        <div>
          <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            02
          </div>
          <div className="flex items-center gap-1.5 mt-1 font-body-sm text-body-sm text-on-surface-variant">
            <BadgeCheck
              className="w-4 h-4 text-tertiary shrink-0"
              aria-hidden="true"
            />
            <span>Shikhbe Shobai Accredited</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between gap-2 text-caption font-caption text-on-surface-variant bg-surface-container-low px-2.5 py-1.5 rounded-lg">
          <span className="truncate">Frontend Foundational</span>
          <a
            href="#kpi-overview"
            className="text-secondary font-semibold hover:underline shrink-0"
          >
            View Public IDs
          </a>
        </div>
      </div>
    </section>
  );
}
