import Image from "next/image";

export default function BranchesSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
            {/* Text Content */}
            <div className="w-full max-w-2xl flex flex-col gap-4 sm:gap-5 text-center">
              <h2 className="heading-04 sm:heading-03 text-[rgb(var(--gray-900))]">
                Our branches all over the world.
              </h2>

              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-600))]">
                Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna,
                imperdiet id leo quis, luctus auctor nisi.
              </p>
            </div>

            {/* Map Image */}
            <div className="relative w-full aspect-[1320/366] overflow-hidden">
              <Image
                src="/home/branches.png"
                alt="Our global branches"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
