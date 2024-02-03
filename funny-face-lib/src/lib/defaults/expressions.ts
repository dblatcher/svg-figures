import { FacialExpression } from '../types';

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
    open: 0.8,
    pucker: 0.8,
  },
};

const ANGRY: FacialExpression = {
  leftEye: {
    open: 0.4,
    browTilt: 30,
    browRaise: -5,
    dilation: 0.5,
  },
  rightEye: {
    open: 0.4,
    browTilt: 30,
    browRaise: -5,
    dilation: 0.5,
  },
  mouth: {
    smile: -0.2,
  },
};

const ODD: FacialExpression = {
  leftEye: {
    open: 2,
    browTilt: 20,
    browRaise: 10,
  },
  rightEye: {
    dilation: 0.5,
    browRaise: -10,
  },
  mouth: {
    smile: 1,
    pucker: 0.5,
    open: 0.3,
  },
};

const HAPPY: FacialExpression = {
  leftEye: {
    browRaise: 10,
  },
  rightEye: {
    browRaise: 10,
  },
  mouth: {
    smile: 0.75,
    open: 0.7,
  },
};

const ASLEEP: FacialExpression = {
  leftEye: {
    open: 0.025,
    browRaise: -10,
  },
  rightEye: {
    open: 0.025,
    browRaise: -10,
  },
  mouth: {
    open: 0.5,
  },
};

const SUSPICIOUS: FacialExpression = {
  leftEye: {
    browRaise: 15,
    open: 0.5,
    dilation: 0.8,
    browTilt: 10
  },
  rightEye: {
    browTilt: 11,
    open: 0.45,
    dilation: 0.8,
    browRaise: -10
  },
  mouth: {
    smile: -0.2,
    pucker: 0.3,
    open: 0
  }
}

const NEUTRAL: FacialExpression = {
  leftEye: {},
  rightEye: {},
  mouth: {},
};

export const expressions = { AFRAID, ANGRY, NEUTRAL, ODD, HAPPY, ASLEEP, SUSPICIOUS };
