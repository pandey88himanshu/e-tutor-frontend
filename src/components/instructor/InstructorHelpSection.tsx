import { Mail, ArrowRight } from "lucide-react";

export default function InstructorHelpSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--primary-100))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <img
                  src="/instructor/instructor-help.png"
                  alt="Instructor support"
                  className="w-full rounded-none object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 text-start lg:text-left">
              {/* Heading */}
              <h2 className="heading-03 sm:heading-02 mb-3 sm:mb-4 text-[rgb(var(--gray-900))]">
                Don&apos;t worry we&apos;re always
                <br />
                here to help you
              </h2>

              {/* Description */}
              <p className="body-md-400 sm:body-lg-400 mb-4 sm:mb-6 text-[rgb(var(--gray-600))]">
                Mauris aliquet ornare tortor, ut mollis arcu luctus quis.
                Phasellus nec augue malesuada, sagittis ligula vel, faucibus
                metus. Nam viverra metus eget nunc dignissim.
              </p>

              {/* Bullet points */}
              <ul className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                {[
                  "Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel.",
                  "Those who are looking to reboot their work life and try a new profession.",
                  "Nunc auctor consequat lorem, in posuere enim hendrerit sed.",
                  "Duis ornare enim ullamcorper congue.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <ArrowRight className="mt-1 h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-[rgb(var(--primary-500))]" />
                    <span className="body-xs-400 sm:body-sm-400 lg:body-md-400 text-[rgb(var(--gray-700))]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Email */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[rgb(var(--primary-200))]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[rgb(var(--primary-600))]" />
                </div>

                <div>
                  <p className="body-xs-500 uppercase text-[rgb(var(--gray-500))]">
                    Email us, anytime anywhere
                  </p>
                  <p className="body-sm-600 sm:body-md-600 text-[rgb(var(--gray-900))]">
                    help.eduguard@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
