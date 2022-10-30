import { h } from "preact";
import { Accessory } from "../../lib/Accessory";
import { clamp } from "../../lib/calcuations";
import { FaceProfile } from "../../lib/faceProfile";
import { CenteredImage } from "../CenteredImage";

interface Props {
    accessory: Accessory
    faceProfile: FaceProfile
    chinLevel: number
}
export const HeadAccessory = ({ accessory, faceProfile, chinLevel }: Props) => {
    const { src, x, y, width, place } = accessory

    let placeX = x, placeY = y;

    const eyeDistance = clamp(faceProfile.eyeDistance || 0, 75, 25) / 2

    if (place == 'right-eye') {
        placeX += eyeDistance
        placeY += -10
    }
    if (place == 'left-eye') {
        placeX += -eyeDistance
        placeY += -10
    }
    if (place == 'nose') {
        placeY += (faceProfile.noseHeight || 10)
    }

    if (place === 'chin') {
        placeY += 50 + chinLevel
    }

    return <CenteredImage src={src} x={placeX} y={placeY} width={width} />
}