/* eslint-disable @typescript-eslint/explicit-function-return-type */

export function clamp(value: number, max = 1, min = 0) {
    return Math.max(Math.min(value, max), min)
}

export function eventToNumber(event: Event, defaultValue = 0): number {
    if (!event.target) { return defaultValue }
    const numericalValue = Number((event.target as HTMLInputElement).value);
    return isNaN(numericalValue) ? defaultValue : numericalValue;
}

export function eventToBoolean(event: Event, defaultValue = false): boolean {
    if (!event.target) { return defaultValue }
    return (event.target as HTMLInputElement).checked;
}

export function eventToString(event: Event, defaultValue = ''): string {
    if (!event.target) { return defaultValue }
    return (event.target as HTMLInputElement).value;
}


export function listIds<T extends { id: string }>(list: T[]): string[] {
    return list.map(_ => _.id)
}

export function findById<T extends { id: string }>(id: string | undefined, list: T[]): (T | undefined) {
    if (!id) { return undefined }
    return list.find(_ => _.id === id)
}

export function findIndexById<T extends { id: string }>(id: string | undefined, list: T[]): (number) {
    if (!id) { return -1 }
    return list.findIndex(_ => _.id === id)
}
