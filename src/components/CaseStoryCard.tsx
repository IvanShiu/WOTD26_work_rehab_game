import type { HTMLAttributes } from "react";
import type { Language } from "../types/game";

export interface CaseStoryCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  language: Language;
  stageNumber?: number;
  totalStages?: number;
  title: string;
  story: string;
  focus?: string;
}

export function CaseStoryCard({
  language,
  stageNumber,
  totalStages,
  title,
  story,
  focus,
  className = "",
  ...props
}: CaseStoryCardProps) {
  const isEnglish = language === "en";

  const journeyLabel = isEnglish
    ? "Lee's rehabilitation journey"
    : "李生的復康旅程";

  const stageLabel =
    stageNumber && totalStages
      ? isEnglish
        ? `Stage ${stageNumber} of ${totalStages}`
        : `第 ${stageNumber} 關，共 ${totalStages} 關`
      : undefined;

  const focusLabel = isEnglish
    ? "Today's focus"
    : "今次重點";

  return (
    <section
      {...props}
      aria-labelledby="case-story-title"
      className={[
        "rounded-2xl border border-blue-200",
        "bg-blue-50 p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl text-white"
        >
          🚗
        </div>

        <div>
          <p className="text-sm font-semibold text-blue-700">
            {journeyLabel}
          </p>

          {stageLabel && (
            <p className="mt-1 text-xs text-blue-600">
              {stageLabel}
            </p>
          )}
        </div>
      </div>

      <h2
        id="case-story-title"
        className="text-xl font-bold text-slate-900"
      >
        {title}
      </h2>

      <p className="mt-3 leading-relaxed text-slate-700">
        {story}
      </p>

      {focus && (
        <div className="mt-4 rounded-xl bg-white/80 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
            {focusLabel}
          </p>

          <p className="mt-1 text-sm font-medium text-slate-800">
            {focus}
          </p>
        </div>
      )}
    </section>
  );
}
