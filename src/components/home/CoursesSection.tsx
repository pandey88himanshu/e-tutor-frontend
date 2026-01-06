"use client";

import BestSellingCourses from "./BestSellingCourses";
import FeaturedCourses from "./FeaturedCourses";

const CoursesSection = () => {
  return (
    <section className='bg-[rgb(var(--gray-50))] py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20'>
        <BestSellingCourses />
        <FeaturedCourses />
      </div>
    </section>
  );
};

export default CoursesSection;
