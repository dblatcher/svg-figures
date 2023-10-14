import { ReactNode } from 'react';

export type FeatureProps = {
  ident?: string;
  x: number;
  y: number;
  size: number;
  transitionTime?: number;
  children?: ReactNode;
};
