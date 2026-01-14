import PageHeader from "@/components/common/PageHeader";
import { JoinTeamSection } from "@/components/home/career/JoinTeamSection";
import { WhyJoinTeamSection } from "@/components/home/career/WhyJoinTeamSection";
import { PerksAndBenefitsSection } from "@/components/home/career/PerksAndBenefitsSection";
import { GallerySection } from "@/components/home/career/GallerySection";
import { TrustedCompaniesSection } from "@/components/home/career/TrustedCompaniesSection";
import { OpenPositionsSection } from "@/components/home/career/OpenPositionsSection";

const page = () => {
  return (
    <div>
      {" "}
      <PageHeader
        title="Career"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Career" }]}
      />
      <JoinTeamSection />
      <WhyJoinTeamSection />
      <PerksAndBenefitsSection />
      <GallerySection />
      <TrustedCompaniesSection />
      <OpenPositionsSection />
    </div>
  );
};

export default page;

