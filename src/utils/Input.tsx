interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

const Input = ({ error, className = "", ...props }: InputProps) => {
  const baseClasses = `h-12 w-full rounded-md border px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:outline-none ${
    error
      ? "border-[rgb(var(--error-500))] focus:ring-[rgb(var(--error-500))]"
      : "border-[rgb(var(--gray-200))] focus:ring-[rgb(var(--primary-500))]"
  }`;

  return <input className={`${baseClasses} ${className}`} {...props} />;
};
export default Input;
