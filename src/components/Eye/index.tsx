import { h } from "preact";
import { clamp } from "../../lib/calcuations";
import { EyePosition } from "../../lib/expressions";


interface Props {
    x: number;
    y: number;
    color?: string;
    size: number;
    direction?: [number, number];
    ident:string;
    pos?: EyePosition;
}


export const Eye = ({ x, y, size, direction = [0, 0], color = 'blue', ident, pos={} }: Props) => {

    const { open = .8, dilation = 1} = pos

    const adjustedDilation = clamp(dilation, 2, 0)
    const adjustedDirection = direction.map(v => clamp(v, 1, -1) * 20)
    const ry = 50 * open
    const maskId = ident+'-mask'
    const maskUrl = `url(#${maskId})`

    return <svg x={x - size / 2} y={y - size / 2} width={size} height={size} viewBox={'-50 -50 100 100'}>

        <mask id={maskId}>
            <rect fill="black" x={-50} y={-50} width={100} height={100} />
            <ellipse fill="white" cx={0} cy={0} rx={50} ry={ry}></ellipse>
        </mask>

        <ellipse fill="white" cx={0} cy={0} rx={50} ry={ry}></ellipse>
        <ellipse mask={maskUrl} fill={color} cx={adjustedDirection[0]} cy={adjustedDirection[1]} rx={30}></ellipse>
        <ellipse mask={maskUrl} fill="black" stroke="white" stroke-width={2} cx={adjustedDirection[0]} cy={adjustedDirection[1]} rx={15 * adjustedDilation}></ellipse>
    </svg>
}
export default Eye

