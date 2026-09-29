import type { ReactNode } from "react";
import { Button } from "./components/Button";
import { CaseStoryCard } from "./components/CaseStoryCard";
import { Disclaimer } from "./components/Disclaimer";
import { OTLearningProfile } from "./components/OTLearningProfile";
import { ProgressBar } from "./components/ProgressBar";
import { DriverDistractionDecisionGame } from "./games/DriverDistractionDecisionGame";
import { MirrorPositionParkGame } from "./games/MirrorPositionParkGame";
import { BrakingExperienceGame } from "./games/BrakingExperienceGame";
import { RoadworksDetourGame } from "./games/RoadworksDetourGame";
import { SafeFollowingDistanceGame } from "./games/SafeFollowingDistanceGame";
import { VehicleSetupChallengeGame } from "./games/VehicleSetupChallengeGame";
import { CommunityMobilityAlternativeGame } from "./games/CommunityMobilityAlternativeGame";
import {
  getLocalizedText,
  liCaseStory,
} from "./data/liStory";
import { useGameState } from "./hooks/useGameState";
import {
  rehabStages,
  type RehabStageId,
} from "./types/game";

function App() {
  const {
    state,
    startJourney,
    completeStage,
    setLanguage,
    resetJourney,
  } = useGameState();

  const isEnglish = state.language === "en";

  const currentProgress =
    state.currentStage === "welcome"
      ? 0
      : state.currentStage === "result"
        ? rehabStages.length
        : rehabStages.indexOf(
              state.currentStage as RehabStageId
            ) + 1;

  const isPlaying =
    state.currentStage !== "welcome" &&
    state.currentStage !== "result";

  function toggleLanguage() {
    setLanguage(
      isEnglish ? "zh-Hant" : "en"
    );
  }

  function renderCurrentScreen(): ReactNode {
    switch (state.currentStage) {
      case "welcome":
        return (
          <div className="space-y-6">
            <CaseStoryCard
              language={state.language}
              title={getLocalizedText(
                liCaseStory.introduction.title,
                state.language
              )}
              story={getLocalizedText(
                liCaseStory.introduction.story,
                state.language
              )}
              focus={getLocalizedText(
                liCaseStory.introduction.focus,
                state.language
              )}
            />

            <div className="rounded-xl bg-slate-100 p-4">
              <h2 className="font-bold text-slate-900">
                {isEnglish
                  ? "About Mr Li"
                  : "關於李生"}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {getLocalizedText(
                  liCaseStory.participant.background,
                  state.language
                )}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {getLocalizedText(
                  liCaseStory.participant.note,
                  state.language
                )}
              </p>
            </div>

            <Disclaimer language={state.language} />

            <Button
              fullWidth
              size="lg"
              onClick={startJourney}
            >
              {isEnglish
                ? "Start Lee's journey"
                : "開始李生的復康旅程"}
            </Button>
          </div>
        );

      case "vehicleSetup":
        return (
          <VehicleSetupChallengeGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "mirrorPositionPark":
        return (
          <MirrorPositionParkGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "safeFollowingDistance":
        return (
          <SafeFollowingDistanceGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "braking":
        return (
          <BrakingExperienceGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "roadworksDetour":
        return (
          <RoadworksDetourGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "driverDistraction":
        return (
          <DriverDistractionDecisionGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "communityMobility":
        return (
          <CommunityMobilityAlternativeGame
            language={state.language}
            onComplete={completeStage}
          />
        );

      case "result":
        return (
          <OTLearningProfile
            language={state.language}
            results={state.results}
            onReset={resetJourney}
          />
        );

      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {isEnglish
                ? "Occupational Therapy"
                : "職業治療"}
            </p>

            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              {isEnglish
                ? "Driving Rehabilitation Journey"
                : "駕駛復康旅程"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
            >
              {isEnglish ? "繁體中文" : "English"}
            </Button>

            {isPlaying && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetJourney}
              >
                {isEnglish ? "Reset" : "重設"}
              </Button>
            )}
          </div>
        </header>

        <div className="mb-5">
          <ProgressBar
            current={currentProgress}
            total={rehabStages.length}
            language={state.language}
            label={
              isEnglish
                ? "Rehabilitation journey"
                : "復康旅程進度"
            }
            showPercentage
          />
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          {renderCurrentScreen()}
        </section>

        <footer className="mt-5 text-center text-xs leading-relaxed text-slate-500">
          {isEnglish
            ? "Educational demonstration only. Not a formal driving assessment."
            : "本活動只供教育及體驗用途，並不是正式駕駛評估。"}
        </footer>
      </div>
    </main>
  );
}

export default App;
