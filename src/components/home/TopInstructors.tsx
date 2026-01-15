"use client";

import Image from "next/image";

interface Instructor {
  id: string;
  name: string;
  role: string;
  rating: number;
  students: string;
  image: string;
  bgColor: string;
}

const instructors: Instructor[] = [
  {
    id: "1",
    name: "Devon Lane",
    role: "Senior Developer",
    rating: 4.6,
    students: "854",
    image: "/home/course.png",
    bgColor: "bg-[#F5C563]",
  },
  {
    id: "2",
    name: "Darrell Steward",
    role: "Digital Product Designer",
    rating: 4.9,
    students: "451,444",
    image: "/home/course.png",
    bgColor: "bg-[#E8E8E8]",
  },
  {
    id: "3",
    name: "Jane Cooper",
    role: "UI/UX Designer",
    rating: 4.8,
    students: "435,671",
    image: "/home/course.png",
    bgColor: "bg-[#C4DAD2]",
  },
  {
    id: "4",
    name: "Albert Flores",
    role: "Adobe Instructor",
    rating: 4.7,
    students: "511,123",
    image: "/home/course.png",
    bgColor: "bg-[#A8D5BA]",
  },
  {
    id: "5",
    name: "Kathryn Murphy",
    role: "Lead Developer",
    rating: 4.2,
    students: "2,711",
    image: "/home/course.png",
    bgColor: "bg-[#F5E6A3]",
  },
];

const TopInstructors = () => {
  return (
    <section className="w-full py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-8 md:px-12 lg:px-75">
        {/* Card Container */}
        <div className="rounded-2xl border border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] p-8 lg:p-12">
          {/* Title */}
          <h2 className="heading-03 text-[rgb(var(--gray-900))] text-center mb-10">
            Top instructor of the month
          </h2>

          {/* Instructors Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="flex flex-col items-center text-center"
              >
                {/* Profile Image */}
                <div
                  className={`relative w-full aspect-square rounded-lg overflow-hidden mb-4 ${instructor.bgColor}`}
                >
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name */}
                <h4 className="body-md-600 text-[rgb(var(--gray-900))]">
                  {instructor.name}
                </h4>

                {/* Role */}
                <p className="body-sm-400 text-[rgb(var(--gray-500))] mb-3">
                  {instructor.role}
                </p>

                {/* Rating & Students */}
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-[rgb(var(--warning-500))]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="body-sm-500 text-[rgb(var(--gray-900))]">
                      {instructor.rating}
                    </span>
                  </span>
                  <span className="body-sm-400 text-[rgb(var(--gray-500))]">
                    {instructor.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 pt-8 border-t border-[rgb(var(--gray-100))] text-center">
            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Thousands of students waiting for a instructor. Start teaching &
              earning now!.{" "}
              <a
                href="/career"
                className="inline-flex items-center gap-1 text-[rgb(var(--primary-500))] body-md-600 hover:underline"
              >
                Become Instructor
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
