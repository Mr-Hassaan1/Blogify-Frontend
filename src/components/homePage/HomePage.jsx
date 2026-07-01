import { HeroSection } from "@/components/homePage/HeroSection";
import { PopularAuthors } from "@/components/homePage/PopularAuthors";
import { RecentBlog } from "@/components/homePage/RecentBlog";

export function HomePage() {
  return (
    <div className="pt-20">
      <HeroSection />
      <RecentBlog />
      <PopularAuthors />
    </div>
  );
}
