"use client";
import Link from "next/link";

interface DarkBgBtnProps {
  href?: string;
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  asButton?: boolean;
}

const DarkBgBtn = ({
  href = "/sign-up",
  children = "Create Account",
  onClick = () => {},
  type = "button",
  disabled = false,
  asButton = false,
}: DarkBgBtnProps) => {
  const className =
    "body-sm-600 flex h-12 items-center justify-center rounded-md bg-[rgb(var(--primary-500))] px-6 text-[rgb(var(--white))] transition-colors hover:bg-[rgb(var(--primary-600))] disabled:opacity-50 disabled:cursor-not-allowed";

  // Render as button for form submissions
  if (asButton) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}>
        {children}
      </button>
    );
  }

  // Render as Link for navigation
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default DarkBgBtn;
