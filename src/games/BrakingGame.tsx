import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import {
  calculateReactionDistance,
  formatReactionTime,
} from "../lib/reactionTime";
import { scoreReactionTime } from "../lib/scoring";
import type { StageProps } from "../types/game";

type TrialPhase =
  | "ready"
  | "waiting"
  | "hazard"
  | "completed";

const DEMONSTRATION_SPEED_KMH = 50;

export function BrakingGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";

  const [phase, setPhase] =
    useState<TrialPhase>("ready");
  const [reactionTime, setReactionTime] =
    useState<number | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function startTrial() {
    setReactionTime(null);
    setPhase("waiting");

    timerRef.current = window.setTimeout(() => {
      startTimeRef.current = performance.now();
      setPhase("hazard");

      timerRef.current = window.setTimeout(() => {
        setPhase("completed");
      }, 4000);
    }, 1000);
  }

  function pressBrake() {
    if (
      phase !== "hazard" ||
      startTimeRef.current === null
    ) {
      return;
    }

    const elapsed =
      performance.now() - startTimeRef.current;

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setReactionTime(elapsed);
    setPhase("completed");
  }

  const reactionDistance =
    reactionTime === null
      ? null
      : calculateReactionDistance(
          DEMONSTRATION_SPEED_KMH,
          reactionTime
        );

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 4" : "第 4 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Quick-Stop Demonstration"
            : "快速煞車體驗"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "When the hazard appears, press BRAKE as quickly as you can."
            : "當危險出現時，請盡快按下煞車按鈕。"}
        </p>
      </div>

      <div
        className={[
          "flex h-52 items-center justify-center",
          "rounded-2xl text-center transition-colors",
          phase === "hazard"
            ? "bg-red-600"
            : "bg-slate-700",
        ].join(" ")}
      >
        {phase === "hazard" ? (
          <div className="space-y-2 text-white">
            <div className="text-6xl">⚠️</div>
            <p className="text-xl font-bold">
              {isEnglish ? "HAZARD!" : "危險！"}
            </p>
          </div>
        ) : phase === "waiting" ? (
          <p className="text-xl font-bold text-white">
            {isEnglish ? "Get ready..." : "準備……"}
          </p>
        ) : phase === "completed" ? (
          <p className="text-xl font-bold text-white">
            {isEnglish
              ? "Trial complete"
              : "體驗完成"}
          </p>
        ) : (
          <p className="text-xl font-bold text-white">
            {isEnglish
              ? "Press start when ready"
              : "準備好後按開始"}
          </p>
        )}
      </div>

      {phase === "ready" && (
        <Button fullWidth size="lg" onClick={startTrial}>
          {isEnglish ? "Start trial" : "開始體驗"}
        </Button>
      )}

      {phase === "waiting" && (
        <Button
          fullWidth
          size="lg"
          disabled
          variant="secondary"
        >
          {isEnglish ? "Wait..." : "請等待……"}
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
        <div className="space-y-4">
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            {reactionTime !== null ? (
              <>
                <p className="font-semibold">
                  {isEnglish
                    ? `Your response in this game: ${formatReactionTime(reactionTime)}`
                    : `你在遊戲中的反應時間：${formatReactionTime(reactionTime)}`}
                </p>

                <p className="mt-2 text-sm leading-relaxed">
                  {isEnglish
                    ? `At 50 km/h, the vehicle would travel approximately ${reactionDistance?.toFixed(1)} metres during this reaction time, before braking begins.`
                    : `以每小時 50 公里行駛，車輛在開始煞車前，於這段反應時間內約行駛 ${reactionDistance?.toFixed(1)} 米。`}
                </p>
              </>
            ) : (
              <p className="font-semibold">
                {isEnglish
                  ? "No response was recorded in this trial."
                  : "這次體驗沒有記錄到反應。"}
              </p>
            )}

            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {isEnglish
                ? "This is a game demonstration, not a clinical reaction-time assessment."
                : "這只是遊戲示範，並不是臨床反應時間評估。"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                reactionPerformance:
                  reactionTime === null
                    ? 0
                    : scoreReactionTime(reactionTime),
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
