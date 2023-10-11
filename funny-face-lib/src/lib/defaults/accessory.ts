import { Accessory } from "../types";
import monocle from "../assets/monocle.png"
import moustache from "../assets/moustache.png"
import hat from "../assets/non-burning-hat.png"

export const accessoryMap: Record<string, Accessory> = {
    HAT: {
        src: hat, x: 0, y: -60, width: 80
    },
    MONOCLE: {
        src: monocle, x: -14, y: 20, width: 64, place: 'right-eye'
    },
    MONOCLE_BACKWARDS: {
        src: monocle, x: -14, y: 20, width: 64, place: 'left-eye'
    },
    MOUSTACHE: {
        src: moustache, x: 0, y: 0, width: 64, place: 'nose'
    },
    BEARD: {
        src: moustache, x: 0, y: -10, width: 32, place: 'chin'
    },
}