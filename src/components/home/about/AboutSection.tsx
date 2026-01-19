import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/2 text-center lg:text-left">
              <span className="display-03 text-[rgb(var(--gray-300))]">
                2007–2021
              </span>

              <h2 className="heading-02 sm:heading-01 text-[rgb(var(--gray-900))]">
                We share knowledge with the world
              </h2>

              <p className="body-md-400 sm:body-lg-400 text-[rgb(var(--gray-600))] max-w-xl">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Praesent fermentum quam mauris. Fusce tempor et augue a aliquet.
                Donec non ipsum non risus egestas tincidunt at vitae nulla.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src="/home/about-hero.png"
                  alt="Our team"
                  fill
                  className="object-cover"
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
