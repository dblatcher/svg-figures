
import { h, Component, VNode, Fragment } from "preact";
import { expressions, FacialExpression } from "../../lib/expressions";
import Face from "../Face";



interface Props {
    children?: VNode | VNode[]
    x: number;
    y: number;
    size?: number
    ident: string
}



export class FaceWithExpressionControl extends Component<Props, {
    expresion?: FacialExpression
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expresion: expressions.ANGRY
        }
        this.changeExpression = this.changeExpression.bind(this)
    }

    changeExpression() {

        const list = Object.entries(expressions).filter(keyAndExpression =>  keyAndExpression[1] !== this.state.expresion )

        const [newKey, newExpression] = list[0]
        console.log(newKey)
        this.setState({ expresion: newExpression })
    }

    render({ x, y, size, ident }: Props) {

        const { expresion } = this.state

        return <>
            <g onClick={this.changeExpression}>
                <Face x={x} y={y} size={size} ident={ident} expression={expresion} />
            </g>
        </>
    }
}