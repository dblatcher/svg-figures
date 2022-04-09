import { h } from "preact";

interface Props {
    src: string;
    x: number,
    y: number,
    width: number,
}
export const CenteredImage = ({ src, width, x, y, }: Props) => {
    return <image href={src} x={x - width / 2} y={y - width / 2} width={width} />
}