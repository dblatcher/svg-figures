import { h } from "preact";
import { MouthArrangement } from "../../lib/expressions";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    arrangement?: MouthArrangement
}


const coor = (x: number, y: number) => `${x},${y}`

const getMouthPaths = (arrangment: MouthArrangement) => {

    const { smile = 0, open = 0 } = arrangment

    const leftEnd = coor(-50, -smile * 20)
    const rightEnd = coor(50, -smile * 20)
    const centerPathControl = coor(0, smile * 15)
    

    const upperPathControl = coor(0, smile * (15 + (open*35)))
    const lowerPathControl = coor(0, smile * (15 - (open*20)))

    return {
        center: `path("M${leftEnd} Q${centerPathControl},${rightEnd}")`,
        outer: `path("M${leftEnd} Q${upperPathControl},${rightEnd} Q${lowerPathControl},${leftEnd}")`,
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
        stroke: 'black',
        fill: 'red',
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