export type Language = "en" | "zh-Hant";

export type BilingualText = {
  en: string;
  "zh-Hant": string;
};

/* New Li rehabilitation journey */

export const rehabStages = [
  "vehicleSetup",
  "mirrorPositionPark",
  "safeFollowingDistance",
  "braking",
  "roadworksDetour",
  "driverDistraction",
  "communityMobility",
] as const;

export type RehabStageId =
  (typeof rehabStages)[number];

export type StagePhase =
  | "story"
  | "challenge"
  | "otSupport"
  | "retry"
  | "feedback";

export interface StageResult {
  stage: RehabStageId;
  score?: number;
  observations?: Record<
    string,
    boolean | number | string
  >;
}

export interface RehabStageProps {
  language: Language;
  onComplete: (result: StageResult) => void;
}

export type RehabScreenId =
  | "welcome"
  | RehabStageId
  | "result";

export interface RehabGameState {
  currentStage: RehabScreenId;
  completedStages: RehabStageId[];
  results: Partial<
    Record<RehabStageId, StageResult>
  >;
  language: Language;
}

/* Old prototype types kept temporarily */

export const assessmentStages = [
  "visionAttention",
  "blindSpot",
  "intersection",
  "braking",
  "parking",
  "returnToWork",
] as const;

export type AssessmentStage =
  (typeof assessmentStages)[number];

export type StageId =
  | "welcome"
  | AssessmentStage
  | "result";

export type Domain =
  | "visualAwareness"
  | "hazardDetection"
  | "decisionMaking"
  | "reactionPerformance"
  | "vehicleControl"
  | "workRehabilitation";

export type DomainScores = Partial<Record<Domain, number>>;

export interface GameState {
  currentStage: StageId;
  completedStages: AssessmentStage[];
  domainScores: DomainScores;
  language: Language;
}

export interface StageProps {
  language: Language;
  onComplete: (scores: DomainScores) => void;
}
