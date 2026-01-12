import PageHeader from "@/components/common/PageHeader";
import BecomeInstructorHero from "@/components/instructor/BecomeInstructorHero";
import InstructorHelpSection from "@/components/instructor/InstructorHelpSection";
import InstructorRulesSection from "@/components/instructor/InstructorRulesSection";
import InstructorSteps from "@/components/instructor/InstructorSteps";
import InstructorSuccessStory from "@/components/instructor/InstructorSuccessStory";
import StatsBar from "@/components/instructor/StatsBar";
import WhyTeachingSection from "@/components/instructor/WhyTeachingSection";

const page = () => {
  return (
    <div>
      {" "}
      <PageHeader
        title="Become an Instructor"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Become an Instructor" },
        ]}
      />
      <BecomeInstructorHero />
      <StatsBar />
      <WhyTeachingSection />
      <InstructorSteps />
      <InstructorRulesSection />
      <InstructorHelpSection />
      <InstructorSuccessStory />
    </div>
  );
};

export default page;
