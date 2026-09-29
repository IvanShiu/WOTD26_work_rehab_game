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

interface DistractionScenario {
  id: string;
  question: {
    en: string;
    "zh-Hant": string;
  };
  correct: string;
  options: {
    id: string;
    title: {
      en: string;
      "zh-Hant": string;
    };
  }[];
}

const scenarios: DistractionScenario[] = [
  {
    id: "phone",
    question: {
      en: "A phone notification appears while Li is driving. What is the safest response?",
      "zh-Hant": "李生駕駛時收到手機通知。哪一個做法較安全？",
    },
    correct: "ignore",
    options: [
      {
        id: "ignore",
        title: {
          en: "Ignore it and continue focusing on the road",
          "zh-Hant": "先忽略通知，繼續專注道路",
        },
      },
      {
        id: "read",
        title: {
          en: "Pick up the phone and read it",
          "zh-Hant": "拿起手機閱讀通知",
        },
      },
      {
        id: "reply",
        title: {
          en: "Reply while driving slowly",
          "zh-Hant": "慢速駕駛時回覆訊息",
        },
      },
    ],
  },
  {
    id: "navigation",
    question: {
      en: "The navigation system needs a new route. What should Li do?",
      "zh-Hant": "導航系統需要重新規劃路線。李生應該怎樣做？",
    },
    correct: "safe-stop",
    options: [
      {
        id: "safe-stop",
        title: {
          en: "Stop in a safe place before changing the route",
          "zh-Hant": "先在安全位置停車，再更改路線",
        },
      },
      {
        id: "type-driving",
        title: {
          en: "Type the new destination while driving",
          "zh-Hant": "駕駛時輸入新的目的地",
        },
      },
      {
        id: "guess",
        title: {
          en: "Make a quick decision without checking",
          "zh-Hant": "不作查看，立即猜測方向",
        },
      },
    ],
  },
  {
    id: "fatigue",
    question: {
      en: "Li notices that he is becoming tired. What is the safer choice?",
      "zh-Hant": "李生察覺自己開始疲倦。哪一個選擇較安全？",
    },
    correct: "rest",
    options: [
      {
        id: "rest",
        title: {
          en: "Stop safely, rest and review whether to continue",
          "zh-Hant": "安全停車、休息，再重新評估是否繼續",
        },
      },
      {
        id: "continue",
        title: {
          en: "Continue because the destination is nearby",
          "zh-Hant": "因為目的地很近，所以繼續駕駛",
        },
      },
      {
        id: "speed",
        title: {
          en: "Drive faster to finish sooner",
          "zh-Hant": "加快速度以盡快完成行程",
        },
      },
    ],
  },
];

export function DriverDistractionDecisionGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.driverDistraction;

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(
    null
  );
  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const currentScenario = scenarios[scenarioIndex];

  const correctCount = scenarios.filter(
    (scenario, index) =>
      answers[index] === scenario.correct
  ).length;

  const score = Math.round(
    (correctCount / scenarios.length) * 100
  );

  function submitScenario() {
    if (!selected) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [scenarioIndex]: selected,
    };

    setAnswers(nextAnswers);

    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex((current) => current + 1);
      setSelected(null);
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
                ? `Situation ${scenarioIndex + 1} of ${scenarios.length}`
                : `情境 ${scenarioIndex + 1} / ${scenarios.length}`}
            </span>

            <span aria-hidden="true">📱</span>
          </div>

          <div className="rounded-xl bg-slate-100 p-4 text-sm font-semibold leading-relaxed text-slate-800">
            {getLocalizedText(
              currentScenario.question,
              language
            )}
          </div>

          <div className="space-y-3">
            {currentScenario.options.map((option) => (
              <ChoiceCard
                key={option.id}
                selected={selected === option.id}
                onClick={() => setSelected(option.id)}
              >
                {getLocalizedText(
                  option.title,
                  language
                )}
              </ChoiceCard>
            ))}
          </div>

          <Button
            fullWidth
            disabled={!selected}
            onClick={submitScenario}
          >
            {scenarioIndex < scenarios.length - 1
              ? isEnglish
                ? "Next situation"
                : "下一個情境"
              : isEnglish
                ? "Review decisions"
                : "查看決定"}
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
                ? `You selected helpful strategies in ${correctCount} of ${scenarios.length} situations.`
                : `你在 ${scenarios.length} 個情境中，有 ${correctCount} 個選擇了有幫助的策略。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "Recognising distraction and fatigue is part of safe self-monitoring."
                : "察覺分心及疲勞，是安全自我監察的一部分。"}
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
                stage: "driverDistraction",
                score,
                observations: {
                  correctDistractionDecisions: correctCount,
                  totalDistractionDecisions:
                    scenarios.length,
                  recognisedDistractionRisk: score >= 67,
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
