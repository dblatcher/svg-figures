import { BrowShape } from '../types';

const NONE: BrowShape = [];
const THIN: BrowShape = [
  [-0.5, 0.0],
  [0.4, 0.0],
  [0.5, 0.2],
  [-0.5, 0.0],
];
const WIDE: BrowShape = [
  [-0.8, -0.2],
  [0.4, 0.0],
  [0.5, 0.2],
  [-0.0, 0.05],
  [-0.5, 0.1],
];

export const browShapes = {
  NONE,
  THIN,
  WIDE,
};
