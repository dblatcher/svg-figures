import { h } from "preact";
import { clamp } from "../../lib/calcuations";


interface Props {
    x: number;
    y: number;
    color?: string;
    width: number;
    dilation?: number
    direction?: [number, number]
}


export const Eye = ({ x, y, width, dilation = 1, direction = [0, 0], color = 'blue' }: Props) => {

    const adjustedDilation = clamp(dilation, 2, 0)
    const adjustedDirection = direction.map(v => clamp(v, 1, -1) * width / 4)

    return <g>
        <circle fill="white" cx={x} cy={y} r={width*.5}></circle>
        <circle fill={color} cx={x + adjustedDirection[0]} cy={y + adjustedDirection[1]} r={width * .3}></circle>
        <circle fill="black" cx={x + adjustedDirection[0]} cy={y + adjustedDirection[1]} r={(width * .15) * adjustedDilation}></circle>
    </g>
}
export default Eye

