
interface EyePosition {
    open?: number
    browTilt?: number
    browRaise?: number
    dilation?: number
}

interface FacialExpression {
    leftEye: EyePosition
    rightEye: EyePosition
}
export type { FacialExpression, EyePosition }

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
    }
}

const ANGRY:FacialExpression = {
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
    }
}

const ODD:FacialExpression = {
    leftEye:{
        open:2,
        browTilt:20,
        browRaise:10,
    },
    rightEye: {
        dilation:.5,
        browRaise:-10,
    },
}

const NEUTRAL:FacialExpression = {
    leftEye:{},
    rightEye: {},
}

export const expressions = { AFRAID, ANGRY, NEUTRAL,ODD }