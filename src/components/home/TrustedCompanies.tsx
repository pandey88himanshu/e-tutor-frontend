import Image from "next/image";

const TrustedCompanies = () => {
  return (
    <section className="w-full py-20 bg-[rgb(var(--gray-50))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <h2 className="heading-02 text-[rgb(var(--gray-900))] mb-4">
                6.3k trusted companies
              </h2>
              <p className="body-md-400 text-[rgb(var(--gray-600))]">
                Nullam egestas tellus at enim ornare tristique. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra.
              </p>
            </div>

            {/* Right Side - Company Logos */}
            <div className="w-full lg:w-2/3 flex justify-end">
              <div className="relative w-full h-30 lg:h-37.5">
                <Image
                  src="/home/trusted-companies.png"
                  alt="Trusted companies including Netflix, YouTube, Google, Lenovo, Slack, Verizon, Lexmark, Microsoft"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
