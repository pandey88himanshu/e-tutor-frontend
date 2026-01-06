"use client";

import DarkBgBtn from "@/components/common/DarkBgBtn";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--white))]">
      {/* Main Content */}
      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="max-w-md">
            <p className="label-lg mb-2 uppercase tracking-wide text-[rgb(var(--gray-400))]">
              Error 404
            </p>

            <h1 className="heading-02 mb-4 text-[rgb(var(--gray-900))]">
              Oops! page not found
            </h1>

            <p className="body-md-400 mb-6 text-[rgb(var(--gray-600))]">
              Something went wrong. It looks like the page you requested could
              not be found. The link might be broken or the page may have been
              removed.
            </p>

            <DarkBgBtn href="/" children="Go to Homepage" />
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/errors/404.png"
              alt="404 illustration"
              width={520}
              height={420}
              className="w-full max-w-md md:max-w-lg"
              priority
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <span className="body-sm-400 text-[rgb(var(--gray-500))]">
            © 2026 E-Tutor. All rights reserved.
          </span>

          <div className="flex gap-4">
            <Link
              href="#"
              className="body-sm-400 text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-700))]"
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="body-sm-400 text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-700))]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="body-sm-400 text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-700))]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
