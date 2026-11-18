"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE_ASSETS } from "@/data/homepage";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    const coursesSection = document.getElementById("featured-courses");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(107,66,38,0.05)]">
      <div className="h-20 max-w-7xl mx-auto px-gutter-mobile sm:px-gutter flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md shrink-0">
          <Link
            href="/"
            aria-label="Shikhbe Shobai Home"
            className="flex items-center gap-space-sm"
            data-path="home"
          >
            <Image
              src={SITE_ASSETS.logo}
              alt="Shikhbe Shobai Logo"
              width={160}
              height={66}
              priority
              className="w-auto object-contain h-10 sm:h-11"
            />
          </Link>
        </div>

        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-space-xs"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-path={item.plannedRoute}
              className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden lg:block w-48 xl:w-60"
            role="search"
          >
            <Search
              aria-hidden="true"
              className="w-[18px] h-[18px] absolute left-space-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              aria-label="Search courses"
              placeholder="Search courses..."
              className="w-full pl-9 pr-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all"
            />
          </form>

          <div className="flex items-center gap-space-sm">
            <a
              href="#newsletter"
              data-path="/login"
              className="hidden sm:inline-flex px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              Login
            </a>
            <a
              href="#newsletter"
              data-path="/register"
              className="px-3.5 sm:px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
            >
              Register
            </a>
            <Image
              src={SITE_ASSETS.headerAvatar}
              alt="Profile"
              width={32}
              height={32}
              className="hidden sm:block w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high ml-space-xs"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden border-t border-brand-border bg-surface/95 backdrop-blur-xl shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-md flex flex-col gap-space-md">
            <form
              onSubmit={handleSearchSubmit}
              className="relative lg:hidden"
              role="search"
            >
              <Search
                aria-hidden="true"
                className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                aria-label="Search courses"
                placeholder="Search courses..."
                className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container/20"
              />
            </form>

            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-path={item.plannedRoute}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex sm:hidden items-center gap-space-sm pt-space-sm border-t border-brand-border">
              <a
                href="#newsletter"
                data-path="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Login
              </a>
              <a
                href="#newsletter"
                data-path="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
