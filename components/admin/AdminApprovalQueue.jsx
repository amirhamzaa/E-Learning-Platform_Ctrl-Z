"use client";

import {
  CheckCircle2,
  Code2,
  Eye,
  FileUser,
  IdCard,
  Palette,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { APPROVAL_QUEUE_ITEMS } from "@/data/adminDashboard";

const QUEUE_FILTERS = [
  { id: "all", label: "All Submissions" },
  { id: "course", label: "Course Tracks (5)" },
  { id: "instructor", label: "Instructors (2)" },
];

function renderItemIcon(icon) {
  const iconClass = "w-5 h-5";
  switch (icon) {
    case "code":
      return <Code2 className={iconClass} aria-hidden="true" />;
    case "palette":
      return <Palette className={iconClass} aria-hidden="true" />;
    case "badge":
      return <IdCard className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function AdminApprovalQueue() {
  const [filter, setFilter] = useState("all");
  const [queueNotice, setQueueNotice] = useState(null);

  const visibleRows =
    filter === "all"
      ? APPROVAL_QUEUE_ITEMS
      : APPROVAL_QUEUE_ITEMS.filter((item) => item.type === filter);

  return (
    <section
      id="approval-queue"
      className="bg-surface-container-lowest rounded-xl shadow-sm mb-space-xl overflow-hidden"
    >
      <div className="p-space-lg flex flex-col md:flex-row md:items-center md:justify-between gap-space-md border-b border-surface-variant">
        <div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Pending Approval Queue
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              3 Action Required
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-outline mt-0.5">
            Syllabus submissions and instructor KYC onboarding requests
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter pending submissions"
          className="flex flex-wrap items-center gap-space-xs"
        >
          {QUEUE_FILTERS.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={
                  active
                    ? "px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
                    : "px-space-md py-1.5 rounded-lg text-outline font-label-sm text-label-sm hover:text-on-surface transition-colors"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-surface-container-low font-label-sm text-label-sm text-outline uppercase tracking-wider">
              <th className="py-3 px-space-lg">Course / Applicant</th>
              <th className="py-3 px-space-md">Category / Track</th>
              <th className="py-3 px-space-md">Submitted By</th>
              <th className="py-3 px-space-md">Date</th>
              <th className="py-3 px-space-md">Target Fee</th>
              <th className="py-3 px-space-md">Status</th>
              <th className="py-3 px-space-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant font-body-sm text-body-sm">
            {visibleRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-surface transition-colors"
              >
                <td className="py-4 px-space-lg">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`w-10 h-10 rounded-lg ${row.iconWrapperClass} flex items-center justify-center shrink-0`}
                    >
                      {renderItemIcon(row.icon)}
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface">
                        {row.title}
                      </div>
                      <div className="text-caption font-caption text-outline">
                        {row.subtitle}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-space-md">
                  <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm whitespace-nowrap">
                    {row.category}
                  </span>
                </td>

                <td className="py-4 px-space-md">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full ${row.avatarClass} flex items-center justify-center text-xs font-semibold shrink-0`}
                    >
                      {row.initials}
                    </div>
                    <span className="font-medium text-on-surface whitespace-nowrap">
                      {row.submittedBy}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-space-md text-on-surface-variant whitespace-nowrap">
                  {row.date}
                </td>

                <td className="py-4 px-space-md font-semibold text-on-surface whitespace-nowrap">
                  {row.fee}
                </td>

                <td className="py-4 px-space-md">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${row.statusClass} font-label-sm text-label-sm font-semibold whitespace-nowrap`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full ${row.statusDotClass}`}
                    />
                    <span>{row.status}</span>
                  </span>
                </td>

                <td className="py-4 px-space-lg text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setQueueNotice(
                          `Approval action for "${row.title}" is frontend-only and awaits backend API integration.`
                        )
                      }
                      title={
                        row.type === "instructor"
                          ? "Verify & Onboard"
                          : "Approve"
                      }
                      aria-label={`${
                        row.type === "instructor" ? "Verify" : "Approve"
                      } ${row.title}`}
                      className="p-1.5 rounded-lg hover:bg-tertiary-fixed text-tertiary transition-colors"
                    >
                      {row.type === "instructor" ? (
                        <ShieldCheck
                          className="w-[18px] h-[18px]"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircle2
                          className="w-[18px] h-[18px]"
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setQueueNotice(
                          `Inspection view for "${row.title}" will connect to detail records once backend APIs are added.`
                        )
                      }
                      title={
                        row.type === "instructor"
                          ? "Review Background"
                          : "Inspect Syllabus"
                      }
                      aria-label={`Inspect ${row.title}`}
                      className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                    >
                      {row.type === "instructor" ? (
                        <FileUser
                          className="w-[18px] h-[18px]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye className="w-[18px] h-[18px]" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setQueueNotice(
                          `Rejection workflow for "${row.title}" is frontend-only and awaits backend API integration.`
                        )
                      }
                      title={
                        row.type === "instructor"
                          ? "Decline Application"
                          : "Reject with Feedback"
                      }
                      aria-label={`Decline ${row.title}`}
                      className="p-1.5 rounded-lg hover:bg-error-container text-error transition-colors"
                    >
                      <XCircle
                        className="w-[18px] h-[18px]"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {queueNotice && (
        <div
          role="status"
          className="px-space-lg py-space-sm bg-secondary-fixed/40 text-on-secondary-fixed font-caption text-caption"
        >
          {queueNotice}
        </div>
      )}

      <div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-2">
        <span className="font-caption text-caption text-outline">
          Showing {visibleRows.length} of 7 total pending items
        </span>
        <a
          href="#approval-queue"
          className="font-label-md text-label-md text-primary font-semibold hover:underline"
        >
          View All Submissions →
        </a>
      </div>
    </section>
  );
}
