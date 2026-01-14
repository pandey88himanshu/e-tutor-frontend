import Image from "next/image";

export default function BranchesSection() {
  return (
    <section className="w-full bg-[rgb(var(--white))]">
      <div
        className="
          hidden
          lg:flex
          flex-col
          items-center
          max-w-480
          mx-auto
          px-75
          py-20
          gap-10
        "
      >
        <div className="w-151 flex flex-col gap-5 text-center">
          <h2 className="heading-03 text-[rgb(var(--gray-900))]">
            Our branches all over the world.
          </h2>

          <p className="body-md-400 text-[rgb(var(--gray-600))]">
            Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna,
            imperdiet id leo quis, luctus auctor nisi.
          </p>
        </div>
        <div className="relative w-330 h-91.5">
          <Image
            src="/home/branches.png"
            alt="Our global branches"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="lg:hidden px-6 py-16 flex flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="heading-03 text-[rgb(var(--gray-900))]">
            Our branches all over the world.
          </h2>

          <p className="body-md-400 text-[rgb(var(--gray-600))]">
            Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna,
            imperdiet id leo quis, luctus auctor nisi.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative w-full aspect-1320/366">
          <Image
            src="/home/branches.png"
            alt="Our global branches"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
