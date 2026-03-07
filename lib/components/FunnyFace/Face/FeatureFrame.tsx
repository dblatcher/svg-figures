import type { FeatureProps } from './FeatureProps';

interface Props extends FeatureProps {
  placement?: 'center' | 'top left';
  aspectRatio?: number;
}


const FeatureFrame = ({
  x,
  y,
  size,
  children,
  placement = 'center',
  aspectRatio = 1,
}: Props) => {

  const width = size;
  const height = size * aspectRatio;

  const getPosition = () => {
    switch (placement) {
      case 'center':
        return {
          x: x - width / 2,
          y: y - height / 2,
        }
      default:
        return { x, y }

    }
  }
  const position = getPosition()

  return (
    <svg
      x={position.x}
      y={position.y}
      width={width}
      height={height}
      viewBox={'-50 -50 100 100'}
      preserveAspectRatio='none'
      style={{ overflow: 'visible' }}
    >
      {children}
    </svg>
  );
};

export default FeatureFrame;
