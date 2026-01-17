"use client";

import { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TeacherCard from "./TeacherCard";

// Background colors for teacher cards
const bgColors = [
    "bg-[#FFF4E6]", // Light orange
    "bg-[#E8F5E9]", // Light green
    "bg-[#E3F2FD]", // Light blue
    "bg-[#FFF3E0]", // Light peach
    "bg-[#F3E5F5]", // Light purple
    "bg-[#FFFDE7]", // Light yellow
    "bg-[#E0F7FA]", // Light cyan
    "bg-[#FCE4EC]", // Light pink
];

// Mock instructors data - replace with API data
const mockInstructors = [
    { id: "1", name: "Wade Warren", role: "Digital Product Designer", photo: "", rating: 5.0, students: 236568 },
    { id: "2", name: "Bessie Cooper", role: "Senior Developer", photo: "", rating: 4.9, students: 211434 },
    { id: "3", name: "Floyd Miles", role: "UI/UX Designer", photo: "", rating: 4.9, students: 35627 },
    { id: "4", name: "Ronald Richards", role: "Legacy Functionality Associate", photo: "", rating: 4.5, students: 1098230 },
    { id: "5", name: "Devon Lane", role: "Product Manager", photo: "", rating: 4.7, students: 854 },
    { id: "6", name: "Robert Fox", role: "Software Engineer", photo: "", rating: 4.2, students: 39658 },
    { id: "7", name: "Kathryn Murphy", role: "Data Scientist", photo: "", rating: 4.9, students: 16557 },
    { id: "8", name: "Jerome Bell", role: "Backend Developer", photo: "", rating: 4.4, students: 2779 },
    { id: "9", name: "Cody Fisher", role: "Creative Director", photo: "", rating: 3.9, students: 78055 },
    { id: "10", name: "Jane Cooper", role: "Marketing Specialist", photo: "", rating: 4.1, students: 880234 },
    { id: "11", name: "Eleanor Pena", role: "Motion Designer", photo: "", rating: 4.8, students: 451684 },
    { id: "12", name: "Dianne Russell", role: "Frontend Developer", photo: "", rating: 4.1, students: 14879 },
    { id: "13", name: "Theresa Webb", role: "UX Researcher", photo: "", rating: 4.7, students: 2356 },
    { id: "14", name: "Annette Black", role: "Product Designer", photo: "", rating: 4.0, students: 8871 },
    { id: "15", name: "Jenny Wilson", role: "Database Administrator", photo: "", rating: 4.6, students: 9085 },
    { id: "16", name: "Esther Howard", role: "DevOps Engineer", photo: "", rating: 4.9, students: 14829 },
    { id: "17", name: "Kristin Watson", role: "Cloud Architect", photo: "", rating: 4.4, students: 971223 },
    { id: "18", name: "Arlene McCoy", role: "Business Analyst", photo: "", rating: 4.0, students: 436871 },
    { id: "19", name: "Courtney Henry", role: "Scrum Master", photo: "", rating: 3.6, students: 200781 },
    { id: "20", name: "Guy Hawkins", role: "Full Stack Developer", photo: "", rating: 4.3, students: 854 },
];

const INSTRUCTORS_PER_PAGE = 20;
const TOTAL_INSTRUCTORS = 241;

const TeachersContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("All Courses");
    const [teacherFilter, setTeacherFilter] = useState("All Teachers");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter instructors
    const filteredInstructors = mockInstructors.filter(instructor =>
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(TOTAL_INSTRUCTORS / INSTRUCTORS_PER_PAGE);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
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
                    Instructors <span className="font-normal text-[rgb(var(--gray-500))]">({TOTAL_INSTRUCTORS})</span>
                </h2>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                    {/* Search */}
                    <div className="flex-1 max-w-xs">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-sm" />
                            <input
                                type="text"
                                placeholder="Search in your teachers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                            />
                        </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Courses Filter */}
                        <div className="flex items-center gap-2">
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">Courses:</span>
                            <div className="relative">
                                <select
                                    value={courseFilter}
                                    onChange={(e) => setCourseFilter(e.target.value)}
                                    className="appearance-none px-3 py-2 pr-8 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] bg-white focus:outline-none focus:border-[rgb(var(--primary-500))] cursor-pointer"
                                >
                                    <option>All Courses</option>
                                    <option>Web Development</option>
                                    <option>UI/UX Design</option>
                                    <option>Data Science</option>
                                </select>
                                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-xs pointer-events-none" />
                            </div>
                        </div>

                        {/* Teachers Filter */}
                        <div className="flex items-center gap-2">
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">Teachers:</span>
                            <div className="relative">
                                <select
                                    value={teacherFilter}
                                    onChange={(e) => setTeacherFilter(e.target.value)}
                                    className="appearance-none px-3 py-2 pr-8 border border-[rgb(var(--gray-200))] rounded body-sm-400 text-[rgb(var(--gray-700))] bg-white focus:outline-none focus:border-[rgb(var(--primary-500))] cursor-pointer"
                                >
                                    <option>All Teachers</option>
                                    <option>Top Rated</option>
                                    <option>Most Students</option>
                                </select>
                                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] text-xs pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructors Grid - 4 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
                    {filteredInstructors.map((instructor, index) => (
                        <TeacherCard
                            key={instructor.id}
                            id={instructor.id}
                            name={instructor.name}
                            role={instructor.role}
                            photo={instructor.photo}
                            rating={instructor.rating}
                            students={instructor.students}
                            bgColor={bgColors[index % bgColors.length]}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5">
                    {/* Previous Arrow */}
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

                    {/* Next Arrow */}
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

export default TeachersContent;
