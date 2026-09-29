import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ChoiceStatus =
  | "neutral"
  | "correct"
  | "incorrect";

export interface ChoiceCardProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
  status?: ChoiceStatus;
  description?: string;
}

export function ChoiceCard({
  children,
  selected = false,
  status = "neutral",
  description,
  className = "",
  type = "button",
  ...props
}: ChoiceCardProps) {
  const statusClasses = {
    neutral:
      "border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50",

    correct:
      "border-green-500 bg-green-50 text-green-950",

    incorrect:
      "border-red-400 bg-red-50 text-red-950",
  };

  const classes = [
    "flex min-h-14 w-full items-start gap-3",
    "rounded-xl border p-4 text-left",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
    selected && status === "neutral"
      ? "border-blue-600 bg-blue-50 text-blue-950"
      : statusClasses[status],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      type={type}
      aria-pressed={selected}
      className={classes}
    >
      <span
        aria-hidden="true"
        className={[
          "mt-0.5 flex h-6 w-6 shrink-0",
          "items-center justify-center rounded-md border",
          selected
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {selected ? "✓" : ""}
      </span>

      <span className="flex-1">
        <span className="block font-semibold">
          {children}
        </span>

        {description && (
          <span className="mt-1 block text-sm font-normal opacity-75">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
