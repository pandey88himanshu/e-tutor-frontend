import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

/* =======================
   TYPES
======================= */

// 1. Define the shape of a single Application object
// (Merge fields from your Request and Response to cover everything)
export interface ApplicationUser {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string | null;
}

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
  vapiCallId?: string | null;
  transcription?: string | null;
  aiScore?: number | null;
  aiFeedback?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  interviewStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  user?: ApplicationUser;
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

// 6. Request body for sending interview link
export interface SendInterviewLinkRequest {
  email: string;
  applicantName?: string;
}

// 7. Response for sending interview link
interface SendInterviewLinkResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    interviewLink: string;
    assistantId: string;
  };
}

// 8. Request for updating application status
interface UpdateApplicationStatusRequest {
  id: string;
  status: "APPROVED" | "REJECTED";
}

interface UpdateApplicationStatusResponse {
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
    getAllApplications: builder.query<
      GetAllApplicationsResponse,
      string | void
    >({
      query: (status) => ({
        url: "/admin/applications",
        // Automatically adds ?status=... if status is provided
        params: status ? { status } : undefined,
      }),
      // Provides a "List" tag. If we add/delete items, we invalidate this tag.
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Application" as const,
                id,
              })),
              { type: "Application", id: "LIST" },
            ]
          : [{ type: "Application", id: "LIST" }],
    }),

    // GET /api/admin/applications/:id
    getApplicationDetails: builder.query<GetApplicationDetailsResponse, string>(
      {
        query: (id) => `/admin/applications/${id}`,
        // Provides a tag specific to this ID.
        providesTags: (result, error, id) => [{ type: "Application", id }],
      },
    ),

    // DELETE /api/admin/applications/:id
    deleteApplication: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),

    // PATCH /api/admin/applications/:id (approve/reject)
    updateApplicationStatus: builder.mutation<
      UpdateApplicationStatusResponse,
      UpdateApplicationStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/admin/applications/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Application", id },
        { type: "Application", id: "LIST" },
      ],
    }),

    // POST /api/admin/send-interview-link
    sendInterviewLink: builder.mutation<
      SendInterviewLinkResponse,
      SendInterviewLinkRequest
    >({
      query: (body) => ({
        url: "/interview/send-interview-link",
        method: "POST",
        body,
      }),
      // Invalidate the list so the table reflects updated interview status
      invalidatesTags: [{ type: "Application", id: "LIST" }],
    }),

    // --- USER ROUTES ---

    // POST /api/application/apply
    applyInstructor: builder.mutation<any, any>({
      // Use queryFn to handle the custom multi-step logic
      async queryFn(args, api, extraOptions, baseQuery) {
        try {
          // 1. Extract the raw files from the arguments
          const { resumeFile, introVideoFile, ...apiPayload } = args;

          // Helper function to upload a single file to Cloudinary
          const uploadToCloudinary = async (file: File, folder: string) => {
            // Get signature
            const sigRes = await fetch("/api/cloudinary-signature", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ folder }),
            });
            const { signature, timestamp, apiKey, cloudName } =
              await sigRes.json();

            // Prepare form data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", folder);

            // Determine resource type
            const resourceType = file.type.startsWith("video/")
              ? "video"
              : "auto";

            // Upload
            const uploadRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
              {
                method: "POST",
                body: formData,
              },
            );

            if (!uploadRes.ok) throw new Error(`Failed to upload to ${folder}`);
            return await uploadRes.json();
          };

          // 2. Upload files if they exist and attach URLs to the payload
          if (resumeFile) {
            const resumeData = await uploadToCloudinary(
              resumeFile,
              "e-tutor/resumes",
            );
            apiPayload.resumeUrl = resumeData.secure_url; // Add URL to DB payload
          }

          if (introVideoFile) {
            const videoData = await uploadToCloudinary(
              introVideoFile,
              "e-tutor/intro-videos",
            );
            apiPayload.introVideoUrl = videoData.secure_url; // Add URL to DB payload
          }

          // 3. Save the final payload to your database using your existing baseQuery
          const result = await baseQuery({
            url: "/application/apply",
            method: "POST",
            body: apiPayload, // Now contains strings (URLs) instead of Files
          });

          if (result.error) return { error: result.error };
          return { data: result.data };
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      invalidatesTags: [{ type: "Application", id: "LIST" }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const { authApi } = await import("./authApi");
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch {}
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
  useSendInterviewLinkMutation,
  useUpdateApplicationStatusMutation,
} = applicationApi;
