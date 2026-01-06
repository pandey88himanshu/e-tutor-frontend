"use client";

import { useRef, useState } from "react";
import DarkBgBtn from "../common/DarkBgBtn";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP:", otp.join(""));
  };

  return (
    <div className="flex flex-col justify-center">
      {/* Heading */}
      <h1 className="heading-03 mb-2 text-[rgb(var(--gray-900))]">
        Verify OTP
      </h1>
      <p className="mb-6 body-md-400 text-[rgb(var(--gray-600))]">
        Enter the 4-digit code sent to your email.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* OTP Inputs */}
        <div className="flex justify-between gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-14 w-full rounded-md border border-[rgb(var(--gray-200))] text-center text-xl font-semibold text-[rgb(var(--gray-900))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]"
            />
          ))}
        </div>

        {/* Submit */}
        <DarkBgBtn href="#" onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} children="Verify OTP" />
      </form>

      {/* Resend */}
      <p className="mt-6 text-center body-sm-400 text-[rgb(var(--gray-600))]">
        Didn’t receive the code?{" "}
        <span className="cursor-pointer text-[rgb(var(--primary-500))]">
          Resend OTP
        </span>
      </p>
    </div>
  );
};

export default OtpForm;
