import type { CSSProperties } from 'react';
import { clamp } from '../../util/calcuations';
import { type Accessory, type FaceProfile } from '../../types';
import { PROFILE_DEFAULTS } from '../../defaults';

interface Props {
  accessory: Accessory;
  faceProfile: FaceProfile;
  chinLevel: number;
  transitionTime: number;
  sizeIncludesEars: boolean;
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
  chinLevel: number,
  sizeIncludesEars: boolean,
): { x: number; y: number } => {
  const { x, y, place } = accessory;
  const {
    width = PROFILE_DEFAULTS.width,
    earWidth = PROFILE_DEFAULTS.earWidth,
    earHeight = PROFILE_DEFAULTS.earHeight,
  } = faceProfile
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
    case 'right-ear': {
      return {
        x: x + (width * 50) - (earWidth * (sizeIncludesEars ? 1 : 0)),
        y: y - 10 + earHeight / 2,
      }
    }
    case 'left-ear': {
      return {
        x: x - (width * 50) + (earWidth * (sizeIncludesEars ? 1 : 0)),
        y: y - 10 + earHeight / 2,
      }
    }
    default:
      return { x, y };
  }
};

export const HeadAccessory = ({
  accessory,
  faceProfile,
  chinLevel,
  transitionTime,
  sizeIncludesEars,
}: Props) => {
  const { src, place, adjustWidth } = accessory;
  const position = getPosition(accessory, faceProfile, chinLevel, sizeIncludesEars);
  const { earWidth = PROFILE_DEFAULTS.earWidth, width = PROFILE_DEFAULTS.width } = faceProfile

  const accessoryWidth = adjustWidth
    ? (accessory.width * width) - (sizeIncludesEars ? earWidth * 2 : 0)
    : accessory.width

  return (
    <CenteredImage
      src={src}
      x={position.x}
      y={position.y}
      width={accessoryWidth}
      transitionTime={place === 'chin' ? transitionTime : undefined}
    />
  );
};
