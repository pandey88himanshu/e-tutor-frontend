"use client";

import { FaPlay, FaBook, FaTrophy, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StatsCard from "./StatsCard";
import CourseCard from "./CourseCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Mock data - replace with actual API data later
const statsData = [
    {
        icon: <FaPlay />,
        value: 957,
        label: "Enrolled Courses",
        iconBgColor: "bg-[rgb(var(--primary-100))]",
        iconColor: "text-[rgb(var(--primary-500))]",
    },
    {
        icon: <FaBook />,
        value: 6,
        label: "Active Courses",
        iconBgColor: "bg-[rgb(var(--secondary-100))]",
        iconColor: "text-[rgb(var(--secondary-500))]",
    },
    {
        icon: <FaTrophy />,
        value: 951,
        label: "Completed Courses",
        iconBgColor: "bg-[rgb(var(--success-100))]",
        iconColor: "text-[rgb(var(--success-500))]",
    },
    {
        icon: <FaUsers />,
        value: 241,
        label: "Course Instructors",
        iconBgColor: "bg-[rgb(var(--warning-100))]",
        iconColor: "text-[rgb(var(--warning-500))]",
    },
];

const coursesData = [
    {
        id: "1",
        title: "Reiki Level I, II and Master/Teacher Program",
        thumbnail: "",
        currentLesson: "1. Introductions",
        progress: 0,
        isActive: false,
    },
    {
        id: "2",
        title: "The Complete 2021 Web Development Bootcamp",
        thumbnail: "",
        currentLesson: "167. What You'll Need to Get Started - Se...",
        progress: 61,
        isActive: false,
    },
    {
        id: "3",
        title: "Copywriting - Become a Freelance Copywriter",
        thumbnail: "",
        currentLesson: "1. How to get started with figma",
        progress: 0,
        isActive: false,
    },
    {
        id: "4",
        title: "2021 Complete Python Bootcamp From Zero to...",
        thumbnail: "",
        currentLesson: "9. Advanced CSS - Selector Priority",
        progress: 12,
        isActive: false,
    },
];

const DashboardContent = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userName = user?.username || "Kevin";

    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => prev + 1);
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Section Title - Dashboard */}
                <h2 className="text-lg md:text-xl font-semibold text-[rgb(var(--gray-900))] mb-5">
                    Dashboard
                </h2>

                {/* Stats Grid - 4 columns on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsData.map((stat, index) => (
                        <StatsCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            iconBgColor={stat.iconBgColor}
                            iconColor={stat.iconColor}
                        />
                    ))}
                </div>

                {/* Learning Section */}
                <div className="mt-6">
                    {/* Section Header with Arrows on the right */}
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg md:text-xl font-semibold text-[rgb(var(--gray-900))]">
                            Let&apos;s start learning, {userName}
                        </h3>

                        {/* Navigation Arrows - Light (left) and Dark (right) */}
                        <div className="flex items-center gap-2">
                            {/* Light Button (Previous) */}
                            <button
                                onClick={handlePrevSlide}
                                className="w-9 h-9 flex items-center justify-center rounded border border-[rgb(var(--gray-200))] bg-white text-[rgb(var(--gray-500))] hover:border-[rgb(var(--primary-500))] hover:text-[rgb(var(--primary-500))] transition-colors duration-200"
                                aria-label="Previous courses"
                            >
                                <FaChevronLeft className="text-xs" />
                            </button>
                            {/* Dark Button (Next) */}
                            <button
                                onClick={handleNextSlide}
                                className="w-9 h-9 flex items-center justify-center rounded bg-[rgb(var(--primary-500))] text-white hover:bg-[rgb(var(--primary-600))] transition-colors duration-200"
                                aria-label="Next courses"
                            >
                                <FaChevronRight className="text-xs" />
                            </button>
                        </div>
                    </div>

                    {/* Courses Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                thumbnail={course.thumbnail}
                                currentLesson={course.currentLesson}
                                progress={course.progress}
                                isActive={course.isActive}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
