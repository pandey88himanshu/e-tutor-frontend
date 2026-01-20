import { FileText, UserCog, PlayCircle, Handshake } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "1. Apply to become instructor.",
    description:
      "Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consequat eu.",
    bg: "bg-[rgb(var(--secondary-100))]",
    iconColor: "text-[rgb(var(--secondary-500))]",
  },
  {
    icon: UserCog,
    step: "2. Setup & edit your profile.",
    description:
      "Duis non ipsum at leo efficitur pulvinar. Morbi semper nisi eget accumsan ullamcorper.",
    bg: "bg-[rgb(var(--danger-100))]",
    iconColor: "text-[rgb(var(--danger-500))]",
  },
  {
    icon: PlayCircle,
    step: "3. Create your new course",
    description:
      "Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque.",
    bg: "bg-[rgb(var(--warning-100))]",
    iconColor: "text-[rgb(var(--warning-500))]",
  },
  {
    icon: Handshake,
    step: "4. Start teaching & earning",
    description:
      "Praesent congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis scelerisque.",
    bg: "bg-[rgb(var(--success-100))]",
    iconColor: "text-[rgb(var(--success-500))]",
  },
];

export default function InstructorSteps() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--gray-50))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* Heading */}
          <div className="mb-8 sm:mb-10 lg:mb-14 text-center">
            <h2 className="heading-04 sm:heading-03 text-[rgb(var(--gray-900))]">
              How you&apos;ll become
              <br />
              successful instructor
            </h2>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 text-center rounded-lg"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-lg ${item.bg}`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.iconColor}`} />
                  </div>

                  {/* Step title */}
                  <p className="body-md-600 sm:body-lg-600 text-[rgb(var(--gray-900))]">
                    {item.step}
                  </p>

                  {/* Description */}
                  <p className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-600))] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
