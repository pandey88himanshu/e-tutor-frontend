"use client";
import Link from "next/link";

interface DarkBgBtnProps {
  href?: string;
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  asButton?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const DarkBgBtn = ({
  href = "/sign-up",
  children = "Create Account",
  onClick,
  type = "button",
  disabled = false,
  asButton = false,
  loading = false,
  loadingText = "Loading...",
  fullWidth = false,
}: DarkBgBtnProps) => {
  const className = `body-sm-600 flex h-12 items-center justify-center gap-2 rounded-md bg-[rgb(var(--primary-500))] px-6 text-[rgb(var(--white))] transition-colors hover:bg-[rgb(var(--primary-600))] disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? "w-full" : ""}`;

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );

  // Content to render (loading state or children)
  const content = loading ? (
    <>
      <LoadingSpinner />
      <span>{loadingText}</span>
    </>
  ) : (
    children
  );

  // Render as button for form submissions or when onClick is provided
  if (asButton || onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={className}
      >
        {content}
      </button>
    );
  }

  // Render as Link for navigation
  return (
    <Link href={href} className={className} onClick={onClick}>
      {content}
    </Link>
  );
};

export default DarkBgBtn;

