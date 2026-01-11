"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setIsError(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
      return;
    }

    if (token) {
      // Store token in localStorage
      localStorage.setItem("accessToken", token);

      // Decode JWT payload to get user info
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        dispatch(
          setCredentials({
            accessToken: token,
            user: {
              id: payload.id,
              email: payload.email,
              username: payload.username || payload.email?.split("@")[0] || "",
            },
          })
        );
      } catch (error) {
        console.error("Failed to decode token:", error);
      }

      // Redirect to dashboard/home
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      // No token, redirect to login
      router.push("/sign-in");
    }
  }, [searchParams, router, dispatch]);

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--danger-50))] rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[rgb(var(--danger-500))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="heading-03 text-[rgb(var(--gray-900))] mb-2">
            Authentication Failed
          </h2>
          <p className="body-md-400 text-[rgb(var(--gray-600))] mb-6">
            Something went wrong with Google login. Redirecting to sign-in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--primary-50))] rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-[rgb(var(--primary-500))]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="heading-03 text-[rgb(var(--gray-900))] mb-2">
          Welcome Back!
        </h2>
        <p className="body-md-400 text-[rgb(var(--gray-600))] mb-6">
          Logging you in securely...
        </p>
        <div className="animate-pulse bg-[rgb(var(--gray-100))] h-2 rounded-full mx-auto w-24" />
      </div>
    </div>
  );
}
