import React from "react";
import Image from "next/image";

export const TrustedCompaniesSection = () => {
  return (
    <section className="relative z-10 w-full px-6 2xl:px-55">
      {/* Overlapping Container with negative margin */}
      <div
        className="mx-auto w-full max-w-370 rounded-lg border bg-[rgb(var(--white))] px-6 py-10 shadow-sm md:px-12 md:py-16 lg:px-20 lg:py-20 border-[rgb(var(--gray-100))]"
        style={{
          marginTop: "-120px", // Overlap with previous section
        }}
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Left Column: Text */}
          <div className="flex w-full flex-col gap-4 text-center lg:max-w-75 lg:text-left">
            <h2 className="heading-03 text-[rgb(var(--gray-900))] md:heading-02">
              We Just keep growing with 6.3k Companies
            </h2>
            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Nullam egestas tellus at enim ornare tristique. Class aptent
              taciti sociosqu ad litora torquent
            </p>
          </div>

          {/* Right Column: Company Logos */}
          <div className="relative h-40 w-full flex-1 sm:h-45 md:h-50">
            <Image
              src="/home/trusted-companies.png"
              alt="Trusted companies - Netflix, YouTube, Google, Lenovo, Slack, Verizon, Lexmark, Microsoft"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
