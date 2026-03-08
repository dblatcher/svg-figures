import type { PathShape } from "../../../types"
import FeatureFrame from "./FeatureFrame"

interface Props {
    width: number
    height: number
    fromCenter: number
    color: string
    side: 'left' | 'right',
    shape: PathShape,
}

export const Ear = ({ width, height, side, fromCenter, color, shape }: Props) => {

    const x2 = side === 'left' ? -fromCenter - width : fromCenter;

    return <FeatureFrame
        aspectRatio={height / width}
        placement="center"
        y={-10 -height / 2}
        x={x2}
        size={width}>
        <path
            fill={color}
            stroke="black"
            strokeWidth={4}
            style={{
                transformOrigin: 'center',
                transform: side === 'left' ? "scale(-1, 1)" : undefined
            }}
            d={shape}
        />
    </FeatureFrame>
}