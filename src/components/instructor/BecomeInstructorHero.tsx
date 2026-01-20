"use client";

import Image from "next/image";
import DarkBgBtn from "@/components/common/DarkBgBtn";

const BecomeInstructorHero = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-0 bg-white overflow-hidden">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 text-center lg:text-left lg:py-20">
              <h1 className="heading-02 sm:heading-02 lg:heading-01 text-[rgb(var(--gray-900))]">
                Become an Instructor
              </h1>

              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-600))]">
                Become an instructor & start teaching with{" "}
                <span className="font-semibold text-[rgb(var(--gray-900))]">
                  26k certified instructors
                </span>
                . Create a success story with{" "}
                <span className="font-semibold text-[rgb(var(--gray-900))]">
                  67.1k students
                </span>{" "}
                — Grow yourself with{" "}
                <span className="font-semibold text-[rgb(var(--gray-900))]">
                  71 countries
                </span>
                .
              </p>

              {/* CTA */}
              <div className="flex justify-center lg:justify-start pt-2">
                <DarkBgBtn href="/become-instructor-form">Get Started</DarkBgBtn>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none aspect-square overflow-hidden">
                <Image
                  src="/instructor/become-instructor-img.png"
                  alt="Become an instructor"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorHero;
