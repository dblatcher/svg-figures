import { UIForHead, HeadWithExpressionControl, accessoryMap } from '../../../funny-face-lib/src/index';


export const App = () => {
  return (
    <div>
      <p>test app runs</p>
      <UIForHead accessoryMap={accessoryMap} />

      <svg>
        <HeadWithExpressionControl x={10} y={10} profile={{ color: 'blue' }} />
        <HeadWithExpressionControl x={100} y={10} profile={{ color: 'green' }} />
      </svg>


      {/* <SvgFrame style={frameStyle} viewBox='0 0 200 200'>

                <Head
                    x={0} y={0} size={100}
                    profile={{
                        browShape: browShapes['wide'],
                        eyeColor: 'brown',
                        eyeDistance: 30,
                        mouthWidth: 40,
                        mouthNoseDistance: 30,
                        color: 'lightgreen'
                    }}
                    followMouse />


                <HeadWithExpressionControl
                    x={70} y={120} size={80} followMouse
                    profile={{
                        color: 'peachpuff',
                        lipColor: 'red',
                        browShape: browShapes.thin,
                        width: .7,
                        round: .1,
                        lipWidth: 6,
                        mouthNoseDistance: 30,
                        teeth: [square, square, square, long, long, square, square, square]
                    }}
                />
                <Head
                    x={10} y={110} size={50}
                    expression={expressions.HAPPY} talking
                    profile={{
                        eyeColor: 'darkolivegreen',
                        teeth: [pointy, pointy, missing, pointy, pointy, pointy]
                    }}
                />
            </SvgFrame> */}
    </div>
  );
};


