import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export default function GallerySection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--gray-50))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-2/5 flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
              <span className="body-sm-600 sm:body-md-600 uppercase tracking-wide text-[rgb(var(--primary-500))]">
                Our Gallery
              </span>

              <h2 className="heading-03 sm:heading-03 lg:heading-02 text-[rgb(var(--gray-900))] leading-tight">
                We've been here almost 17 years
              </h2>

              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-600))]">
                Fusce lobortis leo augue, sit amet tristique nisi commodo in.
                Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
                libero. Curabitur in urna ligula.
              </p>

              <div className="flex justify-center lg:justify-start pt-2">
                <DarkBgBtn href="/career">Join Our Team</DarkBgBtn>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-3/5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl aspect-video overflow-hidden rounded-lg">
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
        </div>
      </div>
    </section>
  );
}
