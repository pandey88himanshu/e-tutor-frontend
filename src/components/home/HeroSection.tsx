// src/components/hero/HeroSection.tsx
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-137">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 gap-6">
            <h1 className="heading-01 text-[rgb(var(--gray-900))] max-w-xl">
              Learn with expert anytime anywhere
            </h1>

            <p className="body-lg-400 text-[rgb(var(--gray-600))] max-w-lg">
              Our mission is to help people to find the best course online and
              learn with expert anytime, anywhere.
            </p>

            <div>
              <button
                className="
                  inline-flex items-center justify-center
                  px-8
                  bg-[rgb(var(--primary-500))]
                  text-white
                  body-md-600
                  rounded-md
                  hover:bg-[rgb(var(--primary-600))]
                  transition-colors
                  h-12
                "
              >
                Create Account
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block w-full h-full">
            <Image
              src="/home/hero.png"
              alt="Learning with expert"
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-white clip-hero-shape" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
