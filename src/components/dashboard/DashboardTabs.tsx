"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type TabName = "dashboard" | "courses" | "teachers" | "message" | "wishlist" | "purchase-history" | "settings";

interface Tab {
    name: string;
    id: TabName;
}

const tabs: Tab[] = [
    { name: "Dashboard", id: "dashboard" },
    { name: "Courses", id: "courses" },
    { name: "Teachers", id: "teachers" },
    { name: "Message", id: "message" },
    { name: "Wishlist", id: "wishlist" },
    { name: "Purchase History", id: "purchase-history" },
    { name: "Settings", id: "settings" },
];

interface DashboardTabsProps {
    activeTab: TabName;
    onTabChange: (tab: TabName) => void;
}

const DashboardTabs = ({ activeTab, onTabChange }: DashboardTabsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Mobile scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -120, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 120, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full border-b border-[rgb(var(--gray-200))] bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Desktop Tabs */}
                <nav
                    className="hidden md:flex items-center gap-6 lg:gap-8"
                    aria-label="Dashboard tabs"
                >
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                                    relative py-4 body-md-400 whitespace-nowrap transition-colors duration-200
                                    ${isActive
                                        ? "text-[rgb(var(--gray-900))] font-medium"
                                        : "text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-900))]"
                                    }
                                `}
                            >
                                {tab.name}
                                {/* Active indicator */}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary-500))]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Mobile Tabs with Scroll and Arrows */}
                <div className="md:hidden flex items-center gap-2 py-2">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded border border-[rgb(var(--gray-200))] bg-white text-[rgb(var(--gray-500))] hover:border-[rgb(var(--primary-500))] hover:text-[rgb(var(--primary-500))] transition-colors"
                        aria-label="Scroll tabs left"
                    >
                        <FaChevronLeft className="text-[10px]" />
                    </button>

                    {/* Scrollable Tabs */}
                    <nav
                        ref={scrollContainerRef}
                        className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        aria-label="Dashboard tabs"
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`
                                        relative py-2 body-sm-400 whitespace-nowrap transition-colors duration-200
                                        ${isActive
                                            ? "text-[rgb(var(--gray-900))] font-medium"
                                            : "text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-900))]"
                                        }
                                    `}
                                >
                                    {tab.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--primary-500))]" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded bg-[rgb(var(--primary-500))] text-white hover:bg-[rgb(var(--primary-600))] transition-colors"
                        aria-label="Scroll tabs right"
                    >
                        <FaChevronRight className="text-[10px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardTabs;
