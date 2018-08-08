/**
 *  Calculate zoom step size given number of steps
 *  @param {number} [numSteps=0] - Number of expected zoom levels
 *  @param {number} [maxScale=1] - maximum scale factor to get to actual image resolution 
 *  @returns {number} Zoom step size to 2 decimal places
 */

export function determineStepSize(numSteps, maxScale) {
  return Math.max(Math.ceil((maxScale-1)/(numSteps-1)*100)/100, 1)
}
