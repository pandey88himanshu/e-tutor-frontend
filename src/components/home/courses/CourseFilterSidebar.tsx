"use client";

import React, { useState } from "react";

// Filter data types
interface CategoryItem {
  id: string;
  label: string;
  count: number;
  icon?: string;
  isActive?: boolean;
  subItems?: { id: string; label: string; count: number; isActive?: boolean }[];
}

interface FilterState {
  categories: string[];
  tools: string[];
  ratings: string[];
  courseLevels: string[];
  priceRange: { min: number; max: number };
  duration: string[];
}

interface CourseFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

// Dummy data for categories
const categoriesData: CategoryItem[] = [
  {
    id: "development",
    label: "Development",
    count: 574,
    icon: "💻",
    subItems: [
      { id: "web-development", label: "Web development", count: 574 },
      { id: "data-science", label: "Data Science", count: 568 },
      {
        id: "mobile-development",
        label: "Mobile Development",
        count: 1345,
        isActive: true,
      },
      { id: "software-testing", label: "Software Testing", count: 317 },
      { id: "software-engineering", label: "Software Engineering", count: 31 },
      {
        id: "software-dev-tools",
        label: "Software Development Tools",
        count: 558,
      },
      { id: "no-code-development", label: "No-Code Development", count: 37 },
    ],
  },
  { id: "business", label: "Business", count: 892, icon: "💼" },
  { id: "finance", label: "Finance & Accounting", count: 456, icon: "📊" },
  { id: "it-software", label: "IT & Software", count: 1234, icon: "🖥️" },
  {
    id: "office-productivity",
    label: "Office Productivity",
    count: 234,
    icon: "📋",
  },
  {
    id: "personal-development",
    label: "Personal Development",
    count: 567,
    icon: "🎯",
  },
  { id: "design", label: "Design", count: 890, icon: "🎨" },
  { id: "marketing", label: "Marketing", count: 345, icon: "📢" },
  { id: "lifestyle", label: "Lifestyle", count: 678, icon: "🌿" },
  { id: "photography", label: "Photography & Video", count: 432, icon: "📷" },
  { id: "music", label: "Music", count: 123, icon: "🎵" },
  { id: "health-fitness", label: "Health & Fitness", count: 456, icon: "💪" },
];

const toolsData = [
  { id: "html5", label: "HTML 5", count: 1345 },
  { id: "css3", label: "CSS 3", count: 12736 },
  { id: "react", label: "React", count: 1345 },
  { id: "webflow", label: "Webflow", count: 1345, isActive: true },
  { id: "nodejs", label: "Node.js", count: 1345 },
  { id: "laravel", label: "Laravel", count: 1345 },
  { id: "saas", label: "Saas", count: 1345 },
  { id: "wordpress", label: "Wordpress", count: 1345 },
];

const ratingsData = [
  { id: "5-star", label: "5 Star", count: 1345, stars: 5 },
  { id: "4-star", label: "4 Star & up", count: 1345, stars: 4 },
  { id: "3-star", label: "3 Star & up", count: 1345, stars: 3, isActive: true },
];

const courseLevels = [
  { id: "all-level", label: "All Level", count: 1980 },
  { id: "beginner", label: "Beginner", count: 890 },
  { id: "intermediate", label: "Intermediate", count: 560 },
  { id: "expert", label: "Expert", count: 320 },
];

const durationOptions = [
  { id: "0-2-months", label: "0 - 2 Months" },
  { id: "3-months", label: "3 Months" },
  { id: "6-months", label: "6 Months" },
  { id: "1-year", label: "1 Year" },
];

