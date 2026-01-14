import React from "react";

// Perk card data type
interface PerkCardProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  iconBgColor: string;
}

// Individual Perk Card Component
const PerkCard = ({ icon, title, bgColor, iconBgColor }: PerkCardProps) => (
  <div
    className="flex w-full flex-col gap-8 rounded-lg p-8 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
    style={{ backgroundColor: bgColor }}
  >
    {/* Icon Container */}
    <div
      className="flex h-12 w-12 items-center justify-center rounded-md"
      style={{ backgroundColor: iconBgColor }}
    >
      {icon}
    </div>
    {/* Title */}
    <p className="body-lg-500 text-[rgb(var(--gray-900))]">{title}</p>
  </div>
);

// Icon components
const FoodIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3V21H7V13H5V3H7V11H9V3H11V11C11 12.1 10.1 13 9 13H7V21H3V3ZM16 3C14.34 3 13 4.34 13 6V13H15V21H19V3H17V13H16C15.45 13 15 12.55 15 12V6C15 5.45 15.45 5 16 5H17V3H16Z"
      fill="rgb(var(--primary-500))"
    />
  </svg>
);

const CareerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
      fill="rgb(var(--secondary-500))"
    />
  </svg>
);

const VacationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z"
      fill="rgb(var(--success-500))"
    />
  </svg>
);

const BonusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6H17.82C17.93 5.69 18 5.35 18 5C18 3.34 16.66 2 15 2C13.95 2 13.04 2.54 12.5 3.35L12 4.02L11.5 3.34C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5C6 5.35 6.07 5.69 6.18 6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM15 4C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6C14.45 6 14 5.55 14 5C14 4.45 14.45 4 15 4ZM9 4C9.55 4 10 4.45 10 5C10 5.55 9.55 6 9 6C8.45 6 8 5.55 8 5C8 4.45 8.45 4 9 4ZM20 19H4V17H20V19ZM20 14H4V8H9.08L7 10.83L8.62 12L11 8.76L12 7.4L13 8.76L15.38 12L17 10.83L14.92 8H20V14Z"
      fill="rgb(var(--warning-500))"
    />
  </svg>
);

const SalaryIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z"
      fill="rgb(var(--success-500))"
    />
  </svg>
);

const WellbeingIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
      fill="rgb(var(--primary-500))"
    />
  </svg>
);

const MaternityIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"
      fill="rgb(var(--secondary-500))"
    />
  </svg>
);

const EventsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM9 17H7V10H9V17ZM13 17H11V12H13V17ZM17 17H15V14H17V17Z"
      fill="rgb(var(--warning-500))"
    />
  </svg>
);

export const PerksAndBenefitsSection = () => {
  const perks: PerkCardProps[] = [
    {
      icon: <FoodIcon />,
      title: "Healthy Food & Snacks",
      bgColor: "rgb(var(--primary-100))",
      iconBgColor: "rgb(var(--primary-200))",
    },
    {
      icon: <CareerIcon />,
      title: "Personal Career Growth",
      bgColor: "rgb(var(--secondary-100))",
      iconBgColor: "rgb(var(--secondary-200))",
    },
    {
      icon: <VacationIcon />,
      title: "Vacation & Paid Time Off",
      bgColor: "rgb(var(--success-100))",
      iconBgColor: "rgb(var(--success-200))",
    },
    {
      icon: <BonusIcon />,
      title: "Special Allowance & Bonuse",
      bgColor: "rgb(var(--warning-100))",
      iconBgColor: "rgb(var(--warning-200))",
    },
    {
      icon: <SalaryIcon />,
      title: "Competitive Salary",
      bgColor: "rgb(var(--success-100))",
      iconBgColor: "rgb(var(--success-200))",
    },
    {
      icon: <WellbeingIcon />,
      title: "Well-being memberships",
      bgColor: "rgb(var(--primary-100))",
      iconBgColor: "rgb(var(--primary-200))",
    },
    {
      icon: <MaternityIcon />,
      title: "Maternity/Paternity Benefits",
      bgColor: "rgb(var(--secondary-100))",
      iconBgColor: "rgb(var(--secondary-200))",
    },
    {
      icon: <EventsIcon />,
      title: "Eduguard Annual Events",
      bgColor: "rgb(var(--warning-100))",
      iconBgColor: "rgb(var(--warning-200))",
    },
  ];

  return (
    <section className="relative w-full bg-[rgb(var(--white))]">
      {/* Main Content Container */}
      <div className="mx-auto flex w-full max-w-480 flex-col items-center gap-10 px-6 py-12 md:py-16 lg:py-20 2xl:px-75">
        {/* Section Title */}
        <h2 className="heading-02 text-center text-[rgb(var(--gray-900))] md:display-03">
          Our Perks & Benefits
        </h2>

        {/* Perks Grid */}
        <div className="flex w-full max-w-330 flex-wrap justify-center gap-6">
          {perks.map((perk, index) => (
            <PerkCard key={index} {...perk} />
          ))}
        </div>
      </div>
    </section>
  );
};
