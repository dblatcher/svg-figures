import { FaceProfile } from '../../../types';
import FeatureFrame from './FeatureFrame';
import { FeatureProps } from './FeatureProps';

interface Props extends FeatureProps {
  width: number;
  height: number;
  shift: number;
  profile: FaceProfile;
}

const Chin = ({
  x,
  y,
  size,
  width,
  height,
  shift,
  transitionTime = 0.5,
  profile,
}: Props) => {
  return (
    <FeatureFrame x={x} y={y} size={size}>
      <rect
        style={{
          transition: `transform ${transitionTime}s`,
          transform: `translateY(${shift}px)`,
        }}
        x={-(width / 2)}
        y2={-50}
        width={width}
        height={height}
        stroke={'black'}
        fill={profile.color ?? 'lightgray'}
        rx={10}
        ry={20}
      />
    </FeatureFrame>
  );
};

export default Chin;
