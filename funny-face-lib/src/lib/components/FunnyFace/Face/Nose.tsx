import { Ref } from 'react';
import FeatureFrame from './FeatureFrame';
import { FeatureProps } from './FeatureProps';

interface Props extends FeatureProps {
  noseRef: Ref<SVGRectElement>;
  width: number;
  height: number;
}

const Nose = ({ noseRef, x, y, size, width, height }: Props) => {
  return (
    <FeatureFrame x={x} y={y} size={size}>
      <rect
        ref={noseRef}
        x={-(width / 2)}
        y2={-50}
        width={width}
        height={height}
        stroke={'black'}
        fill={'none'}
        ry={20}
      />
    </FeatureFrame>
  );
};

export default Nose;
