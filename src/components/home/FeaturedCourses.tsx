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

import FeaturedCourseCard from "./FeaturedCourseCard";

const FeaturedCourses = () => {
  const courses = [
    {
      title: "Investing In Stocks The Complete Course! (13 H...",
      category: "Health & Fitness",
      instructor: "Kevin Gilbert",
      rating: "5.0",
      ratingCount: "357,914",
      students: "265.7K",
      level: "Beginner",
      duration: "6 hour",
      price: "14.00",
      originalPrice: "26.00",
      image: "/home/course.png",
    },
    {
      title: "Google Analytics Certification - Learn How To...",
      category: "Personal Development",
      instructor: "Kevin Gilbert",
      rating: "5.0",
      ratingCount: "357,914",
      students: "265.7K",
      level: "Beginner",
      duration: "6 hour",
      price: "14.00",
      originalPrice: "26.00",
      image: "/home/course.png",
    },
    {
      title: "Adobe XD for Web Design: Essential Principles",
      category: "Productivity",
      instructor: "Kevin Gilbert",
      rating: "5.0",
      ratingCount: "357,914",
      students: "265.7K",
      level: "Beginner",
      duration: "6 hour",
      price: "14.00",
      originalPrice: "26.00",
      image: "/home/course.png",
    },
    {
      title: "The Python Mega Course: Build 10 Real World ...",
      category: "Music",
      instructor: "Kevin Gilbert",
      rating: "5.0",
      ratingCount: "357,914",
      students: "265.7K",
      level: "Beginner",
      duration: "6 hour",
      price: "14.00",
      originalPrice: "26.00",
      image: "/home/course.png",
    },
  ];

  return (
    <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="rounded-xl sm:rounded-2xl bg-[rgb(var(--white))] border border-[rgb(var(--gray-200))] p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
          <h2 className="heading-04 sm:heading-03 text-[rgb(var(--gray-900))]">
            Our feature courses
          </h2>

          <p className="max-w-md body-sm-400 text-[rgb(var(--gray-600))] md:text-right">
            Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
            varius purus ut eleifend porta.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-2">
          {courses.map((course, i) => (
            <FeaturedCourseCard key={i} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
