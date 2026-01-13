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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendTimer, setResendTimer] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return localStorage.getItem("pendingSignupEmail") ? 30 : 0;
  });

  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  /* =====================================================
     🔐 GOOGLE OAUTH GUARD
  ===================================================== */
  useEffect(() => {
    if (searchParams.get("provider") === "google") {
      router.replace("/sign-in");
    }
  }, [router, searchParams]);

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

  /* =======================
     TIMER + PERMISSION
  ======================= */
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    setCanResend(false);

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* =======================
     PASTE OTP UX
  ======================= */
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    onChange: (value: string[]) => void
  ) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");
    const digits = pastedText.replace(/\D/g, "").slice(0, 4);

    if (!digits) return;

    const filledOtp = ["", "", "", ""];
    digits.split("").forEach((d, i) => (filledOtp[i] = d));

    onChange(filledOtp);
    clearErrors("otp");

    inputRefs.current[Math.min(digits.length - 1, 3)]?.focus();
  };

  const handleChange = (
    value: string,
    index: number,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...fieldValue];
    updated[index] = value;
    onChange(updated);
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

  /* =======================
     SUBMIT OTP
  ======================= */
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

      const email = localStorage.getItem("pendingSignupEmail");
      console.log(email, "**email*******");
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

      // ✅ DO NOT remove pendingSignupEmail here
      // It is required for resend OTP & refresh safety

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }

      setSuccessMessage(response.message || "Signup successful!");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 2000);
    } catch (err: any) {
      const message =
        err?.data?.message || err?.error || "Invalid OTP. Please try again.";

      setErrorMessage(message);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  /* =======================
     RESEND OTP
  ======================= */
  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      const email = localStorage.getItem("pendingSignupEmail");

      if (!email) {
        setErrorMessage("Session expired. Please sign up again.");
        setShowError(true);
        return;
      }

      const result = await resendOtp({ email }).unwrap();

      setValue("otp", ["", "", "", ""]);
      clearErrors("otp");
      inputRefs.current[0]?.focus();

      setResendTimer(30);

      setSuccessMessage(result.message || "OTP resent successfully");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || "Failed to resend OTP. Please try again."
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  /* =======================
     UI (UNCHANGED)
  ======================= */
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='heading-03 mb-2 text-[rgb(var(--gray-900))]'>
        Verify OTP
      </h1>
      <p className='mb-6 body-md-400 text-[rgb(var(--gray-600))]'>
        Enter the 4-digit code sent to your email.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <Controller
          name='otp'
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className='flex justify-between gap-3'>
              {value.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type='tel'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onPaste={(e) => handlePaste(e, onChange)}
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
          <p className='text-[rgb(var(--danger-500))] body-xs-400 text-center'>
            {errors.otp.message}
          </p>
        )}

        <DarkBgBtn asButton type='submit' disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </DarkBgBtn>
      </form>

      <p className='mt-6 text-center body-sm-400 text-[rgb(var(--gray-600))]'>
        Didn't receive the code?{" "}
        <button
          type='button'
          onClick={handleResendOtp}
          disabled={isResending || !canResend}
          className='cursor-pointer text-[rgb(var(--primary-500))] hover:underline disabled:opacity-50'>
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
