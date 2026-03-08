import type { BrowShape, EyeArrangement } from '../../../types';
import type { FeatureProps } from './FeatureProps';
import FeatureFrame from './FeatureFrame';

interface Props extends FeatureProps {
  color?: string;
  pos?: EyeArrangement;
  right?: boolean;
  browShape: BrowShape;
}

function drawBrow(s: number, browShape: BrowShape) {  
  const commands: string[] = browShape.map((coord, index) => {
    const code = index > 0 ? 'L' : 'M';
    const [x, y] = coord;
    return `${code} ${x * s} ${y * s}`;
  });

  return commands.join(' ');
}

export const EyeBrow = ({
  x,
  y,
  transitionTime = 0.5,
  size,
  color = 'black',
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
        }} d={drawBrow(75, browShape)} />
      </g>
    </FeatureFrame>
  );
};
export default EyeBrow;
