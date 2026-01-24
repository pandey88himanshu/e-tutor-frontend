import { Search, Bell } from "lucide-react";

export const AdminHeader = () => {
  return (
    <header className="h-20 bg-[rgb(var(--white))] border-b border-[rgb(var(--gray-100))] flex items-center justify-between px-8">
      <div>
        <p className="body-sm-400 text-[rgb(var(--gray-500))]">Good Morning</p>
        <h1 className="heading-04 text-[rgb(var(--gray-900))]">
          Instructor Management
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-[rgb(var(--gray-50))] text-[rgb(var(--gray-700))] border-none rounded-md pl-10 pr-4 py-2.5 w-64 body-sm-400 focus:ring-1 focus:ring-[rgb(var(--primary-500))] outline-none placeholder-[rgb(var(--gray-400))]"
          />
        </div>

        <button className="relative p-2 text-[rgb(var(--gray-500))] hover:bg-[rgb(var(--gray-50))] rounded-full">
          <Bell size={24} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-[rgb(var(--primary-500))] rounded-full"></span>
        </button>

        <div className="w-10 h-10 rounded-full bg-[rgb(var(--gray-200))] overflow-hidden flex items-center justify-center">
          {/* Placeholder Avatar */}
          <span className="heading-04 text-[14px] text-[rgb(var(--gray-600))]">
            AD
          </span>
        </div>
      </div>
    </header>
  );
};
