import { useState } from "react";
import { Button } from "../components/Button";
import { CaseStoryCard } from "../components/CaseStoryCard";
import { ChoiceCard } from "../components/ChoiceCard";
import { OTSupportCard } from "../components/OTSupportCard";
import {
  getLocalizedText,
  liStageStories,
} from "../data/liStory";
import type {
  RehabStageProps,
} from "../types/game";

interface SetupOption {
  id: string;
  title: {
    en: string;
    "zh-Hant": string;
  };
  description: {
    en: string;
    "zh-Hant": string;
  };
  correct: boolean;
}

const setupOptions: SetupOption[] = [
  {
    id: "comfortable",
    title: {
      en: "Adjust the seat and mirrors for a clear and comfortable view",
      "zh-Hant": "調整座椅及後視鏡，保持清楚及舒適的視線",
    },
    description: {
      en: "Li can see the road, reach the controls and maintain a stable posture.",
      "zh-Hant": "李生可以看清道路、觸及控制裝置，並保持穩定坐姿。",
    },
    correct: true,
  },
  {
    id: "too-close",
    title: {
      en: "Move the seat very close to the steering wheel",
      "zh-Hant": "將座椅大幅調近方向盤",
    },
    description: {
      en: "This may restrict movement and make the position uncomfortable.",
      "zh-Hant": "這可能限制活動，亦可能令坐姿不舒適。",
    },
    correct: false,
  },
  {
    id: "unchanged",
    title: {
      en: "Keep the existing setup without checking",
      "zh-Hant": "不作檢查，維持原有設定",
    },
    description: {
      en: "The same setup may not be suitable after a change in function.",
      "zh-Hant": "功能改變後，原有設定未必仍然適合。",
    },
    correct: false,
  },
];

export function VehicleSetupChallengeGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.vehicleSetup;

  const [selected, setSelected] = useState<string | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);

  const selectedOption = setupOptions.find(
    (option) => option.id === selected
  );

  const isCorrect = selectedOption?.correct === true;
  const score = isCorrect ? 100 : 30;

  function submitAnswer() {
    if (!selected) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="space-y-5">
      <CaseStoryCard
        language={language}
        stageNumber={story.order}
        totalStages={6}
        title={getLocalizedText(story.title, language)}
        story={getLocalizedText(story.story, language)}
        focus={getLocalizedText(story.focus, language)}
      />

      <div className="rounded-2xl bg-slate-100 p-5">
        <div className="mb-4 text-center text-6xl">
          🚗
        </div>

        <p className="text-center text-sm font-medium text-slate-700">
          {isEnglish
            ? "Before moving, Li checks the vehicle setup."
            : "開始行駛前，李生先檢查車輛設定。"}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "Choose the most suitable setup"
            : "選擇最合適的車輛設定"}
        </h3>

        {setupOptions.map((option) => {
          const isSelected = selected === option.id;

          const status =
            submitted && option.correct
              ? "correct"
              : submitted && isSelected
                ? "incorrect"
                : "neutral";

          return (
            <ChoiceCard
              key={option.id}
              selected={isSelected}
              status={status}
              disabled={submitted}
              onClick={() => setSelected(option.id)}
              description={getLocalizedText(
                option.description,
                language
              )}
            >
              {getLocalizedText(option.title, language)}
            </ChoiceCard>
          );
        })}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={!selected}
          onClick={submitAnswer}
        >
          {isEnglish ? "Check setup" : "檢查設定"}
        </Button>
      ) : (
        <>
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
                  ? "This setup gives Li a better starting position."
                  : "這個設定為李生提供了較合適的開始位置。"
                : isEnglish
                  ? "The safest starting point is to check the seat, mirrors and controls first."
                  : "較安全的開始方法，是先檢查座椅、後視鏡及控制裝置。"}
            </p>
          </div>

          <OTSupportCard
            language={language}
            assessment={story.assessment.map((item) =>
              getLocalizedText(item, language)
            )}
            support={story.support.map((item) =>
              getLocalizedText(item, language)
            )}
            strategy={getLocalizedText(
              story.strategy,
              language
            )}
          />

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                stage: "vehicleSetup",
                score,
                observations: {
                  selectedSetup: selected ?? "none",
                  choseSuitableSetup: isCorrect,
                },
              })
            }
          >
            {isEnglish ? "Continue" : "繼續"}
          </Button>
        </>
      )}
    </div>
  );
}
