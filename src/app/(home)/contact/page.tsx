import PageHeader from "@/components/common/PageHeader";
import BranchesSection from "@/components/home/contact/BranchesSection";
import ConnectSection from "@/components/home/contact/ConnectSection";
import ContactSection from "@/components/home/contact/ContactSection";

const page = () => {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <ConnectSection />
      <BranchesSection />
      <ContactSection />
    </div>
  );
};

export default page;
