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
 *  @param {number} pos - top/left corner coordinate
 *  @param {number} size - width/height
 *  @param {number} [min=0] - minimum allowed coordinate
 *  @param {number} max - maximum allowed coordinate given size
 *  @returns {number} corrected coordinate that falls within allowed range given provided size
 */

export function coordWithinRange(pos, size, min = 0, max) {
  const stageSize = max - min;
  if (size < stageSize) {
    return ((max - min) / 2) - (size / 2);
  } else if (size > stageSize && pos >= min) {
    return min;
  } else if (size > stageSize && (pos + size) < max) {
    return max - size;
  }
  return pos;
}
