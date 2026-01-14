"use client";

import FormField from "@/utils/FormField";
import Input from "@/utils/Input";
import DarkBgBtn from "@/components/common/DarkBgBtn";

export default function ContactSection() {
  return (
    <section className="w-full bg-[rgb(var(--gray-50))]">
      <div className="hidden lg:block max-w-480 mx-auto px-75 py-20">
        <h2 className="heading-02 text-center text-[rgb(var(--gray-900))] mb-16">
          Contact Us
        </h2>

        <div className="flex gap-34">
          <div className="w-134 flex flex-col gap-10">
            <p className="body-md-400 text-[rgb(var(--gray-700))]">
              Will you be in Los Angeles or any other branches any time soon?
              Stop by the office! We'd love to meet.
            </p>

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

          <div className="w-160 bg-[rgb(var(--white))] p-10">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="heading-04 text-[rgb(var(--gray-900))]">
                  Get In touch
                </h3>
                <p className="body-sm-400 text-[rgb(var(--gray-600))] mt-1">
                  Feel free contact with us, we love to make new partners &
                  friends
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  "
                />
              </FormField>

              <div className="w-fit pt-4">
                <DarkBgBtn children="Send Message" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden px-6 py-16 flex flex-col gap-12">
        <h2 className="heading-02 text-center text-[rgb(var(--gray-900))]">
          Contact Us
        </h2>

        <div className="flex flex-col gap-8">
          <p className="body-md-400 text-[rgb(var(--gray-700))]">
            Will you be in Los Angeles or any other branches any time soon? Stop
            by the office! We'd love to meet.
          </p>

          <div>
            <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
              Address
            </span>
            <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-1">
              1702 Olympic Boulevard, Santa Monica, CA 90404
            </p>
          </div>

          <div>
            <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
              Phone Number
            </span>
            <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-1">
              (480) 555-0103
            </p>
          </div>

          <div>
            <span className="label-sm uppercase text-[rgb(var(--primary-500))]">
              Email Address
            </span>
            <p className="body-sm-400 text-[rgb(var(--gray-700))] mt-1">
              help.eduguard@gmail.com
            </p>
          </div>
        </div>

        <div className="bg-[rgb(var(--white))] p-6">
          <div className="flex flex-col gap-4">
            <Input placeholder="First name..." />
            <Input placeholder="Last name..." />
            <Input placeholder="Email Address" />
            <Input placeholder="Message Subject" />

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full border border-[rgb(var(--gray-100))] px-3 py-2 resize-none"
            />

            <DarkBgBtn children="Send Message" />
          </div>
        </div>
      </div>
    </section>
  );
}
