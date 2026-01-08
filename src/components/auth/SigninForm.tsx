"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import DarkBgBtn from "../common/DarkBgBtn";
import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import PasswordInput from "@/utils/PasswordInput";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  interface SigninFormData {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  const onSubmit = async (data: SigninFormData): Promise<void> => {
    try {
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Sign in successful!");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* Heading */}
      <h1 className="heading-03 mb-6 text-[rgb(var(--gray-900))]">
        Sign in to your account
      </h1>

      <div className="flex flex-col gap-5">
        {/* Email */}
        <FormField label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="Username or email address..."
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

        {/* Password */}
        <FormField label="Password" error={errors.password?.message}>
          <PasswordInput
            placeholder="Password"
            error={!!errors.password}
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </FormField>

        {/* Remember me + Action */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 body-sm-400 text-[rgb(var(--gray-600))]">
            <input
              type="checkbox"
              className="h-4 w-4"
              {...register("rememberMe")}
            />
            Remember me
          </label>

          <DarkBgBtn
            href="#"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </DarkBgBtn>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px w-full bg-[rgb(var(--gray-200))]" />
        <span className="body-sm-400 text-[rgb(var(--gray-500))]">OR</span>
        <div className="h-px w-full bg-[rgb(var(--gray-200))]" />
      </div>

      {/* Google OAuth */}
      <button className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[rgb(var(--gray-200))] body-md-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]">
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SigninForm;
