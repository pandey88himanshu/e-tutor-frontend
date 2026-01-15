"use client";

import Image from "next/image";
import { useState } from "react";

interface RecentCourse {
  id: string;
  title: string;
  category: string;
  categoryColor: "design" | "it-software" | "development";
  price: number;
  rating: number;
  students: string;
  image: string;
  instructor?: string;
  ratingCount?: string;
  level?: string;
  duration?: string;
  originalPrice?: number;
  whatYouLearn?: string[];
}

const RecentlyAddedCourses = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const courses: RecentCourse[] = [
    {
      id: "1",
      title: "The Python Mega Course: Build 10 Real World Applications",
      category: "Design",
      categoryColor: "design",
      price: 57,
      rating: 5.0,
      students: "265.7K",
      image: "/home/course.png",
      instructor: "Kevin Gilbert",
      ratingCount: "357,914",
      level: "Beginner",
      duration: "6 hour",
      originalPrice: 26,
      whatYouLearn: [
        "Learn to use Python professionally, learning both Python 2 and Python 3!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
      ],
    },
    {
      id: "2",
      title: "Facebook Ads & Facebook Marketing MASTERY 2021 Cours...",
      category: "IT & Software",
      categoryColor: "it-software",
      price: 57,
      rating: 5.0,
      students: "265.7K",
      image: "/home/course.png",
      instructor: "Kevin Gilbert",
      ratingCount: "357,914",
      level: "Beginner",
      duration: "6 hour",
      originalPrice: 26,
      whatYouLearn: [
        "Learn to use Python professionally, learning both Python 2 and Python 3!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
      ],
    },
    {
      id: "3",
      title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
      category: "Development",
      categoryColor: "development",
      price: 57,
      rating: 5.0,
      students: "265.7K",
      image: "/home/course.png",
      instructor: "Kevin Gilbert",
      ratingCount: "357,914",
      level: "Beginner",
      duration: "6 hour",
      originalPrice: 26,
      whatYouLearn: [
        "Learn to use Python professionally, learning both Python 2 and Python 3!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
      ],
    },
  ];

  const getCategoryStyles = (color: string) => {
    switch (color) {
      case "design":
        return "bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))]";
      case "it-software":
        return "bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))]";
      case "development":
        return "bg-[rgb(var(--secondary-100))] text-[rgb(var(--secondary-500))]";
      default:
        return "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]";
    }
  };

  return (
    <section className="w-full py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-8 md:px-12 lg:px-75">
        {/* Title */}
        <h2 className="heading-02 text-[rgb(var(--gray-900))] text-center mb-10">
          Recently added courses
        </h2>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`group relative overflow-hidden rounded-lg border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] transition-all duration-300 hover:shadow-lg ${
                index === courses.length - 1 ? "hover:scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    index === courses.length - 1 ? "group-hover:scale-110" : ""
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-4">
                {/* Category + Price */}
                <div className="flex items-center justify-between">
                  <span
                    className={`body-xs-500 uppercase rounded px-2 py-1 ${getCategoryStyles(
                      course.categoryColor
                    )}`}
                  >
                    {course.category}
                  </span>
                  <span className="body-lg-600 text-[rgb(var(--primary-500))]">
                    ${course.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="body-md-600 text-[rgb(var(--gray-900))] line-clamp-2 min-h-10">
                  {course.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-full bg-[rgb(var(--gray-100))]" />

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 body-sm-500 text-[rgb(var(--gray-900))]">
                    <svg
                      className="w-4 h-4 text-[rgb(var(--warning-500))]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1 body-sm-400 text-[rgb(var(--gray-500))]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {course.students} students
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Course Button */}
        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 px-6 py-3 border border-[rgb(var(--primary-500))] text-[rgb(var(--primary-500))] rounded-lg body-md-600 hover:bg-[rgb(var(--primary-50))] transition-colors">
            Browse All Course
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedCourses;
