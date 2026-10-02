import {
  useState,
  type KeyboardEvent,
} from "react";
import { Button } from "../components/Button";
import { CaseStoryCard } from "../components/CaseStoryCard";
import { OTSupportCard } from "../components/OTSupportCard";
import {
  getLocalizedText,
  liStageStories,
} from "../data/liStory";
import { scoreParkingDistance } from "../lib/scoring";
import type { RehabStageProps } from "../types/game";

interface Position {
  x: number;
  y: number;
}

type Direction =
  | "up"
  | "down"
  | "left"
  | "right";

const startingPosition: Position = {
  x: 12,
  y: 76,
};

const targetPosition: Position = {
  x: 70,
  y: 34,
};

const stepSize = 4;

function limit(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

export function MirrorPositionParkGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.mirrorPositionPark;

  const [car, setCar] = useState<Position>(
    startingPosition
  );

  const [submitted, setSubmitted] = useState(false);

  const distanceFromTarget = Math.hypot(
    car.x - targetPosition.x,
    car.y - targetPosition.y
  );

  /*
   * The scoring function uses a simplified game distance.
   * This is not a real-world parking measurement.
   */
  const gameDistance = distanceFromTarget / 3;
  const score = scoreParkingDistance(gameDistance);

  function moveCar(direction: Direction) {
    if (submitted) {
      return;
    }

    let horizontalChange = 0;
    let verticalChange = 0;

    switch (direction) {
      case "up":
        verticalChange = -stepSize;
        break;

      case "down":
        verticalChange = stepSize;
        break;

      case "left":
        horizontalChange = -stepSize;
        break;

      case "right":
        horizontalChange = stepSize;
        break;
    }

    setCar((current) => ({
      x: limit(
        current.x + horizontalChange,
        5,
        86
      ),
      y: limit(
        current.y + verticalChange,
        8,
        87
      ),
    }));
  }

  function handleKeyboard(
    event: KeyboardEvent<HTMLDivElement>
  ) {
    const keyboardDirections: Record<
      string,
      Direction | undefined
    > = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      W: "up",
      s: "down",
      S: "down",
      a: "left",
      A: "left",
      d: "right",
      D: "right",
    };

    const direction =
      keyboardDirections[event.key];

    if (!direction) {
      return;
    }

    event.preventDefault();
    moveCar(direction);
  }

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
        tabIndex={0}
        onKeyDown={handleKeyboard}
        aria-label={
          isEnglish
            ? "Interactive parking area. Use the arrow keys or the buttons to move the car."
            : "互動泊車區域。使用方向鍵或按鈕移動車輛。"
        }
        className="relative h-80 overflow-hidden rounded-2xl bg-slate-700 outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        {/* Roadway */}
        <div className="absolute inset-x-[24%] inset-y-0 bg-slate-500">
          <div className="absolute inset-y-0 left-1/2 border-l-4 border-dashed border-yellow-200" />
        </div>

        {/* Grass */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-green-500" />

        {/* Parking target */}
        <div
          className="absolute flex h-24 w-32 items-center justify-center border-4 border-dashed border-yellow-300 bg-yellow-300/10"
          style={{
            left: `${targetPosition.x}%`,
            top: `${targetPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="text-center text-xs font-bold text-yellow-100">
            {isEnglish
              ? "PARK HERE"
              : "泊車位置"}
          </span>
        </div>

        {/* Static obstacles */}
        <div
          aria-hidden="true"
          className="absolute left-[22%] top-[24%] flex h-16 w-20 items-center justify-center rounded-lg bg-red-700 text-2xl"
        >
          🚗
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[45%] top-[68%] flex h-16 w-20 items-center justify-center rounded-lg bg-purple-700 text-2xl"
        >
          🚙
        </div>

        {/* Player car */}
        <div
          aria-label={
            isEnglish ? "Your car" : "你的車輛"
          }
          className="absolute flex h-16 w-24 items-center justify-center rounded-xl bg-blue-600 text-3xl shadow-lg transition-all duration-150"
          style={{
            left: `${car.x}%`,
            top: `${car.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          🚘
        </div>

        <div className="absolute bottom-3 left-0 right-0 text-center text-xs font-semibold text-white">
          {isEnglish
            ? "Move slowly and keep checking your position."
            : "慢速移動，並持續檢查車輛位置。"}
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-slate-800">
            {isEnglish
              ? "Control the car"
              : "控制車輛"}
          </p>

          <p className="text-xs text-slate-500">
            {isEnglish
              ? "Arrow keys / WASD also work"
              : "方向鍵／WASD 也可以使用"}
          </p>
        </div>

        <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-2">
          <div />

          <Button
            size="sm"
            variant="outline"
            disabled={submitted}
            aria-label={
              isEnglish
                ? "Move car up"
                : "向上移動車輛"
            }
            onClick={() => moveCar("up")}
          >
            ↑
          </Button>

          <div />

          <Button
            size="sm"
            variant="outline"
            disabled={submitted}
            aria-label={
              isEnglish
                ? "Move car left"
                : "向左移動車輛"
            }
            onClick={() => moveCar("left")}
          >
            ←
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={submitted}
            aria-label={
              isEnglish
                ? "Move car down"
                : "向下移動車輛"
            }
            onClick={() => moveCar("down")}
          >
            ↓
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={submitted}
            aria-label={
              isEnglish
                ? "Move car right"
                : "向右移動車輛"
            }
            onClick={() => moveCar("right")}
          >
            →
          </Button>
        </div>
      </div>

      {!submitted ? (
        <Button
          fullWidth
          onClick={() => setSubmitted(true)}
        >
          {isEnglish
            ? "Check parking position"
            : "檢查泊車位置"}
        </Button>
      ) : (
        <>
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? `Your game distance from the target was ${distanceFromTarget.toFixed(1)} units.`
                : `你與目標位置的遊戲距離為 ${distanceFromTarget.toFixed(1)} 個單位。`}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "This simplified activity is for learning only and does not measure real-world parking ability."
                : "這個簡化活動只供學習用途，並不代表實際泊車能力。"}
            </p>

            <p className="mt-2 text-sm font-semibold">
              {isEnglish
                ? `Game score: ${score}/100`
                : `分數：${score}/100`}
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
                stage: "mirrorPositionPark",
                score,
                observations: {
                  distanceFromTarget: Number(
                    distanceFromTarget.toFixed(1)
                  ),
                  usedDirectionalControls: true,
                  parkedNearTarget: score >= 80,
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
