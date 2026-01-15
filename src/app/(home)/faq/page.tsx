import PageHeader from "@/components/common/PageHeader";
import FAQSection from "@/components/home/faq/FAQSection";
import React from "react";

const FAQPage = () => {
  return (
    <div>
      <PageHeader
        title="FAQ"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <FAQSection />
    </div>
  );
};

export default FAQPage;
