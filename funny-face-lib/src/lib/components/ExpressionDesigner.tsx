import { useState } from "react";
import { FunnyFace } from "./FunnyFace";
import { SvgFrame } from "./SvgFrame";
import { EyeArrangement, FacialExpression, MouthArrangement } from "../types";
import { browShapes } from "../defaults";
import { NumberInput } from "./formControls";


const EyeControls = (
  { eye, setEye }: { eye: EyeArrangement, setEye: { (eye: EyeArrangement): void } }
) => {
  return (<>
    <NumberInput label="open"
      value={eye.open ?? 0.75}
      type="range"
      step={.05}
      min={0}
      max={1}
      inputHandler={(value) => {
        setEye({ ...eye, open: value })
      }} />
    <NumberInput label="browTilt"
      value={eye.browTilt ?? 0.75}
      type="range"
      step={1}
      min={0}
      max={45}
      inputHandler={(value) => {
        setEye({ ...eye, browTilt: value })
      }} />
    <NumberInput label="browRaise"
      value={eye.browRaise ?? 0.75}
      type="range"
      step={1}
      min={-20}
      max={20}
      inputHandler={(value) => {
        setEye({ ...eye, browRaise: value })
      }} />
    <NumberInput label="dilation"
      value={eye.dilation ?? 1}
      type="range"
      step={.1}
      min={0}
      max={2}
      inputHandler={(value) => {
        setEye({ ...eye, dilation: value })
      }} />
  </>)
}

const MouthControls = (
  { mouth, setMouth }: { mouth: MouthArrangement, setMouth: { (eye: MouthArrangement): void } }
) => {
  return (<>
    <NumberInput label="open"
      value={mouth.open ?? 0}
      type="range"
      step={.05}
      min={0}
      max={1}
      inputHandler={(value) => {
        setMouth({ ...mouth, open: value })
      }} />
    <NumberInput label="smile"
      value={mouth.smile ?? 0}
      type="range"
      step={.05}
      min={-1}
      max={1}
      inputHandler={(value) => {
        setMouth({ ...mouth, smile: value })
      }} />
    <NumberInput label="pucker"
      value={mouth.pucker ?? 0}
      type="range"
      step={.05}
      min={0}
      max={1}
      inputHandler={(value) => {
        setMouth({ ...mouth, pucker: value })
      }} />

  </>)
}


export const ExpressionDesigner = () => {

  const [leftEye, setLeftEye] = useState<EyeArrangement>({})
  const [rightEye, setRightEye] = useState<EyeArrangement>({})
  const [mouth, setMouth] = useState<MouthArrangement>({})

  const expression: FacialExpression = { leftEye, rightEye, mouth }

  return (
    <div
      style={{ border: '1px dotted black', margin: '1em', display: 'flex' }}
    >
      <SvgFrame
        style={{ width: '200px', border: '1px solid black' }}
        viewBox="0 0 120 150"
      >
        <FunnyFace
          x={20}
          y={50}
          size={80}
          profile={{
            browShape: browShapes.THIN,
          }}
          expression={expression}
          talking={false}
          followMouse={true}
          accessories={[]}
        />
      </SvgFrame>

      <section>
        <h2>expression designer</h2>

        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>left eye</h3>
            <EyeControls eye={leftEye} setEye={setLeftEye} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>right eye</h3>
            <EyeControls eye={rightEye} setEye={setRightEye} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Mouth</h3>
            <MouthControls mouth={mouth} setMouth={setMouth} />
          </div>
        </div>
      </section>

      <section>
        <textarea
          style={{height:'100%'}}
          value={JSON.stringify(expression, undefined, 1)} rows={20}
        />
      </section>

    </div>
  );

}