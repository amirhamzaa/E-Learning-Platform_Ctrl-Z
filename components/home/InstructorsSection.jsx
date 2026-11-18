import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { TOP_INSTRUCTORS } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function InstructorsSection() {
  return (
    <section
      id="instructors"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Master Practitioners
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
              Learn from Top Industry Leaders
            </h2>
          </div>
          <a
            href="#footer-contact"
            data-path="/about-us#mentors"
            className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold inline-flex items-center gap-1 transition-colors w-fit"
          >
            <span>Meet All Mentors</span>
            <ChevronRight className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {TOP_INSTRUCTORS.map((mentor) => (
            <article
              key={mentor.id}
              className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-space-md shrink-0">
                <Image
                  src={mentor.avatar}
                  alt={mentor.avatarAlt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                {mentor.name}
              </h3>
              <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider mt-0.5">
                {mentor.role}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                {mentor.bio}
              </p>
              <div className="mt-space-md pt-space-sm border-t-0 flex items-center gap-space-sm text-on-surface-variant">
                <span className="font-caption text-caption">
                  {mentor.studentsMentored}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
