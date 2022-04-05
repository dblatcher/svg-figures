import { Component } from "preact";
import { h } from "preact";
import { uniqueId } from "../../lib/unique-id";
import Face from "../Face";
import FeatureFrame from "../Face/FeatureFrame";


interface Props {
    initialX: number;
    initialY: number;
    size: number;
}

interface HeadState {
    x: number,
    y: number,
    talking?: boolean,
}

export class Head extends Component<Props, HeadState> {

    constructor(props: Props) {
        super(props)
        this.state = {
            x: props.initialX,
            y: props.initialY,
            talking: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { talking } = this.state
        this.setState({ talking: !talking })
    }

    render() {
        const { x, y, talking } = this.state
        const { size } = this.props
        return <FeatureFrame x={x} y={y} size={size} placement='top left'>
            <g onClick={this.handleClick}>
                <Face x={-50} y={-50} size={100} ident={uniqueId.generate('head')}
                    talking={talking}
                />
                <FeatureFrame x={-40} y={-100} size={80}>
                    <image href="./assets/non-burning-hat.png" x={0} y={0} width={100} height={100} />
                </FeatureFrame>
            </g>
        </FeatureFrame>
    }
}