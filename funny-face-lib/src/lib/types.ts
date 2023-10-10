export interface FaceProfile {
    width?: number;
    round?: number;
    color?: string;
    browShape?: BrowShape;
    eyeColor?: string;
    eyeDistance?: number;
    mouthWidth?: number;
    mouthNoseDistance?: number;
    lipColor?: string;
    browColor?: string;
    lipWidth?: number;
    teeth?: ToothShape[];
    noseHeight?: number;
    noseWidth?: number;
}

export type BrowShape = Readonly<[number, number][]>
export type ToothShape = Readonly<[number, number][]>
export type ProfileNumberProperty = 'width' | 'round' | 'eyeDistance' | 'mouthWidth' | 'lipWidth' | 'mouthNoseDistance' | 'noseHeight' | 'noseWidth'
export type ProfileColorProperty = 'eyeColor' | 'color' | 'lipColor' | 'browColor'
