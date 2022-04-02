import { h } from "preact";
import { EyePosition } from "../../lib/expressions";
import { browShapes } from "../../lib/faceProfile";
import type { BrowShape, } from "../../lib/faceProfile";



interface Props {
    x: number;
    y: number;
    size: number;
    transitionTime?: number;
    color?: string;
    pos?: EyePosition;
    right?: boolean;
    browType?: 'thin' | 'wide';
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



export const EyeBrow = ({ x, y, transitionTime = .5, size, color = 'black', right, pos = {}, browType = 'thin' }: Props) => {
    const { browTilt = 0, browRaise = 0 } = pos
    const adjustedAngle = right ? -browTilt : browTilt

    const browStyle = {
        transform: `translateY(${-browRaise}%) rotateZ(${adjustedAngle}deg)`,
        transition: `transform ${transitionTime}s`,
        fill: color,
    }

    return (
        <svg x={x - size / 2} y={y - size / 2} width={size} height={size} viewBox={'-50 -50 100 100'}>
            <path style={browStyle} d={drawBrow(75, browShapes[browType], right)} />
        </svg>
    )
}
export default EyeBrow

