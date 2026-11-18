import {
  BookOpen,
  ClipboardCheck,
  Clock,
  CreditCard,
  GraduationCap,
  Radio,
  TrendingUp,
  Users,
} from "lucide-react";

export function AdminKpiGrid() {
  return (
    <section
      id="kpi-bento"
      aria-label="Platform Key Metrics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-xl"
    >
      {/* Metric 1: Total Students */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Total Students
          </span>
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
            <Users className="w-[18px] h-[18px]" aria-hidden="true" />
          </div>
        </div>
        <div className="my-space-sm">
          <div className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            68,420
          </div>
          <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary mt-1">
            <TrendingUp className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
            <span>+12.4% this month</span>
          </div>
        </div>
        <div className="text-caption font-caption text-outline">
          <span className="font-semibold text-on-surface">4,210</span> active
          learners today
        </div>
      </div>

      {/* Metric 2: Instructors */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Instructors
          </span>
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
            <GraduationCap className="w-[18px] h-[18px]" aria-hidden="true" />
          </div>
        </div>
        <div className="my-space-sm">
          <div className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            148
          </div>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary mt-1">
            <Clock className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
            <span>12 pending verification</span>
          </div>
        </div>
        <div className="text-caption font-caption text-outline">
          98% course completion rating
        </div>
      </div>

      {/* Metric 3: Active Curriculum */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Active Curriculum
          </span>
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
            <BookOpen className="w-[18px] h-[18px]" aria-hidden="true" />
          </div>
        </div>
        <div className="my-space-sm">
          <div className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            86{" "}
            <span className="font-title-md text-title-md text-outline">
              Tracks
            </span>
          </div>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary mt-1">
            <Radio className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
            <span>14 live cohorts running</span>
          </div>
        </div>
        <div className="text-caption font-caption text-outline">
          2,450 hours recorded video
        </div>
      </div>

      {/* Metric 4: Gross Revenue */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Gross Revenue
          </span>
          <div className="w-8 h-8 rounded-lg bg-secondary-container/40 flex items-center justify-center text-primary shrink-0">
            <CreditCard className="w-[18px] h-[18px]" aria-hidden="true" />
          </div>
        </div>
        <div className="my-space-sm">
          <div className="font-title-md text-title-md text-on-surface truncate tracking-tight font-bold">
            ৳ 1,84,50,000
          </div>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary mt-1">
            <TrendingUp className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
            <span>+18.5% YoY growth</span>
          </div>
        </div>
        <div className="text-caption font-caption text-outline">
          Bi-weekly payout in 2 days
        </div>
      </div>

      {/* Metric 5: Pending Approvals Queue */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border-l-4 border-l-secondary-container">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            Queue
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-caption font-semibold">
            Priority
          </span>
        </div>
        <div className="my-space-sm">
          <div className="font-headline-lg text-headline-lg text-primary tracking-tight">
            7{" "}
            <span className="font-title-md text-title-md text-outline">
              Items
            </span>
          </div>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant mt-1">
            <ClipboardCheck
              className="w-[15px] h-[15px] text-outline shrink-0"
              aria-hidden="true"
            />
            <span>5 Syllabi, 2 Mentors</span>
          </div>
        </div>
        <div className="text-caption font-caption text-outline">
          Estimated review time: ~45 min
        </div>
      </div>
    </section>
  );
}
