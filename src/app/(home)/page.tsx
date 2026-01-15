import BecomeInstructor from "@/components/home/BecomeInstructor";
import BrowseTopCategory from "@/components/home/BrowseTopCategory";
import CoursesSection from "@/components/home/CoursesSection";
import HeroSection from "@/components/home/HeroSection";
import TopInstructors from "@/components/home/TopInstructors";
import TrustedCompanies from "@/components/home/TrustedCompanies";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrowseTopCategory />
      <CoursesSection />
      <BecomeInstructor />
      <TopInstructors />
      <TrustedCompanies />
    </div>
  );
}

