import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { clamp, getDistanceAndDirection } from "../../lib/calcuations";
import type { FacialExpression } from "../../lib/expressions";
import type { FaceProfile } from "../../lib/faceProfile";
import Eye from "./Eye";
import EyeBrow from "./EyeBrow";
import FeatureFrame from "./FeatureFrame";
import Mouth from "./Mouth";


interface Props {
    x: number;
    y: number;
    size?: number
    followMouse?: boolean
    ident: string
    expression?: FacialExpression
    profile?: FaceProfile
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

export const Face = ({ x, y, followMouse, size = defaultFaceSize, ident, expression, profile = {} }: Props) => {
    const [direction, setDirection] = useState<[number, number]>([0, 0])
    const [dilation, setDilation] = useState<number>(1)
    const [browTilt, setBrowTilt] = useState<number>(0)
    const [browRaise, setBrowRaise] = useState<number>(0)
    const noseRef = useRef<SVGCircleElement>(null);

    const trackMouse = (event: MouseEvent) => {
        if (!followMouse) { return }
        const { current: nose } = noseRef
        if (!nose) { return }
        const { left: noseLeft, top: noseTop, width, height } = nose.getBoundingClientRect();
        const { clientX, clientY } = event
        const { distance, relativeDisplacement } = getDistanceAndDirection(clientX, clientY, noseLeft + (width / 2), noseTop + (height / 2))

        setDirection(relativeDisplacement)
        setDilation(calculateDilation(distance))
        setBrowTilt(calculateEyebrowTilt(distance))
        setBrowRaise(calculateEyebrowRise(distance))
    }

    useEffect(() => {
        window.addEventListener('mousemove', trackMouse)
        return () => {
            window.removeEventListener('mousemove', trackMouse)
        }
    })

    const { eyeDistance = 40, mouthHeight = 20, mouthWidth = 20, eyeColor, browType } = profile
    const eyeX = clamp(eyeDistance, 75, 25) / 2
    const eyePosLeft = !expression ? { dilation, browTilt, browRaise } : { ...expression?.leftEye, direction };
    const eyePosRight = !expression ? { dilation, browTilt, browRaise } : { ...expression?.rightEye, direction };

    return (
        <FeatureFrame x={x} y={y} size={size} placement='top left'>
            <rect x={-50} y={-50} width={100} height={100} stroke={'white'} fill={'none'} />
            <Eye ident={ident + '-eye-left'}
                x={-eyeX}
                y={-10}
                color={eyeColor}
                size={25}
                pos={eyePosLeft}
                direction={direction} />
            <Eye ident={ident + '-eye-right'}
                x={eyeX}
                y={-10}
                color={eyeColor}
                size={25}
                pos={eyePosRight}
                direction={direction} />
            <EyeBrow x={-eyeX} y={-25}
                size={30}
                pos={eyePosLeft}
                browType={browType} />
            <EyeBrow x={eyeX} y={-25}
                size={30}
                pos={eyePosRight}
                browType={browType}
                right />
            <circle ref={noseRef} cx={0} cy={0} r={5} fill={'black'} />

            <Mouth
                x={0}
                y={(50-mouthHeight)}
                size={mouthWidth}
            />
        </FeatureFrame>
    )
}
export default Face

