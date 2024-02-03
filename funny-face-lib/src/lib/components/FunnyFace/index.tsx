import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { expressionWithBlink, getChinLevel } from '../../util/face-calculations';
import { uniqueId } from '../../util/unique-id';
import {
  Accessory,
  FaceProfile,
  FacialExpression,
  MouthArrangement,
} from '../../types';
import Face from './Face';
import FeatureFrame from './Face/FeatureFrame';
import { HeadAccessory } from './HeadAcessory';
import { randomInt } from '../../util/calcuations';

interface Props {
  x: number;
  y: number;
  size: number;
  expression?: FacialExpression;
  talking?: boolean;
  followMouse?: boolean;
  children?: ReactNode;
  profile?: FaceProfile;
  accessories?: Accessory[];
  transitionTime?: number;
  /** how long between each blink, in units of 100ms. Set to zero to prevent blinking  Defaults to 20 (blink every two seconds) */
  blinkPeriod?: number;
}

export function FunnyFace({
  x,
  y,
  size,
  expression,
  talking,
  followMouse,
  transitionTime = 0.5,
  profile = {},
  accessories = [],
  children,
  blinkPeriod = 20,
}: Props) {
  const [talkingMouth, setTalkingMouth] = useState<MouthArrangement>({});
  const [blinkTime, setBlinkTime] = useState(randomInt(blinkPeriod));
  const blinking = blinkPeriod !== 0 && blinkTime <= 1;

  const talk = () => {
    setTalkingMouth({
      open: Math.random(),
      pucker: Math.random(),
      smile: Math.random() - 0.5,
    });
  };
  const savedTalk = useRef(talk);
  const delay = talking ? 300 : 0;
  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedTalk.current(), delay);
    return () => clearInterval(id);
  }, [delay]);

  const blinkCountdown = useCallback(() => {
    const newBlinkTime = blinkTime <= 0 ? blinkPeriod : blinkTime - 1
    setBlinkTime(newBlinkTime)
  }, [setBlinkTime, blinkTime, blinkPeriod])

  useEffect(() => {
    const id = setInterval(blinkCountdown, 100);
    return () => clearInterval(id);
  }, [blinkCountdown])

  const arrangement: MouthArrangement = talking
    ? talkingMouth
    : expression?.mouth || {};
  const chinLevel = getChinLevel(arrangement, profile);

  return (
    <FeatureFrame x={x} y={y} size={size} placement="top left">
      <g>
        <Face
          x={-50}
          y={-50}
          size={100}
          ident={uniqueId.generate('head')}
          expression={expressionWithBlink(blinking, expression)}
          talking={talking}
          followMouse={followMouse}
          profile={profile}
          mouthArrangement={arrangement}
          chinLevel={chinLevel}
          transitionTime={transitionTime}
        />
        {accessories.map((accessory, index) => (
          <HeadAccessory key={index}
            accessory={accessory}
            faceProfile={profile}
            chinLevel={chinLevel}
            transitionTime={transitionTime}
          />
        ))}
        <FeatureFrame x={-50} y={-50} size={100} placement="top left">
          {children}
        </FeatureFrame>
      </g>
    </FeatureFrame>
  );
}
