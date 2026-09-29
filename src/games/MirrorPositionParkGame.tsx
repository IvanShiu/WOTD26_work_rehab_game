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

interface ScanPoint {
  id: string;
  label: {
    en: string;
    "zh-Hant": string;
  };
  icon: string;
}

const scanPoints: ScanPoint[] = [
  {
    id: "left-mirror",
    label: {
      en: "Left mirror",
      "zh-Hant": "左側後視鏡",
    },
    icon: "◀",
  },
  {
    id: "centre-mirror",
    label: {
      en: "Centre mirror",
      "zh-Hant": "中央後視鏡",
    },
    icon: "●",
  },
  {
    id: "right-mirror",
    label: {
      en: "Right mirror",
      "zh-Hant": "右側後視鏡",
    },
    icon: "▶",
  },
  {
    id: "blind-spot",
    label: {
      en: "Blind spot",
      "zh-Hant": "盲點",
    },
    icon: "!",
  },
];

const parkingOptions = [
  {
    id: "left",
    title: {
      en: "Park in the left space",
      "zh-Hant": "停在左側位置",
    },
  },
  {
    id: "centre",
    title: {
      en: "Park in the marked centre space",
      "zh-Hant": "停在中間標示的位置",
    },
  },
  {
    id: "right",
    title: {
      en: "Park in the right space",
      "zh-Hant": "停在右側位置",
    },
  },
];

export function MirrorPositionParkGame({
  language,
  onComplete,
}: RehabStageProps) {
  const isEnglish = language === "en";
  const story = liStageStories.mirrorPositionPark;

  const [checkedPoints, setCheckedPoints] = useState<string[]>(
    []
  );
  const [selectedParking, setSelectedParking] =
    useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const allPointsChecked =
    checkedPoints.length === scanPoints.length;

  const correctParking = selectedParking === "centre";

  const score = Math.round(
    (checkedPoints.length / scanPoints.length) * 60 +
      (correctParking ? 40 : 0)
  );

  function checkPoint(pointId: string) {
    if (submitted || checkedPoints.includes(pointId)) {
      return;
    }

    setCheckedPoints((current) => [
      ...current,
      pointId,
    ]);
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

      <div className="rounded-2xl bg-slate-700 p-5 text-center text-white">
        <div className="mb-3 text-5xl">🚙</div>

        <p className="text-sm">
          {isEnglish
            ? "Li is practising in a quiet parking area."
            : "李生正在安靜的停車場練習。"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {scanPoints.map((point) => {
            const checked = checkedPoints.includes(point.id);

            return (
              <button
                key={point.id}
                type="button"
                disabled={submitted || checked}
                aria-pressed={checked}
                onClick={() => checkPoint(point.id)}
                className={[
                  "min-h-12 rounded-xl border p-3",
                  "font-semibold transition-colors",
                  checked
                    ? "border-green-300 bg-green-500 text-white"
                    : "border-white/30 bg-white/10 text-white hover:bg-white/20",
                  "disabled:cursor-default",
                ].join(" ")}
              >
                <span className="mr-2">
                  {checked ? "✓" : point.icon}
                </span>

                {getLocalizedText(
                  point.label,
                  language
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          {isEnglish
            ? "Where should Li position the vehicle?"
            : "李生應該將車輛停在哪個位置？"}
        </h3>

        {parkingOptions.map((option) => {
          const selected = selectedParking === option.id;

          const status =
            submitted && option.id === "centre"
              ? "correct"
              : submitted && selected
                ? "incorrect"
                : "neutral";

          return (
            <ChoiceCard
              key={option.id}
              selected={selected}
              status={status}
              disabled={submitted}
              onClick={() =>
                setSelectedParking(option.id)
              }
            >
              {getLocalizedText(option.title, language)}
            </ChoiceCard>
          );
        })}
      </div>

      {!submitted ? (
        <Button
          fullWidth
          disabled={!allPointsChecked || !selectedParking}
          onClick={() => setSubmitted(true)}
        >
          {isEnglish
            ? "Review parking practice"
            : "查看泊車練習結果"}
        </Button>
      ) : (
        <>
          <div
            role="status"
            className="rounded-xl bg-blue-50 p-4 text-blue-950"
          >
            <p className="font-semibold">
              {allPointsChecked
                ? isEnglish
                  ? "Li completed the scanning routine."
                  : "李生完成了觀察程序。"
                : isEnglish
                  ? "Some viewing areas were missed."
                  : "李生漏看了一些觀察位置。"}
            </p>

            <p className="mt-2 text-sm leading-relaxed">
              {correctParking
                ? isEnglish
                  ? "The vehicle was positioned in the marked area."
                  : "車輛停在標示的位置。"
                : isEnglish
                  ? "The marked area was the preferred parking position for this practice."
                  : "這次練習中，標示的位置是較合適的泊車位置。"}
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
                stage: "mirrorPositionPark",
                score,
                observations: {
                  checkedAllViewingPoints: allPointsChecked,
                  selectedParking: selectedParking ?? "none",
                  usedScanningRoutine: allPointsChecked,
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
