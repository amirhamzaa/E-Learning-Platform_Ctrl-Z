"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileQuestion,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareMore,
  ReceiptText,
  Search,
  SlidersHorizontal,
  Tag,
  User,
  UserCog,
  Users,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SITE_ASSETS } from "@/data/homepage";

const SYSTEM_MAIN_NAV = [
  { id: "overview", label: "Overview", icon: "dashboard", href: "/admin/dashboard" },
  { id: "students", label: "Students", icon: "group", href: "/student/dashboard" },
  { id: "instructors", label: "Instructors", icon: "school", href: "/instructor/dashboard" },
  { id: "courses", label: "Courses", icon: "menu_book", href: "/courses" },
  { id: "course-approvals", label: "Course Approvals", icon: "verified", href: "/admin/dashboard#approval-queue" },
  { id: "categories", label: "Categories", icon: "category", href: "/courses" },
  { id: "live-classes", label: "Live Classes", icon: "videocam", href: "/live-class" },
  { id: "attendance", label: "Attendance", icon: "fact_check", href: "/student/dashboard" },
  { id: "blog-management", label: "Blog Management", icon: "article", href: "/blog/details" },
  { id: "quizzes-and-exams", label: "Quizzes & Exams", icon: "quiz", href: "/video-learning" },
  { id: "assignments", label: "Assignments", icon: "assignment", href: "/instructor/dashboard" },
  { id: "payments", label: "Payments", icon: "payments", href: "/admin/dashboard#orders" },
  { id: "orders-and-transactions", label: "Orders & Transactions", icon: "receipt_long", href: "/admin/dashboard#orders" },
  { id: "coupons-and-discounts", label: "Coupons & Discounts", icon: "loyalty", href: "/admin/dashboard" },
  { id: "certificates", label: "Certificates", icon: "workspace_premium", href: "/student/dashboard" },
  { id: "reviews-and-reports", label: "Reviews & Reports", icon: "rate_review", href: "/course-details" },
  { id: "notifications", label: "Notifications", icon: "campaign", href: "/admin/dashboard#system-feed" },
];

const SYSTEM_BOTTOM_NAV = [
  { id: "website-settings", label: "Website Settings", icon: "tune", href: "/admin/dashboard" },
  { id: "profile-settings", label: "Profile Settings", icon: "manage_accounts", href: "/profile-settings" },
];

function renderSystemIcon(icon) {
  const iconClass = "w-5 h-5 shrink-0";
  switch (icon) {
    case "dashboard":
      return <LayoutDashboard className={iconClass} aria-hidden="true" />;
    case "group":
      return <Users className={iconClass} aria-hidden="true" />;
    case "school":
      return <GraduationCap className={iconClass} aria-hidden="true" />;
    case "menu_book":
      return <BookOpen className={iconClass} aria-hidden="true" />;
    case "verified":
      return <BadgeCheck className={iconClass} aria-hidden="true" />;
    case "category":
      return <LayoutGrid className={iconClass} aria-hidden="true" />;
    case "videocam":
      return <Video className={iconClass} aria-hidden="true" />;
    case "fact_check":
      return <ClipboardCheck className={iconClass} aria-hidden="true" />;
    case "article":
      return <FileText className={iconClass} aria-hidden="true" />;
    case "quiz":
      return <FileQuestion className={iconClass} aria-hidden="true" />;
    case "assignment":
      return <ClipboardList className={iconClass} aria-hidden="true" />;
    case "payments":
      return <CreditCard className={iconClass} aria-hidden="true" />;
    case "receipt_long":
      return <ReceiptText className={iconClass} aria-hidden="true" />;
    case "loyalty":
      return <Tag className={iconClass} aria-hidden="true" />;
    case "workspace_premium":
      return <Award className={iconClass} aria-hidden="true" />;
    case "rate_review":
      return <MessageSquareMore className={iconClass} aria-hidden="true" />;
    case "campaign":
      return <Megaphone className={iconClass} aria-hidden="true" />;
    case "tune":
      return <SlidersHorizontal className={iconClass} aria-hidden="true" />;
    case "manage_accounts":
      return <UserCog className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function SystemAdminShell({ children, activeNav = "profile-settings" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderSidebarNav = () => (
    <>
      <div className="p-space-md flex items-center justify-between">
        <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">
          Main Management
        </span>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close system navigation"
          className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="System Navigation"
        className="flex-1 px-space-md flex flex-col gap-space-xs pb-space-xl"
      >
        {SYSTEM_MAIN_NAV.map((item) => {
          const isActive = activeNav === item.id;
          const classes = isActive
            ? "flex items-center gap-space-md px-space-md py-2.5 transition-all bg-primary-container text-on-primary font-title-md rounded-lg"
            : "flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all";

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setSidebarOpen(false)}
              className={classes}
            >
              {renderSystemIcon(item.icon)}
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          );
        })}

        <div className="my-space-sm pt-space-sm">
          <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">
            System
          </span>
        </div>

        {SYSTEM_BOTTOM_NAV.map((item) => {
          const isActive = activeNav === item.id;
          const classes = isActive
            ? "flex items-center gap-space-md px-space-md py-2.5 transition-all bg-primary-container text-on-primary font-title-md rounded-lg"
            : "flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all";

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setSidebarOpen(false)}
              className={classes}
            >
              {renderSystemIcon(item.icon)}
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          );
        })}

        <Link
          href="/login"
          className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="font-label-md text-label-md">Logout</span>
        </Link>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-surface">
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full h-full px-gutter-mobile sm:px-gutter flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm sm:gap-space-md min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={sidebarOpen}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors shrink-0"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              aria-label="Shikhbe Shobai Home"
              className="flex items-center shrink-0 focus:outline-none"
            >
              <Image
                src={SITE_ASSETS.logo}
                alt="Shikhbe Shobai Logo"
                width={140}
                height={58}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>

            <div className="hidden md:flex items-center bg-surface-container-low rounded-lg px-space-md py-space-xs ml-space-lg w-72">
              <Search
                aria-hidden="true"
                className="w-[18px] h-[18px] text-outline mr-space-xs shrink-0"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                aria-label="Search portal, courses, and IDs"
                placeholder="Search portal, courses, IDs..."
                className="w-full bg-transparent border-0 text-on-surface placeholder:text-outline focus:outline-none font-body-sm text-body-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <div className="hidden sm:flex items-center gap-space-xs bg-surface-container-low p-1 rounded-full">
              <Link
                href="/admin/dashboard"
                className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-primary text-on-primary"
              >
                Admin
              </Link>
              <Link
                href="/instructor/dashboard"
                className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Instructor
              </Link>
              <Link
                href="/student/dashboard"
                className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Student
              </Link>
            </div>

            <Link
              href="/admin/dashboard#system-feed"
              aria-label="View notifications"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Bell className="w-[22px] h-[22px]" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"
              />
            </Link>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <User className="w-[18px] h-[18px] text-on-primary" aria-hidden="true" />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md leading-tight text-on-surface">
                  System Admin
                </span>
                <span className="font-caption text-caption text-outline">Superuser</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest z-40 flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-y-auto">
        {renderSidebarNav()}
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 flex">
          <div
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-16 bg-on-surface/40"
          />
          <aside className="relative w-64 max-w-[85vw] h-full bg-surface-container-lowest z-10 flex flex-col shadow-2xl overflow-y-auto">
            {renderSidebarNav()}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <main className="w-full min-h-screen pt-16 bg-surface px-margin-mobile sm:px-margin-tablet lg:px-margin py-margin">
          <div className="flex flex-col w-full pt-space-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
