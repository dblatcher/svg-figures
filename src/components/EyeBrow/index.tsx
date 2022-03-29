import { h } from "preact";
import { EyePosition } from "../../lib/expressions";
import { browShapes } from "../../lib/faceProfile";
import type { BrowShape, } from "../../lib/faceProfile";



interface Props {
    x: number;
    y: number;
    color?: string;
    width: number;
    pos?: EyePosition;
    right?: boolean
    browType?: 'thin' | 'wide'
}


const flipCoords = (c: [number, number]) => { return [-c[0], c[1]] }

function drawBrow(s: number, browShape: BrowShape, right?: boolean) {
    const commands: string[] = browShape
        .map(right ? flipCoords : v => v)
        .map((coord, index) => {
            const code = index > 0 ? 'L' : 'M'
            const [x, y] = coord
            return `${code} ${x * s} ${y * s}`
        })

    return commands.join(" ");
}


export const EyeBrow = ({ x, y, width, color = 'black', right, pos = {}, browType = 'thin' }: Props) => {
    const { browTilt = 0, browRaise = 0 } = pos
    const adjustedAngle = right ? -browTilt : browTilt

    return (
        <svg x={x - width / 2} y={y - width / 2} width={width} height={width} viewBox={'-50 -50 100 100'}>
            <path style={{
                transform: `translateY(${-browRaise}%) rotateZ(${adjustedAngle}deg)`,
            }} fill={color} d={drawBrow(75, browShapes[browType], right)} />
        </svg>
    )
}
export default EyeBrow

