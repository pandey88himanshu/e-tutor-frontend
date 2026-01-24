"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; // ✅ Import useDispatch
import Image from "next/image";
import { useRouter } from "next/navigation";

import DarkBgBtn from "../common/DarkBgBtn";
import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import PasswordInput from "@/utils/PasswordInput";
import { useSigninMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice"; // ✅ Import your action
import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";

/* =======================
   TYPES
======================= */

interface SigninFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

/* =======================
   COMPONENT
======================= */

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signin, { isLoading }] = useSigninMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch(); // ✅ Initialize Dispatch

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SigninFormData>({
    mode: "onBlur",
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false, // Default to false
    },
  });

  /* =======================
     Logic: LOAD SAVED EMAIL
  ======================= */
  useEffect(() => {
    // Check if we have a saved email in LocalStorage (for pre-filling only)
    const savedIdentifier = localStorage.getItem("rememberedIdentifier");

    if (savedIdentifier) {
      setValue("identifier", savedIdentifier);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  /* =======================
     SUBMIT
  ======================= */

  const onSubmit = async (data: SigninFormData) => {
    try {
      const { rememberMe, ...payload } = data;

      const response = await signin(payload).unwrap();

      if (response?.accessToken) {
        // 1. Handle "Pre-fill Email" Feature (UI Logic)
        if (rememberMe) {
          localStorage.setItem("rememberedIdentifier", data.identifier);
        } else {
          localStorage.removeItem("rememberedIdentifier");
        }

        // 2. Handle "Auth Session" Feature (Redux Logic)
        // We pass 'rememberMe' so Redux knows whether to use Local or Session storage
        dispatch(
          setCredentials({
            accessToken: response.accessToken,
            user: response.user,
            rememberMe: rememberMe, // ✅ Passing the flag to the slice
          })
        );
      }

      setSuccessMessage(response.message || "Login successful");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        // Redirect logic
        if (response.user?.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 1500);
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Invalid credentials. Please try again.";

      setErrorMessage(message);
      setShowError(true);

      if (message.includes("Google")) {
        setTimeout(handleGoogleSignin, 1500);
      }

      setTimeout(() => setShowError(false), 3000);
    }
  };

  /* =======================
     GOOGLE SIGN-IN
  ======================= */

  const handleGoogleSignin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className='flex w-full flex-col'>
      <h1 className='heading-03 mb-6 text-[rgb(var(--gray-900))]'>
        Sign in to your account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <FormField label='Email or Username' error={errors.identifier?.message}>
          <Input
            type='text'
            // ✅ Added for Browser Password Manager
            autoComplete="username"
            placeholder='Email address or username...'
            error={!!errors.identifier}
            {...register("identifier", {
              required: "Email or username is required",
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            })}
          />
        </FormField>

        <FormField label='Password' error={errors.password?.message}>
          <PasswordInput
            // ✅ Added for Browser Password Manager
            autoComplete="current-password"
            placeholder='Password'
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

        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2 body-sm-400 text-[rgb(var(--gray-600))] cursor-pointer'>
            <input
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 text-[rgb(var(--primary-600))] focus:ring-[rgb(var(--primary-500))]'
              {...register("rememberMe")}
            />
            Remember me
          </label>

          <DarkBgBtn asButton type='submit' disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </DarkBgBtn>
        </div>
      </form>

      <div className='my-6 flex items-center gap-4'>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
        <span className='body-sm-400 text-[rgb(var(--gray-500))]'>OR</span>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
      </div>

      <button
        type='button'
        onClick={handleGoogleSignin}
        className='flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[rgb(var(--gray-200))] body-md-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]'>
        <Image
          src='/icons/google.svg'
          alt='Google Logo'
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

export default SigninForm;