"use client";

import React, { useState } from "react";

interface CourseSearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
  onFilterToggle: () => void;
  activeFiltersCount: number;
}

const suggestionTags = [
  "user interface",
  "user experience",
  "web design",
  "interface",
  "app",
];

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const CourseSearchHeader = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
  onFilterToggle,
  activeFiltersCount,
}: CourseSearchHeaderProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const selectedSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Trending";

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar Row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Side - Filter Button + Search */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Filter Button */}
          <button
            onClick={onFilterToggle}
            className="flex items-center gap-2 rounded-lg border border-[rgb(var(--primary-500))] bg-[rgb(var(--primary-100))] px-4 py-3 transition-colors hover:bg-[rgb(var(--primary-200))]"
          >
            <svg
              className="h-5 w-5 text-[rgb(var(--primary-500))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="body-md-500 text-[rgb(var(--primary-500))]">
              Filter
            </span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--primary-500))] text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Search Input */}
          <div className="relative flex-1 lg:w-80">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgb(var(--gray-400))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="UI/UX Design"
              className="w-full rounded-lg border border-[rgb(var(--gray-200))] py-3 pl-12 pr-4 body-md-400 text-[rgb(var(--gray-800))] placeholder:text-[rgb(var(--gray-400))] focus:border-[rgb(var(--primary-500))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--primary-500))] transition-colors"
            />
          </div>
        </div>

        {/* Right Side - Sort Dropdown */}
        <div className="flex items-center gap-4">
          <span className="body-sm-400 text-[rgb(var(--gray-500))]">
            Sort by:
          </span>
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 rounded-lg border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] px-4 py-3 body-md-400 text-[rgb(var(--gray-800))] hover:border-[rgb(var(--gray-300))] transition-colors min-w-40"
            >
              <span>{selectedSortLabel}</span>
              <svg
                className={`h-4 w-4 text-[rgb(var(--gray-500))] transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-full rounded-lg border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] shadow-lg overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left body-md-400 hover:bg-[rgb(var(--gray-50))] transition-colors ${
                      sortBy === option.value
                        ? "text-[rgb(var(--primary-500))] bg-[rgb(var(--primary-100))]"
                        : "text-[rgb(var(--gray-700))]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggestion Tags Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="body-sm-400 text-[rgb(var(--gray-500))]">
            Suggestion:
          </span>
          {suggestionTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => onSearchChange(tag)}
              className="body-sm-400 text-[rgb(var(--primary-500))] hover:text-[rgb(var(--primary-600))] hover:underline transition-colors"
            >
              {tag}
              {index < suggestionTags.length - 1 && ","}
            </button>
          ))}
        </div>
        <div className="body-sm-400 text-[rgb(var(--gray-600))]">
          <span className="font-semibold text-[rgb(var(--gray-900))]">
            {totalResults.toLocaleString()}
          </span>{" "}
          results find for &quot;{searchQuery || "UI/UX design"}&quot;
        </div>
      </div>
    </div>
  );
};

export default CourseSearchHeader;
