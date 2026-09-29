import { useState } from "react";
import { Button } from "../components/Button";
import { scoreParkingDistance } from "../lib/scoring";
import type { StageProps } from "../types/game";

interface Position {
  x: number;
  y: number;
}

const targetPosition: Position = {
  x: 70,
  y: 35,
};

function limit(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function ParkingGame({
  language,
  onComplete,
}: StageProps) {
  const isEnglish = language === "en";

  const [car, setCar] = useState<Position>({
    x: 10,
    y: 72,
  });

  const [submitted, setSubmitted] = useState(false);

  const distance = Math.hypot(
    car.x - targetPosition.x,
    car.y - targetPosition.y
  );

  const score = scoreParkingDistance(distance);

  function moveCar(direction: "up" | "down" | "left" | "right") {
    if (submitted) {
      return;
    }

    const step = 5;

    setCar((current) => ({
      x: limit(
        current.x + (direction === "left" ? -step : direction === "right" ? step : 0),
        2,
        82
      ),
      y: limit(
        current.y + (direction === "up" ? -step : direction === "down" ? step : 0),
        5,
        88
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-600">
          {isEnglish ? "Stage 5" : "第 5 關"}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">
          {isEnglish
            ? "Parking and Vehicle Control"
            : "泊車與車輛控制"}
        </h2>

        <p className="mt-2 text-slate-600">
          {isEnglish
            ? "Use the controls to move the car into the marked parking space."
            : "使用控制按鈕，把車輛移入標示的泊車位置。"}
        </p>
      </div>

      <div
        className="relative h-72 overflow-hidden rounded-2xl bg-slate-600"
        aria-label={
          isEnglish ? "Parking area" : "泊車區域"
        }
      >
        <div
          className="absolute h-20 w-28 border-4 border-dashed border-yellow-300 bg-yellow-300/10"
          style={{
            left: `${targetPosition.x - 2}%`,
            top: `${targetPosition.y - 4}%`,
          }}
        >
          <span className="absolute -top-7 left-0 text-xs font-bold text-yellow-200">
            {isEnglish ? "PARK HERE" : "泊車位置"}
          </span>
        </div>

        <div className="absolute left-[25%] top-[20%] h-16 w-20 rounded-lg bg-red-700" />
        <div className="absolute left-[42%] top-[65%] h-16 w-20 rounded-lg bg-purple-700" />

        <div
          className="absolute flex h-16 w-24 items-center justify-center rounded-xl bg-blue-600 text-3xl shadow-lg transition-all duration-150"
          style={{
            left: `${car.x}%`,
            top: `${car.y}%`,
          }}
          aria-label={isEnglish ? "Your car" : "你的車輛"}
        >
          🚗
        </div>
      </div>

      <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">
        <div />

        <Button
          size="sm"
          variant="outline"
          aria-label={isEnglish ? "Move up" : "向上移動"}
          onClick={() => moveCar("up")}
        >
          ↑
        </Button>

        <div />

        <Button
          size="sm"
          variant="outline"
          aria-label={isEnglish ? "Move left" : "向左移動"}
          onClick={() => moveCar("left")}
        >
          ←
        </Button>

        <Button
          size="sm"
          variant="outline"
          aria-label={isEnglish ? "Move down" : "向下移動"}
          onClick={() => moveCar("down")}
        >
          ↓
        </Button>

        <Button
          size="sm"
          variant="outline"
          aria-label={isEnglish ? "Move right" : "向右移動"}
          onClick={() => moveCar("right")}
        >
          →
        </Button>
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
        <div className="space-y-4">
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {isEnglish
                ? "Parking practice completed."
                : "泊車練習完成。"}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {isEnglish
                ? "OTs may consider vehicle control, visuospatial skills, movement and the ability to use appropriate strategies."
                : "職業治療師可能會考慮車輛控制、視覺空間能力、動作表現，以及使用合適策略的能力。"}
            </p>

            <p className="mt-2 text-xs text-slate-600">
              {isEnglish
                ? "This game result is for learning only."
                : "這個遊戲結果只供學習用途。"}
            </p>
          </div>

          <Button
            fullWidth
            onClick={() =>
              onComplete({
                vehicleControl: score,
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
