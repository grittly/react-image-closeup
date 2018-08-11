/**
 *  Calculate zoom step size given number of steps
 *  @param {number} [numSteps=0] - Number of expected zoom levels
 *  @param {number} [maxScale=1] - maximum scale factor to get to actual image resolution
 *  @returns {number} Zoom step size to 2 decimal places
 */

export function determineStepSize(numSteps, maxScale) {
  return Math.max((Math.ceil((maxScale - 1) / (numSteps - 1)) * 100) / 100, 1);
}


/**
 *  Calculate image position given window bountaries within a single dimension
 *  @param {number} pos - position relative to center
 *  @param {number} size - width/height
 *  @param {number} stageSize - boundary position
 *  @returns {number} corrected coordinate that falls within
 *  allowed range given provided size and stageSize
 */

export function positionWithinRange(pos, size, stageSize) {
  if (size && stageSize) {
    const maxTranslate = (stageSize / 2) - (size / 2);
    if (size < stageSize) {
      return 0;
    } else if (size > stageSize && pos > 0 && (pos) >= (size / 2) - (stageSize / 2)) {
      return -maxTranslate;
    } else if (size > stageSize && pos < 0 && (pos) <= (stageSize / 2) - (size / 2)) {
      return maxTranslate;
    }
  }
  return pos;
}
