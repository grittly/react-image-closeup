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
    it('Returns mid position if size is less than max-min', () => {
      const [pos, size, min, max] = [10, 20, 0, 100];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(40);
    });
    it('Returns min position if coordinate is greater than min and size is > than max-min', () => {
      const [pos, size, min, max] = [10, 110, 0, 100];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(0);
    });
    it('Returns max position if coordinate + size is less than max and size is > max-min', () => {
      const [pos, size, min, max] = [-10, 105, 0, 100];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(-5);
    });
    it('Returns same position if coordinate < min and cordinate + size > max while size > max-min', () => {
      const [pos, size, min, max] = [-10, 120, 0, 100];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(-10);
    });
    it('Default min is 0', () => {
      const [pos, size, min, max] = [10, 110, undefined, 100];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(0);
    });
    it('If no max provided, return same pos', () => {
      const [pos, size, min, max] = [-10, 105, 0, undefined];
      const result = coordWithinRange(pos, size, min, max);
      expect(result).to.equal(-10);
    });
  });
});
