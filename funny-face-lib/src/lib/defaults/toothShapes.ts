import { ToothShape } from '../types';

export const toothShapes: Record<string, ToothShape> = {
  POINTY: [
    [0, 0],
    [0.1, 1],
    [0.5, 1.2],
    [0.9, 1],
    [1, 0],
  ],
  SQUARE: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  LONG: [
    [0, 0],
    [0, 1.15],
    [1, 1.15],
    [1, 0],
  ],
  LONGER: [
    [0, 0],
    [0, 1.3],
    [1, 1.3],
    [1, 0],
  ],
  MISSING: [],
};
