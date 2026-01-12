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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-10 md:px-20 lg:px-[300px] py-16 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[86px] items-center">
          {/* Image */}
          <div className="relative w-full">
            <Image
              src="/instructor/desktop.png" // replace with your actual image
              alt="Why you’ll start teaching on Eduguard"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="heading-02 text-[rgb(var(--gray-900))] mb-4">
              Why you’ll start teaching on Eduguard
            </h2>

            <p className="body-md-400 text-[rgb(var(--gray-600))] mb-8 max-w-xl">
              Praesent commodo curabitur nibh sed ullamcorper. Proin venenatis
              tellus non turpis scelerisque, vitae auctor orci ornare. Cras
              vitae nulla a purus mollis venenatis.
            </p>

            <div className="space-y-6">
              {features.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--success-500))]">
                    <Check className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="body-lg-600 text-[rgb(var(--gray-900))]">
                      {item.title}
                    </p>
                    <p className="body-sm-400 text-[rgb(var(--gray-600))] mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
