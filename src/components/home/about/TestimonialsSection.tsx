const testimonials = [
  {
    text: "Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.",
    name: "Sundar Pichai",
    role: "Chief Chairman of",
    company: "Google",
  },
  {
    text: "Eduguard responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.",
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
    <>
      {/* DESKTOP */}
      <section className="hidden lg:block w-full bg-[rgb(var(--white))]">
        <div className="max-w-[1920px] mx-auto px-[300px] py-[80px]">
          <div className="flex gap-[24px]">
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="lg:hidden w-full bg-[rgb(var(--white))] px-6 py-16">
        <div className="flex flex-col gap-10">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </section>
    </>
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
      <div
        className="
          relative
          w-full
          max-w-[424px]
          min-h-[260px]
          bg-[rgb(var(--gray-50))]
          px-8
          py-10
          text-center
        "
      >
        {/* Opening quote */}
        <span className="absolute top-6 left-6 text-4xl text-[rgb(var(--primary-500))]">
          “
        </span>

        {/* Text */}
        <p className="body-md-400 text-[rgb(var(--gray-700))]">{text}</p>

        {/* Closing quote */}
        <span className="absolute bottom-6 right-6 text-4xl text-[rgb(var(--primary-500))]">
          ”
        </span>

        {/* Speech bubble arrow */}
        <div
          className="
            absolute
            -bottom-3
            left-1/2
            -translate-x-1/2
            w-4
            h-4
            bg-[rgb(var(--gray-50))]
            rotate-45
          "
        />
      </div>

      {/* AUTHOR */}
      <div className="mt-6 text-center">
        <p className="body-md-600 text-[rgb(var(--gray-900))]">{name}</p>
        <p className="body-sm-400 text-[rgb(var(--gray-500))]">
          {role}{" "}
          <span className="text-[rgb(var(--secondary-500))]">{company}</span>
        </p>
      </div>
    </div>
  );
}
