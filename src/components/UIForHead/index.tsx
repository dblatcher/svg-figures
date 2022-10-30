import { Component } from "preact";
import { h } from "preact";
import { Head } from "../Head";
import { SvgFrame } from "../SvgFrame";
import { expressions, FacialExpression, } from "../../lib/expressions"
import { EventHandler } from "react";
import { Accessory } from "../../lib/Accessory";
import { FaceProfile, profileNumberProperyData, profileColorProperyData } from "../../lib/faceProfile";
import { NumberInput, StringInput } from "../formControls";
import { browShapes } from "../../shapes/brow";


interface Props {
    accessoryMap?: { [index: string]: Accessory }
}

export default class UIForHead extends Component<Props, {
    expressionKey: string
    talking: boolean
    followMouse: boolean
    accessoryKeys: string[]
    profile: FaceProfile
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            expressionKey: 'NEUTRAL',
            talking: false,
            followMouse: false,
            accessoryKeys: [],
            profile: {
                width: 1,
                round: .5,
                eyeDistance: 40,
                mouthWidth: 50,
                lipWidth: 3,
                mouthNoseDistance: 15,
                noseHeight: 20,
                noseWidth: 20,
                color: profileColorProperyData[0].default,
                eyeColor: profileColorProperyData[1].default,
                lipColor: profileColorProperyData[2].default,
                browColor: profileColorProperyData[3].default,
            },
        }
        this.changeExpressionKey = this.changeExpressionKey.bind(this)
        this.toggleTalking = this.toggleTalking.bind(this)
        this.toggleFollowMouse = this.toggleFollowMouse.bind(this)
        this.toggleAccessory = this.toggleAccessory.bind(this)
        this.editProfile = this.editProfile.bind(this)
    }

    get expression(): FacialExpression {
        return expressions[this.state.expressionKey] || expressions.NEUTRAL
    }

    get wornAccessories(): Accessory[] {
        const { accessoryMap: accessoryMap = {} } = this.props
        return this.state.accessoryKeys
            .filter(key => accessoryMap[key])
            .map(key => accessoryMap[key])
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    }

    //https://github.com/preactjs/preact/issues/1930
    changeExpressionKey: EventHandler<any> = (event) => {
        this.setState({ expressionKey: event.target?.value });
    }

    editProfile = (property: keyof FaceProfile, value: unknown) => {
        console.log(property, value)
        this.setState(state => {
            const { profile } = state
            switch (property) {
                case 'eyeColor':
                case 'lipColor':
                case 'color':
                case 'browColor':
                    if (typeof value === 'string') {
                        profile[property] = value
                    }
                    break;
                case 'width':
                case 'round':
                case 'eyeDistance':
                case 'lipWidth':
                case 'mouthWidth':
                case 'mouthNoseDistance':
                case 'noseHeight':
                case 'noseWidth':
                    if (typeof value === 'number') {
                        profile[property] = value
                    }
                    break;
                case 'browShape':
                    if (Array.isArray(value) && value.every(member => Array.isArray(member) && member.length === 2)) {
                        profile[property] = value
                    }
                    break;
            }

            return { profile }
        })
    }

    toggleTalking: EventHandler<any> = () => {
        this.setState({ talking: !this.state.talking })
    }
    toggleFollowMouse: EventHandler<any> = () => {
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
        const { talking, followMouse, expressionKey, accessoryKeys, profile } = this.state

        return <div style={{ border: '1px dotted black', margin: '1em', display: 'flex' }}>
            <SvgFrame style={{ width: '200px', border: '1px solid black' }} viewBox='0 0 120 150'>
                <Head x={20} y={50} size={80}
                    expression={this.expression}
                    talking={talking}
                    followMouse={followMouse}
                    profile={profile}
                    accessories={this.wornAccessories}
                />
            </SvgFrame>

            <section>
                <h3>Face</h3>
                <div>
                    <label>expression</label>
                    <select
                        readOnly
                        onChange={this.changeExpressionKey}
                        value={expressionKey}>
                        {Object.entries(expressions).map(entry => {
                            const [key] = entry
                            return <option key={key} value={key}>{key}</option>
                        })}
                    </select>
                </div>

                <div>
                    <input readonly readOnly type="checkbox" checked={talking} onChange={this.toggleTalking} />
                    <label>talking</label>
                </div>
                <div>
                    <input readonly readOnly type="checkbox" checked={followMouse} onChange={this.toggleFollowMouse} />
                    <label>followMouse</label>
                </div>
            </section>

            <section>
                <h3>Accessories</h3>
                <div>
                    {Object.keys(accessoryMap).map(key => (
                        <div key={key}>
                            <input readonly type="checkbox" checked={accessoryKeys.includes(key)} onChange={() => { this.toggleAccessory(key) }} />
                            <label>{key}</label>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3>Profile</h3>

                {profileNumberProperyData.map(data => {
                    const { property, min = 0, max, step = .1 } = data
                    return (
                        <div>
                            <NumberInput key={property}
                                label={`${profile[property]} ${property}`}
                                value={profile[property] || min}
                                type="range" min={min} max={max} step={step}
                                inputHandler={value => { this.editProfile(property, value) }}
                                labelAfter={true}
                            />
                        </div>
                    )
                })}

                {profileColorProperyData.map(data => {
                    const { property, default: defaultValue } = data
                    return (
                        <div>
                            <StringInput key={property}
                                label={`${profile[property]} ${property}`}
                                value={profile[property] || defaultValue}
                                type="color"
                                labelAfter={true}
                                inputHandler={(value) => { this.editProfile(property, value) }}
                            />
                        </div>
                    )
                })}

                <div>
                    <label>Eyebrows:</label>
                    {Object.entries(browShapes).map(([shapeKey, shape]) => (
                        <button key={shapeKey} onClick={
                            () => { this.editProfile('browShape', shape) }
                        }>{shapeKey}</button>
                    ))}
                </div>

            </section>
        </div>

    }
}