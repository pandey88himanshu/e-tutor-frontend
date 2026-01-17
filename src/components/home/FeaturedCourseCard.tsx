/**
 * ============================================================
 * GLOBAL CSS STYLES GUIDE
 * ============================================================
 * 
 * This component uses global CSS classes from globals.css for consistent styling.
 * 
 * COLOR PALETTE (use with rgb(var(--color-name))):
 * ---------------------------------------------------------
 * Gray Scale:    --gray-50 to --gray-900, --white (e.g., rgb(var(--gray-900)))
 * Primary:       --primary-100 to --primary-900 (Orange)
 * Secondary:     --secondary-100 to --secondary-900 (Blue/Indigo)
 * Success:       --success-100 to --success-900 (Green)
 * Warning:       --warning-100 to --warning-900 (Amber)
 * Danger:        --danger-100 to --danger-900 (Red)
 * 
 * TYPOGRAPHY CLASSES:
 * ---------------------------------------------------------
 * Display:       display-01, display-02, display-03
 * Headings:      heading-01, heading-02, heading-03, heading-04
 * Body XXXL:     body-xxxl-400
 * Body XXL:      body-xxl-500, body-xxl-600
 * Body XL:       body-xl-400, body-xl-500, body-xl-600
 * Body Large:    body-lg-400, body-lg-500, body-lg-600
 * Body Medium:   body-md-400, body-md-500, body-md-600
 * Body Small:    body-sm-400, body-sm-500, body-sm-600
 * Body Tiny:     body-xs-400, body-xs-500, body-xs-600
 * 
 * Example Usage:
 * <h2 className="heading-03 text-[rgb(var(--gray-900))]">Title</h2>
 * <p className="body-md-400 text-[rgb(var(--gray-600))]">Description</p>
 * <span className="body-sm-500 text-[rgb(var(--primary-500))]">$99.00</span>
 * ============================================================
 */

import Image from "next/image";

interface FeaturedCourseCardProps {
  title: string;
  category: string;
  instructor: string;
  rating: string;
  ratingCount: string;
  students: string;
  level: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
}

const FeaturedCourseCard = ({
  title,
  category,
  instructor,
  rating,
  ratingCount,
  students,
  level,
  duration,
  price,
  originalPrice,
  image,
}: FeaturedCourseCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-lg border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] p-0 transition-all duration-300 hover:shadow-md hover:border-[rgb(var(--gray-300))]">
      {/* Image - Responsive */}
      <div className="w-full sm:w-36 md:w-44 lg:w-48 h-40 sm:h-auto rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-linear-to-br from-[rgb(var(--secondary-100))] to-[rgb(var(--primary-100))] shrink-0 flex items-center justify-center text-[rgb(var(--gray-400))] overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
        />
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 sm:gap-3 p-3 sm:p-4 sm:py-3 sm:pr-3 sm:pl-0">
        {/* Category and Price Row */}
        <div className="flex items-start justify-between gap-2">
          <span className="body-xs-500 text-[rgb(var(--success-600))] uppercase bg-[rgb(var(--success-100))] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="body-md-600 sm:body-lg-600 text-[rgb(var(--gray-900))]">
              ${price}
            </span>
            <span className="body-sm-400 line-through text-[rgb(var(--gray-400))]">
              ${originalPrice}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="body-md-600 sm:body-lg-600 text-[rgb(var(--gray-900))] line-clamp-2">
          {title}
        </h3>

        {/* Instructor and Rating Row */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1.5 sm:gap-2 md:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[rgb(var(--gray-200))] flex items-center justify-center body-xs-400">
              👤
            </div>
            <span className="body-sm-400 text-[rgb(var(--gray-700))]">{instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[rgb(var(--warning-500))] body-md-400">⭐</span>
            <span className="body-sm-500 text-[rgb(var(--gray-900))]">{rating}</span>
            <span className="body-sm-400 text-[rgb(var(--gray-500))]">({ratingCount})</span>
          </div>
        </div>

        {/* Bottom Info Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 body-sm-400 text-[rgb(var(--gray-600))]">
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[rgb(var(--secondary-500))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="whitespace-nowrap">{students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[rgb(var(--danger-500))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>{level}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[rgb(var(--success-500))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6l4 2"
              />
            </svg>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;
