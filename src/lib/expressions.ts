
interface EyeArrangement {
    open?: number
    browTilt?: number
    browRaise?: number
    dilation?: number
}

interface MouthArrangement {
    smile?: number
    open?: number
    pucker?: number
}

interface FacialExpression {
    leftEye: EyeArrangement
    rightEye: EyeArrangement
    mouth: MouthArrangement
}
export type { FacialExpression, EyeArrangement, MouthArrangement }

const AFRAID: FacialExpression = {
    leftEye: {
        open: 1,
        browTilt: 0,
        browRaise: 20,
        dilation: 1.5,
    },
    rightEye: {
        open: 1,
        browTilt: 0,
        browRaise: 20,
        dilation: 1.5,
    },
    mouth: {
        smile: 0,
        open: .8,
        pucker: .8,
    },
}

const ANGRY: FacialExpression = {
    leftEye: {
        open: .4,
        browTilt: 30,
        browRaise: -5,
        dilation: .5,
    },
    rightEye: {
        open: .4,
        browTilt: 30,
        browRaise: -5,
        dilation: .5,
    },
    mouth: {
        smile: -.2
    },
}

const ODD: FacialExpression = {
    leftEye: {
        open: 2,
        browTilt: 20,
        browRaise: 10,
    },
    rightEye: {
        dilation: .5,
        browRaise: -10,
    },
    mouth: {
        smile: 1,
        pucker:.5,
        open:.3,
    },
}

const HAPPY: FacialExpression = {
    leftEye: {
        browRaise: 10,
    },
    rightEye: {
        browRaise: 10,
    },
    mouth: {
        smile: .75,
        open: .7,
    },
}

const NEUTRAL: FacialExpression = {
    leftEye: {},
    rightEye: {},
    mouth: {},
}

export const expressions = { AFRAID, ANGRY, NEUTRAL, ODD, HAPPY }