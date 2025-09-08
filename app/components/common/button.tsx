import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const baseStyles =
  "px-5 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants = {
  primary:
    "bg-teal-500 hover:bg-teal-300 text-gray-900 shadow-md shadow-teal-500/30 focus:ring-teal-500",
  secondary:
    "bg-gray-800 border border-purple-900 text-gray-200 hover:bg-gray-700 hover:border-purple-700 shadow-md shadow-purple-900/40 focus:ring-purple-900",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
