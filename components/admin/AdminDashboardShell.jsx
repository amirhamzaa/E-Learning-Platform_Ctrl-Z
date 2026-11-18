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
import {
  ADMIN_MAIN_NAV_ITEMS,
  ADMIN_SYSTEM_NAV_ITEMS,
} from "@/data/adminDashboard";
import { SITE_ASSETS } from "@/data/homepage";

function renderAdminIcon(icon) {
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

export function AdminDashboardShell({ children }) {
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
          aria-label="Close admin navigation"
          className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="Admin Navigation"
        className="flex-1 px-space-md flex flex-col gap-space-xs pb-space-xl"
      >
        {ADMIN_MAIN_NAV_ITEMS.map((item) => {
          const classes = item.active
            ? "flex items-center gap-space-md px-space-md py-2.5 transition-all bg-primary-container text-on-primary font-title-md rounded-lg"
            : "flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all";

          if (item.href.startsWith("/")) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setSidebarOpen(false)}
                className={classes}
              >
                {renderAdminIcon(item.icon)}
                <span className="font-label-md text-label-md">
                  {item.label}
                </span>
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
              {renderAdminIcon(item.icon)}
              <span className="font-label-md text-label-md">{item.label}</span>
            </a>
          );
        })}

        <div className="my-space-sm pt-space-sm">
          <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">
            System
          </span>
        </div>

        {ADMIN_SYSTEM_NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
          >
            {renderAdminIcon(item.icon)}
            <span className="font-label-md text-label-md">{item.label}</span>
          </a>
        ))}

        <Link
          href="/login"
          data-path="logout"
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
      {/* Top Global Admin Header */}
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
            {/* Role Switcher */}
            <div className="hidden sm:flex items-center gap-space-xs bg-surface-container-low p-1 rounded-full">
              <span className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm bg-primary text-on-primary">
                Admin
              </span>
              <a
                href="#control-header"
                className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Instructor
              </a>
              <Link
                href="/student/dashboard"
                className="px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Student
              </Link>
            </div>

            <a
              href="#system-feed"
              aria-label="View system notifications"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <Bell className="w-[22px] h-[22px]" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"
              />
            </a>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <User
                  className="w-[18px] h-[18px] text-on-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md leading-tight text-on-surface">
                  System Admin
                </span>
                <span className="font-caption text-caption text-outline">
                  Superuser
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest z-40 flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-y-auto">
        {renderSidebarNav()}
      </aside>

      {/* Mobile & Tablet Slide-In Sidebar */}
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

      {/* Main Content Workspace */}
      <div className="lg:pl-64">
        <main className="w-full min-h-screen pt-16 bg-surface px-margin-mobile sm:px-margin-tablet lg:px-margin py-margin">
          <div className="flex flex-col w-full pt-space-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
