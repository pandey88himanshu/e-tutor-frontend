import DarkBgBtn from "@/components/common/DarkBgBtn";
import React from "react";

// --- STATIC DATA ---
const job = {
  title: "Product Designer (UI/UX Designer)",
  location: "Tokyo, Japan",
  type: "Full-Time",
  vacancies: "01 Vacancy",
  deadline: "30 June, 2021",
  address: ["1702 Olympic Boulevard", "Santa Monica, CA 90404"],
  contactEmail: "career.eduguard@gamil.com",
  contactPhone: "(219) 555-0114",
  description:
    "Sed lacinia accumsan eros in pretium. Praesent vitae eros condimentum, elementum nisl quis, vestibulum nulla. Aenean quis nibh ullamcorper, suscipit magna et, pretium nisi. Sed sed egestas mi. Donec viverra efficitur ipsum, ut cursus risus fringilla id.",
  requirements: [
    "Vestibulum hendrerit facilisis libero, pretium condimentum ipsum vulputate at.",
    "Quisque varius auctor augue id blandit.",
    "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "Ut ut magna condimentum, pharetra est nec, lacinia nulla.",
    "Aliquam tempus mollis sem eget ullamcorper.",
    "Donec non orci eget lorem laoreet ullamcorper et et magna.",
  ],
  benefits: [
    "Nulla facilisi. Integer non euismod neque.",
    "Suspendisse a ligula posuere, convallis dui et, commodo nisl.",
    "Suspendisse a ligula posuere, convallis dui et, commodo nisl aliquam iaculis tristique nulla.",
    "Donec dolor nunc, ultrices ac imperdiet eu, dignissim ut purus",
    "Mauris et tellus in mauris commodo varius nec sit amet urna.",
  ],
  salary: "Based on Skills [20K - 40K (USD) and Other Benefits]",
  officeHours:
    "9 AM to 5 PM (Sat-Thurs) 6 days (We will consider remote as well)",
  jobLocationFull: "1702 Olympic Boulevard, Santa Monica, CA 90404",
};

// --- HELPER COMPONENTS ---

const SectionDivider = () => (
  <div className="my-8 h-0.5 w-8 rounded-full bg-[rgb(var(--primary-200))]" />
);

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-5 w-5 items-center justify-center">{children}</div>
);

// --- MAIN PAGE COMPONENT ---

