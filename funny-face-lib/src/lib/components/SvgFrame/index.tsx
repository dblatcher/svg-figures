import { CSSProperties, ReactNode, SVGAttributes } from "react"



interface Props {
    children?: ReactNode
    style?: CSSProperties
    viewBox?: SVGAttributes<unknown>["viewBox"]
}

export const SvgFrame = ({
    style = {}, viewBox = "0 0 100 100", children
}: Props) => {



    return <figure style={style}>
        <svg
            viewBox={viewBox}
            xmlns="<http://www.w3.org/2000/svg>"
        >
            {children}
        </svg>
    </figure>
}
