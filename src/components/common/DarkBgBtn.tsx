import Link from "next/link";
interface DarkBgBtnProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DarkBgBtn = ({ href, children, onClick = () => {} }: DarkBgBtnProps) => {
  const buttonCLass =
    "body-sm-600 flex h-12 items-center justify-center rounded-md bg-[rgb(var(--primary-500))] px-6 text-[rgb(var(--white))] transition-colors hover:bg-[rgb(var(--primary-600))]";
  if (onClick === undefined) {
    return (
      <Link href={href} className={buttonCLass}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={buttonCLass} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default DarkBgBtn;
