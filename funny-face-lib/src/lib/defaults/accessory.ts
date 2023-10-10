import { Accessory } from "../types";

export const accessoryMap: Record<string, Accessory> = {
    HAT: {
        src: './assets/non-burning-hat.png',
        x: 0, y: -60, width: 80
    },
    BADGE: {
        src: './assets/favicon.ico',
        x: 0, y: -60, width: 20,
        priority: 2,
    },
    MONOCLE: {
        src: "./assets/monocle2.png", x: -14, y: 20, width: 64, place: 'right-eye'
    },
    MONOCLE_BACKWARDS: {
        src: "./assets/monocle2.png", x: -14, y: 20, width: 64, place: 'left-eye'
    },
    MOUSTACHE: {
        src: "./assets/moustache.png", x: 0, y: 0, width: 64, place: 'nose'
    },
    BEARD: {
        src: "./assets/moustache.png", x: 0, y: -10, width: 32, place: 'chin'
    },
}