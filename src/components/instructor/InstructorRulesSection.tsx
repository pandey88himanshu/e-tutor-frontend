import Image from "next/image";

export default function InstructorRulesSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-start lg:text-left">
              <h2 className="heading-03 sm:heading-02 mb-3 sm:mb-4 text-[rgb(var(--gray-900))]">
                Instructor rules & regulations
              </h2>

              <p className="body-md-400 sm:body-lg-400 mb-4 sm:mb-6 text-[rgb(var(--gray-600))] ">
                Sed auctor, nisi non elementum ornare, turpis orci consequat arcu,
                ut iaculis quam leo nec libero. Aenean mollis turpis velit, id
                laoreet sem luctus in. Etiam et egestas lorem.
              </p>

              <ul className="space-y-2 sm:space-y-3 text-left">
                <li className="body-xs-400 sm:body-lg-400 text-[rgb(var(--gray-600))]">
                  • Sed ullamcorper libero quis condimentum pellentesque.
                </li>
                <li className="body-xs-400 sm:body-lg-400 text-[rgb(var(--gray-600))]">
                  • Nam leo tortor, tempus et felis non.
                </li>
                <li className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-600))]">
                  • Porttitor faucibus erat. Integer eget purus non massa
                  ultricies pretium ac sed eros.
                </li>
                <li className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-600))]">
                  • Vestibulum ultrices commodo tellus. Etiam eu lectus sit amet
                  turpis.
                </li>
              </ul>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
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
        </div>
      </div>
    </section>
  );
}
