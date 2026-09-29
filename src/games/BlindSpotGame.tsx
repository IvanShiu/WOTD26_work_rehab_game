import { useState } from "react";
import { Button } from "../components/Button";
import { scoreFromFraction } from "../lib/scoring";
import type { StageProps } from "../types/game";

interface ViewItem {
  id: string;
  label: {
    en: string;
    zh: string;
  };
  hazard: string;
  emoji: string;
}

const views: ViewItem[] = [
  {
    id: "left",
    label: {
      en: "Check left side",
      zh: "查看左側",
    },
    hazard: "Cyclist",
    emoji: "🚴",
  },
  {
    id: "right",
    label: {
      en: "Check right side",
      zh: "查看右側",
    },
    hazard: "Motorcycle",
    emoji: "🏍️",
  },
  {
    id: "mirror",
    label: {
      en: "Check mirrors",
      zh: "查看後視鏡",
    },
    hazard: "Vehicle",
    emoji: "🚗",
  },
];

export function BlindSpotGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";
  const [checkedViews, setCheckedViews] = useState<string[]>(
    []
  );
  const [noticedHazards, setNoticedHazards] = useState<string[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);

  const allViewsChecked =
    checkedViews.length === views.length;

  const score = scoreFromFraction(
    noticedHazards.length,
    views.length
  );

  function checkView(viewId: string) {
    if (!checkedViews.includes(viewId)) {
      setCheckedViews((current) => [...current, viewId]);
    }
  }

  function noticeHazard(viewId: string) {
    if (!noticedHazards.includes(viewId)) {
      setNoticedHazards((current) => [
        ...current,
        viewId,
      ]);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 2" : "第 2 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Blind-Spot Challenge"
            : "盲點挑戰"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "Check each view, then tap the hazard you notice."
            : "請逐一查看不同方向，然後點擊你發現的危險。"}
        </p>
      </div>

      <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-700">
        <div className="absolute inset-x-[25%] top-0 h-full bg-slate-500">
          <div className="absolute inset-y-0 left-1/2 border-l-4 border-dashed border-yellow-200" />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-blue-600 px-6 py-4 text-3xl">
          🚙
        </div>

        <p className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-white">
          {isEnglish
            ? "Virtual vehicle view"
            : "虛擬車輛視角"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {views.map((view) => {
          const isChecked = checkedViews.includes(view.id);
          const isNoticed = noticedHazards.includes(view.id);

          return (
            <div
              key={view.id}
              className="rounded-xl border border-slate-200 p-3"
            >
              <Button
                fullWidth
                size="sm"
                variant={isChecked ? "secondary" : "outline"}
                disabled={submitted || isChecked}
                onClick={() => checkView(view.id)}
              >
                {isEnglish ? view.label.en : view.label.zh}
              </Button>

              {isChecked && (
                <button
                  type="button"
                  disabled={submitted || isNoticed}
                  aria-pressed={isNoticed}
                  onClick={() => noticeHazard(view.id)}
                  className={[
                    "mt-3 flex min-h-12 w-full items-center",
                    "justify-center gap-2 rounded-lg p-2 text-sm",
                    "font-semibold transition-colors",
                    isNoticed
                      ? "bg-green-100 text-green-900"
                      : "bg-red-50 text-red-900 hover:bg-red-100",
                  ].join(" ")}
                >
                  <span aria-hidden="true">
                    {view.emoji}
                  </span>

                  <span>
                    {isNoticed
                      ? isEnglish
                        ? "Noticed"
                        : "已發現"
                      : isEnglish
                        ? view.hazard
                        : "發現危險"}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={!allViewsChecked}
          onClick={() => setSubmitted(true)}
        >
          {isEnglish ? "Review result" : "查看結果"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? `You noticed ${noticedHazards.length} of ${views.length} hazards.`
                : `你發現了 ${noticedHazards.length} 個危險，共有 ${views.length} 個。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "OTs may assess visual scanning, mirror use and hazard awareness."
                : "職業治療師可能會評估視覺掃描、使用後視鏡的策略，以及危險辨識能力。"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                visualAwareness: score,
                hazardDetection: score,
              })
            }
          >
            {isEnglish ? "Continue" : "繼續"}
          </Button>
        </div>
      )}
    </div>
  );
}
