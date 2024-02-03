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

export type BrowShape = Readonly<[number, number][]>;
export type ToothShape = Readonly<[number, number][]>;
export type ProfileNumberProperty =
  | 'width'
  | 'round'
  | 'eyeDistance'
  | 'mouthWidth'
  | 'lipWidth'
  | 'mouthNoseDistance'
  | 'noseHeight'
  | 'noseWidth';
export type ProfileColorProperty =
  | 'eyeColor'
  | 'color'
  | 'lipColor'
  | 'browColor';

export type Position = {
  x: number;
  y: number;
};

export type LipCoordinates = {
  left: Position;
  right: Position;
  mid: Position;
  upper: Position;
  lower: Position;
};

export interface EyeArrangement {
  /**how open the eye is: 
   *  - 0 (closed)
   *  - 0.75 (default)
   *  - 1 (wide open) 
   * */
  open?: number;
  /** angle in degrees of the eyebrow, 0 = horizontal */
  browTilt?: number;
  /** percentage increase in the Y position of the brow relative to the eye */
  browRaise?: number;
  /**how big the pupil is:
   * - 0 (no pupil)
   * - 1 (default)
   * - 2 (pupil fills iris)
   */
  dilation?: number;
}

export interface MouthArrangement {
  smile?: number;
  open?: number;
  pucker?: number;
}

export interface FacialExpression {
  leftEye: EyeArrangement;
  rightEye: EyeArrangement;
  mouth: MouthArrangement;
}

export interface Accessory {
  src: string;
  x: number;
  y: number;
  width: number;
  priority?: number;
  place?: 'left-eye' | 'right-eye' | 'nose' | 'chin';
}
