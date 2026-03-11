import { useEffect, useRef, useState } from 'react';
import { PROFILE_DEFAULTS } from '../../../defaults';
import {
  type FaceProfile,
  type FacialExpression,
  type MouthArrangement,
} from '../../../types';
import { clamp, getDistanceAndDirection } from '../../../util/calcuations';
import { getLipCoordinates } from '../../../util/face-calculations';
import { getMaskUrl } from '../../../util/unique-id';
import { Ear } from './Ear';
import Eye from './Eye';
import EyeBrow from './Eyebrow';
import FeatureFrame from './FeatureFrame';
import { HeadShape } from './HeadShape';
import Mouth from './Mouth';
import Nose from './Nose';
import Teeth from './Teeth';

interface Props {
  x: number;
  y: number;
  size?: number;
  sizeIncludesEars?: boolean;
  followMouse?: boolean;
  ident: string;
  expression?: FacialExpression;
  profile?: FaceProfile;
  talking?: boolean;
  mouthArrangement?: MouthArrangement;
  chinLevel: number;
  transitionTime?: number;
}

const dilationRange = 150;
const defaultFaceSize = 60;

function calculateDilation(distance: number) {
  if (distance > dilationRange) {
    return 1;
  }
  return Math.min(1 + (dilationRange - distance) / dilationRange, 1.5);
}

function calculateEyebrowTilt(distance: number) {
  return clamp((200 - distance) / 2, 30);
}

function calculateEyebrowRise(distance: number) {
  return clamp((200 - distance) / 8, 20);
}

export const Face = ({
  x,
  y,
  followMouse,
  size = defaultFaceSize,
  ident,
  expression,
  profile = {},
  mouthArrangement,
  chinLevel,
  transitionTime = 0.5,
  sizeIncludesEars,
}: Props) => {
  const [trackedEyeDirection, setTrackedDirection] = useState<[number, number]>([0, 0]);
  const [dilation, setDilation] = useState<number>(1);
  const [browTilt, setBrowTilt] = useState<number>(0);
  const [browRaise, setBrowRaise] = useState<number>(0);

  const noseRef = useRef<SVGRectElement>(null);

  const trackMouse = (event: MouseEvent) => {
    if (!followMouse) {
      return;
    }
    const { current: nose } = noseRef;
    if (!nose) {
      return;
    }
    const {
      left: noseLeft,
      top: noseTop,
      width,
      height,
    } = nose.getBoundingClientRect();
    const { clientX, clientY } = event;
    const { distance, relativeDisplacement } = getDistanceAndDirection(
      clientX,
      clientY,
      noseLeft + width / 2,
      noseTop + height / 2
    );

    setTrackedDirection(distance < size ? [0, 0] : relativeDisplacement);
    setDilation(calculateDilation(distance));
    setBrowTilt(calculateEyebrowTilt(distance));
    setBrowRaise(calculateEyebrowRise(distance));
  };

  useEffect(() => {
    window.addEventListener('mousemove', trackMouse);
    return () => {
      window.removeEventListener('mousemove', trackMouse);
    };
  });

  const {
    eyeDistance,
    eyeColor,
    mouthNoseDistance,
    mouthWidth,
    browColor,
    browShape,
    earShape,
    round,
    width,
    color,
    noseHeight,
    noseWidth,
    chinWidth,
    chinHeight,
    earWidth,
    earHeight,
  } = { ...PROFILE_DEFAULTS, ...profile };

  const direction: [number, number] = followMouse ? trackedEyeDirection : [0, 0]
  const eyeX = clamp(eyeDistance, 75, 25) / 2;
  const eyePosLeft = !expression
    ? { dilation, browTilt, browRaise }
    : { ...expression?.leftEye, direction };
  const eyePosRight = !expression
    ? { dilation, browTilt, browRaise }
    : { ...expression?.rightEye, direction };

  const mouthY = clamp(mouthNoseDistance + noseHeight, 45, 5);
  const mouthIdent = ident + '-mouth';
  const faceWidth = sizeIncludesEars ? 100 - 2 * earWidth : 100;


  return (
    <FeatureFrame
      x={x}
      y={y}
      size={size}
      placement="top left"
      transitionTime={transitionTime}
    >
      <HeadShape
        headWidth={faceWidth * width}
        color={color}
        transitionTime={transitionTime}
        round={round}
        chinLevel={chinLevel}
        chinWidth={chinWidth}
        chinHeight={chinHeight}
      />

      {earWidth > 0 && earHeight > 0 && <>
        <Ear
          width={earWidth}
          height={earHeight}
          side='left'
          shape={earShape}
          color={color}
          fromCenter={faceWidth * width / 2}
        />
        <Ear
          width={earWidth}
          height={earHeight}
          side='right'
          shape={earShape}
          color={color}
          fromCenter={faceWidth * width / 2}
        />
      </>}

      <Nose
        noseRef={noseRef}
        width={noseWidth}
        height={noseHeight}
        x={0}
        y={0}
        size={100}
      />
      <Eye
        ident={ident + '-eye-left'}
        x={-eyeX}
        y={-10}
        size={25}
        color={eyeColor}
        pos={eyePosLeft}
        direction={direction}
        transitionTime={transitionTime / 2}
      />
      <Eye
        ident={ident + '-eye-right'}
        x={eyeX}
        y={-10}
        size={25}
        color={eyeColor}
        pos={eyePosRight}
        direction={direction}
        transitionTime={transitionTime / 2}
      />
      <EyeBrow
        x={-eyeX}
        y={-25}
        size={30}
        pos={eyePosLeft}
        color={browColor}
        browShape={browShape}
        transitionTime={transitionTime}
      />
      <EyeBrow
        x={eyeX}
        y={-25}
        size={30}
        pos={eyePosRight}
        color={browColor}
        browShape={browShape}
        right
        transitionTime={transitionTime}
      />
      <Mouth
        ident={mouthIdent}
        x={0}
        y={mouthY}
        size={mouthWidth}
        arrangement={mouthArrangement}
        lipColor={profile?.lipColor}
        lipWidth={profile?.lipWidth}
        lips={getLipCoordinates(mouthArrangement)}
        transitionTime={transitionTime}
      >
        <Teeth maskUrl={getMaskUrl(mouthIdent)} toothList={profile?.teeth} />
      </Mouth>
    </FeatureFrame>
  );
};
export default Face;
