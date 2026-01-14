import PageHeader from "@/components/common/PageHeader";
import AboutSection from "@/components/home/about/AboutSection";
import GallerySection from "@/components/home/about/GallerySection";
import MissionSection from "@/components/home/about/MissionSection";
import TestimonialsSection from "@/components/home/about/TestimonialsSection";
import TrustedCompaniesSection from "@/components/home/about/TrustedCompaniesSection";

const page = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <AboutSection />
      <TrustedCompaniesSection />
      <MissionSection />
      <GallerySection />
      <TestimonialsSection />
    </div>
  );
};

export default page;
