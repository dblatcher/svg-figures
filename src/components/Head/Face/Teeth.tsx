import { h } from "preact";
import { ToothShape } from "../../../lib/faceProfile";
import { toothShapes } from "../../../shapes/tooth";

interface Props {
    maskUrl: string
    toothList?: ToothShape[]
}

const { square } = toothShapes

const defaultToothList = [square, square, square, square, square, square]

const plotTooth = (shape: ToothShape, toothIndex: number, toothCount:number)  => {
    const toothWidth = 100 / toothCount;
    const commands: string[] = shape
        .map((coord, index) => {
            const code = index > 0 ? 'L' : 'M'
            const [x, y] = coord.map(v => v * toothWidth)
            return `${code} ${x + ((toothIndex * toothWidth) - 50)} ${y - 20}`
        })
    return commands.join(" ");
}

const Teeth = ({
    maskUrl, toothList = defaultToothList
}: Props) => {
    return <g mask={maskUrl}>
        {toothList.map((tooth, index) => <path d={plotTooth(tooth, index, toothList.length)} stroke='black' fill="white" />)}
    </g>
}

export default Teeth