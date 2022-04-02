import { VNode } from "preact";

type FeatureProps = {
    ident?: string;
    x: number;
    y: number;
    size: number;
    transitionTime?: number;
    children?: VNode | VNode[]
}

export type {FeatureProps}