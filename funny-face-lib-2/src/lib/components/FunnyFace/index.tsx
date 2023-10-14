
import { ReactNode, useEffect, useRef, useState } from "react";
import { getChinLevel } from "../../util/face-calculations";
import { uniqueId } from "../../util/unique-id";
import { Accessory, FaceProfile, FacialExpression, MouthArrangement } from "../../types";
import Face from "./Face";
import FeatureFrame from "./Face/FeatureFrame";
import { HeadAccessory } from "./HeadAcessory";


interface Props {
    x: number;
    y: number;
    size: number;
    expression?: FacialExpression;
    talking?: boolean;
    followMouse?: boolean;
    children?: ReactNode;
    profile?: FaceProfile;
    accessories?: Accessory[];
    transitionTime?: number;
}



export function FunnyFace({
    x, y, size, expression, talking, followMouse,
    transitionTime = .5,
    profile = {}, accessories = [],
    children,
}: Props) {

    const [talkingMouth, setTalkingMouth] = useState<MouthArrangement>({})

    const talk = () => {
        setTalkingMouth({
            open: Math.random(),
            pucker: Math.random(),
            smile: Math.random() - .5,
        })
    }
    const savedTalk = useRef(talk)
    const delay = talking ? 300 : 0
    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }
        const id = setInterval(() => savedTalk.current(), delay)
        return () => clearInterval(id)
    }, [delay])



    const arrangement: MouthArrangement = talking ? talkingMouth : expression?.mouth || {}
    const chinLevel = getChinLevel(arrangement, profile)

    return <FeatureFrame x={x} y={y} size={size} placement='top left'>
        <g>
            <Face x={-50} y={-50} size={100}
                ident={uniqueId.generate('head')}
                expression={expression}
                talking={talking}
                followMouse={followMouse}
                profile={profile}
                mouthArrangement={arrangement}
                chinLevel={chinLevel}
                transitionTime={transitionTime}
            />
            {accessories.map((accessory) =>
                <HeadAccessory
                    accessory={accessory}
                    faceProfile={profile}
                    chinLevel={chinLevel}
                    transitionTime={transitionTime}
                />
            )}
            <FeatureFrame x={-50} y={-50} size={100} placement='top left'>
                {children}
            </FeatureFrame>
        </g>
    </FeatureFrame>

}