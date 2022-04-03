
import { h, Component, VNode, Fragment } from "preact";
import { randomInt } from "../../lib/calcuations";
import { expressions, FacialExpression } from "../../lib/expressions";
import { FaceProfile } from "../../lib/faceProfile";
import Face from "../Face";



interface Props {
    children?: VNode | VNode[]
    x: number;
    y: number;
    size?: number
    ident: string
    profile?: FaceProfile
}



export class FaceWithExpressionControl extends Component<Props, {
    expresion?: FacialExpression
    expressionLabel?: string
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expresion: expressions.ODD,
            expressionLabel:'odd'
        }
        this.changeExpression = this.changeExpression.bind(this)
    }

    changeExpression() {
        const list = Object.entries(expressions).filter(keyAndExpression =>  keyAndExpression[1] !== this.state.expresion )

        const [newKey, newExpression] = list[randomInt(list.length)]
        this.setState({ expresion: newExpression, expressionLabel:newKey })
    }

    render({ x, y, size, ident,profile }: Props) {

        const { expresion, expressionLabel } = this.state

        return <>
            <g onClick={this.changeExpression}>
                <Face x={x} y={y} size={size} ident={ident} expression={expresion} profile={profile} />
                <text x={x} y={y} fill={'red'}>{expressionLabel}</text>
            </g>
        </>
    }
}