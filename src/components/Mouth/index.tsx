import { h } from "preact";

interface Props {
    x: number;
    y: number;
    width: number;
}

const Mouth = ({ x, y, width }: Props) => {
    return (
        <svg x={x} y={y} width={width} height={width} viewBox={'-50 -50 100 100'}>
            <ellipse cx="0" cy="0" rx="50" ry="10" />
        </svg>
    )
}

export default Mouth