import { h } from "preact";
import { FacialExpression } from "../../lib/expressions";
import { uniqueId } from "../../lib/unique-id";
import Face from "../Face";
import FeatureFrame from "../Face/FeatureFrame";


interface Props {
    x: number;
    y: number;
    size: number;
    expression?: FacialExpression;
    talking?: boolean,
    followMouse?: boolean,
}


export function Head({ x, y, size, expression, talking, followMouse }: Props) {
    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
            />
            <FeatureFrame x={-40} y={-100} size={80}>
                <image href="./assets/non-burning-hat.png" x={0} y={0} width={100} height={100} />
            </FeatureFrame>
        </g>
    </FeatureFrame>

}