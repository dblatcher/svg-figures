import type { EyeArrangement } from "../../../lib/expressions";
import type { BrowShape } from "../../../types";
import { FeatureProps } from "./FeatureProps";
import FeatureFrame from "./FeatureFrame";

interface Props extends FeatureProps {
    color?: string;
    pos?: EyeArrangement;
    right?: boolean;
    browShape: BrowShape;
}


const flipCoords = (c: [number, number]) => { return [-c[0], c[1]] }

function drawBrow(s: number, browShape: BrowShape, right?: boolean) {
    const shape = right ? browShape.map(flipCoords) : browShape;
    const commands: string[] = shape
        .map((coord, index) => {
            const code = index > 0 ? 'L' : 'M'
            const [x, y] = coord
            return `${code} ${x * s} ${y * s}`
        })

    return commands.join(" ");
}



export const EyeBrow = ({ x, y, transitionTime = .5, size, color = 'black', right, pos = {}, browShape }: Props) => {
    const { browTilt = 0, browRaise = 0 } = pos
    const adjustedAngle = right ? -browTilt : browTilt

    const browStyle = {
        transform: `translateY(${-browRaise}%) rotateZ(${adjustedAngle}deg)`,
        transition: `transform ${transitionTime}s`,
        fill: color,
    }

    return (
        <FeatureFrame x={x} y={y} size={size}>
            <path style={browStyle} d={drawBrow(75, browShape, right)} />
        </FeatureFrame>
    )
}
export default EyeBrow

