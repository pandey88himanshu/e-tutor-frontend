"use client";
import { useState, useEffect, useCallback } from "react";
import {
  MoreVertical,
  FileText,
  Mail,
  LogOut,
  Loader2,
  CheckCircle2,
  XCircle,
  X,
  Phone,
  Briefcase,
  Clock,
  Calendar,
  User,
  MessageSquare,
  Star,
  ExternalLink,
  Video,
  FileDown,
} from "lucide-react";
import {
  Application,
  useDeleteApplicationMutation,
  useSendInterviewLinkMutation,
  useUpdateApplicationStatusMutation,
} from "@/store/api/applicationApi";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper to get initials from email or userId
const getInitials = (app: Application) => {
  if (app.user?.firstName && app.user?.lastName) {
    return `${app.user.firstName[0]}${app.user.lastName[0]}`.toUpperCase();
  }
  if (app.user?.username) {
    return app.user.username.substring(0, 2).toUpperCase();
  }
  return app.userId.substring(0, 2).toUpperCase();
};

// Helper to get display name
const getDisplayName = (app: Application) => {
  if (app.user?.firstName && app.user?.lastName) {
    return `${app.user.firstName} ${app.user.lastName}`;
  }
  if (app.user?.username) {
    return app.user.username;
  }
  return `${app.userId.substring(0, 8)}...`;
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    PENDING: "bg-[rgb(var(--warning-100))] text-[rgb(var(--warning-600))]",
    APPROVED: "bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))]",
    REJECTED:
      "bg-[rgb(var(--danger-100,255_230_230))] text-[rgb(var(--danger-600,200_50_50))]",
  };
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[status] ||
        "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]"
        }`}
    >
      {status}
    </span>
  );
};

// Toast notification type
interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export const ApplicationsTable = ({ data }: { data: Application[] }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    appId: string;
    email: string;
    name: string;
  }>({ open: false, appId: "", email: "", name: "" });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [deleteApplication] = useDeleteApplicationMutation();
  const [sendInterviewLink, { isLoading: isSending }] =
    useSendInterviewLinkMutation();
  const [updateApplicationStatus, { isLoading: isApproving }] =
    useUpdateApplicationStatusMutation();

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts]);

  const addToast = useCallback(
    (type: "success" | "error", message: string) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, type, message }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // View Details
  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setOpenMenuId(null);
  };

  // Approve application
  const handleApprove = async () => {
    if (!selectedApp) return;
    try {
      await updateApplicationStatus({
        id: selectedApp.id,
        status: "APPROVED",
      }).unwrap();
      addToast("success", `${getDisplayName(selectedApp)} has been approved!`);
      setSelectedApp(null);
    } catch (error: any) {
      const msg =
        error?.data?.message ||
        error?.message ||
        "Failed to approve application.";
      addToast("error", msg);
    }
  };

  // Open confirmation modal before sending
  const handleSendInterviewClick = (app: Application) => {
    const email = app.user?.email || "";
    const name = getDisplayName(app);

    if (!email) {
      addToast("error", "No email found for this applicant.");
      setOpenMenuId(null);
      return;
    }

    setConfirmModal({ open: true, appId: app.id, email, name });
    setOpenMenuId(null);
  };

  // Actually send the interview link via API
  const handleConfirmSend = async () => {
    try {
      await sendInterviewLink({
        email: confirmModal.email,
        applicantName: confirmModal.name,
      }).unwrap();

      addToast(
        "success",
        `Interview link sent to ${confirmModal.email} successfully!`
      );
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to send interview link.";
      addToast("error", errorMessage);
    } finally {
      setConfirmModal({ open: false, appId: "", email: "", name: "" });
    }
  };

  const handleDeleteApplication = (id: string) => {
    deleteApplication(id);
    setOpenMenuId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId && !(e.target as Element)?.closest(".actions-dropdown")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  return (
    <>
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
                    Applicant
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
                        <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-600))] flex items-center justify-center body-md-600">
                          {getInitials(app)}
                        </div>
                        <div className="flex flex-col">
                          <span className="body-md-500 text-[rgb(var(--gray-900))]">
                            {getDisplayName(app)}
                          </span>
                          {app.user?.email && (
                            <span className="body-sm-400 text-[rgb(var(--gray-500))]">
                              {app.user.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 body-md-400 text-[rgb(var(--gray-600))]">
                      {app.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="body-md-500 text-[rgb(var(--gray-700))]">
                          {app.yearsOfExp}{" "}
                          {app.yearsOfExp === 1 ? "Year" : "Years"}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${app.expertise === "Expert"
                              ? "bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))]"
                              : app.expertise === "Intermediate"
                                ? "bg-[rgb(var(--warning-100))] text-[rgb(var(--warning-600))]"
                                : "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]"
                            }`}
                        >
                          {app.expertise}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 body-md-400 text-[rgb(var(--gray-600))]">
                      {formatDate(app.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-right relative actions-dropdown">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === app.id ? null : app.id
                          );
                        }}
                        className="p-2 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--primary-500))] hover:bg-[rgb(var(--primary-100))] rounded-full transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === app.id && (
                        <div className="absolute right-0 top-full mt-1 w-56 bg-[rgb(var(--white))] rounded-lg shadow-lg border border-[rgb(var(--gray-200))] z-50 py-2 text-left">
                          <button
                            onClick={() => handleViewDetails(app)}
                            className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:text-[rgb(var(--primary-500))] flex items-center gap-2"
                          >
                            <FileText size={16} /> View Details
                          </button>
                          {app.transcription ? (
                            <div className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--success-600))] bg-[rgb(var(--success-50))] flex items-center gap-2 cursor-not-allowed opacity-80">
                              <CheckCircle2 size={16} /> Interview Completed
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSendInterviewClick(app)}
                              className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:text-[rgb(var(--primary-500))] flex items-center gap-2"
                            >
                              <Mail size={16} /> Send Interview Link
                            </button>
                          )}
                          <div className="h-px bg-[rgb(var(--gray-100))] my-1"></div>
                          <button
                            className="w-full px-4 py-3 body-sm-500 text-[rgb(var(--danger-500))] hover:bg-[rgb(var(--danger-100))] flex items-center gap-2"
                            onClick={() => handleDeleteApplication(app.id)}
                          >
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

      {/* ═══════════════════════════════════════════
          VIEW DETAILS SLIDE-OUT PANEL
          ═══════════════════════════════════════════ */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-start justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Overlay click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedApp(null)}
          />

          {/* Side Panel */}
          <div className="relative w-full max-w-2xl h-full bg-[rgb(var(--white))] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[rgb(var(--white))] border-b border-[rgb(var(--gray-100))] px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="heading-04 text-[rgb(var(--gray-900))]">
                  Application Details
                </h2>
                <p className="body-sm-400 text-[rgb(var(--gray-500))] mt-0.5">
                  ID: {selectedApp.id.substring(0, 8)}...
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-full hover:bg-[rgb(var(--gray-100))] transition-colors"
              >
                <X size={20} className="text-[rgb(var(--gray-500))]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 pb-32">
              {/* ── Applicant Info Card ── */}
              <div className="bg-[rgb(var(--gray-50))] rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-600))] flex items-center justify-center heading-04">
                    {getInitials(selectedApp)}
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-04 text-[18px] text-[rgb(var(--gray-900))]">
                      {getDisplayName(selectedApp)}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      {selectedApp.user?.email && (
                        <span className="body-sm-400 text-[rgb(var(--gray-500))] flex items-center gap-1">
                          <Mail size={14} /> {selectedApp.user.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={selectedApp.status} />
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-[rgb(var(--white))] rounded-lg p-3 text-center border border-[rgb(var(--gray-100))]">
                    <Phone
                      size={16}
                      className="mx-auto mb-1 text-[rgb(var(--gray-400))]"
                    />
                    <p className="body-sm-600 text-[rgb(var(--gray-800))]">
                      {selectedApp.phone}
                    </p>
                    <p className="text-[10px] text-[rgb(var(--gray-400))] uppercase tracking-wider">
                      Phone
                    </p>
                  </div>
                  <div className="bg-[rgb(var(--white))] rounded-lg p-3 text-center border border-[rgb(var(--gray-100))]">
                    <Briefcase
                      size={16}
                      className="mx-auto mb-1 text-[rgb(var(--gray-400))]"
                    />
                    <p className="body-sm-600 text-[rgb(var(--gray-800))]">
                      {selectedApp.category}
                    </p>
                    <p className="text-[10px] text-[rgb(var(--gray-400))] uppercase tracking-wider">
                      Category
                    </p>
                  </div>
                  <div className="bg-[rgb(var(--white))] rounded-lg p-3 text-center border border-[rgb(var(--gray-100))]">
                    <Clock
                      size={16}
                      className="mx-auto mb-1 text-[rgb(var(--gray-400))]"
                    />
                    <p className="body-sm-600 text-[rgb(var(--gray-800))]">
                      {selectedApp.yearsOfExp}{" "}
                      {selectedApp.yearsOfExp === 1 ? "Yr" : "Yrs"}
                    </p>
                    <p className="text-[10px] text-[rgb(var(--gray-400))] uppercase tracking-wider">
                      Experience
                    </p>
                  </div>
                  <div className="bg-[rgb(var(--white))] rounded-lg p-3 text-center border border-[rgb(var(--gray-100))]">
                    <Calendar
                      size={16}
                      className="mx-auto mb-1 text-[rgb(var(--gray-400))]"
                    />
                    <p className="body-sm-600 text-[rgb(var(--gray-800))]">
                      {formatDate(selectedApp.createdAt)}
                    </p>
                    <p className="text-[10px] text-[rgb(var(--gray-400))] uppercase tracking-wider">
                      Applied
                    </p>
                  </div>
                </div>
              </div>

              {/* ── About ── */}
              <div>
                <h4 className="body-md-600 text-[rgb(var(--gray-800))] mb-2 flex items-center gap-2">
                  <User size={16} /> About
                </h4>
                <p className="body-md-400 text-[rgb(var(--gray-600))] leading-relaxed bg-[rgb(var(--gray-50))] rounded-lg p-4 border border-[rgb(var(--gray-100))]">
                  {selectedApp.about}
                </p>
              </div>

              {/* ── Expertise ── */}
              <div>
                <h4 className="body-md-600 text-[rgb(var(--gray-800))] mb-2 flex items-center gap-2">
                  <Star size={16} /> Expertise Level
                </h4>
                <span
                  className={`inline-block text-sm px-3 py-1.5 rounded-full font-medium ${selectedApp.expertise === "Expert"
                      ? "bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))]"
                      : selectedApp.expertise === "Intermediate"
                        ? "bg-[rgb(var(--warning-100))] text-[rgb(var(--warning-600))]"
                        : "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]"
                    }`}
                >
                  {selectedApp.expertise}
                </span>
              </div>

              {/* ── Resume & Intro Video ── */}
              {(selectedApp.resumeUrl || selectedApp.introVideoUrl) && (
                <div>
                  <h4 className="body-md-600 text-[rgb(var(--gray-800))] mb-3 flex items-center gap-2">
                    <ExternalLink size={16} /> Attachments
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedApp.resumeUrl && (
                      <a
                        href={selectedApp.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[rgb(var(--gray-200))] text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:border-[rgb(var(--primary-300))] hover:text-[rgb(var(--primary-500))] transition-colors body-sm-500"
                      >
                        <FileDown size={16} /> Resume
                      </a>
                    )}
                    {selectedApp.introVideoUrl && (
                      <a
                        href={selectedApp.introVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[rgb(var(--gray-200))] text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] hover:border-[rgb(var(--primary-300))] hover:text-[rgb(var(--primary-500))] transition-colors body-sm-500"
                      >
                        <Video size={16} /> Intro Video
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* ── Interview Transcription ── */}
              {selectedApp.transcription && (
                <div>
                  <h4 className="body-md-600 text-[rgb(var(--gray-800))] mb-3 flex items-center gap-2">
                    <MessageSquare size={16} /> Interview Transcript
                  </h4>
                  <div className="bg-[rgb(var(--gray-50))] rounded-xl border border-[rgb(var(--gray-100))] p-5 max-h-80 overflow-y-auto">
                    {selectedApp.transcription
                      .split("\n")
                      .map((line, i) => {
                        const isAI = line.startsWith("AI:");
                        const isUser = line.startsWith("User:");
                        const content = line
                          .replace(/^AI:\s*/, "")
                          .replace(/^User:\s*/, "");

                        if (!content.trim()) return null;

                        return (
                          <div
                            key={i}
                            className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"
                              }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${isUser
                                  ? "bg-[rgb(var(--primary-500))] text-white rounded-br-md"
                                  : isAI
                                    ? "bg-[rgb(var(--white))] text-[rgb(var(--gray-800))] border border-[rgb(var(--gray-200))] rounded-bl-md"
                                    : "bg-[rgb(var(--gray-100))] text-[rgb(var(--gray-600))]"
                                }`}
                            >
                              <p className="text-[10px] font-semibold mb-0.5 opacity-70">
                                {isAI
                                  ? "AI Interviewer"
                                  : isUser
                                    ? "Candidate"
                                    : ""}
                              </p>
                              <p className="body-sm-400 leading-relaxed">
                                {content}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* ── AI Score & Feedback ── */}
              {selectedApp.aiScore !== null &&
                selectedApp.aiScore !== undefined && (
                  <div>
                    <h4 className="body-md-600 text-[rgb(var(--gray-800))] mb-3 flex items-center gap-2">
                      <Star size={16} /> AI Evaluation
                    </h4>
                    <div className="bg-[rgb(var(--gray-50))] rounded-xl border border-[rgb(var(--gray-100))] p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="body-sm-500 text-[rgb(var(--gray-500))]">
                          Score:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2.5 bg-[rgb(var(--gray-200))] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[rgb(var(--primary-500))] rounded-full transition-all"
                              style={{
                                width: `${(selectedApp.aiScore / 10) * 100
                                  }%`,
                              }}
                            />
                          </div>
                          <span className="body-md-600 text-[rgb(var(--gray-800))]">
                            {selectedApp.aiScore}/10
                          </span>
                        </div>
                      </div>
                      {selectedApp.aiFeedback && (
                        <p className="body-sm-400 text-[rgb(var(--gray-600))] leading-relaxed">
                          {selectedApp.aiFeedback}
                        </p>
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* ── Sticky Footer with Actions ── */}
            <div className="sticky bottom-0 bg-[rgb(var(--white))] border-t border-[rgb(var(--gray-100))] px-8 py-5 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleDeleteApplication(selectedApp.id);
                  setSelectedApp(null);
                }}
                className="px-5 py-2.5 rounded-lg border border-[rgb(var(--danger-200,255_200_200))] text-[rgb(var(--danger-500))] body-md-500 hover:bg-[rgb(var(--danger-100,255_235_235))] transition-colors flex items-center gap-2"
              >
                <LogOut size={16} className="rotate-180" />
                Reject
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2.5 rounded-lg border border-[rgb(var(--gray-200))] text-[rgb(var(--gray-700))] body-md-500 hover:bg-[rgb(var(--gray-50))] transition-colors"
                >
                  Close
                </button>

                {selectedApp.status === "APPROVED" ? (
                  <div className="px-5 py-2.5 rounded-lg bg-[rgb(var(--success-100))] text-[rgb(var(--success-600))] body-md-600 flex items-center gap-2">
                    <CheckCircle2 size={18} /> Approved
                  </div>
                ) : (
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="px-6 py-2.5 rounded-lg bg-[rgb(var(--success-500,34_197_94))] text-white body-md-600 hover:bg-[rgb(var(--success-600,22_163_74))] transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
                  >
                    {isApproving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Approve Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Send Interview Confirmation Modal ── */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[rgb(var(--white))] rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-04 text-[rgb(var(--gray-900))]">
                Send Interview Link
              </h3>
              <button
                onClick={() =>
                  setConfirmModal({
                    open: false,
                    appId: "",
                    email: "",
                    name: "",
                  })
                }
                className="p-1 rounded-full hover:bg-[rgb(var(--gray-100))] transition-colors"
              >
                <X size={20} className="text-[rgb(var(--gray-500))]" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-[rgb(var(--gray-50))] rounded-lg mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-600))] flex items-center justify-center body-lg-600">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="body-md-600 text-[rgb(var(--gray-900))]">
                    {confirmModal.name}
                  </p>
                  <p className="body-sm-400 text-[rgb(var(--gray-500))]">
                    {confirmModal.email}
                  </p>
                </div>
              </div>
              <p className="body-md-400 text-[rgb(var(--gray-600))]">
                This will generate a VAPI interview link and send it to the
                applicant&apos;s email. Are you sure you want to proceed?
              </p>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() =>
                  setConfirmModal({
                    open: false,
                    appId: "",
                    email: "",
                    name: "",
                  })
                }
                disabled={isSending}
                className="px-5 py-2.5 rounded-lg border border-[rgb(var(--gray-200))] text-[rgb(var(--gray-700))] body-md-500 hover:bg-[rgb(var(--gray-50))] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                disabled={isSending}
                className="px-5 py-2.5 rounded-lg bg-[rgb(var(--primary-500))] text-white body-md-600 hover:bg-[rgb(var(--primary-600))] transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Send Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notifications ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border animate-in slide-in-from-right duration-300 ${toast.type === "success"
                  ? "bg-[rgb(var(--success-50))] border-[rgb(var(--success-200))] text-[rgb(var(--success-700))]"
                  : "bg-[rgb(var(--danger-50,255_240_240))] border-[rgb(var(--danger-200,255_200_200))] text-[rgb(var(--danger-700,180_30_30))]"
                }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span className="body-md-500 max-w-xs">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 p-0.5 rounded hover:bg-black/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
