import { Button } from "./Button";
import { CaseStoryCard } from "./CaseStoryCard";
import { Disclaimer } from "./Disclaimer";
import { OTSupportCard } from "./OTSupportCard";
import {
  getLocalizedText,
  liCaseStory,
  liStageStories,
} from "../data/liStory";
import {
  rehabStages,
  type Language,
  type RehabStageId,
  type StageResult,
} from "../types/game";

interface OTLearningProfileProps {
  language: Language;
  results: Partial<Record<RehabStageId, StageResult>>;
  onReset: () => void;
}

function getReflection(
  score: number,
  language: Language
): string {
  if (language === "en") {
    if (score >= 80) {
      return "You used several helpful strategies in this activity.";
    }

    if (score >= 50) {
      return "You used some helpful strategies. Further practice may be useful.";
    }

    return "This activity highlights an area that could be explored further in a formal rehabilitation process.";
  }

  if (score >= 80) {
    return "你在這項活動中使用了多個有幫助的策略。";
  }

  if (score >= 50) {
    return "你使用了一些有幫助的策略，進一步練習可能會有幫助。";
  }

  return "這項活動顯示出一個在正式復康過程中可以進一步了解的範疇。";
}

function getStageResultText(
  result: StageResult | undefined,
  language: Language
): string {
  if (!result) {
    return language === "en"
      ? "Not completed"
      : "未完成";
  }

  return language === "en"
    ? "Completed"
    : "已完成";
}

export function OTLearningProfile({
  language,
  results,
  onReset,
}: OTLearningProfileProps) {
  const isEnglish = language === "en";

  const completedCount = rehabStages.filter(
    (stage) => results[stage]
  ).length;

  return (
    <div className="space-y-6">
      <CaseStoryCard
        language={language}
        title={getLocalizedText(
          liCaseStory.closing.title,
          language
        )}
        story={getLocalizedText(
          liCaseStory.closing.story,
          language
        )}
        focus={
          isEnglish
            ? "Driving rehabilitation considers the person, vehicle, environment and occupation together."
            : "駕駛復康會一併考慮個人、車輛、環境及職業要求。"
        }
      />

      <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
        <p className="font-semibold">
          {isEnglish
            ? `You completed ${completedCount} of ${rehabStages.length} activities.`
            : `你完成了 ${rehabStages.length} 個活動中的 ${completedCount} 個。`}
        </p>

        <p className="mt-2 text-sm leading-relaxed">
          {isEnglish
            ? "The observations below are for learning and discussion only. They are not a formal driving assessment or a decision about fitness to drive."
            : "以下觀察只供學習及討論用途，並不是正式駕駛評估，也不能用作判斷是否適合駕駛。"}
        </p>
      </div>

      <div className="space-y-4">
        {rehabStages.map((stage, index) => {
          const story = liStageStories[stage];
          const result = results[stage];
          const score = result?.score ?? 0;

          return (
            <article
              key={stage}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    {isEnglish
                      ? `Activity ${index + 1}`
                      : `第 ${index + 1} 個活動`}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {getLocalizedText(
                      story.title,
                      language
                    )}
                  </h3>
                </div>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs font-bold",
                    result
                      ? "bg-green-100 text-green-800"
                      : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {getStageResultText(result, language)}
                </span>
              </div>

              {result && (
                <>
                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {isEnglish
                          ? "Game reflection"
                          : "遊戲反思"}
                      </span>

                      <span className="font-bold text-blue-700">
                        {score}/100
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            Math.max(score, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {getReflection(score, language)}
                  </p>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {isEnglish
                        ? "Rehabilitation focus:"
                        : "復康重點："}
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {getLocalizedText(
                        story.strategy,
                        language
                      )}
                    </p>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>

      <OTSupportCard
        language={language}
        assessment={
          isEnglish
            ? [
                "Functional abilities related to driving",
                "Visual, cognitive and physical demands",
                "Vehicle control and environmental demands",
                "Work and community participation needs",
              ]
            : [
                "與駕駛有關的功能能力",
                "視覺、認知及身體要求",
                "車輛控制及環境要求",
                "工作及社區參與需要",
              ]
        }
        support={
          isEnglish
            ? [
                "Teach scanning, pacing and attention strategies",
                "Provide graded practice from simple to complex situations",
                "Support suitable vehicle setup and further adaptation assessment",
                "Plan gradual return to driving, work or alternative mobility",
              ]
            : [
                "教授視覺掃描、節奏控制及注意力策略",
                "由簡單至複雜提供分級練習",
                "協助合適的車輛設定，並按需要進一步評估輔助設備",
                "規劃逐步重返駕駛、工作或其他社區流動方案",
              ]
        }
        strategy={
          isEnglish
            ? "Safe participation is the goal. Driving may be one option, but it is not the only way to remain independent and involved in the community."
            : "安全參與才是目標。駕駛可以是其中一個方案，但並不是維持獨立生活及社區參與的唯一方法。"
        }
      />

      <Disclaimer language={language} />

      <Button fullWidth onClick={onReset}>
        {isEnglish
          ? "Start again"
          : "重新開始"}
      </Button>
    </div>
  );
}
