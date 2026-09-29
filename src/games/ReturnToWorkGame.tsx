import { useState } from "react";
import { Button } from "../components/Button";
import { scoreSelection } from "../lib/scoring";
import type { StageProps } from "../types/game";

interface WorkOption {
  id: string;
  correct: boolean;
  en: string;
  zh: string;
}

const options: WorkOption[] = [
  {
    id: "short-routes",
    correct: true,
    en: "Begin with shorter and familiar routes",
    zh: "先由較短及熟悉的路線開始",
  },
  {
    id: "rest-breaks",
    correct: true,
    en: "Schedule regular rest breaks",
    zh: "安排定時休息",
  },
  {
    id: "gradual-hours",
    correct: true,
    en: "Gradually increase working hours",
    zh: "逐步增加工作時間",
  },
  {
    id: "assess-loading",
    correct: true,
    en: "Assess loading and unloading tasks",
    zh: "評估上落貨物的工作要求",
  },
  {
    id: "full-shifts",
    correct: false,
    en: "Immediately resume long shifts without review",
    zh: "未經檢討便立即恢復長時間工作",
  },
];

export function ReturnToWorkGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";

  const [selectedIds, setSelectedIds] = useState<string[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);

  const correctIds = options
    .filter((option) => option.correct)
    .map((option) => option.id);

  const score = scoreSelection(
    selectedIds,
    correctIds
  );

  const correctSelected = selectedIds.filter((id) =>
    correctIds.includes(id)
  ).length;

  function toggleOption(id: string) {
    if (submitted) {
      return;
    }

    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 6" : "第 6 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Return-to-Work Planning"
            : "重返駕駛工作的計劃"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "Mr Lee is returning to delivery driving after a health condition. Select suitable parts of a gradual plan."
            : "李先生因健康問題暫停駕駛，現正計劃重返送貨工作。請選出逐步復工計劃中合適的部分。"}
        </p>
      </div>

      <div className="rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-700">
        <strong>
          {isEnglish ? "Think about:" : "請考慮："}
        </strong>

        <span className="ml-1">
          {isEnglish
            ? "the person, vehicle, environment and job demands."
            : "個人、車輛、環境及工作要求。"}
        </span>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              disabled={submitted}
              aria-pressed={isSelected}
              onClick={() => toggleOption(option.id)}
              className={[
                "flex min-h-14 w-full items-center gap-3",
                "rounded-xl border p-4 text-left",
                "transition-colors",
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-950"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                "disabled:cursor-default",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "flex h-6 w-6 shrink-0 items-center",
                  "justify-center rounded-md border text-sm",
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300",
                ].join(" ")}
              >
                {isSelected ? "✓" : ""}
              </span>

              <span>
                {isEnglish ? option.en : option.zh}
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
          {isEnglish
            ? "Review return-to-work plan"
            : "查看復工計劃"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? `You selected ${correctSelected} of ${correctIds.length} helpful strategies.`
                : `你選出了 ${correctSelected} 個合適策略，共有 ${correctIds.length} 個。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "Return to work may need to be gradual. An OT can help match the person's abilities with vehicle setup, route demands and work tasks."
                : "重返工作可能需要循序漸進。職業治療師可以協助配合個人能力、車輛設置、路線要求及工作任務。"}
            </p>

            <p className="mt-2 text-sm font-semibold">
              {isEnglish
                ? "Person + Vehicle + Environment + Occupation"
                : "個人 + 車輛 + 環境 + 職業"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                workRehabilitation: score,
              })
            }
          >
            {isEnglish ? "View learning profile" : "查看學習概況"}
          </Button>
        </div>
      )}
    </div>
  );
}
