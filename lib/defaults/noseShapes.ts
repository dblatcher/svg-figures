import type { PathShape } from "../types";

const NONE: PathShape = ""
const NORMAL: PathShape = "M50 25 A50 50 0 1 1 -50 25";
const ROUND: PathShape = "M1 0 A50 50 0 1 1 -1 0";
const STRAIGHT: PathShape = "M0 -5 L-50 100 A50 15 0 1 1 50 100"


export const noseShapes = {
    NONE,
    NORMAL,
    ROUND,
    STRAIGHT
}
