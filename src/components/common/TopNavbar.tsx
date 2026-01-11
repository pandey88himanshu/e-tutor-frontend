"use client";

import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Become an Instructor", href: "/become-instructor" },
] as const;

export default function TopNavbar() {
  return (
    <div className='bg-[rgb(var(--gray-900))]'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex h-10 items-center justify-between'>
          {/* LEFT LINKS */}
          <div className='hidden md:flex items-center gap-6'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='body-xs-400 text-[rgb(var(--gray-300))] hover:text-[rgb(var(--white))]'>
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT OPTIONS */}
          <div className='flex items-center gap-4'>
            <button className='body-xs-400 text-[rgb(var(--gray-300))] hover:text-[rgb(var(--white))]'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
