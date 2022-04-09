import { Component, Fragment } from "preact";
import { h } from "preact";
import { Head } from "../Head";
import { SvgFrame } from "../SvgFrame";

import { expressions, FacialExpression } from "../../lib/expressions"
import { EventHandler } from "react";
import { CenteredImage } from "../CenteredImage";

interface Props {
    fig?: string
}



export default class UIForHead extends Component<Props, {
    expressionKey: string
    talking: boolean
    followMouse: boolean
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expressionKey: 'NEUTRAL',
            talking: false,
            followMouse: false,
        }
        this.changeExpressionKey = this.changeExpressionKey.bind(this)
        this.toggleTalking = this.toggleTalking.bind(this)
        this.toggleFollowMouse = this.toggleFollowMouse.bind(this)
    }

    get expression(): FacialExpression {
        return expressions[this.state.expressionKey] || expressions.NEUTRAL
    }

    //https://github.com/preactjs/preact/issues/1930
    changeExpressionKey: EventHandler<any> = (event) => {
        this.setState({ expressionKey: event.target?.value });
    }

    toggleTalking: EventHandler<any> = (event) => {
        this.setState({ talking: !this.state.talking })
    }
    toggleFollowMouse: EventHandler<any> = (event) => {
        this.setState({ followMouse: !this.state.followMouse })
    }

    render() {

        return <div style={{ border: '1px dotted black', margin: '1em', display: 'flex' }}>
            <SvgFrame style={{ width: '200px', border: '1px solid black' }} viewBox='0 0 100 150'>
                <Head x={0} y={50} size={100}
                    expression={this.expression}
                    talking={this.state.talking}
                    followMouse={this.state.followMouse}
                >
                    <CenteredImage src="./assets/non-burning-hat.png" x={0} y={-60} width={80} />
                    <CenteredImage src="./assets/favicon.ico" x={0} y={-60} width={20} />
                    <CenteredImage src="./assets/monocle.png" x={0} y={8} width={64} />
                </Head>
            </SvgFrame>
            <div>
                <h2>UI</h2>
                <div>
                    <label>expression</label>
                    <select
                        readOnly
                        onChange={this.changeExpressionKey}
                        value={this.state.expressionKey}>
                        {Object.entries(expressions).map(entry => {
                            const [key] = entry
                            return <option key={key} value={key}>{key}</option>
                        })}
                    </select>
                </div>

                <div>
                    <input readonly readOnly type="checkbox" checked={this.state.talking} onChange={this.toggleTalking} />
                    <label>talking ({this.state.talking ? 'yes' : 'no'})</label>
                </div>
                <div>
                    <input readonly readOnly type="checkbox" checked={this.state.followMouse} onChange={this.toggleFollowMouse} />
                    <label>followMouse ({this.state.followMouse ? 'yes' : 'no'})</label>
                </div>

            </div>
        </div>

    }
}