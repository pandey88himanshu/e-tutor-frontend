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
      {/* Container with exact padding from Figma: 300px horizontal, 80px vertical */}
      <div className="mx-auto max-w-[1920px] px-6 sm:px-12 lg:px-[300px] py-12 lg:py-20">
        {/* TITLE */}
        <h2 className="heading-03 text-center text-[rgb(var(--gray-900))] mb-12 lg:mb-16">
          Browse top category
        </h2>

        {/* GRID - 4 columns with 20px gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-4
                p-5
                ${item.bg}
                cursor-pointer
                transition-all duration-200
                hover:-translate-y-1 hover:shadow-md
              `}
              style={{ borderRadius: "0px" }}
            >
              {/* ICON */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white"
                style={{ borderRadius: "0px" }}
              >
                <span className="text-2xl">🎯</span>
              </div>

              {/* TEXT */}
              <div className="flex-1 min-w-0">
                <p className="body-lg-600 text-[rgb(var(--gray-900))] mb-0.5 truncate">
                  {item.title}
                </p>
                <p className="body-sm-400 text-[rgb(var(--gray-600))] truncate">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-10 lg:mt-12 text-center">
          <p className="body-sm-400 text-[rgb(var(--gray-600))] inline">
            We have more category & subcategory.{" "}
            <span className="body-sm-600 text-[rgb(var(--primary-500))] cursor-pointer hover:underline">
              Browse All →
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
export default BrowseTopCategory;
