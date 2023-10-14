import { CSSProperties } from 'react';
import { clamp } from '../../util/calcuations';
import { Accessory, FaceProfile } from '../../types';

interface Props {
  accessory: Accessory;
  faceProfile: FaceProfile;
  chinLevel: number;
  transitionTime: number;
}

interface CenteredImageProps {
  src: string;
  x: number;
  y: number;
  width: number;
  transitionTime?: number;
}
const CenteredImage = ({
  src,
  width,
  x,
  y,
  transitionTime,
}: CenteredImageProps) => {
  return (
    <image
      href={src}
      x={x - width / 2}
      y={y - width / 2}
      width={width}
      style={
        {
          y: y - width / 2,
          transition: transitionTime && `y ${transitionTime}s`,
        } as CSSProperties
      }
    />
  );
};

const getPosition = (
  accessory: Accessory,
  faceProfile: FaceProfile,
  chinLevel: number
): { x: number; y: number } => {
  const { x, y, place } = accessory;
  const eyeDistance = clamp(faceProfile.eyeDistance || 0, 75, 25) / 2;

  switch (place) {
    case 'right-eye':
      return {
        x: x + eyeDistance,
        y: y - 10,
      };
    case 'left-eye':
      return {
        x: x - eyeDistance,
        y: y - 10,
      };
    case 'nose':
      return {
        x,
        y: y + (faceProfile.noseHeight || 10),
      };
    case 'chin':
      return {
        x,
        y: y + 50 + chinLevel,
      };
    default:
      return { x, y };
  }
};

export const HeadAccessory = ({
  accessory,
  faceProfile,
  chinLevel,
  transitionTime,
}: Props) => {
  const { src, width, place } = accessory;
  const position = getPosition(accessory, faceProfile, chinLevel);

  return (
    <CenteredImage
      src={src}
      x={position.x}
      y={position.y}
      width={width}
      transitionTime={place === 'chin' ? transitionTime : undefined}
    />
  );
};
