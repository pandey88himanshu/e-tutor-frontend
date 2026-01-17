import CourseCard from "./CourseCard";

const BestSellingCourses = () => {
  const courses = Array.from({ length: 10 }).map((_, i) => ({
    title:
      i % 3 === 0
        ? "Machine Learning A-Z™: Hands-On Python & R In Data Science"
        : i % 3 === 1
          ? "The Complete Digital Marketing Course - 12 Courses in 1"
          : "Google Analytics Certification - Learn How To Pass The Exam",
    category: "Design",
    price: 57,
    rating: 5.0,
    students: "265.7K",
    image: "/home/course.png",
  }));

  return (
    <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 text-center mb-6 sm:mb-8 lg:mb-10">
        Best selling courses
      </h2>

      <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingCourses;
