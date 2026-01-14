import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export const GallerySection = () => {
  return (
    <section className="relative w-full bg-[rgb(var(--white))] mb-20">
      {/* Main Content Container */}
      <div className="mx-auto flex w-full max-w-480 flex-col items-center gap-12 px-6 py-12 md:py-16 lg:flex-row lg:items-center lg:gap-28 lg:py-20 2xl:pl-75 2xl:pr-37.5">
        {/* Left Column: Text Content */}
        <div className="flex w-full flex-col items-start gap-6 lg:max-w-106 lg:shrink-0">
          {/* Label */}
          <span
            className="uppercase tracking-wider text-[rgb(var(--primary-500))]"
            style={{
              fontSize: "var(--label-lg-size)",
              lineHeight: "var(--label-lg-line)",
              fontWeight: "var(--label-lg-weight)",
              letterSpacing: "0.1em",
            }}
          >
            Our Gallery
          </span>

          {/* Headline */}
          <h2 className="heading-02 text-[rgb(var(--gray-900))] md:display-03">
            We've been here almost 17 years
          </h2>

          {/* Body Text */}
          <p className="body-lg-400 text-[rgb(var(--gray-600))]">
            Fusce lobortis leo augue, sit amet tristique nisi commodo in.
            Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
            libero. Curabitur in urna ligula, torquent per conubia nostra.
          </p>

          {/* CTA Button - Primary Orange */}
          <DarkBgBtn children="View Full Gallery" />
        </div>

        {/* Right Column: Gallery Image */}
        <div className="relative h-87.5 w-full sm:h-112.5 md:h-137.5 lg:h-141 lg:flex-1">
          <Image
            src="/home/gallery-17-year.png"
            alt="Our gallery - 17 years of memories"
            fill
            className="object-contain object-center lg:object-right"
          />
        </div>
      </div>
    </section>
  );
};
