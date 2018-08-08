/* global it, describe */
import {
  determineStepSize,
  coordWithinRange,
} from '../src/helpers';

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
  describe('coordWithinRange', () => {
    it('Returns same coordinate if it is within range', () => {
      const [coord, min, max] = [10, 2, 20];
      const result = coordWithinRange(coord, min, max);
      expect(result).to.equal(10);
    });
    it('Returns min value if coordinate is less than', () => {
      const [coord, min, max] = [0, 2, 20];
      const result = coordWithinRange(coord, min, max);
      expect(result).to.equal(2);
    });
    it('Returns max value if coordinate is greater than', () => {
      const [coord, min, max] = [22, 2, 20];
      const result = coordWithinRange(coord, min, max);
      expect(result).to.equal(20);
    });
    it('Returns same coordinate if max value is not specified', () => {
      const [coord, min, max] = [22, 2, undefined];
      const result = coordWithinRange(coord, min, max);
      expect(result).to.equal(22);
    });
    it('Returns 0 as default min value if coord is negative', () => {
      const [coord, min, max] = [-2, undefined, undefined];
      const result = coordWithinRange(coord, min, max);
      expect(result).to.equal(0);
    });
  });
});
