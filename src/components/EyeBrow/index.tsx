import { h } from "preact";
import { EyePosition } from "../../lib/expressions";



interface Props {
    x: number;
    y: number;
    color?: string;
    width: number;
    pos?: EyePosition;
    right?: boolean
}

const browPathCoors: [number, number][] = [
    [-0.5, 0.0],
    [0.4, 0.0],
    [0.5, 0.2],
    [-0.5, 0.0],
]

const flipCoords = (c: [number, number]) => { return [-c[0], c[1]] }

function createPath(s: number, right?: boolean) {
    const commands: string[] = browPathCoors
        .map(right ? flipCoords : v => v)
        .map((coord, index) => {
            const code = index > 0 ? 'L' : 'M'
            const [x, y] = coord
            return `${code} ${x * s} ${y * s}`
        })

    return commands.join(" ");
}


export const EyeBrow = ({ x, y, width, color = 'black', right, pos = {} }: Props) => {
    const { browTilt = 0, browRaise = 0 } = pos
    const adjustedAngle = right ? -browTilt : browTilt

    return (
        <svg x={x - width / 2} y={y - width / 2} width={width} height={width} viewBox={'-50 -50 100 100'}>
            <path style={{
                transform: `translateY(${-browRaise}%) rotateZ(${adjustedAngle}deg)`,
            }} fill={color} d={createPath(75, right)} />
        </svg>
    )
}
export default EyeBrow

