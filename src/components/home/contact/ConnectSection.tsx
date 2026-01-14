import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";

export default function ConnectSection() {
  return (
    <>
      <section className="hidden lg:block w-full bg-[rgb(var(--white))] overflow-hidden">
        <div
          className="
            w-full
            max-w-480
            mx-auto
            px-75
            pt-8
          "
        >
          <div className="flex gap-34 h-143 items-center justify-center">
            <div className="w-106 flex flex-col gap-6 pt-24">
              <h2 className="heading-01 text-[rgb(var(--gray-900))]">
                Connect with us
              </h2>

              <p className="body-md-400 text-[rgb(var(--gray-600))]">
                Want to chat? We’d love to hear from you! Get in touch with our
                Customer Success Team to inquire about speaking events,
                advertising rates, or just say hello.
              </p>

              {/* Button should NOT stretch */}
              <div className="w-fit">
                <DarkBgBtn children="Copy Email" />
              </div>
            </div>
            <div className="relative w-190 h-135 ml-auto self-end">
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
      </section>
      <section className="lg:hidden w-full bg-[rgb(var(--white))]">
        <div className="px-6 pt-16 pb-12">
          <div className="flex flex-col gap-6">
            <h2 className="heading-02 text-[rgb(var(--gray-900))]">
              Connect with us
            </h2>

            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Want to chat? We’d love to hear from you! Get in touch with our
              Customer Success Team to inquire about speaking events,
              advertising rates, or just say hello.
            </p>

            <div className="w-fit">
              <DarkBgBtn children="Copy Email" />
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-760/540">
          <Image
            src="/home/contact-hero.png"
            alt="Customer support"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </>
  );
}
