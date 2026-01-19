import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="w-full bg-[rgb(var(--primary-100))] overflow-hidden">
      <div className="mx-auto max-w-480">
        <div className="flex flex-col lg:flex-row items-stretch lg:min-h-[436px]">
          {/* Left Side - Image (touches bottom, no padding) */}
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative w-full h-64 sm:h-80 lg:h-full lg:absolute lg:inset-0">
              <Image
                src="/home/two-partners.png"
                alt="Our mission"
                fill
                className="object-contain object-bottom lg:object-left-bottom"
                priority
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-3 sm:gap-4 lg:gap-6 text-center lg:text-left order-1 lg:order-2 px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 lg:py-16">
            <span className="body-sm-600 sm:body-md-600 uppercase tracking-wide text-[rgb(var(--primary-500))]">
              Our One Billion Mission
            </span>

            <h2 className="heading-04 sm:heading-03 lg:heading-02 text-[rgb(var(--gray-900))]">
              Our one billion mission sounds bold, We agree.
            </h2>

            <p className="body-sm-400 sm:body-md-400 lg:body-lg-400 text-[rgb(var(--gray-600))] max-w-xl">
              "We cannot solve our problems with the same thinking we used when
              we created them."—Albert Einstein. Institutions are slow to
              change. Committees are where good ideas and innovative thinking go
              to die. Choose agility over dogma. Embrace and drive change. We
              need to wipe the slate clean and begin with bold, radical
              thinking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
