import type { Ref } from 'react';
import FeatureFrame from './FeatureFrame';
import type { FeatureProps } from './FeatureProps';
import type { PathShape } from '../../../types';

type Props = FeatureProps & {
  x: number;
  y: number;
  noseRef: Ref<SVGRectElement>;
  width: number;
  height: number;
  shape: PathShape;
}

const Nose = ({ noseRef, x, y, width, height, shape }: Props) => {
  return (
    <>
      <FeatureFrame
        aspectRatio={height / width}
        size={width}
        placement="center"
        y={y}
        x={x}
      >
        <path ref={noseRef}
          stroke="black"
          fill={'none'}
          strokeWidth={4}
          d={shape}
        />
      </FeatureFrame>
    </>
  );
};

export default Nose;
