"use client";

import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import DarkBgBtn from "@/components/common/DarkBgBtn";

export default function ContactSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--gray-50))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* Section Title */}
          <h2 className="heading-03 sm:heading-02 text-center text-[rgb(var(--gray-900))] mb-8 sm:mb-12 lg:mb-16">
            Contact Us
          </h2>

          <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* Left Side - Contact Info */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6 sm:gap-8 lg:gap-10">
              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-700))]">
                Will you be in Los Angeles or any other branches any time soon?
                Stop by the office! We'd love to meet.
              </p>

              {/* Address */}
              <div>
                <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
                  Address
                </span>
                <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-2">
                  1702 Olympic Boulevard
                  <br />
                  Santa Monica, CA 90404
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
                  Phone Number
                </span>
                <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-2">
                  (480) 555-0103
                  <br />
                  (219) 555-0114
                </p>
              </div>

              {/* Email Address */}
              <div>
                <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
                  Email Address
                </span>
                <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-2">
                  help.eduguard@gmail.com
                  <br />
                  career.eduguard@gmail.com
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="w-full lg:w-1/2 bg-[rgb(var(--white))] p-6 sm:p-8 lg:p-10 rounded-lg">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div>
                  <h3 className="heading-05 sm:heading-04 text-[rgb(var(--gray-900))]">
                    Get In touch
                  </h3>
                  <p className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-600))] mt-1">
                    Feel free contact with us, we love to make new partners &
                    friends
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First Name">
                    <Input placeholder="First name..." />
                  </FormField>

                  <FormField label="Last Name">
                    <Input placeholder="Last name..." />
                  </FormField>
                </div>

                <FormField label="Email">
                  <Input placeholder="Email Address" />
                </FormField>

                <FormField label="Subject">
                  <Input placeholder="Message Subject" />
                </FormField>

                <FormField label="Message">
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className="
                      w-full
                      border
                      border-[rgb(var(--gray-100))]
                      px-3
                      py-2
                      body-sm-400
                      resize-none
                      rounded
                      focus:outline-none
                      focus:border-[rgb(var(--primary-500))]
                      transition-colors
                    "
                  />
                </FormField>

                <div className="pt-2 sm:pt-4">
                  <DarkBgBtn>Send Message</DarkBgBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
