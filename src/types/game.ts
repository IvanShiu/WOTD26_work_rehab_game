export type Language = "en" | "zh-Hant";

export const assessmentStages = [
  "visionAttention",
  "blindSpot",
  "intersection",
  "braking",
  "parking",
  "returnToWork",
] as const;

export type AssessmentStage = (typeof assessmentStages)[number];

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
