import type { ReactNode } from "react";
import { Button } from "./components/Button";
import { Disclaimer } from "./components/Disclaimer";
import { ProgressBar } from "./components/ProgressBar";
import { BrakingGame } from "./games/BrakingGame";
import { BlindSpotGame } from "./games/BlindSpotGame";
import { IntersectionGame } from "./games/IntersectionGame";
import { ParkingGame } from "./games/ParkingGame";
import { ReturnToWorkGame } from "./games/ReturnToWorkGame";
import { VisionAttentionGame } from "./games/VisionAttentionGame";
import { useGameState } from "./hooks/useGameState";
import {
  assessmentStages,
  type AssessmentStage,
  type Domain,
  type DomainScores,
  type Language,
} from "./types/game";

const profileDomains: Domain[] = [
  "visualAwareness",
  "hazardDetection",
  "decisionMaking",
  "reactionPerformance",
  "vehicleControl",
  "workRehabilitation",
];

const domainLabels: Record<
  Domain,
  { en: string; zh: string }
> = {
  visualAwareness: {
    en: "Visual awareness",
    zh: "視覺覺察",
  },
  hazardDetection: {
    en: "Hazard detection",
    zh: "危險辨識",
  },
  decisionMaking: {
    en: "Decision making",
    zh: "決策能力",
  },
  reactionPerformance: {
    en: "Reaction performance",
    zh: "反應表現",
  },
  vehicleControl: {
    en: "Vehicle control",
    zh: "車輛控制",
  },
  workRehabilitation: {
    en: "Return-to-work planning",
    zh: "重返工作計劃",
  },
};

function getObservation(
  score: number,
  language: Language
): string {
  if (language === "en") {
    if (score >= 80) {
      return "You demonstrated several helpful strategies in this activity.";
    }

    if (score >= 50) {
      return "You demonstrated some helpful strategies. Further practice may be useful.";
    }

    return "This scenario highlights an ability that may need more attention in real-life assessment.";
  }

  if (score >= 80) {
    return "你在這項活動中展示了多個有幫助的策略。";
  }

  if (score >= 50) {
    return "你展示了一些有幫助的策略，進一步練習可能會有幫助。";
  }

  return "這個情境顯示出一項在實際評估中可能需要進一步了解的能力。";
}

interface LearningProfileProps {
  language: Language;
  scores: DomainScores;
  onReset: () => void;
}

