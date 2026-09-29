export function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export function scoreFromFraction(
  achieved: number,
  total: number
): number {
  if (total <= 0) {
    return 0;
  }

  return clampScore((achieved / total) * 100);
}

/**
 * This is only an educational game score.
 * It is not a clinical reaction-time standard.
 */
export function scoreReactionTime(
  reactionTimeMs: number
): number {
  if (!Number.isFinite(reactionTimeMs) || reactionTimeMs <= 0) {
    return 0;
  }

  const fastExample = 400;
  const slowExample = 1600;

  const score =
    ((slowExample - reactionTimeMs) /
      (slowExample - fastExample)) *
    100;

  return clampScore(score);
}

/**
 * Distance is measured in the simplified game map,
 * not in real-world metres.
 */
export function scoreParkingDistance(
  distanceFromTarget: number
): number {
  const maximumGameDistance = 25;

  const score =
    100 -
    (distanceFromTarget / maximumGameDistance) * 100;

  return clampScore(score);
}

/**
 * Used for the return-to-work planning activity.
 * Incorrect choices reduce the educational score.
 */
export function scoreSelection(
  selectedIds: string[],
  correctIds: string[],
  incorrectPenalty = 20
): number {
  if (correctIds.length === 0) {
    return 0;
  }

  const correctSelected = selectedIds.filter((id) =>
    correctIds.includes(id)
  ).length;

  const incorrectSelected = selectedIds.filter(
    (id) => !correctIds.includes(id)
  ).length;

  const baseScore =
    (correctSelected / correctIds.length) * 100;

  return clampScore(
    baseScore - incorrectSelected * incorrectPenalty
  );
}
