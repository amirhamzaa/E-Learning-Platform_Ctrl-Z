import { Handshake, Headset, Medal, Users } from "lucide-react";
import { TRANSFORMATION_PILLARS } from "@/data/homepage";
import { Container } from "@/components/ui/Container";

function renderPillarIcon(icon) {
  const iconClass = "w-[30px] h-[30px]";
  switch (icon) {
    case "support":
      return <Headset className={iconClass} aria-hidden="true" />;
    case "groups":
      return <Users className={iconClass} aria-hidden="true" />;
    case "handshake":
      return <Handshake className={iconClass} aria-hidden="true" />;
    case "medal":
      return <Medal className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

export function CareerTransformation() {
  return (
    <section
      id="career-transformation"
      className="w-full py-space-xl px-gutter-mobile sm:px-gutter bg-surface-container-low"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            The Shikhbe Shobai Difference
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mt-1">
            Engineered for Real Career Transformation
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Unlike pre-recorded video repositories, we provide full
            accountability, personalized code reviews, and lifetime post-course
            career guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {TRANSFORMATION_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md"
            >
              <div
                className={`w-14 h-14 rounded-xl ${pillar.iconWrapperClass} flex items-center justify-center`}
              >
                {renderPillarIcon(pillar.icon)}
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full ${pillar.badgeClass} font-label-sm text-label-sm w-fit font-semibold`}
              >
                {pillar.badge}
              </span>
              <h3 className="font-title-md text-title-md text-primary font-bold">
                {pillar.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
