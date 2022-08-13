import { ComponentChildren, h } from "preact";
import { Accessory, accessoryMap } from "../../lib/accessories";
import { FacialExpression } from "../../lib/expressions";
import { FaceProfile } from "../../lib/faceProfile";
import { uniqueId } from "../../lib/unique-id";
import Face from "../Face";
import FeatureFrame from "../Face/FeatureFrame";
import { HeadAccessory } from "./HeadAcessory";


interface Props {
    x: number;
    y: number;
    size: number;
    expression?: FacialExpression;
    talking?: boolean;
    followMouse?: boolean;
    children?: ComponentChildren;
    profile?: FaceProfile;
    accessories?: Accessory[];
}



export function Head({ x, y, size, expression, talking, followMouse, children, profile = {}, accessories = [] }: Props) {
    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
                profile={profile}
            />
            {accessories.map((accessory) =>
                <HeadAccessory accessory={accessory} faceProfile={profile} />
            )}
            <FeatureFrame x={-50} y={-50} size={100} placement='top left'>
                {children}
            </FeatureFrame>
        </g>
    </FeatureFrame>

}