import { Component, ComponentChildren } from "preact";
import { h } from "preact";
import { Head } from "../Head";
import { SvgFrame } from "../SvgFrame";
import { expressions, FacialExpression } from "../../lib/expressions"
import { EventHandler } from "react";
import { CenteredImage } from "../CenteredImage";
import { Accessory } from "../../lib/accessories";


interface Props {
    accessoryMap?: { [index: string]: Accessory }
}

export default class UIForHead extends Component<Props, {
    expressionKey: string
    talking: boolean
    followMouse: boolean
    accessoryKeys: string[]
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expressionKey: 'NEUTRAL',
            talking: false,
            followMouse: false,
            accessoryKeys: []
        }
        this.changeExpressionKey = this.changeExpressionKey.bind(this)
        this.toggleTalking = this.toggleTalking.bind(this)
        this.toggleFollowMouse = this.toggleFollowMouse.bind(this)
        this.toggleAccessory = this.toggleAccessory.bind(this)
    }

    get expression(): FacialExpression {
        return expressions[this.state.expressionKey] || expressions.NEUTRAL
    }

    get accessoryChildren(): ComponentChildren {
        const { accessoryMap: accessoryMap = {} } = this.props

        const wornAccessories = this.state.accessoryKeys
            .filter(key => accessoryMap[key])
            .map(key => accessoryMap[key])
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))

        return wornAccessories.map((accessory, index) => {
            return <CenteredImage key={index} {...accessory} />
        })
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

    toggleAccessory(key: string) {
        const { accessoryKeys } = this.state
        const index = accessoryKeys.indexOf(key)
        if (index == -1) {
            accessoryKeys.push(key)
        } else {
            accessoryKeys.splice(index, 1)
        }
        this.setState({ accessoryKeys })
    }

    render() {

        const { accessoryMap = {} } = this.props

        return <div style={{ border: '1px dotted black', margin: '1em', display: 'flex' }}>
            <SvgFrame style={{ width: '200px', border: '1px solid black' }} viewBox='0 0 100 150'>
                <Head x={0} y={50} size={100}
                    expression={this.expression}
                    talking={this.state.talking}
                    followMouse={this.state.followMouse}
                >
                    {this.accessoryChildren}
                </Head>
            </SvgFrame>
            <div>
                <h3>Face</h3>
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

                <h3>Accessories</h3>
                <div>
                    {Object.keys(accessoryMap).map(key => (
                        <div key={key}>
                            <input readonly type="checkbox" checked={this.state.accessoryKeys.includes(key)} onChange={() => { this.toggleAccessory(key) }} />
                            <label>{key}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    }
}