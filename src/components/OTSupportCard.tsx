import { useId } from "react";
import type { HTMLAttributes } from "react";
import type { Language } from "../types/game";

export interface OTSupportCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  language: Language;
  assessment: string[];
  support: string[];
  strategy?: string;
}

export function OTSupportCard({
  language,
  assessment,
  support,
  strategy,
  className = "",
  ...props
}: OTSupportCardProps) {
  const isEnglish = language === "en";
  const headingId = useId();

  const title = isEnglish
    ? "How can occupational therapy help?"
    : "職業治療可以如何協助？";

  const assessmentTitle = isEnglish
    ? "What might an OT assess?"
    : "OT 可能會評估甚麼？";

  const supportTitle = isEnglish
    ? "How might OT support rehabilitation?"
    : "OT 可以如何支援復康？";

  const strategyTitle = isEnglish
    ? "Try this strategy"
    : "嘗試這項策略";

  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={[
        "rounded-2xl border border-emerald-200",
        "bg-emerald-50 p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg text-white"
        >
          OT
        </div>

        <h2
          id={headingId}
          className="text-lg font-bold text-emerald-950"
        >
          {title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white/80 p-4">
          <h3 className="font-bold text-slate-900">
            {assessmentTitle}
          </h3>

          <ul className="mt-3 space-y-2">
            {assessment.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-2 text-sm leading-relaxed text-slate-700"
              >
                <span
                  aria-hidden="true"
                  className="font-bold text-emerald-600"
                >
                  ✓
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white/80 p-4">
          <h3 className="font-bold text-slate-900">
            {supportTitle}
          </h3>

          <ul className="mt-3 space-y-2">
            {support.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-2 text-sm leading-relaxed text-slate-700"
              >
                <span
                  aria-hidden="true"
                  className="font-bold text-emerald-600"
                >
                  →
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {strategy && (
        <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-100 p-4">
          <h3 className="font-bold text-emerald-950">
            {strategyTitle}
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-emerald-900">
            {strategy}
          </p>
        </div>
      )}
    </section>
  );
}
