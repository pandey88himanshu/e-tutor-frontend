import Image from "next/image";

export default function InstructorRulesSection() {
  return (
    <section className="w-full bg-[rgb(var(--gray-white))]">
      {/* Container */}
      <div
        className="
          mx-auto
          max-w-[1920px]
          px-6
          py-16
          sm:px-10
          md:px-20
          lg:px-[300px]
          lg:py-20
        "
      >
        {/* Content wrapper */}
        <div
          className="
            flex
            flex-col
            items-center
            gap-12
            lg:flex-row
            lg:items-center
            lg:gap-40
          "
        >
          {/* Left Content */}
          <div className="w-full max-w-xl">
            <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
              Instructor rules & regulations
            </h2>

            <p className="body-md-400 mb-6 text-[rgb(var(--gray-600))]">
              Sed auctor, nisi non elementum ornare, turpis orci consequat arcu,
              ut iaculis quam leo nec libero. Aenean mollis turpis velit, id
              laoreet sem luctus in. Etiam et egestas lorem.
            </p>

            <ul className="space-y-3">
              <li className="body-sm-400 text-[rgb(var(--gray-600))]">
                • Sed ullamcorper libero quis condimentum pellentesque.
              </li>
              <li className="body-sm-400 text-[rgb(var(--gray-600))]">
                • Nam leo tortor, tempus et felis non.
              </li>
              <li className="body-sm-400 text-[rgb(var(--gray-600))]">
                • Porttitor faucibus erat. Integer eget purus non massa
                ultricies pretium ac sed eros.
              </li>
              <li className="body-sm-400 text-[rgb(var(--gray-600))]">
                • Vestibulum ultrices commodo tellus. Etiam eu lectus sit amet
                turpis.
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image
              src="/instructor/instructor-rules.png"
              alt="Instructor rules"
              width={520}
              height={640}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
