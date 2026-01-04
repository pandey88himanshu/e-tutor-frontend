"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isSignUpPage = pathname === "/sign-up";
  const isSignInPage = pathname === "/sign-in";
  return (
    <>
      <nav className='w-full border-b border-[rgb(var(--gray-200))] bg-[rgb(var(--white))] relative z-50'>
        <div className='mx-auto flex h-22 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <Image
              src='/common/LOGO.png'
              alt='E-tutor Logo'
              width={100}
              height={100}
              className='object-contain'
            />
          </div>

          {/* Desktop CTA */}
          {isSignUpPage && (
            <div className='hidden md:flex items-center gap-3'>
              <p className='body-sm-400 text-[rgb(var(--gray-600))]'>
                Have an account?
              </p>
              <Link
                href='/sign-in'
                className='flex h-12 min-w-42 items-center justify-center rounded-md bg-[rgb(var(--primary-100))] px-6 body-md-500 text-[rgb(var(--primary-500))] transition-colors hover:bg-[rgb(var(--primary-200))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))] focus:ring-offset-2'>
                Login Account
              </Link>
            </div>
          )}

          {isSignInPage && (
            <div className='hidden md:flex items-center gap-3'>
              <p className='body-sm-400 text-[rgb(var(--gray-600))]'>
                Don’t have an account?
              </p>
              <Link
                href='/sign-up'
                className='flex h-12 min-w-42 items-center justify-center rounded-md bg-[rgb(var(--primary-100))] px-6 body-md-500 text-[rgb(var(--primary-500))] transition-colors hover:bg-[rgb(var(--primary-200))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))] focus:ring-offset-2'>
                Create Account
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className='md:hidden flex items-center justify-center rounded-md p-2 text-[rgb(var(--gray-700))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
            onClick={() => setOpen(!open)}
            aria-label='Toggle menu'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'>
              {open ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/50'
          onClick={() => setOpen(false)}
        />

        {/* Menu Panel */}
        <div className='absolute right-0 top-0 h-full w-80 max-w-full bg-[rgb(var(--white))] shadow-xl'>
          {/* Header with Close Button */}
          <div className='flex items-center justify-between border-b border-[rgb(var(--gray-200))] p-4'>
            <h2 className='text-lg font-semibold'>Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className='rounded-md p-2 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-100))]'
              aria-label='Close menu'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          {isSignUpPage && (
            <div className='p-6'>
              <p className='mb-4 body-sm-400 text-[rgb(var(--gray-600))]'>
                Have an account?
              </p>
              <Link
                href='/sign-in'
                className='flex h-12 w-full items-center justify-center rounded-md bg-[rgb(var(--primary-100))] px-6 body-md-500 text-[rgb(var(--primary-500))] transition-colors hover:bg-[rgb(var(--primary-200))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))] focus:ring-offset-2'>
                Login Account
              </Link>
            </div>
          )}

          {isSignInPage && (
            <div className='p-6'>
              <p className='mb-4 body-sm-400 text-[rgb(var(--gray-600))]'>
                Don’t have an account?
              </p>
              <Link
                href='/sign-up'
                className='flex h-12 w-full items-center justify-center rounded-md bg-[rgb(var(--primary-100))] px-6 body-md-500 text-[rgb(var(--primary-500))] transition-colors hover:bg-[rgb(var(--primary-200))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))] focus:ring-offset-2'>
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
