import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { setCredentials, clearCredentials } from "../slices/authSlice";

/* =======================
   TYPES
======================= */

interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface SigninRequest {
  identifier: string; // ✅ FIXED
  password: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface InstructorApplication {
  id: string;
  userId: string;
  phone: string;
  yearsOfExp: number;
  expertise: string;
  category: string;
  about: string;
  resumeUrl: string;
  introVideoUrl: string;
  vapiCallId: string | null;
  transcription: string | null;
  aiScore: number | null;
  aiFeedback: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

interface AuthUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN" | "INSTRUCTOR";
  provider: "local" | "google" | "github";
  bio: string | null;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
  instructorApplication: InstructorApplication | null;
  createdCourses: unknown[];
  purchases: unknown[];
}

interface SigninResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}

interface VerifyOtpResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}

/* =======================
   API
======================= */

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, SignupRequest>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),

    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              user: data.user,
            })
          );
        } catch { }
      },
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              user: data.user,
            })
          );
        } catch { }
      },
    }),

    resendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
    }),

    getCurrentUser: builder.query<{ user: AuthUser }, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
      // Note: We don't use onQueryStarted here because:
      // 1. The accessToken should NOT be overwritten (it would be set to "")
      // 2. Errors are handled by baseQueryWithReauth (401 → refresh → retry)
      // 3. Clearing credentials on error would cause logout on any network issue
      // The user data from this query is returned directly and can be used via the hook
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