// Collapsible Section Component
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[rgb(var(--gray-100))] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <span className="body-md-600 text-[rgb(var(--gray-900))]">{title}</span>
        <svg
          className={`h-5 w-5 text-[rgb(var(--gray-500))] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-250 mt-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// Checkbox Item Component
interface CheckboxItemProps {
  id: string;
  label: string;
  count?: number;
  isChecked: boolean;
  isActive?: boolean;
  onChange: (id: string) => void;
  showStars?: number;
  indent?: boolean;
}

const CheckboxItem = ({
  id,
  label,
  count,
  isChecked,
  isActive,
  onChange,
  showStars,
  indent = false,
}: CheckboxItemProps) => {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between py-2 ${
        indent ? "pl-6" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            isChecked
              ? "border-[rgb(var(--primary-500))] bg-[rgb(var(--primary-500))]"
              : "border-[rgb(var(--gray-300))]"
          }`}
        >
          {isChecked && (
            <svg
              className="h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M10.28 2.28a.75.75 0 00-1.06 0L4.5 7l-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
            </svg>
          )}
        </div>
        {showStars ? (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < showStars
                    ? "text-[rgb(var(--warning-500))]"
                    : "text-[rgb(var(--gray-300))]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        ) : (
          <span
            className={`body-sm-400 ${
              isActive
                ? "text-[rgb(var(--primary-500))]"
                : "text-[rgb(var(--gray-700))]"
            }`}
          >
            {label}
          </span>
        )}
      </div>
      {count !== undefined && (
        <span className="body-sm-400 text-[rgb(var(--gray-500))]">
          {count.toLocaleString()}
        </span>
      )}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange(id)}
        className="sr-only"
      />
    </label>
  );
};

// Category Item with Expand/Collapse
interface CategoryItemComponentProps {
  category: CategoryItem;
  selectedCategories: string[];
  onToggle: (id: string) => void;
}

const CategoryItemComponent = ({
  category,
  selectedCategories,
  onToggle,
}: CategoryItemComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(category.id === "development");
  const hasSubItems = category.subItems && category.subItems.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <span className="text-lg">{category.icon}</span>
          <span
            className={`body-sm-400 ${
              selectedCategories.includes(category.id)
                ? "text-[rgb(var(--primary-500))]"
                : "text-[rgb(var(--gray-700))]"
            }`}
          >
            {category.label}
          </span>
        </div>
        <button
          onClick={() => hasSubItems && setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          {hasSubItems && (
            <svg
              className={`h-4 w-4 text-[rgb(var(--gray-500))] transition-transform ${
                isExpanded ? "rotate-180" : ""
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
          )}
        </button>
      </div>
      {hasSubItems && isExpanded && (
        <div className="ml-6 border-l border-[rgb(var(--gray-100))] pl-4">
          {category.subItems!.map((subItem) => (
            <CheckboxItem
              key={subItem.id}
              id={subItem.id}
              label={subItem.label}
              count={subItem.count}
              isChecked={selectedCategories.includes(subItem.id)}
              isActive={subItem.isActive}
              onChange={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Price Range Slider Component
interface PriceRangeProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

const PriceRangeSlider = ({ min, max, value, onChange }: PriceRangeProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-500))]">
            $
          </span>
          <input
            type="number"
            value={value.min}
            onChange={(e) =>
              onChange({ ...value, min: Number(e.target.value) })
            }
            className="w-full rounded-lg border border-[rgb(var(--gray-200))] py-2 pl-7 pr-3 body-sm-400 text-[rgb(var(--gray-800))] focus:border-[rgb(var(--primary-500))] focus:outline-none"
            placeholder="Min"
          />
        </div>
        <span className="text-[rgb(var(--gray-400))]">—</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-500))]">
            $
          </span>
          <input
            type="number"
            value={value.max}
            onChange={(e) =>
              onChange({ ...value, max: Number(e.target.value) })
            }
            className="w-full rounded-lg border border-[rgb(var(--gray-200))] py-2 pl-7 pr-3 body-sm-400 text-[rgb(var(--gray-800))] focus:border-[rgb(var(--primary-500))] focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value.max}
        onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
        className="w-full accent-[rgb(var(--primary-500))]"
      />
    </div>
  );
};

// Radio Button Component for Duration
interface RadioItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  onChange: (id: string) => void;
}

const RadioItem = ({ id, label, isSelected, onChange }: RadioItemProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
          isSelected
            ? "border-[rgb(var(--primary-500))]"
            : "border-[rgb(var(--gray-300))]"
        }`}
      >
        {isSelected && (
          <div className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--primary-500))]" />
        )}
      </div>
      <span className="body-sm-400 text-[rgb(var(--gray-700))]">{label}</span>
      <input
        type="radio"
        checked={isSelected}
        onChange={() => onChange(id)}
        className="sr-only"
      />
    </label>
  );
};

