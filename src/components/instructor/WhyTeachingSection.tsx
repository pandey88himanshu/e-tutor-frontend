import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  {
    title: "Tech your students as you want.",
    description:
      "Morbi quis lorem non orci fermentum euismod. Nam sapien tellus, aliquam nec porttitor vel, pellentesque at metus.",
  },
  {
    title: "Manage your course, payment in one place",
    description:
      "Sed at metus urna. Sed tempus fermentum est, eu lobortis nibh consequat eu. Nullam vel libero pharetra, euismod turpis et, elementum enim.",
  },
  {
    title: "Chat with your students",
    description:
      "Nullam mattis lectus ac diam egestas posuere. Praesent auctor massa orci, ut fermentum eros dictum id.",
  },
];

export default function WhyTeachingSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none overflow-hidden rounded-xl">
                <Image
                  src="/instructor/desktop.png"
                  alt="Why you'll start teaching on Eduguard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="heading-03 sm:heading-02 text-[rgb(var(--gray-900))] mb-3 sm:mb-4">
                Why you'll start teaching on Eduguard
              </h2>

              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-600))] mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Praesent commodo curabitur nibh sed ullamcorper. Proin venenatis
                tellus non turpis scelerisque, vitae auctor orci ornare. Cras
                vitae nulla a purus mollis venenatis.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {features.map((item, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4 text-left">
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--success-500))]">
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>

                    <div>
                      <p className="body-md-600 sm:body-lg-600 text-[rgb(var(--gray-900))]">
                        {item.title}
                      </p>
                      <p className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-600))] mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
