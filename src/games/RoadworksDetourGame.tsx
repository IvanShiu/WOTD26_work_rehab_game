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

const routeOptions = [
  {
    id: "short-busy",
    title: {
      en: "Take the shortest route through busy unfamiliar roads",
      "zh-Hant": "選擇最短但繁忙及不熟悉的道路",
    },
    description: {
      en: "It is quick, but includes complex junctions and heavy traffic.",
      "zh-Hant": "路程較短，但包括複雜路口及繁忙交通。",
    },
  },
  {
    id: "familiar",
    title: {
      en: "Take a slightly longer familiar route",
      "zh-Hant": "選擇稍長但較熟悉的路線",
    },
    description: {
      en: "This route has less traffic and a planned rest point.",
      "zh-Hant": "這條路線交通較少，並設有預先計劃的休息位置。",
    },
  },
  {
    id: "night",
    title: {
      en: "Take an unfamiliar route at night",
      "zh-Hant": "選擇夜間行駛的不熟悉路線",
    },
    description: {
      en: "This adds unfamiliar roads and reduced visibility.",
      "zh-Hant": "這會增加不熟悉道路及視線較差的要求。",
    },
  },
];

const responseOptions = [
  {
    id: "safe-stop",
    title: {
      en: "Stop in a safe place and review the route",
      "zh-Hant": "在安全位置停車，重新查看路線",
    },
  },
  {
    id: "phone-driving",
    title: {
      en: "Use the phone while continuing to drive",
      "zh-Hant": "繼續駕駛時使用手機查看路線",
    },
  },
  {
    id: "rush-turn",
    title: {
      en: "Make a sudden turn before missing the exit",
      "zh-Hant": "為免錯過出口而突然轉彎",
    },
  },
];

export function RoadworksDetourGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.roadworksDetour;

  const [selectedRoute, setSelectedRoute] =
    useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] =
    useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const routeCorrect = selectedRoute === "familiar";
  const responseCorrect = selectedResponse === "safe-stop";

  const score =
    (routeCorrect ? 50 : 0) +
    (responseCorrect ? 50 : 0);

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

      <div className="rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        <strong>
          {isEnglish ? "Roadworks ahead:" : "前方道路工程："}
        </strong>

        <span className="ml-1">
          {isEnglish
            ? "the familiar road to the delivery location is closed."
            : "前往送貨地點的熟悉道路突然封閉。"}
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "Which route is most suitable today?"
            : "今天哪一條路線較適合？"}
        </h3>

        {routeOptions.map((route) => (
          <ChoiceCard
            key={route.id}
            selected={selectedRoute === route.id}
            disabled={submitted}
            onClick={() => setSelectedRoute(route.id)}
            description={getLocalizedText(
              route.description,
              language
            )}
          >
            {getLocalizedText(route.title, language)}
          </ChoiceCard>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "What should Li do if the route becomes unclear?"
            : "如果路線變得不清楚，李生應該怎樣做？"}
        </h3>

        {responseOptions.map((option) => (
          <ChoiceCard
            key={option.id}
            selected={selectedResponse === option.id}
            disabled={submitted}
            onClick={() =>
              setSelectedResponse(option.id)
            }
          >
            {getLocalizedText(
              option.title,
              language
            )}
          </ChoiceCard>
        ))}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={!selectedRoute || !selectedResponse}
          onClick={() => setSubmitted(true)}
        >
          {isEnglish
            ? "Review route plan"
            : "查看路線計劃"}
        </Button>
      ) : (
        <>
          <div
            role="status"
            className={[
              "rounded-xl p-4",
              score >= 100
                ? "bg-green-50 text-green-950"
                : "bg-amber-50 text-amber-950",
            ].join(" ")}
          >
            <p className="font-semibold">
              {score >= 100
                ? isEnglish
                  ? "Li chose a familiar route and a safe response to uncertainty."
                  : "李生選擇了較熟悉的路線，並以安全方式處理不確定情況。"
                : isEnglish
                  ? "A familiar route and a safe stop may reduce the demands of an unexpected change."
                  : "選擇較熟悉的路線，並在需要時安全停車，可以減低突發變化帶來的要求。"}
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
                stage: "roadworksDetour",
                score,
                observations: {
                  choseSuitableRoute: routeCorrect,
                  stoppedSafelyWhenUnclear: responseCorrect,
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
