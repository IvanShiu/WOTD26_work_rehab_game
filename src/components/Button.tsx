import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700",

  secondary:
    "border-slate-700 bg-slate-700 text-white hover:border-slate-800 hover:bg-slate-800",

  outline:
    "border-blue-600 bg-white text-blue-700 hover:bg-blue-50",

  danger:
    "border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700",

  ghost:
    "border-transparent bg-transparent text-slate-700 hover:bg-slate-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) {
    const classes = [
      "inline-flex items-center justify-center gap-2",
      "rounded-xl border font-semibold shadow-sm",
      "touch-manipulation select-none",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={classes}
      >
        {loading && (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />

            <span className="sr-only">Loading</span>
          </>
        )}

        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
