export function clamp(value: number, max = 1, min = 0) {
    return Math.max(Math.min(value, max), min)
}

export function getDistanceAndDirection(x1: number, y1: number, x2: number, y2: number) {

    const displacement = [x1 - x2, y1 - y2]
    const magnitude = Math.max(...displacement.map(v => Math.abs(v)))
    const relativeDisplacement = displacement.map(v => v / magnitude) as [number, number]
    const distance = Math.sqrt(displacement[0] ** 2 + displacement[1] ** 2)

    return {
        distance, relativeDisplacement
    }
}
