import { h } from "preact";

interface Props {
    x: number;
    y: number;
    size: number;
    transitionTime?: number;
}

const Mouth = ({ x, y, size }: Props) => {
    return (
        <svg x={x - size / 2} y={y - size / 2} width={size} height={size} viewBox={'-50 -50 100 100'}>
            <ellipse cx="0" cy="0" rx="50" ry="10" />
        </svg>
    )
}

export default Mouth