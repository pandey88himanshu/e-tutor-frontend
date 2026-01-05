"use client";

import AuthVisual from "@/components/auth/AuthVisual";
import OtpForm from "@/components/auth/OtpForm";

const Page = () => {
  return (
    <div className='flex min-h-screen overflow-hidden'>
      {/* Left Section - Visual */}
      <div className='hidden lg:flex lg:w-1/2 items-center justify-center bg-linear-to-br from-purple-100 via-purple-50 to-blue-50 p-12'>
        <AuthVisual
          imageSrc='/auth/Saly-2.png'
          alt='OTP Verification Illustration'
        />
      </div>

      {/* Right Section - OTP Form */}
      <div className='flex w-full lg:w-1/2 items-center justify-center bg-white px-6 sm:px-8'>
        <div className='w-full max-w-md'>
          <OtpForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
