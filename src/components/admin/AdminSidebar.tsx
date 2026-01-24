import { useLogoutMutation } from "@/store/api/authApi";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/store/slices/authSlice";

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-4 transition-all border-l-2 body-md-500 ${active
      ? "bg-[rgb(var(--primary-500))] text-[rgb(var(--white))] border-[rgb(var(--primary-500))]"
      : "text-[rgb(var(--gray-400))] border-transparent hover:text-[rgb(var(--white))] hover:bg-[rgb(var(--gray-800))]"
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const AdminSidebar = ({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (p: string) => void;
}) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Call backend logout API (clears refresh token cookie)
      await logout().unwrap();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Always clear local state (this also clears the accessToken cookie)
      dispatch(clearCredentials());
      window.location.href = "/sign-in";
    }
  };

  return (
    <aside className="w-64 bg-[rgb(var(--gray-900))] text-[rgb(var(--white))] flex flex-col h-screen fixed left-0 top-0 z-10 border-r border-[rgb(var(--gray-800))]">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-[rgb(var(--gray-800))]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[rgb(var(--primary-500))] rounded-md flex items-center justify-center heading-04 text-white">
            E
          </div>
          <span className="heading-04 text-[20px]">E-tutor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />
        <NavItem
          icon={<Users size={20} />}
          label="Instructor Requests"
          active={activePage === "instructors"}
          onClick={() => setActivePage("instructors")}
        />
        <NavItem
          icon={<BookOpen size={20} />}
          label="All Courses"
          active={activePage === "courses"}
          onClick={() => setActivePage("courses")}
        />
        <NavItem
          icon={<Settings size={20} />}
          label="Settings"
          active={activePage === "settings"}
          onClick={() => setActivePage("settings")}
        />
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-[rgb(var(--gray-800))]">
        <button className="flex items-center gap-3 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--white))] w-full px-4 py-3 transition-colors body-md-500" onClick={handleLogout}>
          <LogOut size={20} />
          <span> {loggingOut ? "Logging out..." : "Sign-out"}</span>
        </button>
      </div>
    </aside>
  );
};
