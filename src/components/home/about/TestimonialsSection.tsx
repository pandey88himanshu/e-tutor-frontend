const testimonials = [
  {
    text: "Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.",
    name: "Sundar Pichai",
    role: "Chief Chairman of",
    company: "Google",
  },
  {
    text: "Eduguard responds to the needs of the business in an agile and global manner. It's truly the best solution for our employees and their careers.",
    name: "Satya Nadella",
    role: "CEO of",
    company: "Microsoft",
  },
  {
    text: "In total, it was a big success. I would get emails about what a fantastic resource it was.",
    name: "Ted Sarandos",
    role: "Chief Executive Officer of",
    company: "Netflix",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  text: string;
  name: string;
  role: string;
  company: string;
};

function TestimonialCard({ text, name, role, company }: TestimonialCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* BUBBLE */}
      <div className="relative w-full bg-[rgb(var(--gray-50))] px-6 sm:px-8 py-8 sm:py-10 text-center rounded-lg">
        {/* Opening quote */}
        <span className="absolute top-4 sm:top-6 left-4 sm:left-6 text-3xl sm:text-4xl text-[rgb(var(--primary-500))]">
          "
        </span>

        {/* Text */}
        <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-700))] px-4 sm:px-6">
          {text}
        </p>

        {/* Closing quote */}
        <span className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-3xl sm:text-4xl text-[rgb(var(--primary-500))]">
          "
        </span>

        {/* Speech bubble arrow */}
        <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[rgb(var(--gray-50))] rotate-45" />
      </div>

      {/* AUTHOR */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="body-sm-600 sm:body-md-600 text-[rgb(var(--gray-900))]">
          {name}
        </p>
        <p className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-500))]">
          {role}{" "}
          <span className="text-[rgb(var(--secondary-500))]">{company}</span>
        </p>
      </div>
    </div>
  );
}
