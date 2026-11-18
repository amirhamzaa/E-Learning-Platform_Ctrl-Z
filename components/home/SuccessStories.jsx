import Image from "next/image";
import { Star } from "lucide-react";
import { SUCCESS_STORIES } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

export function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface-container-low"
    >
      <Container>
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Student Success Stories
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mt-1">
            Real Journeys, Tangible Careers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {SUCCESS_STORIES.map((story) => (
            <article
              key={story.id}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md"
            >
              <div className="flex flex-col gap-space-sm">
                <div
                  aria-label={`${story.rating} out of 5 stars`}
                  className="flex items-center gap-1 text-primary-container"
                >
                  {Array.from({ length: story.rating }, (_, index) => (
                    <Star
                      key={index}
                      className="w-[18px] h-[18px] fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  {story.quote}
                </p>
              </div>

              <div className="flex items-center gap-space-sm pt-space-sm">
                <Image
                  src={story.avatar}
                  alt={story.avatarAlt}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-bold">
                    {story.studentName}
                  </span>
                  <span className="font-caption text-caption text-secondary font-medium">
                    {story.studentRole}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
