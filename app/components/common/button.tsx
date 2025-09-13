import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

const baseStyles =
  "px-5 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2";

const variants = {
  primary:
    "bg-teal-500 hover:bg-teal-300 text-gray-900 shadow-md shadow-teal-500/30 focus:ring-teal-500",
  secondary:
    "bg-gray-800 border border-purple-900 text-gray-200 hover:bg-gray-700 hover:border-purple-700 shadow-md shadow-purple-900/40 focus:ring-purple-900",
};
const Spinner: React.FC = () => (
  <svg
    className="animate-spin h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner />}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
