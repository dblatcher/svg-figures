import { earShapes } from '.';
import type { FaceProfile } from '../types';
import { browShapes } from './browShapes';

export * from './accessory';
export * from './browShapes';
export * from './earShapes';
export * from './expressions';
export * from './toothShapes';


export const PROFILE_DEFAULTS: Required<FaceProfile> = {
  width: 1,
  round: 0.5,
  eyeDistance: 40,
  mouthWidth: 50,
  lipWidth: 3,
  mouthNoseDistance: 15,
  noseHeight: 20,
  noseWidth: 20,
  chinWidth: 30,
  chinHeight: 20,
  earWidth: 10,
  earHeight: 40,
  color: '#999999',
  eyeColor: '#009999',
  lipColor: '#900000',
  browColor: '#000000',
  browShape: browShapes.THIN,
  earShape: earShapes.NORMAL,
  teeth: [],
}