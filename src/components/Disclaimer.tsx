import type { HTMLAttributes } from "react";
import type { Language } from "../types/game";

export type { Language } from "../types/game";

export interface DisclaimerProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  language?: Language;
  compact?: boolean;
  showTitle?: boolean;
}

const disclaimerContent = {
  en: {
    title: "Important notice",
    text:
      "This activity is for education and demonstration only. It is not a formal driving assessment and cannot determine whether a person is fit to drive. Driving rehabilitation and return-to-driving decisions should be discussed with appropriate qualified professionals.",
  },

  "zh-Hant": {
    title: "重要提示",
    text:
      "本活動只供教育及體驗用途，並不等同正式駕駛評估，不能用作判斷參加者是否適合駕駛。駕駛復康及重返駕駛的決定，應與合資格的專業人士商討。",
  },
} as const;

export function Disclaimer({
  language = "zh-Hant",
  compact = false,
  showTitle = true,
  className = "",
  ...props
}: DisclaimerProps) {
  const content = disclaimerContent[language];

  return (
    <aside
      {...props}
      role="note"
      aria-label={content.title}
      className={[
        "rounded-xl border border-amber-200 bg-amber-50",
        "text-amber-950",
        compact ? "p-3 text-xs" : "p-4 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 text-lg"
        >
          ⚠️
        </span>

        <div>
          {showTitle && (
            <h2 className="mb-1 font-semibold">
              {content.title}
            </h2>
          )}

          <p className="leading-relaxed">
            {content.text}
          </p>
        </div>
      </div>
    </aside>
  );
}
