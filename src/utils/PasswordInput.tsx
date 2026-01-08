import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";
// Reusable PasswordInput component
const PasswordInput = ({ error, showPassword, onToggle, ...props }) => {
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
