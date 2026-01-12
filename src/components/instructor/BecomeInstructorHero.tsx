"use client";

import Image from "next/image";
import DarkBgBtn from "@/components/common/DarkBgBtn";

const BecomeInstructorHero = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          flex
          flex-col
          lg:flex-row
          lg:h-170
          max-w-480
          lg:items-end
          items-center
          gap-6
          lg:gap-6
          px-4
          sm:px-6
          lg:px-75
          lg:pb-0
          pt-8
        "
      >
        {/* LEFT CONTENT */}
        <div className="flex items-center justify-center w-full lg:h-full">
          <div className="flex w-full lg:w-162 flex-col gap-4 pb-8">
            <h1 className="heading-02 text-[rgb(var(--gray-900))]">
              Become an Instructor
            </h1>

            <p className="body-md-400 text-[rgb(var(--gray-600))]">
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
            <div className="mt-2 w-full sm:w-47.75">
              <DarkBgBtn href="/become-instructor-form">Get Started</DarkBgBtn>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full h-full ">
          <Image
            src="/instructor/become-instructor-img.png"
            alt="Become an instructor"
            width={648}
            height={648}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorHero;
