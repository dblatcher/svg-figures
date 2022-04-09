interface Accessory {
    src: string;
    x: number;
    y: number;
    width: number;
    priority?: number;
}

export type { Accessory }

export const accessoryMap: { [index: string]: Accessory } = {
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
        src: "./assets/monocle.png", x: 0, y: 8, width: 64
    },
}
