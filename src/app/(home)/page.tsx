import BrowseTopCategory from "@/components/home/BrowseTopCategory";
import CoursesSection from "@/components/home/CoursesSection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrowseTopCategory />
      <CoursesSection />
    </div>
  );
}
