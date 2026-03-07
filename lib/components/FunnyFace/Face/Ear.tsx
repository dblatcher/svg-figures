import FeatureFrame from "./FeatureFrame"

interface Props {
    width: number
    height: number
    fromCenter: number
    color: string
    side: 'left' | 'right'
}

export const Ear = ({ width, height, side, fromCenter, color }: Props) => {

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
            d="M0 20 Q100 0 100 50 L100 70 Q50 100 -50 100"
        />
    </FeatureFrame>
}