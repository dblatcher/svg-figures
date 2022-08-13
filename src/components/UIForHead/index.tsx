import { Component, ComponentChildren } from "preact";
import { h } from "preact";
import { Head } from "../Head";
import { SvgFrame } from "../SvgFrame";
import { expressions, FacialExpression, } from "../../lib/expressions"
import { EventHandler } from "react";
import { CenteredImage } from "../CenteredImage";
import { Accessory } from "../../lib/accessories";
import { FaceProfile, ProfileNumberProperty, profileNumberProperyData, profileColorProperyData, ProfileColorProperty } from "../../lib/faceProfile";


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
                mouthVerticalPosition: 30,
                color: profileColorProperyData[0].default,
                eyeColor: profileColorProperyData[1].default,
                lipColor: profileColorProperyData[2].default,
            },
        }
        this.changeExpressionKey = this.changeExpressionKey.bind(this)
        this.toggleTalking = this.toggleTalking.bind(this)
        this.toggleFollowMouse = this.toggleFollowMouse.bind(this)
        this.toggleAccessory = this.toggleAccessory.bind(this)
        this.setProfileNumber = this.setProfileNumber.bind(this)
        this.setProfileString = this.setProfileString.bind(this)
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

    get accessoryChildren(): ComponentChildren {
        const { wornAccessories } = this

        return wornAccessories.map((accessory, index) => {
            return <CenteredImage key={index} {...accessory} />
        })
    }

    //https://github.com/preactjs/preact/issues/1930
    changeExpressionKey: EventHandler<any> = (event) => {
        this.setState({ expressionKey: event.target?.value });
    }

    //https://github.com/preactjs/preact/issues/1930
    setProfileNumber = (property: ProfileNumberProperty, event: any) => {
        const value = Number(event.target.value as string)
        const { profile } = this.state
        profile[property] = value
        this.setState({ profile })
    }

    //https://github.com/preactjs/preact/issues/1930
    setProfileString = (property: ProfileColorProperty, event: any) => {
        const value = event.target.value as string
        const { profile } = this.state
        profile[property] = value
        this.setState({ profile })
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
                        <div key={property}>
                            <input value={profile[property]}
                                type="range" min={min} max={max} step={step}
                                onChange={(event) => this.setProfileNumber(property, event)} />
                            <span>{profile[property]}&nbsp;</span>
                            <label>{property}</label>
                        </div>
                    )
                })}

                {profileColorProperyData.map(data => {
                    const { property } = data
                    return (
                        <div key={property}>
                            <input value={profile[property]}
                                type="color"
                                onChange={(event) => this.setProfileString(property, event)}
                            />
                            <span>{profile[property]}&nbsp;</span>
                            <label>{property}</label>
                        </div>
                    )
                })}
            </section>
        </div>

    }
}