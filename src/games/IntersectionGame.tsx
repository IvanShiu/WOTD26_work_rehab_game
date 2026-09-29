import { useState } from "react";
import { Button } from "../components/Button";
import type { StageProps } from "../types/game";

const choices = [
  {
    id: "turn-now",
    en: "Turn now",
    zh: "立即轉彎",
  },
  {
    id: "wait",
    en: "Wait and check again",
    zh: "等待並再次查看",
  },
  {
    id: "move-slowly",
    en: "Move forward slowly",
    zh: "慢慢向前駛",
  },
];

export function IntersectionGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";
  const [selectedChoice, setSelectedChoice] = useState<
    string | null
  >(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selectedChoice === "wait";
  const score = isCorrect ? 100 : 0;

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 3" : "第 3 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Intersection Decision"
            : "路口決策"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "A bus partly blocks your view. A cyclist may be hidden. What would you do?"
            : "一輛巴士阻擋了部分視線，可能有單車人士被遮擋。你會怎樣做？"}
        </p>
      </div>

      <div className="relative h-56 overflow-hidden rounded-2xl bg-green-300">
        <div className="absolute left-0 right-0 top-1/2 h-20 -translate-y-1/2 bg-slate-600" />
        <div className="absolute bottom-0 left-1/2 top-0 w-20 -translate-x-1/2 bg-slate-600" />

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-yellow-400 px-4 py-2 text-2xl">
          🚌
        </div>

        <div className="absolute right-[20%] top-[38%] text-2xl">
          🚴
        </div>

        <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-semibold text-white">
          {isEnglish
            ? "Your view is partly blocked"
            : "你的視線受到部分阻擋"}
        </div>
      </div>

      <div className="space-y-3">
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;

          return (
            <button
              key={choice.id}
              type="button"
              disabled={submitted}
              aria-pressed={isSelected}
              onClick={() => setSelectedChoice(choice.id)}
              className={[
                "min-h-12 w-full rounded-xl border p-3 text-left",
                "font-semibold transition-colors",
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-900"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                "disabled:cursor-default",
              ].join(" ")}
            >
              {isEnglish ? choice.en : choice.zh}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={selectedChoice === null}
          onClick={() => setSubmitted(true)}
        >
          {isEnglish ? "Submit decision" : "提交決定"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            role="status"
            className={[
              "rounded-xl p-4",
              isCorrect
                ? "bg-green-50 text-green-950"
                : "bg-amber-50 text-amber-950",
            ].join(" ")}
          >
            <p className="font-semibold">
              {isCorrect
                ? isEnglish
                  ? "Waiting allows more time to check the hidden area."
                  : "等待可以讓你有更多時間查看被遮擋的位置。"
                : isEnglish
                  ? "When your view is blocked, waiting and checking again may reduce risk."
                  : "當視線受到阻擋時，等待並再次查看可以減低風險。"}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "OTs may consider judgement, attention and decision-making in complex traffic situations."
                : "職業治療師可能會考慮在複雜交通情境下的判斷、注意力及決策能力。"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                decisionMaking: score,
                hazardDetection: isCorrect ? 100 : 25,
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
