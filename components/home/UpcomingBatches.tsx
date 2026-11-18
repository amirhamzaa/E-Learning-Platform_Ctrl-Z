"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { UPCOMING_BATCHES, type UpcomingBatch } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

function getBadgeToneClasses(tone: UpcomingBatch["badgeTone"]): string {
  switch (tone) {
    case "error":
      return "bg-error-container text-on-error-container";
    case "secondary":
      return "bg-secondary-fixed text-on-secondary-fixed";
    case "tertiary":
      return "bg-tertiary-fixed text-on-tertiary-fixed";
  }
}

export function UpcomingBatches() {
  const [startIndex, setStartIndex] = useState(0);

  const orderedBatches = useMemo(() => {
    const count = UPCOMING_BATCHES.length;
    return Array.from({ length: count }, (_, offset) => {
      const idx = (startIndex + offset) % count;
      return UPCOMING_BATCHES[idx];
    });
  }, [startIndex]);

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + UPCOMING_BATCHES.length) % UPCOMING_BATCHES.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % UPCOMING_BATCHES.length);
  };

  return (
    <section
      id="upcoming-batches"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
              </span>
              <span className="font-label-sm text-label-sm text-error font-bold uppercase tracking-wider">
                Fast Filling Batches
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
              Upcoming Live Interactive Batches
            </h2>
          </div>

          {/* Interactive Next/Prev triggers for batches */}
          <div className="flex items-center gap-2">
            <button
              id="batch-prev-btn"
              type="button"
              onClick={handlePrev}
              aria-label="Previous upcoming batch"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-on-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              id="batch-next-btn"
              type="button"
              onClick={handleNext}
              aria-label="Next upcoming batch"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-on-primary transition-colors"
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Live Batches Grid Slider Container */}
        <div
          id="batch-slider-track"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg"
        >
          {orderedBatches.map((batch) => {
            const fillPercent = Math.round(
              (batch.filledSeats / batch.totalSeats) * 100
            );
            return (
              <article
                key={batch.id}
                className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col justify-between gap-space-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full ${getBadgeToneClasses(
                      batch.badgeTone
                    )} font-label-sm text-label-sm font-semibold inline-flex items-center gap-1`}
                  >
                    <Timer className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {batch.startsIn}
                  </span>
                  <span className="font-caption text-caption text-secondary font-bold uppercase">
                    {batch.batchCode}
                  </span>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                    {batch.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {batch.description}
                  </p>
                </div>

                {/* Schedule & Mode */}
                <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-wrap items-center justify-between gap-2 text-body-sm">
                  <div className="flex items-center gap-2">
                    <Calendar
                      className="w-5 h-5 text-secondary shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-on-surface">
                      {batch.schedule}
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {batch.mode}
                  </span>
                </div>

                {/* Seat Availability Meter */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant font-medium">
                      Seat Availability
                    </span>
                    <span className="font-bold text-primary">
                      {batch.filledSeats} of {batch.totalSeats} seats filled
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={fillPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${batch.title} seat availability`}
                    className="w-full h-2 rounded-full bg-surface-container overflow-hidden"
                  >
                    <div
                      className={`h-full ${batch.progressColorClass} rounded-full transition-all`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-space-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Image
                      src={batch.mentorAvatar}
                      alt={batch.mentorAvatarAlt}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                        {batch.mentorName}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant truncate">
                        {batch.mentorCredential}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#newsletter"
                    data-path={`/upcoming-courses/${batch.id}`}
                    className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-colors shrink-0"
                  >
                    Book Seat
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
