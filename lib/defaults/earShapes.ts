import type { PathShape } from "../types";

const NONE: PathShape = ""
const NORMAL: PathShape = "M0 20 Q100 0 100 50 L100 70 Q50 100 -20 100";
const CURVED: PathShape = "M0 20 Q100 0 50 50 L100 70 Q0 100 20 100";
const POINTY: PathShape = "M0 30 L40 0 L100 50 Q100 90 80 60 L0 60";

export const earShapes = {
    NONE,
    NORMAL,
    CURVED,
    POINTY,
}
