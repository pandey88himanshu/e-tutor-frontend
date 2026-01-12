import { Mail, ArrowRight } from "lucide-react";

export default function InstructorHelpSection() {
  return (
    <section className="w-full bg-[rgb(var(--primary-100))]">
      {/* Container */}
      <div className="mx-auto max-w-[1920px] px-6 sm:px-10 md:px-20 lg:px-[300px] py-16 lg:py-20">
        <div
          className="
            flex
            flex-col
            items-center
            gap-16
            lg:flex-row
            lg:items-center
            lg:gap-[136px]
          "
        >
          {/* Image */}
          <div className="w-full max-w-[520px]">
            <img
              src="/instructor/instructor-help.png"
              alt="Instructor support"
              className="w-full rounded-none object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full max-w-[520px]">
            {/* Heading */}
            <h2 className="heading-03 mb-4 text-[rgb(var(--gray-900))]">
              Don&apos;t worry we&apos;re always
              <br />
              here to help you
            </h2>

            {/* Description */}
            <p className="body-md-400 mb-6 text-[rgb(var(--gray-600))]">
              Mauris aliquet ornare tortor, ut mollis arcu luctus quis.
              Phasellus nec augue malesuada, sagittis ligula vel, faucibus
              metus. Nam viverra metus eget nunc dignissim.
            </p>

            {/* Bullet points */}
            <ul className="mb-8 space-y-4">
              {[
                "Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel.",
                "Those who are looking to reboot their work life and try a new profession.",
                "Nunc auctor consequat lorem, in posuere enim hendrerit sed.",
                "Duis ornare enim ullamcorper congue.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[rgb(var(--primary-500))]" />
                  <span className="body-sm-400 text-[rgb(var(--gray-700))]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--primary-200))]">
                <Mail className="h-5 w-5 text-[rgb(var(--primary-600))]" />
              </div>

              <div>
                <p className="body-xs-500 uppercase text-[rgb(var(--gray-500))]">
                  Email us, anytime anywhere
                </p>
                <p className="body-md-600 text-[rgb(var(--gray-900))]">
                  help.eduguard@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
