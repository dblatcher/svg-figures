import { ComponentChildren, h } from "preact";
import { FacialExpression } from "../../lib/expressions";
import { uniqueId } from "../../lib/unique-id";
import { CenteredImage } from "../CenteredImage";
import Face from "../Face";
import FeatureFrame from "../Face/FeatureFrame";


interface Props {
    x: number;
    y: number;
    size: number;
    expression?: FacialExpression;
    talking?: boolean,
    followMouse?: boolean,
    children?: ComponentChildren,
}


export function Head({ x, y, size, expression, talking, followMouse, children }: Props) {
    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
            />
            <FeatureFrame x={-50} y={-50} size={100} placement='top left'>
                {children}
            </FeatureFrame>
        </g>
    </FeatureFrame>

}