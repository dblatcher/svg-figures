interface FaceProfile {
    width?: number;
    round?: number;
    color?: string;
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
type ProfileNumberProperty = 'width' | 'round' | 'eyeDistance' | 'mouthWidth' | 'lipWidth' | 'mouthVerticalPosition'
type ProfileColorProperty = 'eyeColor' | 'color' | 'lipColor'

export type { FaceProfile, BrowShape, ToothShape, ProfileNumberProperty, ProfileColorProperty }

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

export const profileNumberProperyData: { property: ProfileNumberProperty, min?: number, max: number, step?: number }[] = [
    { property: "width", min: 0.5, max: 1.5, },
    { property: "round", max: 1 },
    { property: "eyeDistance", min: 25, max: 100, step: 1 },
    { property: "lipWidth", min: 1, max: 10 },
    { property: "mouthWidth", min: 10, max: 100, step: 1 },
    { property: "mouthVerticalPosition", min: 5, max: 50, step: 1 }
]

export const profileColorProperyData: {property: ProfileColorProperty, default:string}[] = [
    {property: 'color', default:'#999999'},
    {property: 'eyeColor', default:'#009999'},
    {property: 'lipColor', default:'#900000'},
]
