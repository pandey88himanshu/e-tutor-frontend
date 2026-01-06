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
    <div className='rounded-2xl bg-white border border-gray-200 p-8 space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <h2 className='text-3xl font-bold text-gray-900'>
          Our feature courses
        </h2>

        <p className='max-w-md text-sm text-gray-600 md:text-right'>
          Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
          varius purus ut eleifend porta.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {courses.map((course, i) => (
          <FeaturedCourseCard key={i} {...course} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
