"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const SOCIAL_LINKS = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      Icon: FaFacebookF,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      Icon: FaTwitter,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      Icon: FaLinkedinIn,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      Icon: FaYoutube,
    },
  ];

  return (
    <footer className="bg-[rgb(var(--gray-900))]">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/web/512px-favicon.png"
                alt="E-tutor"
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <span className="heading-05 sm:heading-04 text-[rgb(var(--white))]">
                E-tutor
              </span>
            </div>

            <p className="body-xs-400 sm:body-sm-400 mt-3 sm:mt-4 text-[rgb(var(--gray-400))] max-w-sm">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </p>

            {/* SOCIALS */}
            <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="
                    flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center
                    rounded
                    bg-[rgb(var(--gray-800))]
                    text-[rgb(var(--white))]
                    transition
                    hover:bg-[rgb(var(--primary-500))]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[rgb(var(--primary-500))]
                    focus:ring-offset-2
                    focus:ring-offset-[rgb(var(--gray-900))]
                  "
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* TOP CATEGORY */}
          <FooterColumn
            title="TOP 4 CATEGORY"
            links={[
              "Development",
              "Finance & Accounting",
              "Design",
              "Business",
            ]}
          />

          {/* QUICK LINKS */}
          <FooterColumn
            title="QUICK LINKS"
            links={["About", "Become Instructor", "Contact", "Career"]}
            href={["/about", "/become-instructor", "/contact", "/career"]}
          />

          {/* SUPPORT */}
          <FooterColumn
            title="SUPPORT"
            links={[
              "Help Center",
              "FAQs",
              "Terms & Condition",
              "Privacy Policy",
            ]}
            href={[
              "/help-center",
              "/faq",
              "/terms-condition",
              "/privacy-policy",
            ]}
          />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[rgb(var(--gray-800))]">
        <div className="mx-auto flex max-w-480 flex-col gap-3 sm:gap-4 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-4 sm:py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="body-xs-400 text-[rgb(var(--gray-500))] text-center sm:text-left">
            © All rights reserved. E-Tutor
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Sub Components ---------- */

function FooterColumn({
  title,
  links,
  href,
}: {
  title: string;
  links: string[];
  href?: string[];
}) {
  return (
    <div>
      <p className="label-md sm:label-lg mb-3 sm:mb-4 text-[rgb(var(--white))]">{title}</p>
      <ul className="space-y-2 sm:space-y-3">
        {links.map((item) => (
          <li key={item}>
            <Link
              href={href ? href[links.indexOf(item)] : "#"}
              className="body-xs-400 sm:body-sm-400 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--white))] transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
