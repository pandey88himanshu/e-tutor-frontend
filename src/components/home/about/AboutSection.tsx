import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-[rgb(var(--white))]">
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
          lg:py-24
        "
      >
        <div
          className="
            flex
            flex-col
            gap-12
            lg:flex-row
            lg:items-center
            lg:gap-28
          "
        >
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="display-03 text-[rgb(var(--gray-300))]">
              2007–2021
            </span>

            <h2 className="heading-02 text-[rgb(var(--gray-900))]">
              We share knowledge with the world
            </h2>

            <p className="body-lg-400 text-[rgb(var(--gray-600))]">
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Praesent fermentum quam mauris. Fusce tempor et augue a aliquet.
              Donec non ipsum non risus egestas tincidunt at vitae nulla.
            </p>
          </div>

          <div
            className="
              relative
              w-full
              max-w-xl
              aspect-4/3
              overflow-hidden
              rounded-lg
            "
          >
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
    </section>
  );
}
