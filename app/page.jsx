import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CareerTransformation } from "@/components/home/CareerTransformation";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustrySectors } from "@/components/home/IndustrySectors";
import { InstructorsSection } from "@/components/home/InstructorsSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { StatsBanner } from "@/components/home/StatsBanner";
import { SuccessStories } from "@/components/home/SuccessStories";
import { UpcomingBatches } from "@/components/home/UpcomingBatches";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <HeroSection />
          <StatsBanner />
          <IndustrySectors />
          <FeaturedCourses />
          <UpcomingBatches />
          <CareerTransformation />
          <InstructorsSection />
          <SuccessStories />
          <LatestArticles />
          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
