import { h } from "preact";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    placement?: 'center' | 'top left'
}

const FeatureFrame = ({ x, y, size, children, placement = 'center' }: Props) => {

    let px = x, py = y;
    switch (placement) {
        case 'center':
            px = x - size / 2
            py = y - size / 2
            break;
    }

    return (
        <svg x={px} y={py} width={size} height={size} viewBox={'-50 -50 100 100'}>
            {children}
        </svg>
    )
}

export default FeatureFrame