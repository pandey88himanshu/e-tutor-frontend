"use client";

import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
}

const PageHeader = ({ title, breadcrumb = [] }: PageHeaderProps) => {
  return (
    <div className="w-full bg-[rgb(var(--gray-50))] border-b border-[rgb(var(--gray-200))]">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-480
          flex-col
          items-center
          justify-center
          gap-3
          sm:gap-4
          px-4
          sm:px-8
          md:px-12
          lg:px-75
          py-6
          sm:py-8
          md:py-10
        "
      >
        {/* Title */}
        <h1 className="heading-03 text-2xl sm:text-3xl md:text-4xl lg:text-[length:var(--heading-03-size)] text-[rgb(var(--gray-900))] text-center">
          {title}
        </h1>

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1 body-sm-400 text-xs sm:text-sm lg:text-[length:var(--body-sm-size)] text-[rgb(var(--gray-500))]">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-1">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[rgb(var(--primary-500))] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[rgb(var(--gray-700))]">
                    {item.label}
                  </span>
                )}

                {index < breadcrumb.length - 1 && (
                  <span className="text-[rgb(var(--gray-400))]">/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
