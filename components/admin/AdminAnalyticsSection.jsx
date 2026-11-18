"use client";

import { ArrowRight, Wallet } from "lucide-react";
import { useState } from "react";
import {
  ENROLLMENT_LEGEND,
  MONTHLY_ENROLLMENT_BARS,
  PAYMENT_CHANNELS,
} from "@/data/adminDashboard";

const TIMEFRAME_OPTIONS = ["Monthly", "Quarterly", "Yearly"];

const TIMEFRAME_RETENTION = {
  Monthly: "Avg. Retention: 92.4%",
  Quarterly: "Avg. Retention: 94.1%",
  Yearly: "Avg. Retention: 91.8%",
};

export function AdminAnalyticsSection() {
  const [timeframe, setTimeframe] = useState("Monthly");

  return (
    <section
      id="analytics-section"
      className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl"
    >
      {/* Left: Enrollment & Growth Analytics Chart (8 cols) */}
      <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm mb-space-md">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Enrollment &amp; Learner Trajectory
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Aggregate enrollment metrics across professional disciplines
              (2024)
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Analytics timeframe"
            className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg self-start"
          >
            {TIMEFRAME_OPTIONS.map((option) => {
              const active = timeframe === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTimeframe(option)}
                  className={
                    active
                      ? "px-3 py-1 text-label-sm font-label-sm rounded-md bg-surface-container-lowest text-primary font-semibold shadow-sm"
                      : "px-3 py-1 text-label-sm font-label-sm rounded-md text-on-surface-variant hover:text-on-surface"
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart Track Indicators */}
        <div className="flex flex-wrap items-center gap-space-md mb-space-md pt-space-xs">
          {ENROLLMENT_LEGEND.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant"
            >
              <span
                aria-hidden="true"
                className={`w-3 h-3 rounded-sm ${item.colorClass}`}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* High-Fidelity SVG Stacked Bar & Trend Chart */}
        <div className="w-full h-64 relative flex items-end overflow-x-auto">
          <svg
            role="img"
            aria-label="Monthly enrollment trajectory stacked bar chart from January through projected September"
            className="w-full min-w-[540px] h-full overflow-visible"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 700 225"
          >
            {/* Background Grid Lines */}
            <line
              stroke="#EBE7E1"
              strokeDasharray="3 3"
              x1="0"
              x2="700"
              y1="20"
              y2="20"
            />
            <line
              stroke="#EBE7E1"
              strokeDasharray="3 3"
              x1="0"
              x2="700"
              y1="70"
              y2="70"
            />
            <line
              stroke="#EBE7E1"
              strokeDasharray="3 3"
              x1="0"
              x2="700"
              y1="120"
              y2="120"
            />
            <line
              stroke="#EBE7E1"
              strokeDasharray="3 3"
              x1="0"
              x2="700"
              y1="170"
              y2="170"
            />
            <line
              stroke="#83746c"
              strokeOpacity="0.3"
              x1="0"
              x2="700"
              y1="200"
              y2="200"
            />

            {/* Y-Axis labels */}
            <text fill="#83746C" fontSize="10" x="5" y="16">
              8k
            </text>
            <text fill="#83746C" fontSize="10" x="5" y="66">
              6k
            </text>
            <text fill="#83746C" fontSize="10" x="5" y="116">
              4k
            </text>
            <text fill="#83746C" fontSize="10" x="5" y="166">
              2k
            </text>

            {/* Stacked Monthly Bars */}
            {MONTHLY_ENROLLMENT_BARS.map((bar) => (
              <g
                key={bar.label}
                className={`transition-all hover:opacity-85 cursor-pointer ${
                  bar.projected ? "opacity-70" : ""
                }`}
              >
                <rect
                  fill="#502C12"
                  fillOpacity={bar.projected ? bar.opacity : 1}
                  stroke={bar.projected ? "#502C12" : undefined}
                  strokeDasharray={bar.projected ? "2 2" : undefined}
                  height={bar.h1}
                  rx="4"
                  width="34"
                  x={bar.x}
                  y={200 - bar.h1}
                />
                <rect
                  fill="#805533"
                  fillOpacity={bar.projected ? bar.opacity : 1}
                  stroke={bar.projected ? "#805533" : undefined}
                  strokeDasharray={bar.projected ? "2 2" : undefined}
                  height={bar.h2}
                  rx="4"
                  width="34"
                  x={bar.x}
                  y={200 - bar.h2}
                />
                {!bar.projected && (
                  <>
                    <rect
                      fill="#223B22"
                      height={bar.h3}
                      rx="4"
                      width="34"
                      x={bar.x}
                      y={200 - bar.h3}
                    />
                    <rect
                      fill="#F4BB92"
                      height={bar.h4}
                      rx="4"
                      width="34"
                      x={bar.x}
                      y={200 - bar.h4}
                    />
                  </>
                )}
                <text
                  fill={
                    bar.peak ? "#502C12" : bar.projected ? "#83746C" : "#51443D"
                  }
                  fontSize="11"
                  fontWeight={bar.peak ? "bold" : "normal"}
                  textAnchor="middle"
                  x={bar.x + 17}
                  y="218"
                >
                  {bar.label}
                </text>
              </g>
            ))}

            {/* Trend Indicator Overlay Line */}
            <path
              d="M67 115 Q 207 85, 347 72 T 487 40 T 627 30"
              fill="none"
              stroke="#223B22"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <circle
              cx="487"
              cy="40"
              fill="#FAF9F6"
              r="4.5"
              stroke="#223B22"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="pt-space-md mt-space-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-body-sm font-body-sm text-outline border-t border-surface-variant">
          <span>
            * August &amp; September projections based on current early-bird
            reservation pipeline.
          </span>
          <span className="font-semibold text-primary shrink-0">
            {TIMEFRAME_RETENTION[timeframe]}
          </span>
        </div>
      </div>

      {/* Right: Payment Channels Breakdown (4 cols) */}
      <div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Payment Channels
            </h2>
            <Wallet className="w-5 h-5 text-outline" aria-hidden="true" />
          </div>
          <p className="font-body-sm text-body-sm text-outline mb-space-md">
            Realtime transaction dispersal across integrated payment gateways
          </p>

          {PAYMENT_CHANNELS.map((channel, index) => (
            <div
              key={channel.id}
              className={
                index === PAYMENT_CHANNELS.length - 1
                  ? "mb-space-lg"
                  : "mb-space-md"
              }
            >
              <div className="flex flex-wrap justify-between items-center gap-1 mb-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full ${channel.dotClass}`}
                  />
                  <span>{channel.name}</span>
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  {channel.percent}%{" "}
                  <span className="font-normal text-outline text-caption">
                    ({channel.amount})
                  </span>
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={channel.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${channel.name} share`}
                className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden"
              >
                <div
                  className={`${channel.barClass} h-full rounded-full`}
                  style={{ width: `${channel.percent}%` }}
                />
              </div>
            </div>
          ))}

          {/* Net Platform Commission vs Instructor Share */}
          <div className="p-space-md rounded-xl bg-surface-container-low">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-space-xs">
              Split Architecture
            </span>
            <div className="flex items-center justify-between text-body-sm font-body-sm mb-1.5">
              <span className="text-on-surface">Instructor Payouts (75%)</span>
              <span className="font-semibold text-on-surface">
                ৳ 1,38,37,500
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-primary font-semibold">
                Platform Fee &amp; R&amp;D (25%)
              </span>
              <span className="font-bold text-primary">৳ 46,12,500</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden flex">
              <div className="bg-secondary h-full" style={{ width: "75%" }} />
              <div
                className="bg-primary-container h-full"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>

        <div className="pt-space-md mt-space-md border-t border-surface-variant flex items-center justify-between">
          <span className="font-caption text-caption text-outline">
            Audit status: Fully reconciled
          </span>
          <a
            href="#orders-inflows"
            className="font-label-sm text-label-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Settlement Logs</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
