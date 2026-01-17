"use client";

import { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CoursesCard from "./CoursesCard";

// Mock courses data - replace with API data
const mockCourses = [
    { id: "1", category: "Learn Ethical Hacking From Scratch", title: "31. Learn More About Web Design", thumbnail: "", progress: 0 },
    { id: "2", category: "SQL for NEWBS: Weekender Crash Course", title: "165. Font Properties Challenge 3 - Chan...", thumbnail: "", progress: 2 },
    { id: "3", category: "Complete Adobe Lightroom Megacourse: Begin...", title: "7. Adding Content to Our Website", thumbnail: "", progress: 0 },
    { id: "4", category: "Machine Learning A-Z™: Hands-On Python & R I...", title: "651. CSS Font Property Challenge Soluti...", thumbnail: "", progress: 23 },
    { id: "5", category: "7. Adding Content to Our Website", title: "12. The Dark Art of Centering Elements w...", thumbnail: "", progress: 35 },
    { id: "6", category: "CSS Complete Guide", title: "54. CSS Radio and Relation Positioning", thumbnail: "", progress: 27 },
    { id: "7", category: "Web Development Bootcamp", title: "8. Learn More About Typography", thumbnail: "", progress: 100 },
    { id: "8", category: "Interview Training App", title: "#01. CSS Complete A to Z Telugu by ES Te...", thumbnail: "", progress: 0 },
    { id: "9", category: "Advanced CSS Mastery", title: "54. CSS Radio and Relation Positioning", thumbnail: "", progress: 42 },
    { id: "10", category: "Frontend Development", title: "01. CSS Float and Clear", thumbnail: "", progress: 65 },
    { id: "11", category: "UI/UX Design Fundamentals", title: "2. #Absolute Positioning", thumbnail: "", progress: 45 },
    { id: "12", category: "JavaScript Pro", title: "01. Next Style on Our Personalities", thumbnail: "", progress: 15 },
    { id: "13", category: "React Mastery", title: "21. Learn More About Web Design", thumbnail: "", progress: 46 },
    { id: "14", category: "Node.js Complete", title: "8. CSS Styling", thumbnail: "", progress: 0 },
    { id: "15", category: "Python for Beginners", title: "8. Learn More About Typography", thumbnail: "", progress: 0 },
    { id: "16", category: "Data Science Bootcamp", title: "8. Learn More About Typography", thumbnail: "", progress: 10 },
    { id: "17", category: "Machine Learning Basics", title: "2. #Absolute Positioning", thumbnail: "", progress: 41 },
    { id: "18", category: "Deep Learning Advanced", title: "8. CSS Styling", thumbnail: "", progress: 50 },
    { id: "19", category: "AWS Cloud Practitioner", title: "Introduction to Cloud", thumbnail: "", progress: 0 },
    { id: "20", category: "Docker & Kubernetes", title: "Container Fundamentals", thumbnail: "", progress: 75 },
];

const COURSES_PER_PAGE = 20;
const TOTAL_COURSES = 957; // Total from API

const CoursesContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Latest");
    const [statusFilter, setStatusFilter] = useState("All Courses");
    const [teacherFilter, setTeacherFilter] = useState("All Teachers");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter courses
    const filteredCourses = mockCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(TOTAL_COURSES / COURSES_PER_PAGE);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <h2 className="text-lg font-semibold text-[rgb(var(--gray-900))] mb-5">
                    Courses <span className="font-normal text-[rgb(var(--gray-500))]">({TOTAL_COURSES})</span>
                </h2>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                    {/* Search */}
                    <div className="flex-1 max-w-xs">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-sm" />
                            <input
                                type="text"
                                placeholder="Search in your courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Sort By */}
                        <div className="flex items-center gap-2">
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">Sort By:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none px-3 py-2 pr-8 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] bg-white focus:outline-none focus:border-[rgb(var(--primary-500))] cursor-pointer"
                                >
                                    <option>Latest</option>
                                    <option>Oldest</option>
                                    <option>A-Z</option>
                                    <option>Z-A</option>
                                </select>
                                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-xs pointer-events-none" />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">Status:</span>
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none px-3 py-2 pr-8 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] bg-white focus:outline-none focus:border-[rgb(var(--primary-500))] cursor-pointer"
                                >
                                    <option>All Courses</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Not Started</option>
                                </select>
                                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-xs pointer-events-none" />
                            </div>
                        </div>

                        {/* Teacher */}
                        <div className="flex items-center gap-2">
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">Teacher:</span>
                            <div className="relative">
                                <select
                                    value={teacherFilter}
                                    onChange={(e) => setTeacherFilter(e.target.value)}
                                    className="appearance-none px-3 py-2 pr-8 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] bg-white focus:outline-none focus:border-[rgb(var(--primary-500))] cursor-pointer"
                                >
                                    <option>All Teachers</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                </select>
                                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-xs pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Grid - 4 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
                    {filteredCourses.map((course) => (
                        <CoursesCard
                            key={course.id}
                            id={course.id}
                            category={course.category}
                            title={course.title}
                            thumbnail={course.thumbnail}
                            progress={course.progress}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5">
                    {/* Previous Arrow - Light style */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgb(var(--gray-200))] text-[rgb(var(--gray-500))] hover:border-[rgb(var(--primary-500))] hover:text-[rgb(var(--primary-500))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                        page === "..." ? (
                            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-[rgb(var(--gray-500))]">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page as number)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full body-sm-500 transition-colors ${currentPage === page
                                    ? "bg-[rgb(var(--primary-500))] text-white"
                                    : "text-[rgb(var(--gray-600))] hover:bg-[rgb(var(--gray-100))]"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    {/* Next Arrow - Dark style */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgb(var(--primary-500))] text-white hover:bg-[rgb(var(--primary-600))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoursesContent;
