import { Component } from 'react';
import type { ChangeEventHandler, } from 'react';
import { browShapes } from '../defaults/browShapes';
import { expressions } from '../defaults/expressions';
import { type Accessory, type FaceProfile, type FacialExpression } from '../types';
import {
  profileColorProperyData,
  profileNumberProperyData,
} from '../util/faceProfile';
import { FunnyFace } from './FunnyFace';
import { SvgFrame } from './SvgFrame';
import { Checkbox, NumberInput, RadioGroup, StringInput } from './formControls';
import { earShapes } from '../defaults/earShapes';
import { PROFILE_DEFAULTS } from '../defaults';

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

const excludeDefaults = (profile: FaceProfile): FaceProfile => {
  const newProfile: FaceProfile = {}
  Object.entries(profile).forEach(([key, value]) => {
    if (PROFILE_DEFAULTS[key as keyof FaceProfile] !== value) {
      newProfile[key as keyof FaceProfile] = value
    }
  })
  return newProfile
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
        ...PROFILE_DEFAULTS,
        teeth: undefined,
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

  toggleTalking = () => {
    this.setState({ talking: !this.state.talking });
  };
  toggleLaughing = () => {
    this.setState({ laughing: !this.state.laughing });
  };
  toggleSizeIncludesEars = () => {
    this.setState({ sizeIncludesEars: !this.state.sizeIncludesEars });
  };
  toggleFollowMouse = () => {
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

          <Checkbox value={talking} label='talking' toggle={() => this.toggleTalking()} />
          <Checkbox value={laughing} label='laughing' toggle={() => this.toggleLaughing()} />
          <Checkbox value={followMouse} label='followMouse' toggle={() => this.toggleFollowMouse()} />
          <Checkbox value={sizeIncludesEars} label='sizeIncludesEars' toggle={() => this.toggleSizeIncludesEars()} />

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
              <Checkbox key={key}
                value={accessoryKeys.includes(key)}
                label={key}
                toggle={() => this.toggleAccessory(key)} />
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
            const { property } = data;
            return (
              <div key={property}>
                <StringInput
                  label={`${profile[property]} ${property}`}
                  value={profile[property] || PROFILE_DEFAULTS[property]}
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
          <RadioGroup label='Ears'
            options={earShapes}
            value={profile.earShape}
            onChange={(earShape => this.editProfile({ earShape }))} />
        </section>
        <section>
          <textarea id="profile-output"
            style={{ minHeight: '100%' }}
            value={JSON.stringify(excludeDefaults(profile), undefined, 1)}
            onChange={() => { }}
          />
        </section>
      </div>
    );
  }
}
