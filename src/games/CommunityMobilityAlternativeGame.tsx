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

const transportOptions = [
  {
    id: "public-transport",
    title: {
      en: "Use public transport or ask family for support today",
      "zh-Hant": "今天使用公共交通或請家人協助",
    },
    description: {
      en: "This avoids driving when Li is tired and the road conditions are difficult.",
      "zh-Hant": "李生疲倦及道路情況複雜時，這可以避免自行駕駛。",
    },
  },
  {
    id: "drive-long",
    title: {
      en: "Drive the full route despite feeling tired",
      "zh-Hant": "即使感到疲倦，仍自行駕駛完整路線",
    },
    description: {
      en: "This may add unnecessary risk.",
      "zh-Hant": "這可能增加不必要的風險。",
    },
  },
  {
    id: "rush",
    title: {
      en: "Drive quickly before becoming more tired",
      "zh-Hant": "趁未更加疲倦前加快速度駕駛",
    },
    description: {
      en: "Speeding does not solve fatigue or environmental demands.",
      "zh-Hant": "加快速度不能解決疲勞或環境要求。",
    },
  },
];

const workPlanOptions = [
  {
    id: "graded",
    title: {
      en: "Begin with short, familiar daytime routes and regular breaks",
      "zh-Hant": "先由短途、熟悉的日間路線及定時休息開始",
    },
    description: {
      en: "Increase driving and work demands gradually after review.",
      "zh-Hant": "檢討後才逐步增加駕駛及工作要求。",
    },
  },
  {
    id: "full-shifts",
    title: {
      en: "Immediately return to long shifts and busy routes",
      "zh-Hant": "立即恢復長時間工作及繁忙路線",
    },
    description: {
      en: "This may provide too much demand too soon.",
      "zh-Hant": "這可能在太短時間內增加過多要求。",
    },
  },
  {
    id: "no-plan",
    title: {
      en: "Continue without discussing fatigue or work demands",
      "zh-Hant": "不討論疲勞及工作要求，照原定計劃繼續",
    },
    description: {
      en: "A return-to-work plan should be reviewed and adjusted.",
      "zh-Hant": "重返工作計劃應該經過檢討及調整。",
    },
  },
];

export function CommunityMobilityAlternativeGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.communityMobility;

  const [selectedTransport, setSelectedTransport] =
    useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] =
    useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const transportCorrect =
    selectedTransport === "public-transport";
  const planCorrect = selectedPlan === "graded";

  const score =
    (transportCorrect ? 50 : 0) +
    (planCorrect ? 50 : 0);

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

      <div className="rounded-xl bg-purple-50 p-4 text-sm leading-relaxed text-purple-950">
        <strong>
          {isEnglish
            ? "Today’s situation:"
            : "今天的情況："}
        </strong>

        <span className="ml-1">
          {isEnglish
            ? "Li is tired, the weather is difficult and he still has activities to complete."
            : "李生感到疲倦，天氣及道路情況較複雜，但仍然有活動需要完成。"}
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "What is the safest plan for today?"
            : "今天哪一個出行計劃較安全？"}
        </h3>

        {transportOptions.map((option) => (
          <ChoiceCard
            key={option.id}
            selected={selectedTransport === option.id}
            disabled={submitted}
            onClick={() =>
              setSelectedTransport(option.id)
            }
            description={getLocalizedText(
              option.description,
              language
            )}
          >
            {getLocalizedText(option.title, language)}
          </ChoiceCard>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "Which return-to-work plan is more suitable?"
            : "哪一個重返工作計劃較合適？"}
        </h3>

        {workPlanOptions.map((option) => (
          <ChoiceCard
            key={option.id}
            selected={selectedPlan === option.id}
            disabled={submitted}
            onClick={() => setSelectedPlan(option.id)}
            description={getLocalizedText(
              option.description,
              language
            )}
          >
            {getLocalizedText(option.title, language)}
          </ChoiceCard>
        ))}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={!selectedTransport || !selectedPlan}
          onClick={() => setSubmitted(true)}
        >
          {isEnglish
            ? "Review mobility plan"
            : "查看社區流動計劃"}
        </Button>
      ) : (
        <>
          <div
            role="status"
            className={[
              "rounded-xl p-4",
              score === 100
                ? "bg-green-50 text-green-950"
                : "bg-amber-50 text-amber-950",
            ].join(" ")}
          >
            <p className="font-semibold">
              {score === 100
                ? isEnglish
                  ? "Li chose a safe option for today and a gradual return-to-work plan."
                  : "李生選擇了今天較安全的出行方式，以及分階段重返工作的計劃。"
                : isEnglish
                  ? "A safe plan should consider fatigue, the environment and the demands of the activity."
                  : "安全計劃應該考慮疲勞、環境及活動本身的要求。"}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "Not driving today can be a safe and responsible decision, not a failure."
                : "今天不駕駛可以是一個安全及負責任的決定，並不代表失敗。"}
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
                stage: "communityMobility",
                score,
                observations: {
                  choseSafeAlternative:
                    transportCorrect,
                  choseGradedReturnToWork:
                    planCorrect,
                },
              })
            }
          >
            {isEnglish
              ? "View OT learning profile"
              : "查看職業治療學習概況"}
          </Button>
        </>
      )}
    </div>
  );
}
