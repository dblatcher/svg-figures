import { Component, ReactNode, } from "react";
import { randomInt } from "../../lib/calcuations";
import { expressions, FacialExpression } from "../../lib/expressions";
import { FaceProfile } from "../../lib/faceProfile";
import { Head } from "../Head";



interface Props {
    children?: ReactNode
    x: number;
    y: number;
    size?: number
    profile?: FaceProfile
    followMouse?: boolean
    talking?: boolean
}



export class HeadWithExpressionControl extends Component<Props, {
    expresion?: FacialExpression
    expressionLabel?: string
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expresion: expressions.ODD,
            expressionLabel: 'odd'
        }
        this.changeExpression = this.changeExpression.bind(this)
    }

    changeExpression() {
        const list = Object.entries(expressions).filter(keyAndExpression => keyAndExpression[1] !== this.state.expresion)
        const [newKey, newExpression] = list[randomInt(list.length)]
        this.setState({ expresion: newExpression, expressionLabel: newKey })
    }

    render() {

        const { x, y, size = 40, profile, followMouse, talking } = this.props
        const { expresion, expressionLabel } = this.state

        return <g onClick={this.changeExpression}>
            <Head x={x - 10} y={y} size={size} expression={expresion} profile={profile} followMouse={followMouse} talking={talking} />
            <text x={x} y={y} fill={'red'}>{expressionLabel}</text>
        </g>
    }
}