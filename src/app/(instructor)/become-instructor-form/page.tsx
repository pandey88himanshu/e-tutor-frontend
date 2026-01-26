"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthVisual from "@/components/auth/AuthVisual";
import BecomeInstructorForm from "@/components/instructor/BecomeInstructorForm";
import { useGetCurrentUserQuery } from "@/store/api/authApi";

// Full Screen Skeleton for loading state
const FormPageSkeleton = () => (
  <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 animate-pulse">
      <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-primary-500 animate-spin"></div>
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();
  // Refetch on mount to always get fresh data (handles admin-side changes)
  const { data, isLoading } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.user;
  const hasApplication = user?.instructorApplication;

  // Redirect if user already has an application
  useEffect(() => {
    if (!isLoading && hasApplication) {
      router.replace("/become-instructor");
    }
  }, [isLoading, hasApplication, router]);

  // Show loading state
  if (isLoading) {
    return <FormPageSkeleton />;
  }

  // Redirect is happening, show loading
  if (hasApplication) {
    return <FormPageSkeleton />;
  }

  return (
    <div className="flex lg:h-[calc(100vh-121px)] min-h-[calc(100vh-121px)] w-full overflow-hidden">
      {/* Left Illustration */}
      <div className="relative hidden h-full lg:flex lg:w-1/2 items-center justify-center bg-linear-to-br from-purple-100 via-purple-50 to-blue-50">
        <AuthVisual imageSrc="/instructor/become-instructor-img.png" />
      </div>

      {/* Right Form */}
      <div className="min-h-full w-full lg:w-1/2 flex items-center justify-center bg-white px-4 sm:px-6">
        <div className="w-full max-w-162">
          <BecomeInstructorForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
