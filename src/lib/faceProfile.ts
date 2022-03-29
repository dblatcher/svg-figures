interface FaceProfile {
    browType?: 'thin' | 'wide';
    eyeColor?: string;
    eyeDistance?: number;
}

type BrowShape = [number, number][]

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

export type { FaceProfile, BrowShape }