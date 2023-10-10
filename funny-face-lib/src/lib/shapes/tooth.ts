import { ToothShape } from "../types";

export const toothShapes: { [index: string]: ToothShape } = {
    pointy: [
        [0, 0], [.1, 1], [.5, 1.2], [.9, 1], [1, 0]
    ],
    square: [
        [0, 0], [0, 1], [1, 1], [1, 0]
    ],
    long: [
        [0, 0], [0, 1.3], [1, 1.3], [1, 0]
    ],
    missing: [],
}
