"use client";

import { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DarkBgBtn from "../common/DarkBgBtn";
import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApi";

interface OtpFormData {
  otp: string[];
}

const OtpForm = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Check if this is a Google OAuth signup
  const isGoogleSignup = searchParams.get("provider") === "google";
  const emailFromUrl = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<OtpFormData>({
    mode: "onSubmit",
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // ✅ Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    value: string,
    index: number,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...fieldValue];
    updatedOtp[index] = value;
    onChange(updatedOtp);
    clearErrors("otp");

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    fieldValue: string[]
  ) => {
    if (e.key === "Backspace" && !fieldValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    try {
      const otpCode = data.otp.join("");

      if (otpCode.length !== 4) {
        setError("otp", {
          type: "manual",
          message: "Please enter all 4 digits",
        });
        return;
      }

      // ✅ Get email from URL params (Google OAuth) or localStorage (regular signup)
      const email = emailFromUrl || localStorage.getItem("pendingSignupEmail");

      if (!email) {
        setErrorMessage("Session expired. Please sign up again.");
        setShowError(true);
        setTimeout(() => router.push("/sign-up"), 2000);
        return;
      }

      const response = await verifyOtp({
        email,
        otp: otpCode,
      }).unwrap();

      // ✅ Clean up localStorage
      localStorage.removeItem("pendingSignupEmail");

      // ✅ Store access token if returned
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }

      setSuccessMessage(
        response.message ||
          (isGoogleSignup
            ? "Google account verified successfully!"
            : "Signup successful!")
      );
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // ✅ Redirect to home if logged in, otherwise sign-in page
        router.push(response.accessToken ? "/" : "/sign-in");
      }, 2000);
    } catch (err: any) {
      console.error("OTP verification error:", err);

      const backendMessage =
        err?.data?.message || err?.error || "Invalid OTP. Please try again.";

      setErrorMessage(backendMessage);
      setShowError(true);

      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      const email = emailFromUrl || localStorage.getItem("pendingSignupEmail");

      if (!email) {
        setErrorMessage("Session expired. Please sign up again.");
        setShowError(true);
        return;
      }

      const result = await resendOtp({ email }).unwrap();

      // Reset OTP inputs
      setValue("otp", ["", "", "", ""]);
      clearErrors("otp");
      inputRefs.current[0]?.focus();

      // Start the 30-second timer
      setResendTimer(30);

      setSuccessMessage(result.message || "OTP resent successfully");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg =
        err?.data?.message ||
        err?.message ||
        "Failed to resend OTP. Please try again.";

      // Extract wait time from error message
      const waitTimeMatch = errorMsg.match(/wait (\d+) seconds/);
      if (waitTimeMatch) {
        const waitTime = parseInt(waitTimeMatch[1]);
        setResendTimer(waitTime);
      }

      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      {/* Heading */}
      <h1 className="heading-03 mb-2 text-[rgb(var(--gray-900))]">
        Verify OTP
      </h1>
      <p className="mb-6 body-md-400 text-[rgb(var(--gray-600))]">
        {isGoogleSignup
          ? "We've sent a verification code to your email to complete your Google sign-up."
          : "Enter the 4-digit code sent to your email."}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* OTP Inputs */}
        <div className="flex flex-col gap-2">
          <Controller
            name="otp"
            control={control}
            rules={{
              validate: (value) =>
                value.join("").length === 4 || "Please enter all 4 digits",
            }}
            render={({ field: { value, onChange } }) => (
              <div className="flex justify-between gap-3">
                {value.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(e.target.value, index, value, onChange)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index, value)}
                    className={`h-20 w-full rounded-md border ${
                      errors.otp
                        ? "border-[rgb(var(--danger-500))]"
                        : "border-[rgb(var(--gray-200))]"
                    } text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))]`}
                  />
                ))}
              </div>
            )}
          />

          {errors.otp && (
            <p className="text-[rgb(var(--danger-500))] body-xs-400 text-center">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <DarkBgBtn asButton={true} type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </DarkBgBtn>
      </form>

      {/* Resend */}
      <p className="mt-6 text-center body-sm-400 text-[rgb(var(--gray-600))]">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isResending || resendTimer > 0}
          className="cursor-pointer text-[rgb(var(--primary-500))] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending
            ? "Resending..."
            : resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : "Resend OTP"}
        </button>
      </p>

      <SuccessToast
        isOpen={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorToast
        isOpen={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default OtpForm;
