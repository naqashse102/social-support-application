import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "destructive";
  styleType?: "filled" | "outlined";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  variant = "primary",
  styleType = "filled",
  isLoading = false,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: {
      filled:
        "bg-primary text-primary-foreground data-[hover]:bg-primary-hover shadow-sm",
      outlined: "border border-primary text-primary data-[hover]:bg-muted",
    },
    accent: {
      filled:
        "bg-accent text-accent-foreground data-[hover]:bg-accent-hover shadow-sm",
      outlined: "border border-accent text-accent data-[hover]:bg-accent/5",
    },
    secondary: {
      filled:
        "bg-secondary text-secondary-foreground data-[hover]:bg-secondary-hover shadow-sm",
      outlined:
        "border border-border text-text-secondary data-[hover]:bg-muted",
    },
    destructive: {
      filled:
        "bg-destructive text-destructive-foreground data-[hover]:bg-destructive-hover shadow-sm",
      outlined: "border border-destructive text-destructive data-[hover]:bg-destructive/5",
    },
  };

  const variantStyles = variants[variant][styleType];

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center gap-2 rounded-md px-6 py-2.5 
        text-lg font-bold transition-all duration-200 
        focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        active:scale-97 active:shadow-inner
        ${variantStyles}
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 size={18} className="h-8 w-45 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

export default Button;
