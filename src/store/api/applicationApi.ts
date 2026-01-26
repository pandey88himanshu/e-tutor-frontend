import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

/* =======================
   TYPES
======================= */

// 1. Define the shape of a single Application object
// (Merge fields from your Request and Response to cover everything)
export interface Application {
  id: string;
  userId: string;
  phone: string;
  yearsOfExp: number;
  expertise: "Beginner" | "Intermediate" | "Expert";
  category: string;
  about: string;
  resumeUrl?: string;
  introVideoUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  interviewStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

// 2. Response for getting ALL applications
interface GetAllApplicationsResponse {
  status: string;
  results: number;
  data: Application[];
}

// 3. Response for getting ONE application
interface GetApplicationDetailsResponse {
  status: string;
  data: Application;
}

// 4. Request body for creating an application (Existing)
export interface CreateApplicationRequest {
  phone: string;
  yearsOfExp: number;
  expertise: string;
  category: string;
  about: string;
  resumeUrl?: string;
  introVideoUrl?: string;
}

// 5. Response for creating an application (Existing)
interface CreateApplicationResponse {
  status: string;
  message: string;
  data: Application;
}

/* =======================
   API SLICE
======================= */

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: baseQueryWithReauth,
  // Detailed tag types allow refined cache invalidation
  tagTypes: ["Application"],

  endpoints: (builder) => ({

    // --- ADMIN ROUTES ---

    // GET /api/admin/applications?status=PENDING
    getAllApplications: builder.query<GetAllApplicationsResponse, string | void>({
      query: (status) => ({
        url: "/admin/applications",
        // Automatically adds ?status=... if status is provided
        params: status ? { status } : undefined,
      }),
      // Provides a "List" tag. If we add/delete items, we invalidate this tag.
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: "Application" as const, id })),
            { type: "Application", id: "LIST" },
          ]
          : [{ type: "Application", id: "LIST" }],
    }),

    // GET /api/admin/applications/:id
    getApplicationDetails: builder.query<GetApplicationDetailsResponse, string>({
      query: (id) => `/admin/applications/${id}`,
      // Provides a tag specific to this ID. 
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),

    // DELETE /api/admin/applications/:id
    deleteApplication: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),

    // --- USER ROUTES ---

    // POST /api/application/apply
    applyInstructor: builder.mutation<CreateApplicationResponse, CreateApplicationRequest>({
      query: (body) => ({
        url: "/application/apply",
        method: "POST",
        body,
      }),
      // Invalidates the "LIST" so the Admin dashboard updates immediately after a user applies
      invalidatesTags: [{ type: "Application", id: "LIST" }],
      // Also invalidate Auth cache so getCurrentUser refetches with the new application
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Import authApi and invalidate its Auth tag to refetch user data
          const { authApi } = await import("./authApi");
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch {
          // Error is handled by the calling component
        }
      },
    }),

  }),
});

// Export hooks
export const {
  useApplyInstructorMutation,
  useGetAllApplicationsQuery,
  useDeleteApplicationMutation,
  useGetApplicationDetailsQuery,
} = applicationApi;