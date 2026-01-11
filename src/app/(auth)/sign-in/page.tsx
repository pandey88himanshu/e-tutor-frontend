"use client";

import AuthVisual from "@/components/auth/AuthVisual";
import SigninForm from "@/components/auth/SigninForm";

const Page = () => {
  return (
    <div className="flex min-h-[calc(100vh-81px)] w-full">
      {/* Left Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-linear-to-br from-purple-100 via-purple-50 to-blue-50 p-12">
        <AuthVisual imageSrc="/auth/Saly-10.png" alt="Sign In Illustration" />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 min-h-full flex items-center justify-center bg-white px-4 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col justify-start py-10 lg:justify-center w-full">
          <SigninForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
