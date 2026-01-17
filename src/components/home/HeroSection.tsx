// src/components/hero/HeroSection.tsx
import Image from "next/image";
import DarkBgBtn from "../common/DarkBgBtn";

const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-360">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-137">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-12 lg:py-0 gap-4 sm:gap-5 lg:gap-6 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-[rgb(var(--gray-900))] max-w-xl">
              Learn with expert anytime anywhere
            </h1>

            <p className="text-base sm:text-lg text-[rgb(var(--gray-600))] max-w-lg leading-relaxed">
              Our mission is to help people to find the best course online and
              learn with expert anytime, anywhere.
            </p>

            <div className="inline-flex items-center justify-start pt-2 sm:pt-3">
              <DarkBgBtn href="/sign-up" children="Create Account" />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full order-1 lg:order-2">
            <Image
              src="/home/hero.png"
              alt="Learning with expert"
              fill
              priority
              className="object-cover object-center lg:object-right"
            />
            {/* Diagonal clip only on desktop */}
            <div className="hidden lg:block absolute inset-0 bg-white clip-hero-shape" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
