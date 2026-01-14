import Image from "next/image";

// Feature card data type
interface FeatureCardProps {
  title: string;
  description: string;
}

// Feature Card Component
const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="flex gap-4 rounded-lg bg-[rgb(var(--white))] p-5 shadow-sm">
    {/* Green Checkmark Icon */}
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--success-500))]">
      <svg
        className="h-4 w-4 text-[rgb(var(--white))]"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    {/* Card Content */}
    <div className="flex flex-col gap-2">
      <h4 className="body-lg-600 text-[rgb(var(--gray-900))]">{title}</h4>
      <p className="body-md-400 text-[rgb(var(--gray-600))]">{description}</p>
    </div>
  </div>
);

export const WhyJoinTeamSection = () => {
  const features: FeatureCardProps[] = [
    {
      title: "Ut justo ligula, vehicula sed egestas vel.",
      description:
        "Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio.",
    },
    {
      title: "Aenean vitae leo leo praesent ullamcorper ac.",
      description:
        "Aenean vitae leo leo. Praesent ullamcorper ac libero et mattis. Aenean vel erat at neque viverra feugiat.",
    },
  ];

  return (
    <section className="relative w-full bg-[rgb(var(--gray-50))]">
      {/* Main Content Container */}
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-10 px-6 py-12 md:py-16 lg:flex-row lg:items-center lg:gap-[135px] lg:py-20 2xl:px-[300px]">
        {/* Left Column: Team Image (single image with all 3 team members) */}
        <div className="relative h-[350px] w-full sm:h-[400px] md:h-[450px] lg:h-[522px] lg:w-[648px] lg:shrink-0">
          <Image
            src="/home/why-join.png"
            alt="Team members"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Right Column: Content */}
        <div className="flex w-full flex-col gap-6 lg:max-w-[536px] lg:gap-10">
          {/* Headline */}
          <h2 className="heading-02 text-[rgb(var(--gray-900))] md:display-03">
            Why you will join our team
          </h2>

          {/* Body Text */}
          <p className="body-lg-400 text-[rgb(var(--gray-600))]">
            Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis.
            Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula
            mi ut, vestibulum odio.
          </p>

          {/* Feature Cards */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
