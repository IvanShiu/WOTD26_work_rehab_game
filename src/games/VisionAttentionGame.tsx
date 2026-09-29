import { useState } from "react";
import { Button } from "../components/Button";
import { scoreFromFraction } from "../lib/scoring";
import type { StageProps } from "../types/game";

interface SceneItem {
  id: string;
  emoji: string;
  left: string;
  top: string;
  important: boolean;
  label: {
    en: string;
    zh: string;
  };
}

const sceneItems: SceneItem[] = [
  {
    id: "pedestrian",
    emoji: "🚶",
    left: "18%",
    top: "48%",
    important: true,
    label: {
      en: "Pedestrian",
      zh: "行人",
    },
  },
  {
    id: "cyclist",
    emoji: "🚴",
    left: "70%",
    top: "42%",
    important: true,
    label: {
      en: "Cyclist",
      zh: "單車人士",
    },
  },
  {
    id: "traffic-sign",
    emoji: "⚠️",
    left: "78%",
    top: "16%",
    important: true,
    label: {
      en: "Traffic sign",
      zh: "交通標誌",
    },
  },
  {
    id: "vehicle",
    emoji: "🚗",
    left: "42%",
    top: "72%",
    important: true,
    label: {
      en: "Vehicle",
      zh: "車輛",
    },
  },
  {
    id: "billboard",
    emoji: "🪧",
    left: "10%",
    top: "15%",
    important: false,
    label: {
      en: "Billboard",
      zh: "廣告牌",
    },
  },
];

export function VisionAttentionGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const importantItems = sceneItems.filter(
    (item) => item.important
  );

  const foundCount = importantItems.filter((item) =>
    selectedIds.includes(item.id)
  ).length;

  const score = scoreFromFraction(
    foundCount,
    importantItems.length
  );

  function toggleItem(itemId: string) {
    if (submitted) {
      return;
    }

    setSelectedIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 1" : "第 1 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Vision and Attention"
            : "視覺與注意力"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "Tap the objects that may be important for safe driving."
            : "請點擊可能與安全駕駛有關的重要物件。"}
        </p>
      </div>

      <div
        className="relative h-72 overflow-hidden rounded-2xl bg-sky-200"
        aria-label={
          isEnglish ? "Road scene" : "道路情境"
        }
      >
        <div className="absolute inset-x-[30%] bottom-0 top-0 bg-slate-500">
          <div className="absolute inset-y-0 left-1/2 border-l-4 border-dashed border-yellow-200" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-500" />

        {sceneItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label.en}
              aria-pressed={isSelected}
              disabled={submitted}
              onClick={() => toggleItem(item.id)}
              style={{
                left: item.left,
                top: item.top,
              }}
              className={[
                "absolute flex min-h-12 -translate-x-1/2",
                "-translate-y-1/2 flex-col items-center",
                "rounded-xl px-2 py-1 text-center",
                "transition-transform",
                isSelected
                  ? "scale-110 bg-blue-600 text-white ring-4 ring-blue-200"
                  : "bg-white/90 text-slate-900 shadow-sm",
                "disabled:cursor-default",
              ].join(" ")}
            >
              <span className="text-2xl" aria-hidden="true">
                {item.emoji}
              </span>

              <span className="text-xs font-semibold">
                {isEnglish ? item.label.en : item.label.zh}
              </span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          onClick={() => setSubmitted(true)}
        >
          {isEnglish ? "Check scene" : "檢查情境"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? `You identified ${foundCount} of ${importantItems.length} relevant objects.`
                : `你找到了 ${foundCount} 個重要物件，共有 ${importantItems.length} 個。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "An OT may assess visual scanning, attention and the ability to notice relevant information."
                : "職業治療師可能會評估視覺掃描、注意力，以及能否留意與駕駛有關的重要資訊。"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                visualAwareness: score,
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
