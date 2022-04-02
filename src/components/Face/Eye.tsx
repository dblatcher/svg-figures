import { h } from "preact";
import { clamp } from "../../lib/calcuations";
import { EyePosition } from "../../lib/expressions";
import FeatureFrame from "./FeatureFrame";
import { FeatureProps } from "./FeatureProps";

interface Props extends FeatureProps {
    color?: string;
    direction?: [number, number];
    ident: string;
    pos?: EyePosition;
}


export const Eye = ({ x, y, transitionTime = .5, size, direction = [0, 0], color = 'blue', ident, pos = {} }: Props) => {

    const { open = .8, dilation = 1 } = pos

    const adjustedDilation = clamp(dilation, 2, 0)
    const adjustedDirection = direction.map(v => clamp(v, 1, -1) * 20)
    const ry = 50 * open
    const maskId = ident + '-mask'
    const maskUrl = `url(#${maskId})`

    const eyeballStyle = {
        cx: 0,
        cy: 0,
        rx: 50,
        ry: ry,
        transition: `ry ${transitionTime}s`,
    }

    const irisStyle = {
        fill: color,
        cx: adjustedDirection[0],
        cy: adjustedDirection[1],
        rx: 30,
        transition: `rx ${transitionTime}s, cx ${transitionTime}s, cy${transitionTime}s`,
    }

    const pupilStyle = {
        fill: "black",
        stroke: "white",
        strokeWidth: 2,
        cx: adjustedDirection[0],
        cy: adjustedDirection[1],
        rx: 15 * adjustedDilation,
        transition: `rx ${transitionTime}s, cx ${transitionTime}s, cy${transitionTime}s`,
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

