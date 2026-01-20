import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export default function ConnectSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))] overflow-hidden">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6 text-center lg:text-left">
              <h2 className="heading-02 sm:heading-01 text-[rgb(var(--gray-900))]">
                Connect with us
              </h2>

              <p className="body-md-400 sm:body-lg-400 text-[rgb(var(--gray-600))] max-w-xl">
                Want to chat? We'd love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>

              {/* Button should NOT stretch */}
              <div className="flex justify-center lg:justify-start pt-2">
                <DarkBgBtn>Copy Email</DarkBgBtn>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src="/home/contact-hero.png"
                  alt="Customer support"
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
