interface Accessory {
    src: string;
    x: number;
    y: number;
    width: number;
    priority?: number;
    place?: 'left-eye' | 'right-eye' | 'nose' | 'chin';
}

export type { Accessory }


