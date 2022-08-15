export interface FaceProfile {
    width?: number;
    round?: number;
    color?: string;
    browShape?: BrowShape;
    eyeColor?: string;
    eyeDistance?: number;
    mouthWidth?: number;
    mouthVerticalPosition?: number;
    lipColor?: string;
    browColor?: string;
    lipWidth?: number;
    teeth?: ToothShape[];
}

export type BrowShape = Readonly<[number, number][]>
export type ToothShape = Readonly<[number, number][]>
export type ProfileNumberProperty = 'width' | 'round' | 'eyeDistance' | 'mouthWidth' | 'lipWidth' | 'mouthVerticalPosition'
export type ProfileColorProperty = 'eyeColor' | 'color' | 'lipColor' | 'browColor'

export const profileNumberProperyData: { property: ProfileNumberProperty, min?: number, max: number, step?: number }[] = [
    { property: "width", min: 0.5, max: 1.5, },
    { property: "round", max: 1 },
    { property: "eyeDistance", min: 25, max: 100, step: 1 },
    { property: "lipWidth", min: 1, max: 10 },
    { property: "mouthWidth", min: 10, max: 100, step: 1 },
    { property: "mouthVerticalPosition", min: 5, max: 50, step: 1 }
]

export const profileColorProperyData: { property: ProfileColorProperty, default: string }[] = [
    { property: 'color', default: '#999999' },
    { property: 'eyeColor', default: '#009999' },
    { property: 'lipColor', default: '#900000' },
    { property: 'browColor', default: '#000000' },
]
