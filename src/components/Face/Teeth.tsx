import { h } from "preact";

interface Props {
    maskUrl: string
}

const Teeth = ({
    maskUrl
}: Props) => {
    const teethHeight =12;
    const lineAt = (x:number) => <line x1={x} y1={-20} x2={x} y2={teethHeight} stroke="black" />
    return <g mask={maskUrl}>
        <rect fill="white" x={-50} y={-20} height={teethHeight} width={100}></rect>
        {lineAt(-30)}
        {lineAt(-15)}
        {lineAt(0)}
        {lineAt(15)}
        {lineAt(30)}
    </g>
}

export default Teeth