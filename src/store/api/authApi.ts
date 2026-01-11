import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { setCredentials, clearCredentials } from "../slices/authSlice";

interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
interface SigninRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}
interface VerifyOtpRequest {
  email: string;
  otp: string;
}
interface AuthUser {
  id: string;
  email: string;
  username: string;
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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, SignupRequest>({
      query: (body) => ({ url: "/auth/sign-up", method: "POST", body }),
    }),
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({ url: "/auth/sign-in", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ accessToken: data.accessToken, user: data.user })
          );
        } catch {}
      },
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({ url: "/auth/verify-otp", method: "POST", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({ accessToken: data.accessToken, user: data.user })
          );
        } catch {}
      },
    }),
    resendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: "", user: data.user }));
        } catch {
          dispatch(clearCredentials());
        }
      },
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
