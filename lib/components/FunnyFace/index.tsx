import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type {
  Accessory,
  FaceProfile,
  FacialExpression,
  MouthArrangement,
} from '../../types';
import { randomInt } from '../../util/calcuations';
import { expressionWithBlink, getChinLevel } from '../../util/face-calculations';
import { uniqueId } from '../../util/unique-id';
import Face from './Face';
import FeatureFrame from './Face/FeatureFrame';
import { HeadAccessory } from './HeadAcessory';

interface Props {
  x: number;
  y: number;
  size: number;
  expression?: FacialExpression;
  talking?: boolean;
  laughing?: boolean;
  followMouse?: boolean;
  children?: ReactNode;
  profile?: FaceProfile;
  accessories?: Accessory[];
  transitionTime?: number;
  /** how long between each blink, in units of 100ms. Set to zero to prevent blinking  Defaults to 20 (blink every two seconds) */
  blinkPeriod?: number;
  sizeIncludesEars?: boolean;
}

export function FunnyFace({
  x,
  y,
  size,
  expression,
  talking,
  laughing,
  followMouse,
  transitionTime = 0.5,
  profile = {},
  accessories = [],
  children,
  blinkPeriod = 20,
  sizeIncludesEars = false,
}: Props) {
  const [movingMouth, setMovingMouth] = useState<MouthArrangement>({});
  const [blinkTime, setBlinkTime] = useState(randomInt(blinkPeriod));
  const blinking = blinkPeriod !== 0 && blinkTime <= 1;

  const talk = useCallback(() => {
    setMovingMouth({
      open: Math.random(),
      pucker: Math.random(),
      smile: Math.random() - 0.5,
    });
  }, []);

  // TO DO - better mouth arrangements for laugh
  const laugh = useCallback(() => {
    setMovingMouth({
      open: Date.now() % 1000 > 500 ? 0.2 : 1,
      pucker: 0,
      smile: .8,
    });
  }, [])

  // Set up the interval.
  useEffect(() => {
    const delay = (talking || laughing) ? 200 : 0;
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(talking ? talk : laugh, delay);
    return () => clearInterval(id);
  }, [talking, talk, laughing, laugh]);

  const blinkCountdown = useCallback(() => {
    const newBlinkTime = blinkTime <= 0 ? blinkPeriod : blinkTime - 1
    setBlinkTime(newBlinkTime)
  }, [setBlinkTime, blinkTime, blinkPeriod])

  useEffect(() => {
    const id = setInterval(blinkCountdown, 100);
    return () => clearInterval(id);
  }, [blinkCountdown])

  const arrangement: MouthArrangement = (talking || laughing)
    ? movingMouth
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
          sizeIncludesEars={sizeIncludesEars}
        />
        {accessories.map((accessory, index) => (
          <HeadAccessory key={index}
            accessory={accessory}
            faceProfile={profile}
            chinLevel={chinLevel}
            transitionTime={transitionTime}
            sizeIncludesEars={sizeIncludesEars}
          />
        ))}
        <FeatureFrame x={-50} y={-50} size={100} placement="top left">
          {children}
        </FeatureFrame>
      </g>
    </FeatureFrame>
  );
}
