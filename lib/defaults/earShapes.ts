import type { PathShape } from "../types";

const NONE: PathShape = ""
const NORMAL: PathShape = "M-20 40 A25 20 -20 0 1 100 60 A40 40 0 0 0 100 70 A40 25 10 0 1 -10 70";
const WIDE: PathShape = "M0 20 Q100 0 100 50 L100 70 Q50 100 -20 100";
const CURVED: PathShape = "M0 20 Q100 0 50 50 L100 70 Q0 100 20 100";
const POINTY: PathShape = "M0 30 L40 0 L100 50 A20 25 30 0 1 0 90";

export const earShapes = {
    NONE,
    NORMAL,
    WIDE,
    CURVED,
    POINTY,
}
