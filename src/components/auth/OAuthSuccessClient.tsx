"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

export default function OAuthSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setIsError(true);
      setTimeout(() => router.push("/sign-in"), 2000);
      return;
    }

    if (!token) {
      router.push("/sign-in");
      return;
    }

    localStorage.setItem("accessToken", token);

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
    } catch (err) {
      console.error("JWT decode failed", err);
    }

    setTimeout(() => router.push("/"), 1500);
  }, [searchParams, router, dispatch]);

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        Authentication failed. Redirecting...
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      Logging you in...
    </div>
  );
}
