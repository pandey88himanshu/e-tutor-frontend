"use client";

import AuthVisual from "@/components/auth/AuthVisual";
import BecomeInstructorForm from "@/components/instructor/BecomeInstructorForm";

const Page = () => {
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
