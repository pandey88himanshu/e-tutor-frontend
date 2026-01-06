import Link from "next/link";

const LightBgBtn = ({
  href = "/sign-up",
  children = "Create Account",
  onClick = () => {},
}) => {
  return (
    <Link
      href={href}
      className="flex h-12 min-w-42 items-center justify-center rounded-md bg-[rgb(var(--primary-100))] px-6 body-md-500 text-[rgb(var(--primary-500))] transition-colors hover:bg-[rgb(var(--primary-200))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))] focus:ring-offset-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LightBgBtn;
