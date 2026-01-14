import React from "react";

// Job opening data type
interface JobCardProps {
  title: string;
  location: string;
  type: string;
  vacancies: string;
  deadline: string;
}

// Individual Job Card Component
const JobCard = ({
  title,
  location,
  type,
  vacancies,
  deadline,
}: JobCardProps) => (
  <div className="flex w-full flex-col gap-6 rounded-lg border border-[rgb(var(--gray-100))] bg-[rgb(var(--white))] p-6">
    {/* Job Title */}
    <h3 className="body-lg-600 text-[rgb(var(--gray-900))]">{title}</h3>

    {/* Job Details Row */}
    <div className="flex flex-wrap items-center gap-4">
      {/* Location */}
      <div className="flex items-center gap-1.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8C8.55 8 9.021 7.804 9.413 7.412C9.80433 7.02067 10 6.55 10 6C10 5.45 9.80433 4.97933 9.413 4.588C9.021 4.196 8.55 4 8 4C7.45 4 6.97933 4.196 6.588 4.588C6.196 4.97933 6 5.45 6 6C6 6.55 6.196 7.02067 6.588 7.412C6.97933 7.804 7.45 8 8 8ZM8 14C6.31667 12.4833 5.0625 11.0875 4.2375 9.8125C3.4125 8.5375 3 7.38333 3 6.35C3 4.78333 3.50433 3.52067 4.513 2.562C5.521 1.604 6.68333 1.125 8 1.125C9.31667 1.125 10.479 1.604 11.487 2.562C12.4957 3.52067 13 4.78333 13 6.35C13 7.38333 12.5875 8.5375 11.7625 9.8125C10.9375 11.0875 9.68333 12.4833 8 14Z"
            fill="rgb(var(--success-500))"
          />
        </svg>
        <span className="body-sm-400 text-[rgb(var(--gray-600))]">
          {location}
        </span>
      </div>

      {/* Job Type */}
      <div className="flex items-center gap-1.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66667 14.6667C4.3 14.6667 3.98622 14.5362 3.72533 14.2753C3.46444 14.0144 3.33378 13.7004 3.33333 13.3333V6C3.33333 5.63333 3.464 5.31956 3.72533 5.05867C3.98667 4.79778 4.30044 4.66711 4.66667 4.66667H5.33333V3.33333C5.33333 2.6 5.59444 1.97222 6.11667 1.45C6.63889 0.927778 7.26667 0.666667 8 0.666667C8.73333 0.666667 9.36133 0.927778 9.884 1.45C10.4067 1.97222 10.6676 2.6 10.6667 3.33333V4.66667H11.3333C11.7 4.66667 12.014 4.79733 12.2753 5.05867C12.5367 5.32 12.6671 5.63378 12.6667 6V13.3333C12.6667 13.7 12.5362 14.014 12.2753 14.2753C12.0144 14.5367 11.7004 14.6671 11.3333 14.6667H4.66667ZM6.66667 4.66667H9.33333V3.33333C9.33333 2.96667 9.20267 2.65289 8.94133 2.392C8.68 2.13111 8.36622 2.00044 8 2C7.63333 2 7.31956 2.13067 7.05867 2.392C6.79778 2.65333 6.66711 2.96711 6.66667 3.33333V4.66667Z"
            fill="rgb(var(--secondary-500))"
          />
        </svg>
        <span className="body-sm-400 text-[rgb(var(--gray-600))]">{type}</span>
      </div>

      {/* Vacancies */}
      <div className="flex items-center gap-1.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0Z"
            fill="rgb(var(--secondary-500))"
          />
        </svg>
        <span className="body-sm-400 text-[rgb(var(--gray-600))]">
          {vacancies}
        </span>
      </div>
    </div>

    {/* Deadline and Arrow */}
    <div className="flex items-center justify-between">
      <div>
        <span
          className="text-[rgb(var(--primary-500))]"
          style={{ fontSize: "var(--body-sm-size)", fontWeight: 500 }}
        >
          Deadline:
        </span>
        <span className="body-sm-400 text-[rgb(var(--gray-600))]">
          {" "}
          {deadline}
        </span>
      </div>

      {/* Arrow Button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[rgb(var(--primary-100))] transition-all duration-200 hover:bg-[rgb(var(--primary-200))]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
            stroke="rgb(var(--primary-500))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
);

export const OpenPositionsSection = () => {
  const jobs: JobCardProps[] = [
    {
      title: "Product Designer (UI/UX Designer)",
      location: "Tokyo, Japan",
      type: "Full-Time",
      vacancies: "01 Vacancy",
      deadline: "30 June, 2021",
    },
    {
      title: "Social Media Manager",
      location: "Moscow, Russia",
      type: "Full-Time",
      vacancies: "01 Vacancy",
      deadline: "30 June, 2021",
    },
    {
      title: "Director of Accounting",
      location: "Mumbai, India",
      type: "Full-Time",
      vacancies: "03 Vacancy",
      deadline: "30 June, 2021",
    },
    {
      title: "Principal Software Engineer",
      location: "Tokyo, Japan",
      type: "Full-Time",
      vacancies: "01 Vacancy",
      deadline: "30 June, 2021",
    },
  ];

  return (
    <section className="relative w-full bg-[rgb(var(--gray-50))]">
      {/* Main Content Container */}
      <div className="mx-auto flex w-full max-w-480 flex-col items-center gap-10 px-6 py-12 md:py-16 lg:py-20 2xl:px-75">
        {/* Section Title */}
        <h2 className="heading-02 text-center text-[rgb(var(--gray-900))] md:display-03">
          Our all open positions (04)
        </h2>

        {/* Jobs Grid */}
        <div className="grid w-full max-w-330 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};
