"use client";

import BestSellingCourses from "./BestSellingCourses";
import FeaturedCourses from "./FeaturedCourses";
import RecentlyAddedCourses from "./RecentlyAddedCourses";

const CoursesSection = () => {
  return (
    <>
      {/* Best Selling & Featured Courses Section */}
      <section className="bg-[rgb(var(--gray-50))] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="space-y-10">
            <BestSellingCourses />
            <FeaturedCourses />
          </div>
        </div>
      </section>

      {/* Recently Added Courses Section */}
      <RecentlyAddedCourses />
    </>
  );
};

export default CoursesSection;
