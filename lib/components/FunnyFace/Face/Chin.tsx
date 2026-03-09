import { PROFILE_DEFAULTS } from '../../../defaults';
import type { FaceProfile } from '../../../types';
import FeatureFrame from './FeatureFrame';

type Props = {
  width: number;
  height: number;
  shift: number;
  profile: FaceProfile;
  transitionTime?: number | undefined;
}

const Chin = ({
  width,
  height,
  shift,
  transitionTime = 0.5,
  profile,
}: Props) => {
  return (
    <FeatureFrame x={0} y={50 - height / 2} size={100} placement='center'>
      <rect
        style={{
          transition: `transform ${transitionTime}s`,
          transform: `translateY(${shift}px)`,
        }}
        x={-(width / 2)}
        width={width}
        height={height}
        stroke={'black'}
        fill={profile.color ?? PROFILE_DEFAULTS.color}
        rx={10}
        ry={20}
      />
    </FeatureFrame>
  );
};

export default Chin;
