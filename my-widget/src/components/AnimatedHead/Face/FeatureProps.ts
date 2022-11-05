import { ComponentChildren } from "preact";

type FeatureProps = {
    ident?: string;
    x: number;
    y: number;
    size: number;
    transitionTime?: number;
    children?: ComponentChildren
}

export type { FeatureProps }