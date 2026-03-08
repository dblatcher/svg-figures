import type { BrowShape } from '../types';

const NONE: BrowShape = "";
const THIN: BrowShape = "M -37.5 0 L 30 0 L 37.5 15 L -37.5 0";
const WIDE: BrowShape = "M -60 -15 L 30 0 L 37.5 15 L 0 3.75 L -37.5 7.5"


export const browShapes = {
  NONE,
  THIN,
  WIDE,
};
