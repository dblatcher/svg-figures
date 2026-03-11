import { useMemo } from "react";

interface Props {
    headWidth: number;
    color: string;
    transitionTime: number;
    round: number;
    chinLevel: number;
    chinWidth: number;
    chinHeight: number;

}

export const HeadShape = ({ headWidth, color, transitionTime, round, chinLevel, chinWidth, chinHeight }: Props) => {

    const half = headWidth / 2;
    const arcSize = half * round;
    const jawDistance = half * (chinWidth / 100);

    const craniumPath = useMemo(() => `
    M${-half} 30 
    L${-half} ${arcSize - 50} 
    A${arcSize} ${arcSize} 0 0 1 ${arcSize - half} -50 
    L${half - arcSize} -50 
    A${arcSize} ${arcSize} 0 0 1 ${half} ${arcSize - 50} 
    L${half} 30`,
        [arcSize, half])

    const jawPath = useMemo(() => `
    M${half} 0
    L${half} 30
    L${jawDistance} 50
    A${jawDistance} ${chinHeight} 0 0 1 ${-jawDistance} 50
    L${-half} 30
    L${-half} 0`,
        [half,jawDistance,chinHeight])

    return (
        <>
            <path
                x={-half}
                y={-50}
                width={headWidth}
                stroke={'black'}
                fill={color}
                d={jawPath}
                style={{
                    transformOrigin: 'top',
                    transform: `translateY(${chinLevel}%)`,
                    transition: `transform ${transitionTime}s`,
                }}
            />
            <path
                x={-half}
                y={-50}
                width={headWidth}
                stroke={'black'}
                fill={color}
                d={craniumPath}
            />
        </>
    )
}