import { h } from "preact";
import { MouthArrangement } from "../../lib/expressions";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    arrangement?: MouthArrangement
}


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
    }
}

const Mouth = ({ x, y, size, arrangement = {}, transitionTime = .5 }: Props) => {

    const paths = getMouthPaths(arrangement)
    const centerPathStyle = {
        d: paths.center,
        transition: `d ${transitionTime}s`,
        stroke: 'black',
        fill: 'none',
        strokeWidth: 2,
    }
    const outerPathStyle = {
        d: paths.outer,
        transition: `d ${transitionTime}s`,
        stroke: 'red',
        fill: 'black',
        strokeWidth: 3,
    }

    return (
        <FeatureFrame x={x} y={y} size={size}>
            <path style={outerPathStyle}></path>
            <path style={centerPathStyle}></path>
        </FeatureFrame>
    )
}

export default Mouth