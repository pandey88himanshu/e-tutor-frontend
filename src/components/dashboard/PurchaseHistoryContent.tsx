"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaChevronDown, FaChevronUp, FaCreditCard, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { BiDollar } from "react-icons/bi";

// Mock purchase history data with courses for all entries
const mockPurchaseHistory = [
    {
        id: "1",
        date: "1st Septembar, 2021 at 11:30 PM",
        courseCount: 3,
        totalAmount: 75.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c1", title: "Web Development Bootcamp", thumbnail: "", rating: 4.8, reviews: 325000, instructor: "John Smith", price: 25.00 },
            { id: "c2", title: "React - The Complete Guide", thumbnail: "", rating: 4.9, reviews: 210000, instructor: "Max Wilson", price: 25.00 },
            { id: "c3", title: "Node.js Masterclass", thumbnail: "", rating: 4.7, reviews: 180000, instructor: "Andrew Mead", price: 25.00 },
        ],
    },
    {
        id: "2",
        date: "1st Septembar, 2021 at 11:30 PM",
        courseCount: 2,
        totalAmount: 62.99,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c4", title: "Learn Ethical Hacking From Scratch", thumbnail: "", rating: 4.7, reviews: 451444, instructor: "Marvin McKinney", price: 13.99 },
            { id: "c5", title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates", thumbnail: "", rating: 4.7, reviews: 451444, instructor: "Esther Howard", price: 49.00 },
        ],
    },
    {
        id: "3",
        date: "31st August, 2021 at 11:30 PM",
        courseCount: 52,
        totalAmount: 507.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c6", title: "Python for Data Science and Machine Learning", thumbnail: "", rating: 4.6, reviews: 520000, instructor: "Jose Portilla", price: 15.00 },
            { id: "c7", title: "AWS Certified Solutions Architect", thumbnail: "", rating: 4.8, reviews: 350000, instructor: "Stephane Maarek", price: 17.00 },
        ],
    },
    {
        id: "4",
        date: "24th August, 2021 at 6:34 PM",
        courseCount: 1,
        totalAmount: 9.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c8", title: "JavaScript Algorithms and Data Structures", thumbnail: "", rating: 4.5, reviews: 280000, instructor: "Colt Steele", price: 9.00 },
        ],
    },
    {
        id: "5",
        date: "1st Septembar, 2021 at 8:47 PM",
        courseCount: 1,
        totalAmount: 25.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c9", title: "Complete Flutter Development Bootcamp", thumbnail: "", rating: 4.7, reviews: 190000, instructor: "Angela Yu", price: 25.00 },
        ],
    },
    {
        id: "6",
        date: "1st Septembar, 2021 at 11:30 PM",
        courseCount: 5,
        totalAmount: 89.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c10", title: "UI/UX Design Masterclass", thumbnail: "", rating: 4.8, reviews: 145000, instructor: "Daniel Scott", price: 18.00 },
            { id: "c11", title: "Figma UI/UX Essentials", thumbnail: "", rating: 4.6, reviews: 98000, instructor: "Gary Simon", price: 17.00 },
        ],
    },
    {
        id: "7",
        date: "17th July, 2021 at 10:51 AM",
        courseCount: 7,
        totalAmount: 140.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c12", title: "Docker and Kubernetes: The Complete Guide", thumbnail: "", rating: 4.7, reviews: 210000, instructor: "Stephen Grider", price: 20.00 },
            { id: "c13", title: "GraphQL with React: The Complete Guide", thumbnail: "", rating: 4.5, reviews: 85000, instructor: "Stephen Grider", price: 20.00 },
        ],
    },
    {
        id: "8",
        date: "15th July, 2021 at 3:20 PM",
        courseCount: 2,
        totalAmount: 35.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c14", title: "MongoDB - The Complete Developer's Guide", thumbnail: "", rating: 4.6, reviews: 175000, instructor: "Maximilian Schwarzmüller", price: 18.00 },
            { id: "c15", title: "Git Complete: The definitive guide", thumbnail: "", rating: 4.4, reviews: 95000, instructor: "Jason Taylor", price: 17.00 },
        ],
    },
    {
        id: "9",
        date: "10th July, 2021 at 9:15 AM",
        courseCount: 3,
        totalAmount: 55.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c16", title: "TypeScript: The Complete Developer's Guide", thumbnail: "", rating: 4.8, reviews: 165000, instructor: "Stephen Grider", price: 19.00 },
            { id: "c17", title: "NestJS Zero to Hero", thumbnail: "", rating: 4.7, reviews: 78000, instructor: "Ariel Weinberger", price: 18.00 },
        ],
    },
    {
        id: "10",
        date: "5th July, 2021 at 2:45 PM",
        courseCount: 4,
        totalAmount: 78.00,
        paymentMethod: "Credit Card",
        userName: "Kevin Gilbert",
        cardNumber: "4142 **** **** ****",
        cardExpiry: "04/24",
        courses: [
            { id: "c18", title: "Vue JS 3 - The Complete Guide", thumbnail: "", rating: 4.8, reviews: 198000, instructor: "Maximilian Schwarzmüller", price: 20.00 },
            { id: "c19", title: "Svelte.js - The Complete Guide", thumbnail: "", rating: 4.6, reviews: 45000, instructor: "Maximilian Schwarzmüller", price: 19.00 },
        ],
    },
];

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    rating: number;
    reviews: number;
    instructor: string;
    price: number;
}

interface PurchaseEntry {
    id: string;
    date: string;
    courseCount: number;
    totalAmount: number;
    paymentMethod: string;
    userName?: string;
    cardNumber?: string;
    cardExpiry?: string;
    courses: Course[];
}

