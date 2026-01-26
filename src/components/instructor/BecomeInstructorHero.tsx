"use client";

import { useState } from "react";
import Image from "next/image";
import DarkBgBtn from "@/components/common/DarkBgBtn";
import { useGetCurrentUserQuery } from "@/store/api/authApi";

// Full Screen Skeleton Loading Component
const FullScreenSkeleton = () => (
  <div className="fixed inset-0 z-50 bg-white overflow-hidden">
    <section className="w-full h-full py-12 sm:py-16 lg:py-0 animate-pulse flex items-center">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 w-full">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* LEFT CONTENT SKELETON */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 text-center lg:text-left lg:py-20">
              {/* Title Skeleton */}
              <div className="flex justify-center lg:justify-start">
                <div className="h-10 sm:h-12 lg:h-14 w-3/4 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto lg:mx-0"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto lg:mx-0"></div>
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-center lg:justify-start pt-2">
                <div className="h-12 w-36 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* RIGHT IMAGE SKELETON */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none aspect-square overflow-hidden bg-gray-200 rounded-2xl">
                {/* Image placeholder shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const BecomeInstructorHero = () => {
  // Refetch on mount to always get fresh data (handles admin-side changes)
  const { data, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [showPopup, setShowPopup] = useState(false);

  const user = data?.user;
  const hasApplication = user?.instructorApplication;
  const applicationStatus = hasApplication?.status;

  // Determine button behavior based on application status
  const getButtonConfig = () => {
    if (!user) {
      return { href: "/sign-in", text: "Get Started" };
    }
    if (hasApplication) {
      if (applicationStatus === "PENDING") {
        return { href: "#", text: "Application In Review", disabled: true };
      }
      if (applicationStatus === "APPROVED") {
        return { href: "/instructor/dashboard", text: "Go to Dashboard" };
      }
      if (applicationStatus === "REJECTED") {
        return { href: "/become-instructor-form", text: "Reapply" };
      }
    }
    return { href: "/become-instructor-form", text: "Get Started" };
  };

  const buttonConfig = getButtonConfig();

  // Show full screen skeleton while loading
  if (isLoading) {
    return <FullScreenSkeleton />;
  }

  return (
    <>
      {/* Application Status Popup - Only shown when clicking "View status" */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Content */}
            <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
              Application Under Review
            </h3>
            <p className="mb-6 text-center text-gray-600">
              Your instructor application is currently being reviewed by our team.
              We&apos;ll notify you once a decision has been made.
            </p>

            {/* Status Badge */}
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                Pending Review
              </span>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="w-full rounded-lg bg-gray-900 py-3 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
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
                  <DarkBgBtn
                    href={buttonConfig.href}
                    disabled={buttonConfig.disabled}
                  >
                    {buttonConfig.text}
                  </DarkBgBtn>
                </div>

                {/* Application Status Indicator - Click to view popup */}
                {hasApplication && applicationStatus === "PENDING" && (
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => setShowPopup(true)}
                      className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      View application status
                    </button>
                  </div>
                )}
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
    </>
  );
};

export default BecomeInstructorHero;
