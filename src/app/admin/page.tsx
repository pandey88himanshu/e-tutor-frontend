"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [debugInfo, setDebugInfo] = useState<string>("");

    useEffect(() => {
        // Check if user is admin
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        // Debug logging
        console.log("🔍 AdminPage - accessToken:", accessToken ? "EXISTS" : "MISSING");
        console.log("🔍 AdminPage - storedUser:", storedUser);

        if (!accessToken || !storedUser) {
            console.log("❌ AdminPage - No token or user");
            setDebugInfo("No token or user found");
            setIsLoading(false);
            // Don't redirect, just show message
            return;
        }

        try {
            const user = JSON.parse(storedUser);
            console.log("🔍 AdminPage - parsed user:", user);
            console.log("🔍 AdminPage - user.role:", user.role);

            if (user.role === "ADMIN") {
                console.log("✅ AdminPage - User is ADMIN, authorizing");
                setIsAuthorized(true);
                setDebugInfo(`Authorized! User: ${user.username}, Role: ${user.role}`);
            } else {
                console.log("❌ AdminPage - Not admin, role is:", user.role);
                setDebugInfo(`Not authorized. Role: ${user.role || "undefined"}`);
            }
        } catch (e) {
            console.log("❌ AdminPage - Error parsing user:", e);
            setDebugInfo(`Error: ${e}`);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--primary-50))] via-[rgb(var(--gray-50))] to-[rgb(var(--secondary-50))]">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full mx-4 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isAuthorized ? "bg-gradient-to-br from-[rgb(var(--primary-500))] to-[rgb(var(--primary-700))]" : "bg-gradient-to-br from-red-500 to-red-700"}`}>
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isAuthorized ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        )}
                    </svg>
                </div>
                <h1 className="heading-02 text-[rgb(var(--gray-900))] mb-3">
                    {isAuthorized ? "This is Admin Page" : "Access Denied"}
                </h1>
                <p className="body-md-400 text-[rgb(var(--gray-600))] mb-4">
                    {isAuthorized
                        ? "Welcome to the admin dashboard. Only authorized administrators can access this page."
                        : "You do not have permission to access this page."}
                </p>
                <div className="p-4 bg-gray-100 rounded-lg text-left">
                    <p className="text-sm font-mono text-gray-700">Debug: {debugInfo}</p>
                </div>
                {!isAuthorized && (
                    <button
                        onClick={() => window.location.href = "/"}
                        className="mt-6 px-6 py-2 bg-[rgb(var(--primary-500))] text-white rounded-lg hover:bg-[rgb(var(--primary-600))] transition-colors"
                    >
                        Go to Home
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
