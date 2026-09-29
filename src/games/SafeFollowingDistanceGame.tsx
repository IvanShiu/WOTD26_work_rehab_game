import { useState } from "react";
import { Button } from "../components/Button";
import { CaseStoryCard } from "../components/CaseStoryCard";
import { ChoiceCard } from "../components/ChoiceCard";
import { OTSupportCard } from "../components/OTSupportCard";
import {
  getLocalizedText,
  liStageStories,
} from "../data/liStory";
import type { RehabStageProps } from "../types/game";

interface TrafficRound {
  id: string;
  situation: {
    en: string;
    "zh-Hant": string;
  };
  distance: number;
  correctAction: string;
}

const rounds: TrafficRound[] = [
  {
    id: "round-1",
    situation: {
      en: "The vehicle ahead is moving steadily and there is a comfortable gap.",
      "zh-Hant": "前方車輛以穩定速度行駛，車距暫時足夠。",
    },
    distance: 75,
    correctAction: "hold",
  },
  {
    id: "round-2",
    situation: {
      en: "The vehicle ahead begins to slow down.",
      "zh-Hant": "前方車輛開始減速。",
    },
    distance: 48,
    correctAction: "slow",
  },
  {
    id: "round-3",
    situation: {
      en: "The gap is becoming small and the vehicle ahead may stop.",
      "zh-Hant": "車距逐漸縮小，前方車輛可能會停車。",
    },
    distance: 25,
    correctAction: "slow",
  },
];

const actions = [
  {
    id: "accelerate",
    title: {
      en: "Accelerate",
      "zh-Hant": "加速",
    },
    description: {
      en: "Move closer to the vehicle ahead.",
      "zh-Hant": "駛近前方車輛。",
    },
  },
  {
    id: "hold",
    title: {
      en: "Maintain speed",
      "zh-Hant": "保持速度",
    },
    description: {
      en: "Keep the current space if the situation is stable.",
      "zh-Hant": "情況穩定時保持目前車距。",
    },
  },
  {
    id: "slow",
    title: {
      en: "Slow down early",
      "zh-Hant": "及早減速",
    },
    description: {
      en: "Create more time and space for observation.",
      "zh-Hant": "增加觀察及判斷的時間和空間。",
    },
  },
];

export function SafeFollowingDistanceGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.safeFollowingDistance;

  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedAction, setSelectedAction] =
    useState<string | null>(null);
  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const currentRound = rounds[roundIndex];

  const correctCount = rounds.filter(
    (round, index) =>
      answers[index] === round.correctAction
  ).length;

  const score = Math.round(
    (correctCount / rounds.length) * 100
  );

  function submitRound() {
    if (!selectedAction) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [roundIndex]: selectedAction,
    };

    setAnswers(nextAnswers);

    if (roundIndex < rounds.length - 1) {
      setRoundIndex((current) => current + 1);
      setSelectedAction(null);
    } else {
      setSubmitted(true);
    }
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

      {!submitted ? (
        <>
          <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>
              {isEnglish
                ? `Traffic situation ${roundIndex + 1} of ${rounds.length}`
                : `交通情況 ${roundIndex + 1} / ${rounds.length}`}
            </span>

            <span>
              {isEnglish ? "Safe gap" : "安全車距"}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-700 p-5 text-white">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-4xl">🚙</span>

              <div className="h-2 flex-1 bg-slate-500">
                <div
                  className="h-2 bg-green-400 transition-all"
                  style={{
                    width: `${currentRound.distance}%`,
                  }}
                />
              </div>

              <span className="text-4xl">🚗</span>
            </div>

            <p className="text-center text-sm leading-relaxed">
              {getLocalizedText(
                currentRound.situation,
                language
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              {isEnglish
                ? "What should Li do?"
                : "李生應該怎樣做？"}
            </h3>

            {actions.map((action) => (
              <ChoiceCard
                key={action.id}
                selected={selectedAction === action.id}
                onClick={() =>
                  setSelectedAction(action.id)
                }
                description={getLocalizedText(
                  action.description,
                  language
                )}
              >
                {getLocalizedText(
                  action.title,
                  language
                )}
              </ChoiceCard>
            ))}
          </div>

          <Button
            fullWidth
            disabled={!selectedAction}
            onClick={submitRound}
          >
            {roundIndex < rounds.length - 1
              ? isEnglish
                ? "Next situation"
                : "下一個情況"
              : isEnglish
                ? "Review result"
                : "查看結果"}
          </Button>
        </>
      ) : (
        <>
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? `You selected helpful actions in ${correctCount} of ${rounds.length} situations.`
                : `你在 ${rounds.length} 個情況中，有 ${correctCount} 個選擇了合適行動。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "Maintaining distance gives more time to observe, decide and brake."
                : "保持車距可以提供更多觀察、判斷及煞車時間。"}
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
                stage: "safeFollowingDistance",
                score,
                observations: {
                  correctTrafficDecisions: correctCount,
                  totalTrafficDecisions: rounds.length,
                  maintainedSafeDistance: score >= 67,
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
