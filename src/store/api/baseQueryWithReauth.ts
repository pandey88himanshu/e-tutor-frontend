import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import { updateAccessToken, clearCredentials } from "../slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include", // refresh token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // If 401 → try refresh
  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;

      // Update Redux + localStorage
      api.dispatch(updateAccessToken(newAccessToken));

      // Retry original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // If refresh fails → logout
      api.dispatch(clearCredentials());
    }
  }

  return result;
};
