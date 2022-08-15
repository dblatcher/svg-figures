import { BrowShape } from "../lib/faceProfile";

export type BrowType = 'none' | 'thin' | 'wide';

export const browShapes: Record<BrowType, BrowShape> = {
    none: [],
    thin: [
        [-0.5, 0.0],
        [0.4, 0.0],
        [0.5, 0.2],
        [-0.5, 0.0],
    ],
    wide: [
        [-0.8, -0.2],
        [0.4, 0.0],
        [0.5, 0.2],
        [-0.0, 0.05],
        [-0.5, 0.1],
    ]
}