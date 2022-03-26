import { h } from "preact";


interface Props {
    x: number;
    y: number;
    color?: string;
    width: number;
    dilation?: number
    direction?: [number, number]
}

function clamp(value: number, max = 1, min = 0) {
    return Math.max(Math.min(value, max), min)
}

export const Eye = ({ x, y, width, dilation = 1, direction = [0, 0], color = 'blue' }: Props) => {

    const adjustedDilation = clamp(dilation, 2, 0)
    const adjustedDirection = direction.map(v => clamp(v, 1, -1) * width / 4)

    return <g>
        <circle fill="white" cx={x} cy={y} r={width}></circle>
        <circle fill={color} cx={x + adjustedDirection[0]} cy={y + adjustedDirection[1]} r={width * .6}></circle>
        <circle fill="black" cx={x + adjustedDirection[0]} cy={y + adjustedDirection[1]} r={(width * .3) * adjustedDilation}></circle>
    </g>
}
export default Eye

