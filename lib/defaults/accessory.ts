import type { Accessory } from '../types';
import monocle from '../assets/monocle.png';
import moustache from '../assets/moustache.png';
import hat from '../assets/non-burning-hat.png';
import jewel from '../assets/jewel.png';
import redHair from '../assets/red-hair.png';

export const accessoryMap: Record<string, Accessory> = {
  HAT: {
    src: hat,
    x: 0,
    y: -60,
    width: 80,
  },
  RED_HAIR: {
    src: redHair,
    adjustWidth: true,
    x: 0,
    y: -30,
    width: 120,
  },
  MONOCLE: {
    src: monocle,
    x: -14,
    y: 20,
    width: 64,
    place: 'right-eye',
  },
  MONOCLE_BACKWARDS: {
    src: monocle,
    x: -14,
    y: 20,
    width: 64,
    place: 'left-eye',
  },
  MOUSTACHE: {
    src: moustache,
    x: 0,
    y: 0,
    width: 64,
    place: 'nose',
  },
  BEARD: {
    src: moustache,
    x: 0,
    y: -10,
    width: 32,
    place: 'chin',
  },
  RIGHT_EARRING: {
    src: jewel,
    x: 5,
    y: 0,
    width: 20,
    place: 'right-ear',
  },
  LEFT_EARRING: {
    src: jewel,
    x: -5,
    y: 0,
    width: 20,
    place: 'left-ear',
  },
};
