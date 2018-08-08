/* global it, describe */
import { determineStepSize } from '../src/helpers';

const { expect } = require('chai');

describe('helpers', () => {
  describe('determineStepSize', () => {
    it('Calcualates step size', () => {
      const [numSteps, maxScale] = [3, 7];
      const result = determineStepSize(numSteps, maxScale);
      expect(result).to.equal(3);
    });

    it('Min stepSize is 1', () => {
      const [numSteps, maxScale] = [7, 6];
      const result = determineStepSize(numSteps, maxScale);
      expect(result).to.equal(1);
    });

    it('Calculates step size that is equal or slightly overshoots max scale at max zoom Level', () => {
      const [numSteps, maxScale] = [9, 22];
      const result = determineStepSize(numSteps, maxScale);
      expect((result * (numSteps - 1)) + 1).to.be.gte(maxScale);
    });
  });
});
