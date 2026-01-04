"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* Main Content */}
      <main className='flex flex-1 items-center'>
        <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2'>
          {/* LEFT CONTENT */}
          <div className='max-w-md'>
            <p className='mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400'>
              Error 404
            </p>

            <h1 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl'>
              Oops! page not found
            </h1>

            <p className='mb-6 text-gray-600'>
              Something went wrong. It looks like the page you requested could
              not be found. The link might be broken or the page may have been
              removed.
            </p>

            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600'>
              Go Back
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className='flex justify-center md:justify-end'>
            <Image
              src='/errors/404.png'
              alt='404 illustration'
              width={520}
              height={420}
              className='w-full max-w-md md:max-w-lg'
              priority
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className=' py-4'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-gray-500 sm:flex-row'>
          <span>© 2026 E-Tutor. All rights reserved.</span>

          <div className='flex gap-4'>
            <Link href='#' className='hover:text-gray-700'>
              FAQs
            </Link>
            <Link href='#' className='hover:text-gray-700'>
              Privacy Policy
            </Link>
            <Link href='#' className='hover:text-gray-700'>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
