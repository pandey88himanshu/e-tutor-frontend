import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export default function GallerySection() {
  return (
    <>
      <section className="hidden lg:block w-full bg-[rgb(var(--gray-50))]">
        <div
          className="
            w-full
            max-w-480
            mx-auto
            px-75
            py-20
          "
        >
          <div className="flex items-center gap-28">
            <div className="w-106 flex flex-col gap-6">
              <span className="label-lg uppercase tracking-wide text-[rgb(var(--primary-500))]">
                Our Gallery
              </span>

              <h2 className="heading-03 text-[rgb(var(--gray-900))] leading-tight">
                We’ve been here
                <br />
                almost 17
                <br />
                years
              </h2>

              <p className="body-md-400 text-[rgb(var(--gray-600))]">
                Fusce lobortis leo augue, sit amet tristique nisi commodo in.
                Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
                libero. Curabitur in urna ligula.
              </p>

              <button
                className="
                  mt-2
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  h-12
                  bg-[rgb(var(--primary-500))]
                  text-[rgb(var(--white))]
                  body-md-600
                  rounded
                "
              >
                Join Our Team →
              </button>
            </div>
            <div className="relative w-215 h-130 shrink-0">
              <Image
                src="/home/gallery.png"
                alt="Company gallery"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="lg:hidden w-full bg-[rgb(var(--gray-50))] px-6 py-16">
        <div className="flex flex-col gap-12">
          {/* TEXT */}
          <div className="flex flex-col gap-6 w-full">
            <span className="label-lg uppercase tracking-wide text-[rgb(var(--primary-500))]">
              Our Gallery
            </span>

            <h2 className="heading-03 text-[rgb(var(--gray-900))]">
              We’ve been here almost 17 years
            </h2>

            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Fusce lobortis leo augue, sit amet tristique nisi commodo in.
              Aliquam ac libero quis tellus venenatis imperdiet.
            </p>

            <DarkBgBtn children="Join Our Team" />
          </div>

          {/* IMAGE */}
          <div className="relative aspect-860/520">
            <Image
              src="/home/gallery.png"
              alt="Company gallery"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
