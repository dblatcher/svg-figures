import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { clamp, getDistanceAndDirection } from "../../lib/calcuations";
import Eye from "../Eye";
import EyeBrow from "../EyeBrow";


interface Props {
    x: number;
    y: number;
    size?: number
    followMouse?: boolean
    eyeColor?: string
    ident: string
}

const dilationRange = 150
const defaultFaceSize = 60

function calculateDilation(distance: number) {
    if (distance > dilationRange) { return 1 }
    return Math.min(1 + ((dilationRange - distance) / dilationRange), 1.5)
}

function calculateEyebrowTilt(distance: number) {
    return clamp((200 - distance) / 2, 30)
}

function calculateEyebrowRise(distance: number) {
    return clamp((200 - distance) / 8, 20)
}

export const Face = ({ x, y, followMouse, eyeColor, size = defaultFaceSize, ident }: Props) => {
    const [direction, setDirection] = useState<[number, number]>([0, 0])
    const [dilation, setDilation] = useState<number>(1)
    const [eybrowTilt, setEybrowTilt] = useState<number>(0)
    const [eybrowRise, setEybrowRise] = useState<number>(0)
    const noseRef = useRef<SVGCircleElement>(null);
    const noseRadius = size / 10
    const noseX = size / 2
    const noseY = size / 2

    const trackMouse = (event: MouseEvent) => {
        if (!followMouse) { return }
        const { current: nose } = noseRef
        if (!nose) { return }
        const { left: noseLeft, top: noseTop, width,height } = nose.getBoundingClientRect();
        const { clientX, clientY } = event
        const {distance, relativeDisplacement} = getDistanceAndDirection(clientX, clientY, noseLeft + (width / 2), noseTop + (height / 2))

        setDirection(relativeDisplacement)
        setDilation(calculateDilation(distance))
        setEybrowTilt(calculateEyebrowTilt(distance))
        setEybrowRise(calculateEyebrowRise(distance))
    }

    useEffect(() => {
        window.addEventListener('mousemove', trackMouse)
        return () => {
            window.removeEventListener('mousemove', trackMouse)
        }
    })

    return <svg x={x} y={y} width={size} height={size}>
        <rect x={0} y={0} width={size} height={size} stroke={'white'} fill={'none'} />
        <Eye ident={ident + '-eye-1'} x={size * (1 / 4)} y={size * (1 / 3)} color={eyeColor} size={size / 5} dilation={dilation} direction={direction} open={0.5} />
        <Eye ident={ident + '-eye-2'} x={size * (3 / 4)} y={size * (1 / 3)} color={eyeColor} size={size / 5} dilation={dilation} direction={direction} open={0.5} />
        <EyeBrow x={size * (1 / 4)} y={size * (1 / 6)} width={size / 2.5} angle={eybrowTilt} raised={eybrowRise} />
        <EyeBrow x={size * (3 / 4)} y={size * (1 / 6)} width={size / 2.5} angle={eybrowTilt} right />
        <circle ref={noseRef} cx={noseX} cy={noseY} r={noseRadius} fill={'black'} />
    </svg>
}
export default Face