function LearningProfile({
  language,
  scores,
  onReset,
}: LearningProfileProps) {
  const isEnglish = language === "en";

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish
            ? "Activity completed"
            : "活動完成"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "OT Driving Safety Learning Profile"
            : "職業治療駕駛安全學習概況"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "These observations describe your performance in this game only. They are not a clinical driving score."
            : "以下觀察只反映你在這個遊戲中的表現，並不是臨床駕駛評估分數。"}
        </p>
      </div>

      <div className="space-y-4">
        {profileDomains.map((domain) => {
          const score = scores[domain] ?? 0;
          const label = domainLabels[domain];

          return (
            <div
              key={domain}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-800">
                  {isEnglish ? label.en : label.zh}
                </span>

                <span className="text-sm font-bold text-blue-700">
                  {score}/100
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {getObservation(score, language)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-blue-50 p-5 text-blue-950">
        <h3 className="font-bold">
          {isEnglish
            ? "What can an occupational therapist do?"
            : "職業治療師可以做甚麼？"}
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            {isEnglish
              ? "Assess functional abilities related to driving."
              : "評估與駕駛有關的功能能力。"}
          </li>

          <li>
            {isEnglish
              ? "Provide driver rehabilitation and compensatory strategies."
              : "提供駕駛復康及代償策略。"}
          </li>

          <li>
            {isEnglish
              ? "Consider vehicle adaptations and environmental demands."
              : "考慮車輛改裝及環境要求。"}
          </li>

          <li>
            {isEnglish
              ? "Support gradual return to driving, work or community mobility."
              : "支援逐步重返駕駛、工作或社區活動。"}
          </li>
        </ul>
      </div>

      <Disclaimer language={language} />

      <Button fullWidth onClick={onReset}>
        {isEnglish
          ? "Start next participant"
          : "開始下一位參加者"}
      </Button>
    </div>
  );
}

function App() {
  const {
    state,
    startGame,
    completeStage,
    setLanguage,
    resetGame,
  } = useGameState();

  const isEnglish = state.language === "en";

  const progress =
    state.currentStage === "welcome"
      ? 0
      : state.currentStage === "result"
        ? assessmentStages.length
        : assessmentStages.indexOf(
              state.currentStage as AssessmentStage
            ) + 1;

  function toggleLanguage() {
    setLanguage(isEnglish ? "zh-Hant" : "en");
  }

  function complete(
    stage: AssessmentStage,
    scores: DomainScores
  ) {
    completeStage(stage, scores);
  }

  function renderCurrentStage(): ReactNode {
    switch (state.currentStage) {
      case "welcome":
        return (
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-sm font-semibold text-blue-600">
                {isEnglish
                  ? "World Occupational Therapy Day"
                  : "世界職業治療日"}
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                {isEnglish
                  ? "Can You Return to Driving?"
                  : "你可以重返駕駛嗎？"}
              </h2>

              <p className="mt-3 leading-relaxed text-slate-600">
                {isEnglish
                  ? "Explore some of the abilities involved in driving and learn how occupational therapists may support driver assessment, rehabilitation and return to work."
                  : "探索駕駛所涉及的不同能力，了解職業治療師如何參與駕駛評估、駕駛復康及協助重返工作。"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-700">
              <strong>
                {isEnglish
                  ? "This is not a racing game."
                  : "這不是一個賽車遊戲。"}
              </strong>

              <p className="mt-2">
                {isEnglish
                  ? "Driving involves vision, attention, judgement, reaction, vehicle control and the demands of the job."
                  : "駕駛涉及視覺、注意力、判斷、反應、車輛控制，以及工作本身的要求。"}
              </p>
            </div>

            <Disclaimer language={state.language} />

            <Button
              fullWidth
              size="lg"
              onClick={startGame}
            >
              {isEnglish
                ? "Start activity"
                : "開始活動"}
            </Button>
          </div>
        );

      case "visionAttention":
        return (
          <VisionAttentionGame
            language={state.language}
            onComplete={(scores) =>
              complete("visionAttention", scores)
            }
          />
        );

      case "blindSpot":
        return (
          <BlindSpotGame
            language={state.language}
            onComplete={(scores) =>
              complete("blindSpot", scores)
            }
          />
        );

      case "intersection":
        return (
          <IntersectionGame
            language={state.language}
            onComplete={(scores) =>
              complete("intersection", scores)
            }
          />
        );

      case "braking":
        return (
          <BrakingGame
            language={state.language}
            onComplete={(scores) =>
              complete("braking", scores)
            }
          />
        );

      case "parking":
        return (
          <ParkingGame
            language={state.language}
            onComplete={(scores) =>
              complete("parking", scores)
            }
          />
        );

      case "returnToWork":
        return (
          <ReturnToWorkGame
            language={state.language}
            onComplete={(scores) =>
              complete("returnToWork", scores)
            }
          />
        );

      case "result":
        return (
          <LearningProfile
            language={state.language}
            scores={state.domainScores}
            onReset={resetGame}
          />
        );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
            {isEnglish
              ? "OT Driver Safety"
              : "職業治療駕駛安全"}
          </h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              aria-label={
                isEnglish
                  ? "Switch to Traditional Chinese"
                  : "切換至英文"
              }
            >
              {isEnglish ? "繁體中文" : "English"}
            </Button>

            {state.currentStage !== "welcome" &&
              state.currentStage !== "result" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetGame}
                >
                  {isEnglish ? "Reset" : "重設"}
                </Button>
              )}
          </div>
        </header>

        <div className="mb-5">
          <ProgressBar
            current={progress}
            total={assessmentStages.length}
            label={
              isEnglish
                ? "Activity progress"
                : "活動進度"
            }
            showPercentage
          />
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          {renderCurrentStage()}
        </section>
      </div>
    </main>
  );
}

export default App;
