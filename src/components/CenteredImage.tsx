import { h } from "preact";

interface Props {
    src: string;
    x: number,
    y: number,
    width: number,
    transitionTime:number
}
export const CenteredImage = ({ src, width, x, y, transitionTime}: Props) => {
    return <image
        href={src}
        x={x - width / 2}
        y={y - width / 2}
        width={width}
        style={{
            y: y - width / 2,
            transition: `y ${transitionTime}s`,
        }}
    />
}