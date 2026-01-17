// src/components/category/category.data.ts
export const categories = [
  {
    title: "Label",
    count: "63,476 Courses",
    bg: "bg-[rgb(var(--secondary-100))]",
  },
  {
    title: "Business",
    count: "52,822 Courses",
    bg: "bg-[rgb(var(--success-100))]",
  },
  {
    title: "Finance & Accounting",
    count: "33,841 Courses",
    bg: "bg-[rgb(var(--warning-100))]",
  },
  {
    title: "IT & Software",
    count: "22,649 Courses",
    bg: "bg-[rgb(var(--danger-100))]",
  },
  {
    title: "Personal Development",
    count: "20,126 Courses",
    bg: "bg-[rgb(var(--primary-100))]",
  },
  {
    title: "Office Productivity",
    count: "13,932 Courses",
    bg: "bg-[rgb(var(--gray-100))]",
  },
  {
    title: "Marketing",
    count: "12,086 Courses",
    bg: "bg-[rgb(var(--secondary-100))]",
  },
  {
    title: "Photography & Video",
    count: "6,196 Courses",
    bg: "bg-[rgb(var(--gray-100))]",
  },
  {
    title: "Lifestyle",
    count: "2,736 Courses",
    bg: "bg-[rgb(var(--warning-100))]",
  },
  {
    title: "Design",
    count: "2,600 Courses",
    bg: "bg-[rgb(var(--primary-100))]",
  },
  {
    title: "Health & Fitness",
    count: "1,678 Courses",
    bg: "bg-[rgb(var(--success-100))]",
  },
  {
    title: "Music",
    count: "959 Courses",
    bg: "bg-[rgb(var(--warning-100))]",
  },
];

const BrowseTopCategory = () => {
  return (
    <section className="w-full bg-white">
      {/* Container with responsive padding */}
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-10 sm:py-12 lg:py-16 xl:py-20">
        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[rgb(var(--gray-900))] mb-8 sm:mb-10 lg:mb-12">
          Browse top category
        </h2>

        {/* GRID - responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-3 sm:gap-4
                p-4 sm:p-5
                ${item.bg}
                cursor-pointer
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              `}
            >
              {/* ICON */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>

              {/* TEXT */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-[rgb(var(--gray-900))] mb-0.5 leading-tight">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-[rgb(var(--gray-600))]">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <p className="text-sm sm:text-base text-[rgb(var(--gray-600))] inline">
            We have more category & subcategory.{" "}
            <span className="font-semibold text-[rgb(var(--primary-500))] cursor-pointer hover:underline">
              Browse All →
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default BrowseTopCategory;
