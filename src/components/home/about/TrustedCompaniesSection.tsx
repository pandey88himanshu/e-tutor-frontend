import Image from "next/image";
import { Users, BookOpen, Globe, CheckCircle, ShieldCheck } from "lucide-react";

export default function TrustedCompaniesSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[rgb(var(--white))] border-t border-[rgb(var(--gray-100))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-16">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3 sm:gap-4 text-center lg:text-left">
              <h2 className="heading-04 sm:heading-03 text-[rgb(var(--gray-900))]">
                We Just keep growing with 6.3k Companies
              </h2>

              <p className="body-sm-400 sm:body-md-400 text-[rgb(var(--gray-600))]">
                Nullam egestas tellus ut enim ornare tristique. Class aptent
                taciti sociosqu ad litora torquent.
              </p>
            </div>

            {/* LOGOS IMAGE */}
            <div className="w-full lg:w-2/3 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg lg:max-w-xl h-20 sm:h-24 lg:h-28">
                <Image
                  src="/home/trusted-companies.png"
                  alt="Trusted companies"
                  fill
                  className="object-contain object-center lg:object-right"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* STUDENTS */}
            <StatItem
              icon={Users}
              value="67.1k"
              label="Students"
              color="--primary-500"
            />

            {/* INSTRUCTORS */}
            <StatItem
              icon={BookOpen}
              value="26k"
              label="Certified Instructor"
              color="--secondary-500"
            />

            {/* LANGUAGES */}
            <StatItem
              icon={Globe}
              value="72"
              label="Country Language"
              color="--warning-500"
            />

            {/* SUCCESS RATE */}
            <StatItem
              icon={CheckCircle}
              value="99.9%"
              label="Success Rate"
              color="--success-500"
            />

            {/* COMPANIES */}
            <StatItem
              icon={ShieldCheck}
              value="57"
              label="Trusted Companies"
              color="--danger-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StatItemProps = {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
};

function StatItem({ icon: Icon, value, label, color }: StatItemProps) {
  return (
    <div className="flex items-center gap-4 min-w-40">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor: `rgb(var(${color}) / 0.15)`,
          color: `rgb(var(${color}))`,
        }}
      >
        <Icon size={20} />
      </div>

      <div className="flex flex-col">
        <span className="body-lg-600 text-[rgb(var(--gray-900))]">{value}</span>
        <span className="body-sm-400 text-[rgb(var(--gray-500))]">{label}</span>
      </div>
    </div>
  );
}