const CourseFilterSidebar = ({
  filters,
  onFilterChange,
}: CourseFilterSidebarProps) => {
  const toggleCategory = (id: string) => {
    const newCategories = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleTool = (id: string) => {
    const newTools = filters.tools.includes(id)
      ? filters.tools.filter((t) => t !== id)
      : [...filters.tools, id];
    onFilterChange({ ...filters, tools: newTools });
  };

  const toggleRating = (id: string) => {
    const newRatings = filters.ratings.includes(id)
      ? filters.ratings.filter((r) => r !== id)
      : [...filters.ratings, id];
    onFilterChange({ ...filters, ratings: newRatings });
  };

  const toggleCourseLevel = (id: string) => {
    const newLevels = filters.courseLevels.includes(id)
      ? filters.courseLevels.filter((l) => l !== id)
      : [...filters.courseLevels, id];
    onFilterChange({ ...filters, courseLevels: newLevels });
  };

  const setDuration = (id: string) => {
    onFilterChange({ ...filters, duration: [id] });
  };

  const setPriceRange = (value: { min: number; max: number }) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  return (
    <div className="w-full rounded-lg border border-[rgb(var(--primary-100))] bg-[rgb(var(--white))] p-4">
      {/* Category Section */}
      <CollapsibleSection title="CATEGORY" defaultOpen={true}>
        <div className="space-y-1">
          {categoriesData.map((category) => (
            <CategoryItemComponent
              key={category.id}
              category={category}
              selectedCategories={filters.categories}
              onToggle={toggleCategory}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Tools Section */}
      <CollapsibleSection title="TOOLS" defaultOpen={true}>
        <div className="space-y-1">
          {toolsData.map((tool) => (
            <CheckboxItem
              key={tool.id}
              id={tool.id}
              label={tool.label}
              count={tool.count}
              isChecked={filters.tools.includes(tool.id)}
              isActive={tool.isActive}
              onChange={toggleTool}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Rating Section */}
      <CollapsibleSection title="RATING" defaultOpen={true}>
        <div className="space-y-1">
          {ratingsData.map((rating) => (
            <CheckboxItem
              key={rating.id}
              id={rating.id}
              label={rating.label}
              count={rating.count}
              isChecked={filters.ratings.includes(rating.id)}
              isActive={rating.isActive}
              onChange={toggleRating}
              showStars={rating.stars}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Course Level Section */}
      <CollapsibleSection title="COURSE LEVEL" defaultOpen={true}>
        <div className="space-y-1">
          {courseLevels.map((level) => (
            <CheckboxItem
              key={level.id}
              id={level.id}
              label={level.label}
              count={level.count}
              isChecked={filters.courseLevels.includes(level.id)}
              onChange={toggleCourseLevel}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Price Section */}
      <CollapsibleSection title="PRICE" defaultOpen={true}>
        <PriceRangeSlider
          min={0}
          max={500}
          value={filters.priceRange}
          onChange={setPriceRange}
        />
      </CollapsibleSection>

      {/* Duration Section */}
      <CollapsibleSection title="DURATION" defaultOpen={true}>
        <div className="space-y-1">
          {durationOptions.map((option) => (
            <RadioItem
              key={option.id}
              id={option.id}
              label={option.label}
              isSelected={filters.duration.includes(option.id)}
              onChange={setDuration}
            />
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CourseFilterSidebar;
