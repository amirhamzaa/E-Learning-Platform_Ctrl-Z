"use client";

import Image from "next/image";
import { Clock, Star } from "lucide-react";
import { useState } from "react";
import {
  COURSE_TRACK_FILTERS,
  FEATURED_COURSES,
  type CourseTrack,
} from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function FeaturedCourses() {
  const [activeTrack, setActiveTrack] = useState<CourseTrack>("All Tracks");

  const filteredCourses =
    activeTrack === "All Tracks"
      ? FEATURED_COURSES
      : FEATURED_COURSES.filter((course) => course.track === activeTrack);

  return (
    <section
      id="featured-courses"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface-container-low"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Premier Programs
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
              Featured Career Programs
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter career programs by track"
            className="flex flex-wrap items-center gap-space-xs"
          >
            {COURSE_TRACK_FILTERS.map((track) => {
              const isActive = activeTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTrack(track)}
                  className={
                    isActive
                      ? "px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md transition-colors"
                      : "px-space-md py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                  }
                >
                  {track}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Modern Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.thumbnailAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {course.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={
                        badge.variant === "primary"
                          ? "px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
                          : "px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold"
                      }
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-space-md flex flex-col flex-1 justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors font-bold line-clamp-2">
                    <a
                      href="#upcoming-batches"
                      data-path={`/courses/${course.slug}`}
                    >
                      {course.title}
                    </a>
                  </h3>

                  {/* Instructor info */}
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={course.instructorAvatar}
                      alt={course.instructorAvatarAlt}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                      {course.instructorName}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-primary-container text-[14px] mt-1">
                    <Star
                      className="w-4 h-4 fill-current shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-bold text-on-surface font-label-sm text-label-sm">
                      {course.rating}
                    </span>
                    <span className="text-on-surface-variant font-caption text-caption">
                      ({course.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="pt-space-sm border-t-0 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant line-through">
                      {course.originalPrice}
                    </span>
                    <span className="font-title-md text-title-md font-bold text-primary">
                      {course.price}
                    </span>
                  </div>
                  <a
                    href="#upcoming-batches"
                    data-path={`/courses/${course.slug}`}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-colors shadow-sm"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