const ITEMS_PER_PAGE = 5;
const TOTAL_PURCHASES = 47; // Mock total

const PurchaseHistoryContent = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(TOTAL_PURCHASES / ITEMS_PER_PAGE);

    // Get paginated items
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = mockPurchaseHistory.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Format review count
    const formatReviews = (count: number) => {
        return count.toLocaleString();
    };

    // Toggle expansion
    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Generate page numbers
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
                <h2 className="text-lg font-semibold text-[rgb(var(--gray-900))] mb-6">
                    Purchase History
                </h2>

                {/* Purchase List */}
                <div className="space-y-4 mb-8">
                    {paginatedItems.map((entry) => {
                        const isExpanded = expandedId === entry.id;

                        return (
                            <div
                                key={entry.id}
                                className={`border rounded-lg overflow-hidden transition-all ${isExpanded
                                        ? "border-[rgb(var(--primary-500))]"
                                        : "border-[rgb(var(--gray-200))]"
                                    }`}
                            >
                                {/* Header Row - Always Clickable */}
                                <div
                                    onClick={() => toggleExpand(entry.id)}
                                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${isExpanded
                                            ? "bg-[rgb(var(--primary-500))]"
                                            : "bg-white hover:bg-[rgb(var(--gray-50))]"
                                        }`}
                                >
                                    <div>
                                        {/* Date */}
                                        <p className={`body-sm-500 mb-1 ${isExpanded
                                                ? "text-white"
                                                : "text-[rgb(var(--primary-500))]"
                                            }`}>
                                            {entry.date}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <HiOutlineBookOpen className={`text-sm ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`} />
                                                <span className={`body-xs-400 ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`}>
                                                    {entry.courseCount} Courses
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BiDollar className={`text-sm ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`} />
                                                <span className={`body-xs-400 ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`}>
                                                    ${entry.totalAmount.toFixed(2)} USD
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCreditCard className={`text-xs ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`} />
                                                <span className={`body-xs-400 ${isExpanded
                                                        ? "text-white/80"
                                                        : "text-[rgb(var(--gray-500))]"
                                                    }`}>
                                                    {entry.paymentMethod}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expand/Collapse Icon */}
                                    <button className={`w-8 h-8 flex items-center justify-center rounded ${isExpanded
                                            ? "bg-white/20 text-white"
                                            : "text-[rgb(var(--gray-400))]"
                                        }`}>
                                        {isExpanded ? (
                                            <FaChevronUp className="text-xs" />
                                        ) : (
                                            <FaChevronDown className="text-xs" />
                                        )}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="p-4 bg-white">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Course List */}
                                            <div className="flex-1 space-y-4">
                                                {entry.courses.map((course) => (
                                                    <div key={course.id} className="flex gap-4">
                                                        {/* Thumbnail */}
                                                        <div className="relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[rgb(var(--gray-100))] to-[rgb(var(--gray-200))]">
                                                            {course.thumbnail ? (
                                                                <Image
                                                                    src={course.thumbnail}
                                                                    alt={course.title}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-2xl">📚</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Course Info */}
                                                        <div className="flex-1">
                                                            {/* Rating */}
                                                            <div className="flex items-center gap-1 mb-1">
                                                                <FaStar className="text-[rgb(var(--warning-500))] text-xs" />
                                                                <span className="body-xs-500 text-[rgb(var(--gray-900))]">
                                                                    {course.rating}
                                                                </span>
                                                                <span className="body-xs-400 text-[rgb(var(--gray-500))]">
                                                                    ({formatReviews(course.reviews)} Review)
                                                                </span>
                                                            </div>

                                                            {/* Title */}
                                                            <h4 className="body-sm-500 text-[rgb(var(--gray-900))] line-clamp-2 mb-1">
                                                                {course.title}
                                                            </h4>

                                                            {/* Instructor */}
                                                            <p className="body-xs-400 text-[rgb(var(--gray-500))]">
                                                                Course by: <span className="text-[rgb(var(--gray-700))]">{course.instructor}</span>
                                                            </p>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex-shrink-0">
                                                            <span className="body-md-600 text-[rgb(var(--primary-500))]">
                                                                ${course.price.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Order Summary */}
                                            <div className="lg:w-72 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-[rgb(var(--gray-200))] pt-4 lg:pt-0 lg:pl-6">
                                                <h4 className="body-md-600 text-[rgb(var(--gray-900))] mb-3">
                                                    {entry.date}
                                                </h4>

                                                {/* Order Info */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <HiOutlineBookOpen className="text-sm text-[rgb(var(--gray-500))]" />
                                                        <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                            {entry.courses.length} Courses
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <BiDollar className="text-sm text-[rgb(var(--gray-500))]" />
                                                        <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                            ${entry.totalAmount.toFixed(2)} USD
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FaCreditCard className="text-xs text-[rgb(var(--gray-500))]" />
                                                        <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                            {entry.paymentMethod}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Details */}
                                                {entry.userName && (
                                                    <div className="pt-4 border-t border-[rgb(var(--gray-200))]">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                                {entry.userName}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                                {entry.cardNumber}
                                                            </span>
                                                            <span className="body-xs-400 text-[rgb(var(--gray-600))]">
                                                                {entry.cardExpiry}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-1.5 mb-8">
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

                {/* Footer Message */}
                {currentPage === totalPages && (
                    <div className="text-center py-4">
                        <p className="body-sm-400 text-[rgb(var(--gray-500))]">
                            Yay! You have seen all your purchase history. 😎
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistoryContent;
