import { h } from "preact";
import { LipCoordinates, Position } from "../../../lib/LipCoordinates";
import { MouthArrangement } from "../../../lib/expressions";
import { getMaskId } from "../../../lib/unique-id";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";


const posCoor = (pos: Position) => `${pos.x},${pos.y}`

const getMouthPaths = (lips: LipCoordinates) => {
    const leftEnd = posCoor(lips.left)
    const rightEnd = posCoor(lips.right)
    const midLineCP = posCoor(lips.mid)
    const upperLipCP = posCoor(lips.upper)
    const lowerLipCP = posCoor(lips.lower)

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
    lips: LipCoordinates;
}

const Mouth = ({
    x, y, size, arrangement = {}, transitionTime = .5,
    lipColor = 'pink', lipWidth = 3,
    ident = '',
    children,
    lips,
}: Props) => {

    const maskId = getMaskId(ident)

    const paths = getMouthPaths(lips)
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
    const lipStyle: h.JSX.SVGAttributes<SVGPathElement> & h.JSX.CSSProperties = {
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