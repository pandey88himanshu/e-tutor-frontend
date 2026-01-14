import Image from "next/image";
import { Users, BookOpen, Globe, CheckCircle, ShieldCheck } from "lucide-react";

export default function TrustedCompaniesSection() {
  return (
    <section className="w-full bg-[rgb(var(--white))] border-t border-[rgb(var(--gray-100))]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-20 lg:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT CONTENT */}
          <div className="max-w-md flex flex-col gap-4">
            <h2 className="heading-03 text-[rgb(var(--gray-900))]">
              We Just keep growing with 6.3k Companies
            </h2>

            <p className="body-md-400 text-[rgb(var(--gray-600))]">
              Nullam egestas tellus ut enim ornare tristique. Class aptent
              taciti sociosqu ad litora torquent.
            </p>
          </div>

          {/* LOGOS IMAGE */}
          <div className="flex justify-center lg:justify-end w-full">
            <div
              className="
                relative
                w-full
                max-w-218
                aspect-872/224
              "
            >
              <Image
                src="/home/trusted-companies.png"
                alt="Trusted companies"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-y-10 gap-x-6">
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
