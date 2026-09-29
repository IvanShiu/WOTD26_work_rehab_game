import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../components/Button";
import { CaseStoryCard } from "../components/CaseStoryCard";
import { OTSupportCard } from "../components/OTSupportCard";
import {
  getLocalizedText,
  liStageStories,
} from "../data/liStory";
import {
  calculateReactionDistance,
  formatReactionTime,
} from "../lib/reactionTime";
import { scoreReactionTime } from "../lib/scoring";
import type { RehabStageProps } from "../types/game";

type TrialPhase =
  | "ready"
  | "waiting"
  | "hazard"
  | "completed";

const demonstrationSpeedKmh = 50;
const maximumResponseWaitMs = 3500;

export function BrakingExperienceGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.braking;

  const [phase, setPhase] =
    useState<TrialPhase>("ready");

  const [reactionTime, setReactionTime] =
    useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  const hazardStartRef = useRef<number | null>(
    null
  );

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  function startTrial() {
    clearTimer();

    setReactionTime(null);
    setPhase("waiting");
    hazardStartRef.current = null;

    const randomDelay =
      900 + Math.random() * 1600;

    timerRef.current = window.setTimeout(() => {
      hazardStartRef.current =
        performance.now();

      setPhase("hazard");

      timerRef.current = window.setTimeout(() => {
        hazardStartRef.current = null;
        setPhase("completed");
      }, maximumResponseWaitMs);
    }, randomDelay);
  }

  function pressBrake() {
    if (
      phase !== "hazard" ||
      hazardStartRef.current === null
    ) {
      return;
    }

    const elapsed =
      performance.now() - hazardStartRef.current;

    clearTimer();
    hazardStartRef.current = null;

    setReactionTime(elapsed);
    setPhase("completed");
  }

  const reactionDistance =
    reactionTime === null
      ? null
      : calculateReactionDistance(
          demonstrationSpeedKmh,
          reactionTime
        );

  const score =
    reactionTime === null
      ? 0
      : scoreReactionTime(reactionTime);

  return (
    <div className="space-y-5">
      <CaseStoryCard
        language={language}
        stageNumber={story.order}
        totalStages={7}
        title={getLocalizedText(
          story.title,
          language
        )}
        story={getLocalizedText(
          story.story,
          language
        )}
        focus={getLocalizedText(
          story.focus,
          language
        )}
      />

      <div
        className={[
          "flex h-56 items-center justify-center",
          "rounded-2xl text-center transition-colors",
          phase === "hazard"
            ? "bg-red-600"
            : "bg-slate-700",
        ].join(" ")}
        aria-live="polite"
      >
        {phase === "ready" && (
          <div className="space-y-2 text-white">
            <div className="text-5xl">🚘</div>

            <p className="text-xl font-bold">
              {isEnglish
                ? "Ready for a controlled trial?"
                : "準備進行受控體驗？"}
            </p>
          </div>
        )}

        {phase === "waiting" && (
          <p className="text-2xl font-bold text-white">
            {isEnglish
              ? "Keep watching..."
              : "請持續觀察……"}
          </p>
        )}

        {phase === "hazard" && (
          <div className="space-y-2 text-white">
            <div className="text-7xl">⚠️</div>

            <p className="text-2xl font-black">
              {isEnglish
                ? "HAZARD — BRAKE!"
                : "危險——煞車！"}
            </p>
          </div>
        )}

        {phase === "completed" && (
          <div className="space-y-2 text-white">
            <div className="text-5xl">🛑</div>

            <p className="text-xl font-bold">
              {isEnglish
                ? "Trial complete"
                : "體驗完成"}
            </p>
          </div>
        )}
      </div>

      {phase === "ready" && (
        <Button
          fullWidth
          size="lg"
          onClick={startTrial}
        >
          {isEnglish
            ? "Start braking trial"
            : "開始煞車體驗"}
        </Button>
      )}

      {phase === "waiting" && (
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          disabled
        >
          {isEnglish
            ? "Watch the road..."
            : "請觀察道路……"}
        </Button>
      )}

      {phase === "hazard" && (
        <Button
          fullWidth
          size="lg"
          variant="danger"
          onClick={pressBrake}
        >
          {isEnglish ? "BRAKE" : "煞車"}
        </Button>
      )}

      {phase === "completed" && (
        <>
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            {reactionTime !== null ? (
              <>
                <p className="font-semibold">
                  {isEnglish
                    ? `Your game response was ${formatReactionTime(reactionTime)}.`
                    : `你在遊戲中的反應時間為 ${formatReactionTime(reactionTime)}。`}
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  {isEnglish
                    ? `At ${demonstrationSpeedKmh} km/h, the vehicle would travel approximately ${reactionDistance?.toFixed(1)} metres during this reaction time before braking begins.`
                    : `以每小時 ${demonstrationSpeedKmh} 公里行駛，車輛在開始煞車前，於這段反應時間內約行駛 ${reactionDistance?.toFixed(1)} 米。`}
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {isEnglish
                    ? `Game reflection: ${score}/100`
                    : `遊戲反思分數：${score}/100`}
                </p>
              </>
            ) : (
              <p className="font-semibold">
                {isEnglish
                  ? "No response was recorded within the trial time."
                  : "在這次體驗時間內沒有記錄到反應。"}
              </p>
            )}

            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              {isEnglish
                ? "This is a simplified demonstration. It is not a clinical reaction-time assessment and does not determine fitness to drive."
                : "這是一個簡化示範，並不是臨床反應時間評估，也不能用作判斷是否適合駕駛。"}
            </p>
          </div>

          <OTSupportCard
            language={language}
            assessment={story.assessment.map(
              (item) =>
                getLocalizedText(item, language)
            )}
            support={story.support.map(
              (item) =>
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
                stage: "braking",
                score,
                observations: {
                  reactionTimeMs:
                    reactionTime === null
                      ? 0
                      : Math.round(reactionTime),
                  reactionDistanceMetres:
                    reactionDistance === null
                      ? 0
                      : Number(
                          reactionDistance.toFixed(1)
                        ),
                  respondedDuringTrial:
                    reactionTime !== null,
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
