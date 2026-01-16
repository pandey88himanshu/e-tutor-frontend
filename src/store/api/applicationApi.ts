import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth"; // Reuse your existing base query

/* =======================
   TYPES
======================= */

// Matches the JSON body your Backend Controller expects
export interface CreateApplicationRequest {
  phone: string;
  yearsOfExp: number;
  expertise: string; // "Beginner" | "Intermediate" | "Expert"
  category: string;
  about: string;
  resumeUrl?: string;
  introVideoUrl?: string;
}

// Matches the response from your Backend
interface ApplicationResponse {
  status: string;
  message: string;
  data: {
    id: string;
    userId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    interviewStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    // ... add other fields if you need them in the UI
  };
}

/* =======================
   API SLICE
======================= */

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  // ✅ IMPORTANT: Use the same baseQuery so it shares the token logic
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    // Mutation: Submit the Instructor Application
    applyInstructor: builder.mutation<
      ApplicationResponse,
      CreateApplicationRequest
    >({
      query: (body) => ({
        url: "/application/apply", // Matches your Express Router path
        method: "POST",
        body,
      }),
      invalidatesTags: ["Application"], // Invalidates cache so 'getMyApplication' refetches
    }),

    // Query: Get My Application Status (Placeholder for future use)
    // You can uncomment this when you create the GET /status endpoint
    /*
    getMyApplication: builder.query<ApplicationResponse, void>({
      query: () => "/application/status",
      providesTags: ["Application"],
    }),
    */
  }),
});

// Export hooks for usage in components
export const {
  useApplyInstructorMutation,
  // useGetMyApplicationQuery
} = applicationApi;
