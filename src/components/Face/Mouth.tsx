import { h } from "preact";
import { MouthArrangement } from "../../lib/expressions";
import { getMaskId } from "../../lib/unique-id";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

const coor = (x: number, y: number) => `${x},${y}`

const getMouthPaths = (arrangment: MouthArrangement) => {
    const { smile = 0, open = 0, pucker = 0 } = arrangment

    const endX = 50 * (1 - pucker / 2)
    const leftEnd = coor(-endX, -smile * 20)
    const rightEnd = coor(endX, -smile * 20)

    const outerShift = open * 40
    const smileShift = smile * 15
    const midLineCP = coor(0, smileShift)
    const upperLipCP = coor(0, smileShift - outerShift)
    const lowerLipCP = coor(0, smileShift + outerShift)

    return {
        center: `path("M${leftEnd} Q${midLineCP},${rightEnd}")`,
        outer: `path("M${leftEnd} Q${upperLipCP},${rightEnd} Q${lowerLipCP},${leftEnd}")`,
        outerMirror: `path("M${rightEnd} Q${upperLipCP},${leftEnd} Q${lowerLipCP},${rightEnd}")`,
    }
}



interface Props extends FeatureProps {
    arrangement?: MouthArrangement
    lipColor?: string
    lipWidth?: number
}

const Mouth = ({
    x, y, size, arrangement = {}, transitionTime = .5,
    lipColor = 'pink', lipWidth = 3,
    ident = '',
    children,
}: Props) => {

    const maskId = getMaskId(ident)

    const paths = getMouthPaths(arrangement)
    const centerPathStyle = {
        d: paths.center,
        transition: `d ${transitionTime}s, opacity ${transitionTime}s`,
        stroke: 'black',
        fill: 'none',
        strokeWidth: 1,
        opacity: arrangement.open ? 0 : 1,
    }
    const mouthStyle = {
        d: paths.outer,
        transition: `d ${transitionTime}s`,
        stroke: 'none',
        fill: 'black',
    }
    const lipStyle = {
        d: paths.outer,
        transition: `d ${transitionTime}s`,
        stroke: lipColor,
        fill: 'none',
        strokeWidth: lipWidth,
        strokeLinejoin: "round",
    }
    const mirrorLipsStyle = {
        ...lipStyle,
        d: paths.outerMirror
    }

    const maskStyle = {
        d: paths.outer,
        transition: `d ${transitionTime}s`,
    }

    return (
        <FeatureFrame x={x} y={y} size={size}>

            <mask id={maskId}>
                <rect fill="black" x={-50} y={-50} width={100} height={100} />
                <path fill="white" style={maskStyle}></path>
            </mask>

            <path style={mouthStyle}></path>
            {children}
            <path style={lipStyle}></path>
            <path style={mirrorLipsStyle}></path>
            <path style={centerPathStyle}></path>

        </FeatureFrame>
    )
}

export default Mouth