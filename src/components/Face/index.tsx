import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Eye from "../Eye";


interface Props {
    x: number;
    y: number;
    followMouse?: boolean
    eyeColor?: string
}

const noseRadius = 4;
const dilationRange = 150

function calculateDilation(distance: number) {
    if (distance > dilationRange) { return 1 }
    return Math.min(1 + ((dilationRange - distance) / dilationRange), 1.5)
}

export const Face = ({ x, y, followMouse, eyeColor }: Props) => {

    const [direction, setDirection] = useState<[number, number]>([0, 0])
    const [dilation, setDilation] = useState<number>(1)
    const noseRef = useRef<SVGCircleElement>(null);

    const trackMouse = (event: MouseEvent) => {
        if (!followMouse) { return }
        const { current: nose } = noseRef
        if (!nose) { return }
        const { left: noseLeft, top: noseTop } = nose.getBoundingClientRect();
        const { clientX, clientY } = event
        const displacement = [clientX - noseLeft - (noseRadius / 2), clientY - noseTop - (noseRadius / 2)]
        const magnitude = Math.max(...displacement.map(v => Math.abs(v)))
        const relativeDisplacement = displacement.map(v => v / magnitude)
        setDirection(relativeDisplacement as [number, number])

        const distance = Math.sqrt(displacement[0] ** 2 + displacement[1] ** 2)
        setDilation(calculateDilation(distance))
    }

    useEffect(() => {
        window.addEventListener('mousemove', trackMouse)
        return () => {
            window.removeEventListener('mousemove', trackMouse)
        }
    })

    return <>
        <Eye x={x - 6} y={y - 10} color={eyeColor} width={5} dilation={dilation} direction={direction} />
        <Eye x={x + 6} y={y - 10} color={eyeColor} width={5} dilation={dilation} direction={direction} />

        <circle ref={noseRef} cx={x} cy={y} r={noseRadius} fill={'black'} />
    </>
}
export default Face

