/**
 *  Calculate zoom step size given number of steps
 *  @param {number} [numSteps=0] - Number of expected zoom levels
 *  @param {number} [maxScale=1] - maximum scale factor to get to actual image resolution
 *  @returns {number} Zoom step size to 2 decimal places
 */

export function determineStepSize(numSteps, maxScale) {
  return Math.max(Math.ceil((maxScale-1)/(numSteps-1)*100)/100, 1)
}


/**
 *  Calculate image position given window bountaries within a single dimension
 *  @param {number} coord - provided coordinate
 *  @param {number} [min=0] - minimum allowed coordinate
 *  @param {number} max - maximum allowed coordinate
 *  @returns {number} coordinate that falls within allowed range
 */

export function coordWithinRange(coord, min=0, max) {
  if(max){
    return Math.min(Math.max(coord, min), max);
  }
    return Math.max(coord, min)
}
