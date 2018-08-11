/* global it, describe */
import {
  determineStepSize,
  positionWithinRange,
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
  describe('positionWithinRange', () => {
    it('Returns same coordinate if either size or stageSize params are undefined', () => {
      let [pos, size, stageSize] = [12, undefined, 100];
      let result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal(pos);

      [pos, size, stageSize] = [12, 12, undefined];
      result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal(pos);
    });

    it('Return same coordinate if size > stageSize and both edges are outside stageSize boundaries', () => {
      const [pos, size, stageSize] = [12, 1000, 100];
      const result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal(pos);
    });

    it('Return 0 if size < stageSize', () => {
      const [pos, size, stageSize] = [12, 10, 100];
      const result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal(0);
    });

    it('Return same coordinate if size > stageSize and both edges are outside stageSize boundaries', () => {
      const [pos, size, stageSize] = [12, 1000, 100];
      const result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal(pos);
    });

    it('Snap to left if position given size is greater than left boundary and size > stageSize', () => {
      const [pos, size, stageSize] = [40, 120, 100];
      const result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal((-stageSize / 2) + (size / 2));
    });

    it('Snap to right if position given size is less than right boundary and size > stageSize', () => {
      const [pos, size, stageSize] = [-40, 120, 100];
      const result = positionWithinRange(pos, size, stageSize);
      expect(result).to.equal((stageSize / 2) - (size / 2));
    });
  });
});
