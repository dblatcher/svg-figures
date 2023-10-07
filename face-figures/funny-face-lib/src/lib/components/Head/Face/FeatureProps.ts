import { ReactNode } from "react";

type FeatureProps = {
    ident?: string;
    x: number;
    y: number;
    size: number;
    transitionTime?: number;
    children?: ReactNode
}

export type { FeatureProps }