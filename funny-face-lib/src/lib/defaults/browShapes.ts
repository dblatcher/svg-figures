import { BrowShape } from "../types";

export const browShapes: Record<string, BrowShape> = {
    NONE: [],
    THIN: [
        [-0.5, 0.0],
        [0.4, 0.0],
        [0.5, 0.2],
        [-0.5, 0.0],
    ],
    WIDE: [
        [-0.8, -0.2],
        [0.4, 0.0],
        [0.5, 0.2],
        [-0.0, 0.05],
        [-0.5, 0.1],
    ]
}