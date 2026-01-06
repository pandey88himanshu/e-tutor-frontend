import Link from "next/link";

const DarkBgBtn = ({
  href = "/sign-up",
  children = "Create Account",
  onClick = () => {},
}) => {
  return (
    <Link
      href={href}
      className="body-sm-600 flex h-12 items-center justify-center rounded-md bg-[rgb(var(--primary-500))] px-6 text-[rgb(var(--white))] transition-colors hover:bg-[rgb(var(--primary-600))]"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default DarkBgBtn;
