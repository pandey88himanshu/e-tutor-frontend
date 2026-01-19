import Image from "next/image";

const steps = [
  { number: 1, text: "Apply to become instructor", highlight: false },
  { number: 2, text: "Build & edit your profile", highlight: true },
  { number: 3, text: "Create your new course", highlight: false },
  { number: 4, text: "Start teaching & earning", highlight: true },
];

const BecomeInstructor = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col 2xl:flex-row gap-8 sm:gap-10 2xl:gap-16 items-center justify-between">
            {/* Left Side - Orange Card */}
            <div className="relative w-full 2xl:w-130 rounded-2xl overflow-hidden min-h-[280px] sm:min-h-70 shrink-0 bg-[rgb(var(--primary-500))]">
              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 2xl:p-10 flex flex-col justify-center h-full max-w-lg lg:max-w-xl 2xl:max-w-none">
                <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[rgb(var(--white))] mb-3 sm:mb-4 leading-tight">
                  Become an instructor
                </h2>
                <p className="text-sm sm:text-base text-[rgb(var(--white))] opacity-90 mb-5 sm:mb-6 leading-relaxed">
                  Instructors from around the world teach millions of students on
                  Udemy. We provide the tools and skills to teach what you love.
                </p>
                <button className="inline-flex items-center gap-2 w-fit px-5 sm:px-6 py-2.5 sm:py-3 border border-[rgb(var(--white))] bg-transparent text-[rgb(var(--white))] rounded text-sm sm:text-base font-semibold hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                  Start Teaching
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Image positioned to the bottom-right */}
              {/* <div className="absolute right-0 bottom-0 w-55 h-65 lg:w-65 lg:h-70">
              <Image
                src="/home/career-hero.png"
                alt="Become an instructor"
                fill
                className="object-contain object-bottom"
              />
            </div> */}
            </div>

            {/* Right Side - Teaching Steps */}
            <div className="flex-1 w-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--gray-900))] mb-6 sm:mb-8 text-center 2xl:text-left">
                Your teaching & earning steps
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${step.highlight
                        ? "bg-[rgb(var(--primary-500))] text-[rgb(var(--white))]"
                        : "border border-[rgb(var(--gray-300))] bg-[rgb(var(--white))] text-[rgb(var(--gray-600))]"
                        }`}
                    >
                      {step.number}
                    </div>
                    <span className="text-sm sm:text-base text-[rgb(var(--gray-700))]">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