export default function JobDetailsPage() {
  return (
    <main className="w-full bg-white">
      {/* ================= HEADER SECTION ================= */}
      <div className="w-full border-b border-[rgb(var(--gray-100))] bg-[rgb(var(--gray-50))]">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-6 px-6 py-12 md:py-16 lg:px-[300px] lg:py-20">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Location */}
            <div className="flex items-center gap-2">
              <IconWrapper>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 10C9.55 10 10.021 9.804 10.413 9.412C10.8043 9.02067 11 8.55 11 8C11 7.45 10.8043 6.97933 10.413 6.588C10.021 6.196 9.55 6 9 6C8.45 6 7.97933 6.196 7.588 6.588C7.196 6.97933 7 7.45 7 8C7 8.55 7.196 9.02067 7.588 9.412C7.97933 9.804 8.45 10 9 10ZM9 16C7.31667 14.4833 6.0625 13.0875 5.2375 11.8125C4.4125 10.5375 4 9.38333 4 8.35C4 6.78333 4.50433 5.52067 5.513 4.562C6.521 3.604 7.68333 3.125 9 3.125C10.3167 3.125 11.479 3.604 12.487 4.562C13.4957 5.52067 14 6.78333 14 8.35C14 9.38333 13.5875 10.5375 12.7625 11.8125C11.9375 13.0875 10.6833 14.4833 9 16ZM9 18C11.5 15.8 13.4375 13.8417 14.8125 12.125C16.1875 10.4083 16.875 8.85 16.875 7.45C16.875 5.05 16.0917 3.18333 14.525 1.85C12.9583 0.516667 11.1167 -0.15 9 -0.15C6.88333 -0.15 5.04167 0.516667 3.475 1.85C1.90833 3.18333 1.125 5.05 1.125 7.45C1.125 8.85 1.8125 10.4083 3.1875 12.125C4.5625 13.8417 6.5 15.8 9 18Z"
                    fill="rgb(var(--secondary-500))"
                  />
                </svg>
              </IconWrapper>
              <span className="body-md-400 text-[rgb(var(--gray-600))]">
                {job.location}
              </span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-2">
              <IconWrapper>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 15.5C4.58333 15.5 4.22933 15.354 3.938 15.062C3.646 14.7707 3.5 14.4167 3.5 14V6C3.5 5.58333 3.646 5.22933 3.938 4.938C4.22933 4.646 4.58333 4.5 5 4.5H6V3C6 2.16667 6.29167 1.45833 6.875 0.875C7.45833 0.291667 8.16667 0 9 0C9.83333 0 10.5417 0.291667 11.125 0.875C11.7083 1.45833 12 2.16667 12 3V4.5H13C13.4167 4.5 13.7707 4.646 14.062 4.938C14.354 5.22933 14.5 5.58333 14.5 6V14C14.5 14.4167 14.354 14.7707 14.062 15.062C13.7707 15.354 13.4167 15.5 13 15.5H5ZM7.5 4.5H10.5V3C10.5 2.58333 10.354 2.22933 10.062 1.938C9.77067 1.646 9.41667 1.5 9 1.5C8.58333 1.5 8.22933 1.646 7.938 1.938C7.646 2.22933 7.5 2.58333 7.5 3V4.5Z"
                    fill="rgb(var(--success-500))"
                  />
                </svg>
              </IconWrapper>
              <span className="body-md-400 text-[rgb(var(--gray-600))]">
                {job.type}
              </span>
            </div>

            {/* Vacancy */}
            <div className="flex items-center gap-2">
              <IconWrapper>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 9C7.76667 9 6.70833 8.55833 5.825 7.675C4.94167 6.79167 4.5 5.73333 4.5 4.5C4.5 3.26667 4.94167 2.20833 5.825 1.325C6.70833 0.441667 7.76667 0 9 0C10.2333 0 11.2917 0.441667 12.175 1.325C13.0583 2.20833 13.5 3.26667 13.5 4.5C13.5 5.73333 13.0583 6.79167 12.175 7.675C11.2917 8.55833 10.2333 9 9 9ZM0 18V14.85C0 14.2167 0.1625 13.6333 0.4875 13.1C0.8125 12.5667 1.25 12.15 1.8 11.85C2.95 11.2833 4.11667 10.85 5.3 10.55C6.48333 10.25 7.71667 10.1 9 10.1C10.2833 10.1 11.5167 10.25 12.7 10.55C13.8833 10.85 15.05 11.2833 16.2 11.85C16.75 12.15 17.1875 12.5667 17.5125 13.1C17.8375 13.6333 18 14.2167 18 14.85V18H0Z"
                    fill="rgb(var(--warning-500))"
                  />
                </svg>
              </IconWrapper>
              <span className="body-md-400 text-[rgb(var(--gray-600))]">
                {job.vacancies}
              </span>
            </div>
          </div>

          {/* Title Row */}
          <h1 className="heading-02 text-[rgb(var(--gray-900))]">
            {job.title}
          </h1>

          {/* Address, Contact & Button Row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Address & Contact Columns */}
            <div className="flex flex-col gap-10 md:flex-row md:gap-32">
              {/* Address Column */}
              <div className="flex flex-col gap-3">
                <span className="body-sm-500 uppercase tracking-wide text-[rgb(var(--primary-500))]">
                  ADDRESS
                </span>
                <div className="body-lg-400 text-[rgb(var(--gray-900))]">
                  {job.address.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col gap-3">
                <span className="body-sm-500 uppercase tracking-wide text-[rgb(var(--primary-500))]">
                  CONTACT
                </span>
                <div className="body-lg-400 text-[rgb(var(--gray-900))]">
                  <p>{job.contactEmail}</p>
                  <p>{job.contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="shrink-0">
              <DarkBgBtn children="Apply Now" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="mx-auto flex max-w-360 flex-col gap-2 px-6 pb-20 pt-4 lg:px-75">
        {/* Who we are */}
        <SectionDivider />
        <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
          Who we are
        </h2>
        <p className="body-lg-400 text-[rgb(var(--gray-600))]">
          {job.description}
        </p>

        {/* Requirements */}
        <SectionDivider />
        <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
          Requirements
        </h2>
        <ul className="flex flex-col gap-2">
          {job.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-[rgb(var(--gray-400))]" />
              <span className="body-lg-400 text-[rgb(var(--gray-600))]">
                {req}
              </span>
            </li>
          ))}
        </ul>

        {/* Benefits */}
        <SectionDivider />
        <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
          Benefits
        </h2>
        <ul className="flex flex-col gap-3">
          {job.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6666 5L7.49992 14.1667L3.33325 10"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="body-lg-400 text-[rgb(var(--gray-600))]">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* Salary */}
        <SectionDivider />
        <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">Salary</h2>
        <p className="body-lg-400 text-[rgb(var(--gray-600))]">{job.salary}</p>

        {/* Job Nature */}
        <SectionDivider />
        <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
          Job Nature
        </h2>
        <div className="body-lg-400 flex flex-col gap-1 text-[rgb(var(--gray-600))]">
          <p>
            <span className="font-medium text-[rgb(var(--gray-900))]">
              Job Type:
            </span>{" "}
            {job.type}
          </p>
          <p>
            <span className="font-medium text-[rgb(var(--gray-900))]">
              Office Hours:
            </span>{" "}
            {job.officeHours}
          </p>
          <p>
            <span className="font-medium text-[rgb(var(--gray-900))]">
              Location:
            </span>{" "}
            {job.jobLocationFull}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <div className="w-full md:w-auto">
            <DarkBgBtn children="Apply Now" />
          </div>
        </div>
      </div>
    </main>
  );
}
