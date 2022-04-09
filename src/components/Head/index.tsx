import { ComponentChildren, h } from "preact";
import { FacialExpression } from "../../lib/expressions";
import { FaceProfile } from "../../lib/faceProfile";
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
    children?: ComponentChildren,
    profile?: FaceProfile
}


export function Head({ x, y, size, expression, talking, followMouse, children, profile={} }: Props) {
    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
                profile={profile}
            />
            <FeatureFrame x={-50} y={-50} size={100} placement='top left'>
                {children}
            </FeatureFrame>
        </g>
    </FeatureFrame>

}