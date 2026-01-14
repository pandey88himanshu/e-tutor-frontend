import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export const JoinTeamSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[rgb(var(--white))]">
      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-480 flex-col-reverse items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:justify-between lg:gap-20 lg:py-0 2xl:h-150 2xl:gap-34 2xl:px-75">
        {/* Left Column: Text Content */}
        <div className="flex w-full flex-col items-start gap-6 lg:max-w-134">
          {/* Headline */}
          <h2 className="heading-01 text-[rgb(var(--gray-900))]">
            Join the most incredible & creative team.
          </h2>

          {/* Body Text */}
          <p className="body-lg-400 text-[rgb(var(--gray-600))]">
            Proin gravida enim augue, dapibus ultrices eros feugiat et.
            Pellentesque bibendum orci felis, sit amet efficitur felis lacinia
            ac. Mauris gravida justo ac nunc consectetur.
          </p>

          {/* Button - Primary Orange */}
          <DarkBgBtn href="/careers" children="See open positions" />
        </div>

        {/* Right Column: Image */}
        <div className="relative flex w-full items-end justify-end lg:h-150 lg:max-w-162">
          <div className="relative h-100 w-full md:h-125 lg:h-200 bottom-0">
            <Image
              src="/home/career-hero.png"
              alt="Team member holding notebook"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
