import { h } from "preact";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    width: number;
    height: number;
    shift: number;
}



const Chin = ({
    x, y, size, width, height, shift, transitionTime = .5
}: Props) => {

    return (
        <FeatureFrame x={x} y={y} size={size} >
            <rect
                style={{
                    transition: `transform ${transitionTime}s`,
                    transform: `translateY(${shift}px)`,
                }}
                x={- (width / 2)}
                y2={-50}
                width={width}
                height={height}
                stroke={'black'}
                fill={'none'}
                ry={20} />
        </FeatureFrame >
    )
}

export default Chin