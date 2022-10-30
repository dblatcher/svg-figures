import { h } from "preact";
import { clamp } from "../../../lib/calcuations";
import { EyeArrangement } from "../../../lib/expressions";
import { getMaskId, getMaskUrl } from "../../../lib/unique-id";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    color?: string;
    direction?: [number, number];
    ident: string;
    pos?: EyeArrangement;
}


export const Eye = ({ x, y, transitionTime = .5, size, direction = [0, 0], color = 'blue', ident, pos = {} }: Props) => {

    const { open = .75, dilation = 1 } = pos

    const adjustedDilation = clamp(dilation, 2, 0)
    const [cx, cy] = direction.map(v => clamp(v, 1, -1) * 20)

    const ry = 50 * clamp(open, 1, 0)
    const maskId = getMaskId(ident)
    const maskUrl = getMaskUrl(ident)

    const eyeballStyle = {
        cx: 0,
        cy: 0,
        rx: 50,
        ry: ry,
        transition: `ry ${transitionTime}s`,
    }

    const irisStyle = {
        fill: color,
        cx: cx,
        cy: cy,
        rx: 30,
        transition: `rx ${transitionTime}s, cy ${transitionTime}s, cx ${transitionTime}s`,
    }

    const pupilStyle = {
        fill: "black",
        strokeWidth: 2,
        cx: cx,
        cy: cy,
        rx: 15 * adjustedDilation,
        transition: `rx ${transitionTime}s, cy ${transitionTime}s, cx ${transitionTime}s`,
    }

    return <FeatureFrame x={x} y={y} size={size}>
        <mask id={maskId}>
            <rect fill="black" x={-50} y={-50} width={100} height={100} />
            <ellipse fill="white" style={eyeballStyle}></ellipse>
        </mask>

        <ellipse fill="white" style={eyeballStyle}></ellipse>
        <ellipse mask={maskUrl} style={irisStyle} ></ellipse>
        <ellipse mask={maskUrl} style={pupilStyle}></ellipse>
    </FeatureFrame>
}
export default Eye

