import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { clamp, getDistanceAndDirection } from "../../lib/calcuations";
import { FacialExpression, MouthArrangement } from "../../lib/expressions";
import type { FaceProfile } from "../../lib/faceProfile";
import { getMaskUrl } from "../../lib/unique-id";
import { useInterval } from "../../lib/useInterval";
import Eye from "./Eye";
import EyeBrow from "./EyeBrow";
import FeatureFrame from "./FeatureFrame";
import Mouth from "./Mouth";
import Teeth from "./Teeth";


interface Props {
    x: number;
    y: number;
    size?: number
    followMouse?: boolean
    ident: string
    expression?: FacialExpression
    profile?: FaceProfile
    talking?: boolean
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

export const Face = ({ x, y, followMouse, size = defaultFaceSize, ident, expression, profile = {}, talking }: Props) => {
    const [direction, setDirection] = useState<[number, number]>([0, 0])
    const [dilation, setDilation] = useState<number>(1)
    const [browTilt, setBrowTilt] = useState<number>(0)
    const [browRaise, setBrowRaise] = useState<number>(0)
    const [talkingMouth, setTalkingMouth] = useState<MouthArrangement>({})
    const noseRef = useRef<SVGCircleElement>(null);

    const trackMouse = (event: MouseEvent) => {
        if (!followMouse) { return }
        const { current: nose } = noseRef
        if (!nose) { return }
        const { left: noseLeft, top: noseTop, width, height } = nose.getBoundingClientRect();
        const { clientX, clientY } = event
        const { distance, relativeDisplacement } = getDistanceAndDirection(clientX, clientY, noseLeft + (width / 2), noseTop + (height / 2))

        setDirection(distance < size ? [0, 0] : relativeDisplacement)
        setDilation(calculateDilation(distance))
        setBrowTilt(calculateEyebrowTilt(distance))
        setBrowRaise(calculateEyebrowRise(distance))
    }

    const talk = () => {
        setTalkingMouth({
            open: Math.random(),
            pucker: Math.random(),
            smile: Math.random() - .5,
        })
    }
    useInterval(talk, talking ? 300 : 0)

    useEffect(() => {
        window.addEventListener('mousemove', trackMouse)
        return () => {
            window.removeEventListener('mousemove', trackMouse)
        }
    })

    useEffect(() => {
        if (!followMouse) {
            setDirection([0, 0])
        }
    }, [followMouse])

    const { eyeDistance = 40, mouthVerticalPosition = 20, mouthWidth = 40, eyeColor, browType, round = .5, width = 1, color = 'lightgray' } = profile
    const eyeX = clamp(eyeDistance, 75, 25) / 2
    const eyePosLeft = !expression ? { dilation, browTilt, browRaise } : { ...expression?.leftEye, direction };
    const eyePosRight = !expression ? { dilation, browTilt, browRaise } : { ...expression?.rightEye, direction };

    const mouthY = clamp(mouthVerticalPosition, 50, 5)
    const mouthIdent = ident + '-mouth'

    return (
        <FeatureFrame x={x} y={y} size={size} placement='top left'>
            <rect x={-50 * width} y={-50} width={100 * width} height={100} stroke={'black'} fill={color} rx={100 * (round / 2)} />
            <circle ref={noseRef} cx={0} cy={0} r={5} fill={'black'} />
            <Eye ident={ident + '-eye-left'}
                x={-eyeX} y={-10} size={25}
                color={eyeColor}
                pos={eyePosLeft}
                direction={direction} />
            <Eye ident={ident + '-eye-right'}
                x={eyeX} y={-10} size={25}
                color={eyeColor}
                pos={eyePosRight}
                direction={direction} />
            <EyeBrow
                x={-eyeX} y={-25} size={30}
                pos={eyePosLeft}
                browType={browType} />
            <EyeBrow
                x={eyeX} y={-25} size={30}
                pos={eyePosRight}
                browType={browType}
                right />
            <Mouth ident={mouthIdent}
                x={0} y={mouthY} size={mouthWidth}
                arrangement={talking ? talkingMouth : expression?.mouth}
                lipColor={profile?.lipColor}
                lipWidth={profile?.lipWidth}
            >
                <Teeth maskUrl={getMaskUrl(mouthIdent)}
                    toothList={profile?.teeth} />
            </Mouth>
        </FeatureFrame>
    )
}
export default Face

