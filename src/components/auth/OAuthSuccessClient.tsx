"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

// Full Page Skeleton Loading Component - Mimics Homepage Layout
function OAuthSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== NAVBAR SKELETON ========== */}
      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 sm:h-20 max-w-480 items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* Logo Skeleton */}
          <div className="relative h-8 w-24 overflow-hidden rounded bg-gray-100">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          {/* Search Bar Skeleton - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 items-center gap-4">
            <div className="relative flex-1 h-12 overflow-hidden rounded-md bg-gray-100">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {/* Nav Actions Skeleton */}
          <div className="hidden md:flex items-center gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative h-5 w-5 overflow-hidden rounded-full bg-gray-100">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            ))}
            <div className="relative h-10 w-32 overflow-hidden rounded bg-gray-100">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="relative h-10 w-24 overflow-hidden rounded bg-gray-900/10">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="md:hidden relative h-8 w-8 overflow-hidden rounded bg-gray-100">
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION SKELETON ========== */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[auto] lg:min-h-137 items-center gap-8 py-10 lg:py-0">
            {/* Left Content */}
            <div className="flex flex-col justify-center gap-4 sm:gap-5 lg:gap-6 order-2 lg:order-1">
              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="relative h-10 sm:h-12 lg:h-14 w-full max-w-md overflow-hidden rounded-lg bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                <div className="relative h-10 sm:h-12 lg:h-14 w-3/4 max-w-sm overflow-hidden rounded-lg bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="relative h-5 w-full max-w-lg overflow-hidden rounded bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                <div className="relative h-5 w-4/5 max-w-md overflow-hidden rounded bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="relative h-12 w-40 overflow-hidden rounded bg-gray-900/10">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            </div>

            {/* Right Image Skeleton */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] order-1 lg:order-2 overflow-hidden rounded-lg bg-gray-100">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY SECTION SKELETON ========== */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-10 sm:py-12 lg:py-16 xl:py-20">
          {/* Section Title */}
          <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
            <div className="relative h-8 sm:h-10 w-64 sm:w-80 overflow-hidden rounded-lg bg-gray-100">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-lg"
              >
                {/* Icon Skeleton */}
                <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                {/* Text Skeleton */}
                <div className="flex-1 space-y-2">
                  <div className="relative h-4 w-3/4 overflow-hidden rounded bg-gray-100">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                  <div className="relative h-3 w-1/2 overflow-hidden rounded bg-gray-100">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Link */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
            <div className="relative h-5 w-64 overflow-hidden rounded bg-gray-100">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== COURSES SECTION SKELETON ========== */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-10 sm:py-12 lg:py-16">
          {/* Section Title */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative h-8 w-48 sm:w-64 overflow-hidden rounded-lg bg-gray-200">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="relative h-5 w-24 overflow-hidden rounded bg-gray-200">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                {/* Course Image */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-100">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                {/* Course Content */}
                <div className="p-4 space-y-3">
                  {/* Category Badge */}
                  <div className="relative h-5 w-20 overflow-hidden rounded bg-gray-100">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="relative h-5 w-full overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                    <div className="relative h-5 w-3/4 overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                  </div>
                  {/* Rating & Students */}
                  <div className="flex items-center gap-2">
                    <div className="relative h-4 w-24 overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                    <div className="relative h-4 w-16 overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                  </div>
                  {/* Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="relative h-6 w-16 overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                    <div className="relative h-4 w-12 overflow-hidden rounded bg-gray-100">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOADING INDICATOR OVERLAY ========== */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500" />
          <span className="text-sm font-medium text-gray-700">
            Signing you in...
          </span>
        </div>
      </div>
    </div>
  );
}

// Error State Component
function ErrorState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50 text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-100">
              <svg
                className="h-8 w-8 text-danger-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Error Title */}
          <h2 className="heading-04 mb-2 text-gray-900">
            Authentication Failed
          </h2>

          {/* Error Message */}
          <p className="body-lg-400 mb-6 text-gray-600">
            Something went wrong during sign in. Redirecting you back...
          </p>

          {/* Loading indicator */}
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-500" />
            <span className="body-md-400">Redirecting to sign in...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OAuthSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setIsError(true);
      setTimeout(() => router.push("/sign-in"), 2000);
      return;
    }

    if (!token) {
      router.push("/sign-in");
      return;
    }

    localStorage.setItem("accessToken", token);

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      dispatch(
        setCredentials({
          accessToken: token,
          user: {
            id: payload.id,
            email: payload.email,
            username: payload.username || payload.email?.split("@")[0] || "",
          },
        })
      );
    } catch (err) {
      console.error("JWT decode failed", err);
    }

    setTimeout(() => router.push("/"), 1500);
  }, [searchParams, router, dispatch]);

  if (isError) {
    return <ErrorState />;
  }

  return <OAuthSkeleton />;
}
