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
    <section className="w-full bg-[rgb(var(--gray-50))]">
      <div className="mx-auto max-w-480 px-6 sm:px-10 md:px-20 lg:px-75 py-16 lg:py-20">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="heading-03 text-[rgb(var(--gray-900))]">
            How you&apos;ll become
            <br />
            successful instructor
          </h2>
        </div>

        {/* Steps Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4 
            justify-items-center
          "
        >
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  w-full
                  max-w-[312px]
                  flex-col
                  items-center
                  gap-6
                  bg-white
                  p-6
                  text-center
                "
              >
                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>

                {/* Step title */}
                <p className="body-lg-600 text-[rgb(var(--gray-900))]">
                  {item.step}
                </p>

                {/* Description */}
                <p className="body-sm-400 text-[rgb(var(--gray-600))] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
