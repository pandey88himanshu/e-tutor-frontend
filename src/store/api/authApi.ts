import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:5000/api
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;
