"use client";

import React, { useState, useMemo } from "react";
import CourseFilterSidebar from "./CourseFilterSidebar";
import CourseSearchHeader from "./CourseSearchHeader";
import CourseListingCard, { CourseCardData } from "./CourseListingCard";
import Pagination from "./Pagination";

// Dummy course data
const dummyCourses: CourseCardData[] = [
    {
        id: "1",
        title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
        category: "Design",
        price: 49,
        rating: 4.9,
        students: 197637,
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop",
    },
    {
        id: "2",
        title: "Adobe Premiere Pro CC – Advanced Training Course",
        category: "Design",
        price: 32,
        rating: 4.6,
        students: 228304,
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    },
    {
        id: "3",
        title: "Ultimate AWS Certified Solutions Architect Associate 2021",
        category: "Marketing",
        price: 11,
        rating: 4.3,
        students: 228304,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    },
    {
        id: "4",
        title: "Learn HTML5 Coding From Scratch | Build Responsive Real World Website 2021",
        category: "Development",
        price: 13,
        rating: 4.8,
        students: 456444,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    },
    {
        id: "5",
        title: "Angular – The Complete Guide (2021 Edition)",
        category: "Development",
        price: 18,
        rating: 4.2,
        students: 341937,
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop",
    },
    {
        id: "6",
        title: "How to get diamond in pubg | League of Legends | Season 11",
        category: "Lifestyle",
        price: 23,
        rating: 4.7,
        students: 471857,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    },
    {
        id: "7",
        title: "SQL for NEWBS: Weekender Crash Course",
        category: "Development",
        price: 32,
        originalPrice: 52,
        rating: 5.0,
        students: 481444,
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    },
    {
        id: "8",
        title: "SEO 2021: Complete SEO Training + SEO for WordPress Websites",
        category: "Marketing",
        price: 23,
        rating: 5.0,
        students: 181037,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
    {
        id: "9",
        title: "[NEW] Ultimate AWS Certified Cloud Practitioner - 2021",
        category: "Marketing",
        price: 14,
        rating: 4.8,
        students: 1304238,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        isBestseller: true,
    },
    {
        id: "10",
        title: "Complete Adobe Lightroom Megacourse: Beginner to Expert",
        category: "Photography",
        price: 32,
        rating: 4.5,
        students: 192434,
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    },
    {
        id: "11",
        title: "Digital Marketing Masterclass - 23 Courses in 1",
        category: "Marketing",
        price: 23,
        rating: 4.2,
        students: 279004,
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop",
    },
    {
        id: "12",
        title: "The Ultimate Drawing Course - Beginner to Advanced",
        category: "Design",
        price: 19,
        rating: 4.8,
        students: 311429,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
    },
    {
        id: "13",
        title: "Automate the Boring Stuff with Python Programming",
        category: "Development",
        price: 9,
        rating: 4.6,
        students: 982244,
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    },
    {
        id: "14",
        title: "Selenium WebDriver with Java - Basics to Advanced+Frameworks",
        category: "Development",
        price: 14,
        rating: 4.4,
        students: 144382,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    },
    {
        id: "15",
        title: "iPhone Photography | Take Professional Photos On Your iPhone",
        category: "Photography",
        price: 24,
        rating: 4.8,
        students: 275454,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    },
    {
        id: "16",
        title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
        category: "Development",
        price: 14,
        rating: 4.7,
        students: 485444,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    },
    {
        id: "17",
        title: "2021 Complete Python Bootcamp: From Zero to Hero in Python",
        category: "Development",
        price: 14,
        rating: 4.3,
        students: 892244,
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    },
    {
        id: "18",
        title: "Premiere Pro CC for Beginners: Video Editing in Premiere",
        category: "Design",
        price: 34,
        rating: 4.9,
        students: 254124,
        image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=300&fit=crop",
    },
    {
        id: "19",
        title: "Learn Python Programming Masterclass",
        category: "Development",
        price: 18,
        rating: 4.6,
        students: 274994,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    },
    {
        id: "20",
        title: "Instagram Marketing 2021: Complete Guide To Instagram Growth",
        category: "Marketing",
        price: 16,
        rating: 4.2,
        students: 134455,
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop",
    },
];

interface FilterState {
    categories: string[];
    tools: string[];
    ratings: string[];
    courseLevels: string[];
    priceRange: { min: number; max: number };
    duration: string[];
}

const initialFilters: FilterState = {
    categories: ["mobile-development"],
    tools: ["webflow"],
    ratings: ["3-star"],
    courseLevels: [],
    priceRange: { min: 0, max: 500 },
    duration: [],
};

const CourseListing = () => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [searchQuery, setSearchQuery] = useState("UI/UX Design");
    const [sortBy, setSortBy] = useState("trending");
    const [currentPage, setCurrentPage] = useState(1);
    const [showSidebar, setShowSidebar] = useState(true);

    const coursesPerPage = 12;
    const totalResults = 3145684;
    const totalPages = Math.ceil(dummyCourses.length * 10 / coursesPerPage); // Simulating more pages

    // Calculate active filters count
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        count += filters.categories.length;
        count += filters.tools.length;
        count += filters.ratings.length;
        count += filters.courseLevels.length;
        count += filters.duration.length;
        if (filters.priceRange.min > 0 || filters.priceRange.max < 500) count += 1;
        return count;
    }, [filters]);

    // Get current page courses
    const currentCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * coursesPerPage;
        // For demo, we'll cycle through the dummy data
        const pageCourses = [];
        for (let i = 0; i < coursesPerPage; i++) {
            pageCourses.push(dummyCourses[(startIndex + i) % dummyCourses.length]);
        }
        return pageCourses;
    }, [currentPage]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full py-6 md:py-10 bg-[rgb(var(--white))]">
            <div className="mx-auto max-w-480 px-4 sm:px-8 md:px-12 lg:px-75">
                {/* Search Header */}
                <CourseSearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    totalResults={totalResults}
                    onFilterToggle={() => setShowSidebar(!showSidebar)}
                    activeFiltersCount={activeFiltersCount}
                />

                {/* Main Content */}
                <div className="mt-6 md:mt-10 flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Left Sidebar - Filters */}
                    <div
                        className={`${showSidebar ? "block" : "hidden"
                            } lg:block w-full lg:w-72 shrink-0 transition-all duration-300`}
                    >
                        <div className="sticky top-24">
                            <CourseFilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Right Content - Course Grid */}
                    <div className="flex-1">
                        {/* Course Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {currentCourses.map((course, index) => (
                                <CourseListingCard key={`${course.id}-${index}`} course={course} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-10 md:mt-14">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseListing;
