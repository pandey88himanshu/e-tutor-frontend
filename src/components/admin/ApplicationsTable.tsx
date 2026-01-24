"use client";
import { useState } from "react";
import { MoreVertical, FileText, Mail, LogOut } from "lucide-react";
import { Application, useDeleteApplicationMutation } from "@/store/api/applicationApi";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper to get initials from userId (temporary until we have user names)
const getInitials = (userId: string) => {
  return userId.substring(0, 2).toUpperCase();
};

export const ApplicationsTable = ({ data }: { data: Application[] }) => {
  console.log(data, "This is data");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleSendInterview = (email: string) => {
    window.location.href = `mailto:${email}?subject=Interview Invitation`;
    setOpenMenuId(null);
  };
  const [deleteApplication] = useDeleteApplicationMutation();

  const handleDeleteApplication = (id: string) => {
    deleteApplication(id);
    setOpenMenuId(null);
  };

  return (
    <div className="bg-[rgb(var(--white))] rounded-lg shadow-sm border border-[rgb(var(--gray-100))] min-h-[600px]">
      {/* Tab Navigation */}
      <div className="flex border-b border-[rgb(var(--gray-100))] px-6 pt-2">
        <button className="flex items-center gap-2 px-6 py-4 border-b-2 border-[rgb(var(--primary-500))] text-[rgb(var(--primary-500))] heading-04 text-[14px]">
          New Applications
          <span className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))] body-xs-600">
            {data.length}
          </span>
        </button>
        <button className="flex items-center gap-2 px-6 py-4 border-b-2 border-transparent text-[rgb(var(--gray-500))] hover:text-[rgb(var(--gray-700))] body-md-500">
          Interview Scheduled
        </button>
      </div>

      <div className="p-8">
        <div className="border border-[rgb(var(--gray-100))] rounded-lg overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[rgb(var(--gray-50))]">
              <tr>
                <th className="px-6 py-4 label-md uppercase text-[rgb(var(--gray-500))]">
                  Applicant ID
                </th>
                <th className="px-6 py-4 label-md uppercase text-[rgb(var(--gray-500))]">
                  Category
                </th>
                <th className="px-6 py-4 label-md uppercase text-[rgb(var(--gray-500))]">
                  Experience
                </th>
                <th className="px-6 py-4 label-md uppercase text-[rgb(var(--gray-500))]">
                  Applied On
                </th>
                <th className="px-6 py-4 label-md uppercase text-[rgb(var(--gray-500))] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--gray-100))]">
              {data.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-[rgb(var(--gray-50))] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Initials */}
                      <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-600))] flex items-center justify-center body-md-600">
                        {getInitials(app.userId)}
                      </div>
                      <span className="body-md-500 text-[rgb(var(--gray-900))]">
                        {app.userId.substring(0, 8)}...
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 body-md-400 text-[rgb(var(--gray-600))]">
                    {app.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="body-md-500 text-[rgb(var(--gray-700))]">
                        {app.yearsOfExp} {app.yearsOfExp === 1 ? "Year" : "Years"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${app.expertise === "Expert"
                        ? "bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))]"
                        : app.expertise === "Intermediate"
                          ? "bg-[rgb(var(--warning-100))] text-[rgb(var(--warning-600))]"
                          : "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]"
                        }`}>
                        {app.expertise}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 body-md-400 text-[rgb(var(--gray-600))]">
                    {formatDate(app.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === app.id ? null : app.id)
                      }
                      className="p-2 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--primary-500))] hover:bg-[rgb(var(--primary-100))] rounded-full transition-colors"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === app.id && (
                      <div className="absolute right-0 top-full mt-1 w-56 bg-[rgb(var(--white))] rounded-lg shadow-lg border border-[rgb(var(--gray-200))] z-50 py-2 text-left">
                        <button className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:text-[rgb(var(--primary-500))] flex items-center gap-2">
                          <FileText size={16} /> View Details
                        </button>
                        <button
                          onClick={() => handleSendInterview(app.userId)}
                          className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:text-[rgb(var(--primary-500))] flex items-center gap-2"
                        >
                          <Mail size={16} /> Send Interview Link
                        </button>
                        <div className="h-px bg-[rgb(var(--gray-100))] my-1"></div>
                        <button className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--danger-500))] hover:bg-[rgb(var(--danger-100))] flex items-center gap-2" onClick={() => handleDeleteApplication(app.id)}>
                          <LogOut size={16} className="rotate-180" /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
