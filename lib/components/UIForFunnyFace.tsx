import { Component } from 'react';
import type { ChangeEventHandler, } from 'react';
import { browShapes } from '../defaults/browShapes';
import { expressions } from '../defaults/expressions';
import type { Accessory, FaceProfile, FacialExpression } from '../types';
import {
  profileColorProperyData,
  profileNumberProperyData,
} from '../util/faceProfile';
import { FunnyFace } from './FunnyFace';
import { SvgFrame } from './SvgFrame';
import { NumberInput, RadioGroup, StringInput } from './formControls';

interface Props {
  accessoryMap?: { [index: string]: Accessory };
}

interface State {
  expressionKey: string;
  talking: boolean;
  laughing: boolean;
  followMouse: boolean;
  sizeIncludesEars: boolean;
  accessoryKeys: string[];
  blinkPeriod: number;
  profile: FaceProfile;
}

export class UIForFunnyFace extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expressionKey: 'NEUTRAL',
      talking: false,
      laughing: false,
      followMouse: false,
      accessoryKeys: [],
      blinkPeriod: 20,
      sizeIncludesEars: false,
      profile: {
        width: 1,
        round: 0.5,
        eyeDistance: 40,
        mouthWidth: 50,
        lipWidth: 3,
        mouthNoseDistance: 15,
        noseHeight: 20,
        noseWidth: 20,
        chinWidth: 30,
        chinHeight: 20,
        earWidth: 10,
        earHeight: 40,
        color: profileColorProperyData[0].default,
        eyeColor: profileColorProperyData[1].default,
        lipColor: profileColorProperyData[2].default,
        browColor: profileColorProperyData[3].default,
        browShape: browShapes.THIN,
      },
    };
    this.changeExpressionKey = this.changeExpressionKey.bind(this);
    this.toggleTalking = this.toggleTalking.bind(this);
    this.toggleLaughing = this.toggleLaughing.bind(this);
    this.toggleFollowMouse = this.toggleFollowMouse.bind(this);
    this.toggleAccessory = this.toggleAccessory.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  get expression(): FacialExpression {
    const entries = Object.entries(expressions);
    const expression = entries.find(
      ([key]) => key === this.state.expressionKey
    )?.[1];
    return expression || expressions.NEUTRAL;
  }

  get wornAccessories(): Accessory[] {
    const { accessoryMap = {} } = this.props;
    return this.state.accessoryKeys
      .filter((key) => accessoryMap[key])
      .map((key) => accessoryMap[key])
      .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  }

  changeExpressionKey: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({ expressionKey: event.target?.value });
  };

  editProfile = (change: Partial<FaceProfile>) => {
    this.setState((state) => (
      { profile: { ...state.profile, ...change } }
    ));
  };

  toggleTalking: ChangeEventHandler = () => {
    this.setState({ talking: !this.state.talking });
  };
  toggleLaughing: ChangeEventHandler = () => {
    this.setState({ laughing: !this.state.laughing });
  };
  toggleSizeIncludesEars: ChangeEventHandler = () => {
    this.setState({ sizeIncludesEars: !this.state.sizeIncludesEars });
  };
  toggleFollowMouse: ChangeEventHandler = () => {
    this.setState({ followMouse: !this.state.followMouse });
  };

  toggleAccessory(key: string) {
    const { accessoryKeys } = this.state;
    const index = accessoryKeys.indexOf(key);
    if (index === -1) {
      accessoryKeys.push(key);
    } else {
      accessoryKeys.splice(index, 1);
    }
    this.setState({ accessoryKeys });
  }

  render() {
    const { accessoryMap = {} } = this.props;
    const { talking, laughing, followMouse, sizeIncludesEars, expressionKey, accessoryKeys, profile, blinkPeriod } =
      this.state;

    return (
      <div
        style={{ border: '1px dotted black', margin: '1em', display: 'flex' }}
      >
        <SvgFrame
          style={{ width: '200px', border: '1px solid black' }}
          viewBox="0 0 120 150"
        >
          <FunnyFace
            x={20}
            y={50}
            size={80}
            expression={this.expression}
            talking={talking}
            laughing={laughing}
            followMouse={followMouse}
            blinkPeriod={blinkPeriod}
            profile={profile}
            accessories={this.wornAccessories}
            sizeIncludesEars={sizeIncludesEars}
          />
        </SvgFrame>

        <section>
          <h3>Face</h3>
          <div>
            <label>expression</label>
            <select onChange={this.changeExpressionKey} value={expressionKey}>
              {Object.entries(expressions).map((entry) => {
                const [key] = entry;
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              checked={talking}
              onChange={this.toggleTalking}
            />
            <label>talking</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={laughing}
              onChange={this.toggleLaughing}
            />
            <label>laughing</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={followMouse}
              onChange={this.toggleFollowMouse}
            />
            <label>followMouse</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={sizeIncludesEars}
              onChange={this.toggleSizeIncludesEars}
            />
            <label>sizeIncludesEars</label>
          </div>

          <div>
            <NumberInput
              label={'blinkPeriod'}
              value={blinkPeriod}
              min={0}
              max={100}
              step={1}
              inputHandler={(value) => {
                this.setState({ blinkPeriod: value });
              }}
              labelAfter={true}
            />
          </div>

        </section>

        <section>
          <h3>Accessories</h3>
          <div>
            {Object.keys(accessoryMap).map((key) => (
              <div key={key}>
                <input
                  type="checkbox"
                  checked={accessoryKeys.includes(key)}
                  onChange={() => {
                    this.toggleAccessory(key);
                  }}
                />
                <label>{key}</label>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3>Profile</h3>

          {profileNumberProperyData.map((data) => {
            const { property, min = 0, max, step = 0.1 } = data;
            return (
              <div key={property}>
                <NumberInput
                  label={`${profile[property]} ${property}`}
                  value={profile[property] || min}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  inputHandler={(value) => {
                    this.editProfile({ [property]: value });
                  }}
                  labelAfter={true}
                />
              </div>
            );
          })}
        </section>
        <section>
          <h3>Profile 2</h3>
          {profileColorProperyData.map((data) => {
            const { property, default: defaultValue } = data;
            return (
              <div key={property}>
                <StringInput
                  label={`${profile[property]} ${property}`}
                  value={profile[property] || defaultValue}
                  type="color"
                  labelAfter={true}
                  inputHandler={(value) => {
                    this.editProfile({ [property]: value });
                  }}
                />
              </div>
            );
          })}

          <RadioGroup label='Eybrows'
            options={browShapes}
            value={profile.browShape}
            onChange={(browShape => this.editProfile({ browShape }))} />
        </section>
        <section>
          <textarea id="profile-output"
            style={{ minHeight: '100%' }}
            value={JSON.stringify(profile, undefined, 1)}
            onChange={() => { }}
          />
        </section>
      </div>
    );
  }
}
