import { MouthArrangement } from "./expressions";

export type Position = {
    x: number; y: number;
}
export type LipCoordinates = {
    left: Position;
    right: Position;
    mid: Position;
    upper: Position;
    lower: Position;
}

export const getLipCoordinates = (arrangment: MouthArrangement = {}): LipCoordinates => {
    const { smile = 0, open = 0, pucker = 0 } = arrangment
    const endX = 50 * (1 - pucker / 2)
    const outerShift = open * 40
    const smileShift = smile * 15

    return {
        left: { x: -endX, y: -smile * 20 },
        right: { x: endX, y: -smile * 20 },
        mid: { x: 0, y: smileShift },
        upper: { x: 0, y: smileShift - outerShift },
        lower: { x: 0, y: smileShift + outerShift },
    }
}
