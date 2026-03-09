import type { PathShape, EyeArrangement } from '../../../types';
import type { FeatureProps } from './FeatureProps';
import FeatureFrame from './FeatureFrame';
import { PROFILE_DEFAULTS } from '../../../defaults';

interface Props extends FeatureProps {
  color?: string;
  pos?: EyeArrangement;
  right?: boolean;
  browShape: PathShape;
}

export const EyeBrow = ({
  x,
  y,
  transitionTime = 0.5,
  size,
  color = PROFILE_DEFAULTS.browColor,
  right,
  pos = {},
  browShape,
}: Props) => {
  const { browTilt = 0, browRaise = 0 } = pos;
  const adjustedAngle = right ? -browTilt : browTilt;

  const browStyle = {
    transform: `translateY(${-browRaise}%) rotateZ(${adjustedAngle}deg)`,
    transition: `transform ${transitionTime}s`,
    fill: color,
  };

  return (
    <FeatureFrame x={x} y={y} size={size}>
      <g style={browStyle}>
        <path style={{
          transformOrigin: 'centre',
          transform: right ? 'scaleX(-1)' : undefined
        }} d={browShape} />
      </g>
    </FeatureFrame>
  );
};
export default EyeBrow;
