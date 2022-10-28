import { ComponentChildren, h } from "preact";
import { useState } from "preact/hooks";
import { Accessory, accessoryMap } from "../../lib/accessories";
import { FacialExpression, MouthArrangement } from "../../lib/expressions";
import { FaceProfile } from "../../lib/faceProfile";
import { uniqueId } from "../../lib/unique-id";
import { useInterval } from "../../lib/useInterval";
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

    const [talkingMouth, setTalkingMouth] = useState<MouthArrangement>({})

    const talk = () => {
        setTalkingMouth({
            open: Math.random(),
            pucker: Math.random(),
            smile: Math.random() - .5,
        })
    }
    useInterval(talk, talking ? 300 : 0)
    const arrangement: MouthArrangement = talking ? talkingMouth : expression?.mouth || {}

    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
                profile={profile}
                mouthArrangement={arrangement}
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