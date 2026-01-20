"use client";

import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

export default function TopNavbar() {
  return (
    <div className="bg-[rgb(var(--gray-900))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex h-10 items-center justify-between">
          {/* LEFT LINKS */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="body-xs-400 text-[rgb(var(--gray-300))] hover:text-[rgb(var(--white))] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT OPTIONS */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/become-instructor"
              className="body-xs-400 text-[rgb(var(--gray-300))] hover:text-[rgb(var(--white))] transition-colors"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
