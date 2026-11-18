"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  PlayCircle,
  Search,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { HERO_POPULAR_TAGS, SITE_ASSETS } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!demoModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDemoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [demoModalOpen]);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    inputRef.current?.focus();
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = document.getElementById("featured-courses");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-10 pb-20 px-gutter-mobile sm:px-gutter overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface">
      {/* Ambient organic light blur shapes */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] rounded-full bg-tertiary-fixed-dim/20 blur-3xl pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: Catchy Bilingual Messaging & Search */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-tertiary-container/10 w-fit">
              <BadgeCheck
                aria-hidden="true"
                className="w-[18px] h-[18px] text-tertiary shrink-0"
              />
              <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wide uppercase">
                Govt. Certified &amp; Industry Endorsed EdTech
              </span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-headline-lg text-headline-lg lg:font-display-hero lg:text-display-hero text-primary tracking-tight">
                Shikhbe Shobai{" "}
                <span className="text-secondary font-medium">শিখবে সবাই</span>
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface-variant leading-snug">
                Empowering Bangladesh with World-Class Digital Skills &amp;
                Sustainable Careers.
              </h1>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Join the most trusted physical &amp; online learning ecosystem.
              Master in-demand technologies under direct mentorship from Silicon
              Valley and Dhaka’s premier tech leaders.
            </p>

            {/* Interactive Search with Popular Pill Suggestions */}
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="mt-space-sm bg-surface-container-lowest p-2 rounded-xl shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <div className="flex items-center gap-space-sm px-space-md flex-1">
                <Search
                  aria-hidden="true"
                  className="w-[22px] h-[22px] text-primary-container shrink-0"
                />
                <input
                  ref={inputRef}
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search courses by skill or topic"
                  placeholder="Search Python, Figma, React, SEO..."
                  className="w-full py-2 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-on-surface-variant/60"
                />
              </div>
              <button
                type="submit"
                className="px-space-xl py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md text-center transition-all shadow-sm shrink-0"
              >
                Search Courses
              </button>
            </form>

            {/* Suggested Filter Pills */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                Popular:
              </span>
              {HERO_POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-secondary-fixed/40 text-on-surface-variant font-label-sm text-label-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md mt-space-sm">
              <a
                href="#featured-courses"
                data-path="/courses"
                className="px-space-xl py-3.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-title-md text-title-md transition-all shadow-md inline-flex items-center gap-space-sm"
              >
                <span>Explore 120+ Courses</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setDemoModalOpen(true)}
                className="px-space-lg py-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-title-md text-title-md transition-all shadow-sm inline-flex items-center gap-space-sm"
              >
                <PlayCircle
                  className="w-[22px] h-[22px] text-secondary"
                  aria-hidden="true"
                />
                <span>Watch Demo Class</span>
              </button>
            </div>
          </div>

          {/* Right: Layered Visual Composite with Real Stats */}
          <div className="lg:col-span-5 relative pt-2 pb-6 sm:pb-4 lg:py-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-surface-container-low aspect-[4/5] relative">
                <Image
                  src={SITE_ASSETS.heroStudio}
                  alt="Modern collaborative educational studio in Dhaka with students and mentors working on UI code and design interfaces"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                  <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-fixed/30 backdrop-blur-md text-secondary-fixed uppercase font-semibold inline-block">
                    Campus &amp; Online Hybrid
                  </span>
                  <p className="font-title-md text-title-md font-semibold mt-2">
                    Hands-on mentorship in modern tech labs.
                  </p>
                </div>
              </div>

              {/* Floated High-Impact Hero Metric Pill */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-2 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur-md p-3 sm:p-space-md rounded-xl shadow-xl flex items-center gap-space-sm sm:gap-space-md">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-sm shrink-0">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-headline-sm text-headline-sm font-bold text-primary">
                      50,000+
                    </span>
                    <span className="font-body-sm text-body-sm text-tertiary font-bold">
                      Alumni
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-space-xs text-on-surface-variant font-caption text-caption">
                    <span className="font-bold text-secondary">
                      94% Placement Rate
                    </span>
                    <span aria-hidden="true">•</span>
                    <div className="flex items-center gap-0.5 text-primary-container">
                      <Star
                        className="w-3.5 h-3.5 fill-current"
                        aria-hidden="true"
                      />
                      <span className="font-bold text-on-surface">
                        4.9/5 Rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floated Top-Right Badge */}
              <div className="absolute -top-3 sm:-top-4 right-2 sm:-right-4 bg-primary text-on-primary px-space-md py-space-xs rounded-xl shadow-lg flex items-center gap-space-xs">
                <ShieldCheck
                  className="w-[18px] h-[18px] shrink-0"
                  aria-hidden="true"
                />
                <span className="font-label-sm text-label-sm font-medium">
                  BTEB Approved Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightweight Demo Class Preview Modal */}
      {demoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-class-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm"
          onClick={() => setDemoModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl border border-brand-border"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-space-md mb-space-md">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Free Live Orientation
                </span>
                <h2
                  id="demo-class-modal-title"
                  className="font-headline-sm text-headline-sm text-primary mt-1"
                >
                  Interactive Demo Class Preview
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDemoModalOpen(false)}
                aria-label="Close demo class preview"
                className="w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-low mb-space-md">
              <Image
                src={SITE_ASSETS.heroStudio}
                alt="Shikhbe Shobai live interactive studio session"
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/45 flex flex-col items-center justify-center text-center p-space-md text-on-primary">
                <PlayCircle className="w-12 h-12 mb-2 text-primary-fixed" />
                <p className="font-title-md text-title-md">
                  Live Mentor-Led Studio Session
                </p>
                <p className="font-body-sm text-body-sm text-primary-fixed mt-1 max-w-sm">
                  Experience our 25-seat interactive cohorts, live code reviews,
                  and Banani campus lab workflow.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-space-sm">
              <button
                type="button"
                onClick={() => setDemoModalOpen(false)}
                className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
              <a
                href="#upcoming-batches"
                onClick={() => setDemoModalOpen(false)}
                className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-colors shadow-sm"
              >
                View Upcoming Batches
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
