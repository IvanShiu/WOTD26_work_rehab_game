import type { HTMLAttributes } from "react";

export interface ProgressBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  current: number;
  total: number;
  label?: string;
  showCount?: boolean;
  showPercentage?: boolean;
}

export function ProgressBar({
  current,
  total,
  label,
  showCount = true,
  showPercentage = false,
  className = "",
  ...props
}: ProgressBarProps) {
  const safeTotal = Math.max(0, Math.floor(total));

  const safeCurrent =
    safeTotal > 0
      ? Math.min(Math.max(current, 0), safeTotal)
      : 0;

  const percentage =
    safeTotal > 0
      ? Math.round((safeCurrent / safeTotal) * 100)
      : 0;

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
            {showCount && `${safeCurrent} / ${safeTotal}`}
            {showCount && showPercentage && " · "}
            {showPercentage && `${percentage}%`}
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={Math.max(safeTotal, 1)}
        aria-valuenow={safeCurrent}
        aria-valuetext={`${safeCurrent} of ${safeTotal} stages completed`}
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
