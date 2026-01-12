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
    <section className="w-full bg-[rgb(var(--primary-100))]">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-10 md:px-20 lg:px-[300px] py-8">
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-x-6
            gap-y-6
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-[rgb(var(--primary-500))]" />
                </div>

                <div className="leading-tight">
                  <p className="body-xl-600 text-[rgb(var(--gray-900))]">
                    {item.value}
                  </p>
                  <p className="body-md-400 text-[rgb(var(--gray-600))]">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
