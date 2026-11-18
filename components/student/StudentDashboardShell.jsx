"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Bell,
  BookmarkCheck,
  CalendarCheck2,
  ClipboardList,
  Compass,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  PlaySquare,
  ReceiptText,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SITE_ASSETS } from "@/data/homepage";
import { STUDENT_PROFILE, STUDENT_SIDEBAR_ITEMS } from "@/data/studentDashboard";

function renderSidebarIcon(icon) {
  const iconClass = "w-5 h-5 shrink-0";
  switch (icon) {
    case "dashboard":
      return <LayoutDashboard className={iconClass} aria-hidden="true" />;
    case "school":
      return <GraduationCap className={iconClass} aria-hidden="true" />;
    case "explore":
      return <Compass className={iconClass} aria-hidden="true" />;
    case "videocam":
      return <Video className={iconClass} aria-hidden="true" />;
    case "play_lesson":
      return <PlaySquare className={iconClass} aria-hidden="true" />;
    case "attendance":
      return <CalendarCheck2 className={iconClass} aria-hidden="true" />;
    case "trending":
      return <TrendingUp className={iconClass} aria-hidden="true" />;
    case "assignment":
      return <ClipboardList className={iconClass} aria-hidden="true" />;
    case "quiz":
      return <FileQuestion className={iconClass} aria-hidden="true" />;
    case "certificate":
      return <Award className={iconClass} aria-hidden="true" />;
    case "wishlist":
      return <BookmarkCheck className={iconClass} aria-hidden="true" />;
    case "payments":
      return <ReceiptText className={iconClass} aria-hidden="true" />;
    case "notifications":
      return <Bell className={iconClass} aria-hidden="true" />;
    case "settings":
      return <SlidersHorizontal className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function StudentDashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderSidebarContent = () => (
    <>
      <div className="flex flex-col p-space-md">
        <div className="flex items-center justify-between gap-space-sm px-space-xs py-space-sm mb-space-md">
          <Link href="/" aria-label="Shikhbe Shobai Home">
            <Image
              src={SITE_ASSETS.logo}
              alt="Shikhbe Shobai Logo"
              width={160}
              height={66}
              priority
              className="w-auto object-contain h-11 block"
            />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation sidebar"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Role Switcher */}
        <div className="mb-space-md px-space-xs">
          <div className="flex items-center justify-between p-space-xs bg-surface-container rounded-xl">
            <span className="px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm">
              Student
            </span>
            <a
              href="#welcome-bar"
              data-path="instructor-dashboard"
              className="px-space-sm py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors"
            >
              Instructor
            </a>
            <a
              href="#welcome-bar"
              data-path="admin-portal"
              className="px-space-sm py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors"
            >
              Admin
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Student Dashboard Navigation" className="flex flex-col gap-1">
          {STUDENT_SIDEBAR_ITEMS.map((item) => {
            const isInternalPage = item.href.startsWith("/");
            const classes = item.active
              ? "flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-colors bg-primary-container text-on-primary font-title-md shadow-sm"
              : "flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors";

            if (isInternalPage) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => setSidebarOpen(false)}
                  className={classes}
                >
                  {renderSidebarIcon(item.icon)}
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={classes}
              >
                {renderSidebarIcon(item.icon)}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Action */}
      <div className="p-space-md">
        <Link
          href="/login"
          data-path="login"
          className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-error hover:bg-error-container/20 font-label-md text-label-md transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-surface-container-low z-50 flex-col justify-between overflow-y-auto shadow-[0_1px_8px_rgba(107,66,38,0.04)]">
        {renderSidebarContent()}
      </aside>

      {/* Mobile & Tablet Slide-In Sidebar Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs"
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-surface-container-low z-10 flex flex-col justify-between overflow-y-auto shadow-2xl">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Shell */}
      <div className="lg:pl-72">
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(107,66,38,0.05)] z-40 flex items-center justify-between gap-space-sm px-gutter-mobile sm:px-space-lg">
          <div className="flex items-center gap-space-sm flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors shrink-0"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="relative w-full max-w-xs sm:w-80">
              <Search
                aria-hidden="true"
                className="w-[18px] h-[18px] absolute left-space-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search lessons and assignments"
                placeholder="Search lessons, assignments..."
                className="w-full pl-9 pr-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <a
              href="#live-room"
              data-path="live-classes"
              className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm"
            >
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"
              />
              <span>Live Session</span>
            </a>

            <a
              href="#announcements"
              aria-label="View notifications"
              data-path="notifications"
              className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <Bell className="w-[22px] h-[22px]" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"
              />
            </a>

            <a
              href="#welcome-bar"
              data-path="profile-settings"
              className="flex items-center gap-space-xs"
            >
              <Image
                src={STUDENT_PROFILE.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20 shrink-0"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  {STUDENT_PROFILE.roleLabel}
                </span>
                <span className="font-caption text-caption text-secondary font-medium">
                  {STUDENT_PROFILE.studentId}
                </span>
              </div>
            </a>
          </div>
        </header>

        <main className="relative pt-16 w-full px-gutter-mobile sm:px-gutter py-space-lg bg-surface min-h-[calc(100vh-64px)]">
          <div className="flex flex-col w-full gap-space-lg pt-space-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
