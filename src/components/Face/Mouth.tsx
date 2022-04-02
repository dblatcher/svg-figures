import { h } from "preact";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
}

const Mouth = ({ x, y, size }: Props) => {
    return (
        <FeatureFrame x={x} y={y} size={size}>
            <ellipse cx="0" cy="0" rx="50" ry="10" />
        </FeatureFrame>
    )
}

export default Mouth