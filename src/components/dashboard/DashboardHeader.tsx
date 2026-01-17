"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FaArrowRight } from "react-icons/fa";

const DashboardHeader = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    // Get initials from username or email
    const getInitials = () => {
        if (user?.username) {
            return user.username.slice(0, 2).toUpperCase();
        }
        if (user?.email) {
            return user.email.slice(0, 2).toUpperCase();
        }
        return "KG";
    };

    const displayName = user?.username || "Kevin Gilbert";

    return (
        <div className="w-full bg-[rgb(var(--primary-100))]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-6 md:py-8">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        {/* Avatar - Circular with border */}
                        <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-full border-2 border-white shadow-sm bg-[rgb(var(--gray-600))] flex items-center justify-center">
                            <span className="text-lg md:text-xl font-semibold text-white">
                                {getInitials()}
                            </span>
                        </div>

                        {/* Name & Title */}
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-[rgb(var(--gray-900))]">
                                {displayName}
                            </h1>
                            <p className="body-sm-400 text-[rgb(var(--gray-500))]">
                                Web Designer & Best-Selling Instructor
                            </p>
                        </div>
                    </div>

                    {/* Become Instructor Button - Matching Figma style */}
                    <Link
                        href="/become-instructor-form"
                        className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded border border-[rgb(var(--primary-500))] text-[rgb(var(--primary-500))] hover:bg-[rgb(var(--primary-500))] hover:text-white transition-all duration-200 body-sm-500"
                    >
                        Become Instructor
                        <FaArrowRight className="text-xs" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
