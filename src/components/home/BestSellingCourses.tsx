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
    <div>
      <h2 className='mb-10 text-center text-2xl font-semibold text-gray-900'>
        Best selling courses
      </h2>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingCourses;
