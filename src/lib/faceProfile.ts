interface FaceProfile {
    browType?: 'thin' | 'wide';
    eyeColor?: string;
    eyeDistance?: number;
    mouthWidth?: number;
    mouthVerticalPosition?: number;
    lipColor?: string;
    lipWidth?: number;
    teeth?: ToothShape[];
}

type BrowShape = [number, number][]
type ToothShape = [number, number][]



export type { FaceProfile, BrowShape, ToothShape }

export const browShapes: { [index: string]: BrowShape } = {
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

