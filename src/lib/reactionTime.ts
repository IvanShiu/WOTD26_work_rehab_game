export function calculateReactionDistance(
  speedKmh: number,
  reactionTimeMs: number
): number {
  const speedMetresPerSecond = speedKmh / 3.6;
  const reactionTimeSeconds = reactionTimeMs / 1000;

  return speedMetresPerSecond * reactionTimeSeconds;
}

export function formatReactionTime(
  reactionTimeMs: number
): string {
  return `${Math.round(reactionTimeMs)} ms`;
}
