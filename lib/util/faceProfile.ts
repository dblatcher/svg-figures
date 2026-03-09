import { PROFILE_DEFAULTS } from '../defaults';
import { type ProfileColorProperty, type ProfileNumberProperty } from '../types';

export const profileNumberProperyData: {
  property: ProfileNumberProperty;
  min?: number;
  max: number;
  step?: number;
}[] = [
    { property: 'width', min: 0.5, max: 1.5 },
    { property: 'round', max: 1 },
    { property: 'eyeDistance', min: 25, max: 100, step: 1 },
    { property: 'lipWidth', min: 1, max: 10 },
    { property: 'mouthWidth', min: 10, max: 100, step: 1 },
    { property: 'mouthNoseDistance', min: 5, max: 40, step: 1 },
    { property: 'noseHeight', min: 5, max: 30, step: 1 },
    { property: 'noseWidth', min: 5, max: 30, step: 1 },
    { property: 'chinWidth', min: 0, max: 60, step: 1 },
    { property: 'chinHeight', min: 0, max: 30, step: 1 },
    { property: 'earWidth', min: 0, max: 20, step: 1 },
    { property: 'earHeight', min: 0, max: 60, step: 1 },
  ];

export const profileColorProperyData: {
  property: ProfileColorProperty;
  default: string;
}[] = [
    { property: 'color', default: PROFILE_DEFAULTS.color },
    { property: 'eyeColor', default: PROFILE_DEFAULTS.eyeColor },
    { property: 'lipColor', default: PROFILE_DEFAULTS.lipColor },
    { property: 'browColor', default: PROFILE_DEFAULTS.browColor },
  ];
