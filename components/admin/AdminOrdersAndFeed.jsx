"use client";

import { Cloud } from "lucide-react";
import { useState } from "react";
import { LIVE_SYSTEM_FEED, REALTIME_ORDERS } from "@/data/adminDashboard";

const GATEWAY_TABS = ["All", "bKash", "SSLCommerz", "Stripe"];

export function AdminOrdersAndFeed() {
  const [gatewayFilter, setGatewayFilter] = useState("All");

  const visibleOrders =
    gatewayFilter === "All"
      ? REALTIME_ORDERS
      : REALTIME_ORDERS.filter((order) => order.gateway === gatewayFilter);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
      {/* Platform Transactions (8 cols) */}
      <div
        id="orders-inflows"
        className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm mb-space-md">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Realtime Orders &amp; Inflows
            </h2>
            <p className="font-body-sm text-body-sm text-outline">
              Direct student course enrollment checkout stream
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter transactions by gateway"
            className="flex flex-wrap items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start"
          >
            {GATEWAY_TABS.map((tab) => {
              const active = gatewayFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGatewayFilter(tab)}
                  className={
                    active
                      ? "px-2.5 py-1 text-label-sm font-label-sm rounded-md bg-surface-container-lowest text-on-surface font-medium shadow-sm"
                      : "px-2.5 py-1 text-label-sm font-label-sm rounded-md text-on-surface-variant hover:text-on-surface"
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-surface-variant">
          {visibleOrders.map((tx) => (
            <div
              key={tx.id}
              className="py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs hover:bg-surface p-space-xs rounded-lg transition-colors"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg ${tx.badgeClass} flex items-center justify-center font-bold text-xs shrink-0`}
                >
                  {tx.gatewayBadge}
                </div>
                <div className="min-w-0">
                  <div className="font-title-md text-title-md text-on-surface leading-tight truncate">
                    {tx.studentName}
                  </div>
                  <div className="text-caption font-caption text-outline truncate">
                    {tx.id} • {tx.course}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-space-md shrink-0">
                <div className="text-right">
                  <div className="font-semibold text-on-surface">
                    {tx.amount}
                  </div>
                  <div className="text-caption font-caption text-outline">
                    {tx.timeAgo}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full ${tx.statusClass} font-caption text-caption font-semibold`}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-space-md mt-space-sm text-right">
          <a
            href="#orders-inflows"
            className="font-label-md text-label-md text-primary font-semibold hover:underline"
          >
            View All 1,420 Transactions →
          </a>
        </div>
      </div>

      {/* System Activity Feed & Platform Health (4 cols) */}
      <div id="system-feed" className="lg:col-span-4 flex flex-col gap-space-md">
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex-1">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Live System Feed
            </h2>
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"
            />
          </div>

          <div className="relative pl-6 space-y-space-md before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-variant">
            {LIVE_SYSTEM_FEED.map((event) => (
              <div key={event.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-surface-container-lowest border-2 ${event.dotBorderClass}`}
                />
                <div className="font-label-md text-label-md text-on-surface font-semibold">
                  {event.title}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {event.description}
                </p>
                <span className="font-caption text-caption text-outline">
                  {event.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Platform Health Widget */}
        <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm shrink-0">
              <Cloud className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                CDN Bandwidth Load
              </div>
              <div className="font-caption text-caption text-outline truncate">
                BunnyCDN • 99.98% Cache Hit
              </div>
            </div>
          </div>
          <span className="font-title-md text-title-md text-tertiary font-bold shrink-0">
            Normal
          </span>
        </div>
      </div>
    </section>
  );
}
