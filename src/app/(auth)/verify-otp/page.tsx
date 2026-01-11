"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthVisual from "@/components/auth/AuthVisual";
import OtpForm from "@/components/auth/OtpForm";

// ✅ Separate component to use useSearchParams
function OtpPageContent() {
  const searchParams = useSearchParams();
  const [emailFromUrl, setEmailFromUrl] = useState<string | null>(null);
  const [usernameFromUrl, setUsernameFromUrl] = useState<string | null>(null);
  const [providerFromUrl, setProviderFromUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get email, username, and provider from URL params (for Google OAuth)
    const email = searchParams.get("email");
    const username = searchParams.get("username");
    const provider = searchParams.get("provider");

    if (email) {
      setEmailFromUrl(email);
      // Store in localStorage for OTP verification
      localStorage.setItem("pendingSignupEmail", email);
    }

    if (username) {
      setUsernameFromUrl(username);
    }

    if (provider) {
      setProviderFromUrl(provider);
    }
  }, [searchParams]);

  return (
    <div className="flex h-[calc(100vh-81px)] overflow-hidden">
      {/* Left Section - Visual */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-linear-to-br from-purple-100 via-purple-50 to-blue-50 p-12">
        <AuthVisual
          imageSrc="/auth/Saly-2.png"
          alt="OTP Verification Illustration"
        />
      </div>

      {/* Right Section - OTP Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 sm:px-8">
        <div className="w-full max-w-md">
          {/* ✅ Google OAuth Info Banner */}
          {providerFromUrl === "google" && usernameFromUrl && (
            <div className="mb-6 rounded-lg bg-[rgb(var(--primary-50))] p-4 border border-[rgb(var(--primary-200))]">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[rgb(var(--primary-500))] mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="body-sm-600 text-[rgb(var(--primary-700))]">
                    Google Sign-up Detected
                  </p>
                  <p className="body-xs-400 text-[rgb(var(--primary-600))] mt-1">
                    Username:{" "}
                    <span className="font-semibold">{usernameFromUrl}</span>
                  </p>
                  <p className="body-xs-400 text-[rgb(var(--primary-600))] mt-0.5">
                    We've sent a verification code to{" "}
                    <span className="font-semibold">
                      {emailFromUrl || "your email"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Regular Signup Info Banner */}
          {!providerFromUrl && emailFromUrl && (
            <div className="mb-6 rounded-lg bg-[rgb(var(--gray-50))] p-4 border border-[rgb(var(--gray-200))]">
              <p className="body-xs-400 text-[rgb(var(--gray-600))]">
                Verification code sent to:{" "}
                <span className="font-semibold text-[rgb(var(--gray-900))]">
                  {emailFromUrl}
                </span>
              </p>
            </div>
          )}

          <OtpForm />
        </div>
      </div>
    </div>
  );
}

// ✅ Main component with Suspense boundary
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-81px)] items-center justify-center">
          <div className="text-center">
            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <OtpPageContent />
    </Suspense>
  );
};

export default Page;
