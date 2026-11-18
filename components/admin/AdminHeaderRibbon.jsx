"use client";

import { BadgeCheck, ChevronRight, Download, Plus } from "lucide-react";
import { useState } from "react";

export function AdminHeaderRibbon() {
  const [actionNotice, setActionNotice] = useState(null);

  return (
    <div id="control-header" className="mb-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-outline mb-space-xs">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-primary font-semibold">Overview</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
              Superadmin Control Center
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-tertiary animate-pulse"
              />
              <span>Live Sync</span>
            </span>
          </div>
        </div>

        {/* Quick Actions & System Status Pill */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-sm text-on-surface-variant font-label-md text-label-md">
            <BadgeCheck
              className="w-[18px] h-[18px] text-tertiary shrink-0"
              aria-hidden="true"
            />
            <span className="text-body-sm font-body-sm">
              <strong className="font-semibold text-tertiary">
                Operational:
              </strong>{" "}
              SSLCommerz • Zoom API • BunnyCDN
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setActionNotice(
                "Report export is frontend-only right now and will connect to the analytics API later."
              )
            }
            className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high shadow-sm transition-all font-label-md text-label-md"
          >
            <Download className="w-[18px] h-[18px] text-outline" aria-hidden="true" />
            <span>Export Report</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActionNotice(
                "Course creation flow will be connected once the backend API is integrated."
              )
            }
            className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary shadow-sm transition-all font-label-md text-label-md"
          >
            <Plus className="w-[18px] h-[18px]" aria-hidden="true" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {actionNotice && (
        <p
          role="status"
          className="mt-space-sm font-caption text-caption text-on-secondary-fixed bg-secondary-fixed/50 px-space-md py-2 rounded-lg"
        >
          {actionNotice}
        </p>
      )}
    </div>
  );
}
