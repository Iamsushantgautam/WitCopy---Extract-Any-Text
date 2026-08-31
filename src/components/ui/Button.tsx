import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none";

    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover border border-transparent",
      secondary:
        "bg-surface text-foreground hover:bg-surface-hover border border-border active:bg-border",
      ghost:
        "bg-transparent text-foreground hover:bg-surface active:bg-surface-hover border border-transparent",
      outline:
        "bg-transparent text-primary border border-primary hover:bg-primary/5 active:bg-primary/10",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs sm:text-sm gap-1.5",
      md: "h-11 px-5 text-sm sm:text-base gap-2",
      lg: "h-13 px-7 text-base sm:text-lg gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
