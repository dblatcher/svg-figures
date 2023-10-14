import { useEffect, useRef, useState } from 'react';
import { clamp, getDistanceAndDirection } from '../../../util/calcuations';
import {
  FaceProfile,
  MouthArrangement,
  FacialExpression,
} from '../../../types';
import { getMaskUrl } from '../../../util/unique-id';
import { getLipCoordinates } from '../../../util/face-calculations';
import Chin from './Chin';
import Eye from './Eye';
import EyeBrow from './Eyebrow';
import FeatureFrame from './FeatureFrame';
import Mouth from './Mouth';
import Nose from './Nose';
import Teeth from './Teeth';

interface Props {
  x: number;
  y: number;
  size?: number;
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
}: Props) => {
  const [direction, setDirection] = useState<[number, number]>([0, 0]);
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

    setDirection(distance < size ? [0, 0] : relativeDisplacement);
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

  useEffect(() => {
    if (!followMouse) {
      setDirection([0, 0]);
    }
  }, [followMouse]);

  const {
    eyeDistance = 40,
    eyeColor,
    mouthNoseDistance = 20,
    mouthWidth = 40,
    browColor,
    browShape = [],
    round = 0.5,
    width = 1,
    color = 'lightgray',
    noseHeight = 10,
    noseWidth = 10,
  } = profile;
  const eyeX = clamp(eyeDistance, 75, 25) / 2;
  const eyePosLeft = !expression
    ? { dilation, browTilt, browRaise }
    : { ...expression?.leftEye, direction };
  const eyePosRight = !expression
    ? { dilation, browTilt, browRaise }
    : { ...expression?.rightEye, direction };

  const mouthY = clamp(mouthNoseDistance + noseHeight, 45, 5);
  const mouthIdent = ident + '-mouth';

  return (
    <FeatureFrame
      x={x}
      y={y}
      size={size}
      placement="top left"
      transitionTime={transitionTime}
    >
      <rect
        x={-50 * width}
        y={-50}
        width={100 * width}
        height={100}
        stroke={'black'}
        fill={color}
        rx={100 * (round / 2)}
        ry={100 * (round / 2)}
        style={{
          height: 100 + chinLevel,
          transition: `height ${transitionTime}s`,
        }}
      />

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
        transitionTime={transitionTime}
      />
      <Eye
        ident={ident + '-eye-right'}
        x={eyeX}
        y={-10}
        size={25}
        color={eyeColor}
        pos={eyePosRight}
        direction={direction}
        transitionTime={transitionTime}
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

      <Chin
        width={30}
        height={20}
        x={0}
        y={40}
        size={100}
        shift={chinLevel}
        profile={profile}
        transitionTime={transitionTime}
      />
    </FeatureFrame>
  );
};
export default Face;
