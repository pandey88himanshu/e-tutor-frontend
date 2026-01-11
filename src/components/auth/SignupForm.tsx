"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import DarkBgBtn from "../common/DarkBgBtn";
import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import PasswordInput from "@/utils/PasswordInput";
import SuccessToast from "@/components/ui/SuccessToast";
import { useRouter } from "next/navigation";
import ErrorToast from "@/components/ui/ErrorToast";
import { useSignupMutation } from "@/store/api/authApi";

interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  // Watch the agreeToTerms field
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Remove fields not needed by backend
      const { confirmPassword, agreeToTerms, ...payload } = data;

      const response = await signup(payload).unwrap();

      // Guard: ensure email exists before storing
      if (data.email) {
        localStorage.setItem("pendingSignupEmail", data.email);
      }

      setSuccessMessage(
        response?.message || "OTP sent successfully to your email"
      );
      setShowSuccess(true);

      // Short delay for UX, then redirect
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/verify-otp");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);

      let message = "Something went wrong. Please try again.";

      if (typeof error === "object" && error !== null) {
        message =
          (error as any)?.data?.message || (error as any)?.error || message;
      }

      setErrorMessage(message);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };
  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-full flex-col justify-center">
      {/* Heading */}
      <h1 className="heading-03 mb-6 text-[rgb(var(--gray-900))]">
        Create your account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField error={errors.firstName?.message} label={"First Name"}>
              <Input
                type="text"
                placeholder="First name..."
                error={!!errors.firstName}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
            </FormField>

            <FormField error={errors.lastName?.message} label={"Last Name"}>
              <Input
                type="text"
                placeholder="Last name"
                error={!!errors.lastName}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
            </FormField>
          </div>
        </div>

        {/* Username */}
        <FormField label="Username" error={errors.username?.message}>
          <Input
            type="text"
            placeholder="Username..."
            error={!!errors.username}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            })}
          />
        </FormField>

        {/* Email */}
        <FormField label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Email address"
            error={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </FormField>

        {/* Passwords */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Password" error={errors.password?.message}>
            <PasswordInput
              placeholder="Create password"
              error={!!errors.password}
              showPassword={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain uppercase, lowercase, and number",
                },
              })}
            />
          </FormField>

          <FormField
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              placeholder="Confirm password"
              error={!!errors.confirmPassword}
              showPassword={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
          </FormField>
        </div>

        {/* Terms */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="flex items-center justify-center gap-2 body-sm-400 text-[rgb(var(--gray-600))]">
              <input
                type="checkbox"
                className="h-4 w-4"
                {...register("agreeToTerms", {
                  required: "You must agree to the terms and conditions",
                })}
              />
              <span>
                I agree with all of your{" "}
                <span className="cursor-pointer text-[rgb(var(--primary-500))]">
                  Terms & Conditions
                </span>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-[rgb(var(--danger-500))] body-xs-400 ml-6">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <DarkBgBtn
            asButton={true}
            type="submit"
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? "Sending OTP..." : "Create Account"}
          </DarkBgBtn>
        </div>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px w-full bg-[rgb(var(--gray-200))]" />
        <span className="body-sm-400 text-[rgb(var(--gray-500))]">OR</span>
        <div className="h-px w-full bg-[rgb(var(--gray-200))]" />
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[rgb(var(--gray-200))] body-md-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]"
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
        />
        Continue with Google
      </button>

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

export default SignupForm;
