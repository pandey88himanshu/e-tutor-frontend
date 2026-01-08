import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordInput = ({
  error,
  showPassword,
  onToggle,
  ...props
}: PasswordInputProps) => {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        error={error}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-600))]"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
