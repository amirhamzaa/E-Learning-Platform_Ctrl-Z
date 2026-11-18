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

const PORTAL_NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "dashboard", href: "/student/dashboard" },
  { id: "my-courses", label: "My Courses", icon: "school", href: "/video-learning" },
  { id: "browse-courses", label: "Browse Courses", icon: "explore", href: "/courses" },
  { id: "live-classes", label: "Live Classes", icon: "videocam", href: "/live-class" },
  {
    id: "class-recordings",
    label: "Class Recordings",
    icon: "play_lesson",
    href: "/class-recordings",
  },
  { id: "my-attendance", label: "My Attendance", icon: "attendance", href: "/student/dashboard#upcoming-live" },
  { id: "my-progress", label: "My Progress", icon: "trending", href: "/student/dashboard#kpi-grid" },
  { id: "assignments", label: "Assignments", icon: "assignment", href: "/student/dashboard#pending-tasks" },
  { id: "quizzes-and-exams", label: "Quizzes & Exams", icon: "quiz", href: "/video-learning" },
  { id: "certificates", label: "Certificates", icon: "certificate", href: "/student/dashboard#kpi-grid" },
  { id: "wishlist", label: "Wishlist", icon: "wishlist", href: "/courses" },
  { id: "payments-and-orders", label: "Payments & Orders", icon: "payments", href: "/profile-settings" },
  { id: "notifications", label: "Notifications", icon: "notifications", href: "/student/dashboard#announcements" },
  { id: "profile-settings", label: "Profile Settings", icon: "settings", href: "/profile-settings" },
];

function renderPortalIcon(icon) {
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

export function PortalShell({
  children,
  activeRole = "student",
  activeNav = "overview",
  userName = "Student Learner",
  userMeta = "ID: SS-84920",
  userAvatar = "/images/header-avatar.jpg",
  flushMain = false,
}) {
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
            <Link
              href="/student/dashboard"
              className={
                activeRole === "student"
                  ? "px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm"
                  : "px-space-sm py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors"
              }
            >
              Student
            </Link>
            <Link
              href="/instructor/dashboard"
              className={
                activeRole === "instructor"
                  ? "px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm"
                  : "px-space-sm py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors"
              }
            >
              Instructor
            </Link>
            <Link
              href="/admin/dashboard"
              className={
                activeRole === "admin"
                  ? "px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm"
                  : "px-space-sm py-1 rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface transition-colors"
              }
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Portal Navigation" className="flex flex-col gap-1">
          {PORTAL_NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            const classes = isActive
              ? "flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-colors bg-primary-container text-on-primary font-title-md shadow-sm"
              : "flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-colors";

            const targetHref =
              item.id === "overview" && activeRole === "instructor"
                ? "/instructor/dashboard"
                : item.href;

            return (
              <Link
                key={item.id}
                href={targetHref}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setSidebarOpen(false)}
                className={classes}
              >
                {renderPortalIcon(item.icon)}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-space-md">
        <Link
          href="/login"
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

      {/* Mobile Slide-In Sidebar Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm"
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
            <Link
              href="/live-class"
              className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm hover:opacity-90 transition-opacity"
            >
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"
              />
              <span>Live Session</span>
            </Link>

            <Link
              href="/student/dashboard#announcements"
              aria-label="View notifications"
              className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <Bell className="w-[22px] h-[22px]" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"
              />
            </Link>

            <Link href="/profile-settings" className="flex items-center gap-space-xs">
              <Image
                src={userAvatar}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20 shrink-0"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  {userName}
                </span>
                <span className="font-caption text-caption text-secondary font-medium">
                  {userMeta}
                </span>
              </div>
            </Link>
          </div>
        </header>

        <main
          className={
            flushMain
              ? "relative pt-16 w-full bg-surface min-h-screen"
              : "relative pt-16 w-full px-gutter-mobile sm:px-gutter py-space-lg bg-surface min-h-screen"
          }
        >
          {flushMain ? (
            children
          ) : (
            <div className="flex flex-col w-full pt-space-sm">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
