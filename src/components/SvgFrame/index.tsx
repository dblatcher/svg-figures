import { h, Component, VNode, } from "preact";



interface Props {
    children?: VNode | VNode[]
    style?: h.JSX.CSSProperties
    viewBox?: h.JSX.SVGAttributes["viewBox"]
}

export class SvgFrame extends Component<Props> {

    render({ style = {}, viewBox = "0 0 100 100", children }: Props) {

        return <figure style={style}>
            <svg
                viewBox={viewBox}
                xmlns="<http://www.w3.org/2000/svg>"
            >
                {children}
            </svg>
        </figure>
    }
}