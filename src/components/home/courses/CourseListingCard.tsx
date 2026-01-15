import Image from "next/image";
import Link from "next/link";

export interface CourseCardData {
  id: string;
  title: string;
  category: string;
  categoryColor?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  image: string;
  instructor?: string;
  isBestseller?: boolean;
}

interface CourseListingCardProps {
  course: CourseCardData;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string }> = {
  DESIGN: {
    bg: "bg-[rgb(var(--secondary-100))]",
    text: "text-[rgb(var(--secondary-500))]",
  },
  DEVELOPMENT: {
    bg: "bg-[rgb(var(--success-100))]",
    text: "text-[rgb(var(--success-600))]",
  },
  BUSINESS: {
    bg: "bg-[rgb(var(--warning-100))]",
    text: "text-[rgb(var(--warning-600))]",
  },
  MARKETING: {
    bg: "bg-[rgb(var(--danger-100))]",
    text: "text-[rgb(var(--danger-500))]",
  },
  PHOTOGRAPHY: {
    bg: "bg-[rgb(var(--primary-100))]",
    text: "text-[rgb(var(--primary-500))]",
  },
  MUSIC: {
    bg: "bg-[rgb(var(--secondary-100))]",
    text: "text-[rgb(var(--secondary-600))]",
  },
  LIFESTYLE: {
    bg: "bg-[rgb(var(--success-100))]",
    text: "text-[rgb(var(--success-500))]",
  },
  IT: { bg: "bg-[rgb(var(--gray-100))]", text: "text-[rgb(var(--gray-700))]" },
};

const CourseListingCard = ({ course }: CourseListingCardProps) => {
  const categoryStyle =
    categoryColors[course.category.toUpperCase()] || categoryColors.DESIGN;

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group overflow-hidden rounded-lg border border-[rgb(var(--gray-100))] bg-[rgb(var(--white))] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-312/180 w-full overflow-hidden bg-[rgb(var(--gray-100))]">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {course.isBestseller && (
            <div className="absolute left-3 top-3 rounded bg-[rgb(var(--success-500))] px-2 py-1 text-xs font-medium text-white">
              Bestseller
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-3 p-4">
          {/* Category + Price Row */}
          <div className="flex items-center justify-between">
            <span
              className={`rounded px-2 py-1 text-xs font-semibold uppercase ${categoryStyle.bg} ${categoryStyle.text}`}
            >
              {course.category}
            </span>
            <div className="flex items-center gap-2">
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="body-sm-400 text-[rgb(var(--gray-400))] line-through">
                  ${course.originalPrice}
                </span>
              )}
              <span className="body-lg-600 text-[rgb(var(--primary-500))]">
                ${course.price}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="body-md-500 text-[rgb(var(--gray-900))] line-clamp-2 min-h-11 group-hover:text-[rgb(var(--primary-500))] transition-colors">
            {course.title}
          </h3>

          {/* Divider */}
          <div className="h-px w-full bg-[rgb(var(--gray-100))]" />

          {/* Rating + Students Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-[rgb(var(--warning-500))]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="body-sm-600 text-[rgb(var(--gray-900))]">
                {course.rating}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-[rgb(var(--gray-500))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="body-sm-400 text-[rgb(var(--gray-500))]">
                {course.students.toLocaleString()} students
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseListingCard;
