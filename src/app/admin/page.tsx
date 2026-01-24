"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { useGetAllApplicationsQuery } from "@/store/api/applicationApi";


const AdminPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [activePage, setActivePage] = useState("instructors");

  // Fetch applications from API - filter by PENDING status for new applications
  const {
    data: applicationsResponse,
    isLoading: isApplicationsLoading,
    error: applicationsError,
  } = useGetAllApplicationsQuery("PENDING");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken || !storedUser) {
      setDebugInfo("No token or user found");
      setIsLoading(false);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role === "ADMIN") {
        setIsAuthorized(true);
      } else {
        setDebugInfo(`Not authorized. Role: ${user.role}`);
      }
    } catch (e) {
      setDebugInfo(`Error parsing user data`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--gray-50))]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgb(var(--primary-500))] border-t-transparent" />
          <p className="body-md-500 text-[rgb(var(--gray-600))]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--gray-50))]">
        <div className="bg-[rgb(var(--white))] rounded-2xl shadow-xl p-12 max-w-lg w-full mx-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[rgb(var(--danger-100))] text-[rgb(var(--danger-600))]">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="heading-03 text-[rgb(var(--gray-900))] mb-3">
            Access Denied
          </h1>
          <p className="body-md-400 text-[rgb(var(--gray-600))] mb-6">
            You do not have permission to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-[rgb(var(--primary-500))] text-white rounded-lg hover:bg-[rgb(var(--primary-600))] transition-colors body-md-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--gray-50))] font-sans">
      {/* 1920px Constraint Wrapper */}
      <div className="max-w-[1920px] mx-auto min-h-screen flex relative">
        <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
          <AdminHeader />

          <main className="flex-1 p-8 overflow-y-auto">
            {activePage === "instructors" && (
              <div className="animate-in fade-in duration-500">
                {isApplicationsLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[rgb(var(--primary-500))] border-t-transparent" />
                      <p className="body-md-400 text-[rgb(var(--gray-500))]">Loading applications...</p>
                    </div>
                  </div>
                ) : applicationsError ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <p className="body-lg-500 text-[rgb(var(--danger-500))] mb-2">Failed to load applications</p>
                      <p className="body-sm-400 text-[rgb(var(--gray-500))]">Please try again later</p>
                    </div>
                  </div>
                ) : (
                  <ApplicationsTable data={applicationsResponse?.data ?? []} />
                )}
              </div>
            )}

            {activePage !== "instructors" && (
              <div className="flex items-center justify-center h-full body-lg-400 text-[rgb(var(--gray-400))]">
                Content for {activePage} is coming soon.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
