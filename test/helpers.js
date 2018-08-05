/* global it, describe */
import { determineStepSize } from '../src/helpers';

const { expect } = require('chai');

describe('helpers', () => {
  describe('determineStepSize', () => {
    it('Min step size generated is 1');
    it('Calculates step size that slightly overshoots max scale at max zoom Level');
  });
});
