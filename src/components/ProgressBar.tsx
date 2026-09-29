import type { HTMLAttributes } from "react";
import type { Language } from "../types/game";

export interface ProgressBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  current: number;
  total: number;
  label?: string;
  language?: Language;
  showCount?: boolean;
  showPercentage?: boolean;
}

export function ProgressBar({
  current,
  total,
  label,
  language = "zh-Hant",
  showCount = true,
  showPercentage = false,
  className = "",
  ...props
}: ProgressBarProps) {
  const validTotal = Number.isFinite(total)
    ? Math.max(0, Math.floor(total))
    : 0;

  const validCurrent = Number.isFinite(current)
    ? current
    : 0;

  const safeCurrent =
    validTotal > 0
      ? Math.min(Math.max(validCurrent, 0), validTotal)
      : 0;

  const displayCurrent = Math.round(safeCurrent);

  const percentage =
    validTotal > 0
      ? Math.round((safeCurrent / validTotal) * 100)
      : 0;

  const ariaText =
    language === "en"
      ? `${displayCurrent} of ${validTotal} stages completed`
      : `已完成 ${displayCurrent} 個階段，共 ${validTotal} 個階段`;

  const defaultLabel =
    language === "en" ? "Activity progress" : "活動進度";

  return (
    <div
      {...props}
      className={`w-full ${className}`}
    >
      {(label || showCount || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          {label && (
            <span className="font-medium text-slate-700">
              {label}
            </span>
          )}

          <span className="ml-auto whitespace-nowrap text-slate-500">
            {showCount &&
              `${displayCurrent} / ${validTotal}`}

            {showCount && showPercentage && " · "}

            {showPercentage && `${percentage}%`}
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label ?? defaultLabel}
        aria-valuemin={0}
        aria-valuemax={Math.max(validTotal, 1)}
        aria-valuenow={displayCurrent}
        aria-valuetext={ariaText}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
