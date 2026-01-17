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

interface CourseCardProps {
  title: string;
  category: string;
  price: number;
  rating: number;
  students: string;
  image: string;
}

const CourseCard = ({
  title,
  category,
  price,
  rating,
  students,
  image,
}: CourseCardProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-40 sm:h-44 lg:h-48 w-full bg-gradient-to-br from-[rgb(var(--secondary-100))] to-[rgb(var(--primary-100))]">
        <div className="absolute inset-0 flex items-center justify-center text-[rgb(var(--gray-400))]">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Category + Price */}
        <div className="flex items-center justify-between">
          <span className="body-xs-500 rounded bg-[rgb(var(--primary-100))] px-1.5 sm:px-2 py-0.5 sm:py-1 uppercase text-[rgb(var(--primary-500))]">
            {category}
          </span>
          <span className="body-md-600 sm:body-lg-600 text-[rgb(var(--primary-500))]">
            ${price}
          </span>
        </div>

        {/* Title */}
        <h3 className="body-sm-600 sm:body-md-600 text-[rgb(var(--gray-900))] line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
          {title}
        </h3>

        {/* Divider */}
        <div className="h-px w-full bg-[rgb(var(--gray-100))]" />

        {/* Rating */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="flex items-center gap-1 body-sm-500 text-[rgb(var(--gray-900))]">
            ⭐ {rating}
          </span>
          <span className="body-sm-400 text-[rgb(var(--gray-500))]">{students} students</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
