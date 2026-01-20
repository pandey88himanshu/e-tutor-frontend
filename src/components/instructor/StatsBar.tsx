import { Users, GraduationCap, Globe, ShieldCheck, Layers } from "lucide-react";

const stats = [
  { icon: Users, value: "67.1k", label: "Students" },
  { icon: GraduationCap, value: "26k", label: "Certified Instructor" },
  { icon: Globe, value: "72", label: "Country Language" },
  { icon: ShieldCheck, value: "99.9%", label: "Success Rate" },
  { icon: Layers, value: "57", label: "Trusted Companies" },
];

export default function StatsBar() {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-12 bg-[rgb(var(--primary-100))]">
      <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto max-w-480 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[rgb(var(--primary-500))]" />
                  </div>

                  <div className="leading-tight">
                    <p className="body-lg-600 sm:body-xl-600 text-[rgb(var(--gray-900))]">
                      {item.value}
                    </p>
                    <p className="body-xs-400 sm:body-sm-400 lg:body-md-400 text-[rgb(var(--gray-600))]">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
