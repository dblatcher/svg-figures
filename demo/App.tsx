
import { earShapes } from '../lib/defaults/earShapes';
import {
  UIForFunnyFace,
  FaceWithExpressionControl,
  accessoryMap,
  FunnyFace,
  expressions,
  ExpressionDesigner,
  browShapes,
} from '../lib/main';

export const App = () => {
  return (
    <div>
      <p>test app runs</p>
      <svg style={{background:'pink'}}>
        <FaceWithExpressionControl x={0} y={20} profile={{ color: 'blue' }} />
        <FaceWithExpressionControl
          x={100}
          y={20}
          profile={{ color: 'green' }}
        />
      </svg>
      <UIForFunnyFace accessoryMap={accessoryMap} />

      <ExpressionDesigner />


      <svg>
        <FunnyFace
          x={0}
          y={0}
          sizeIncludesEars
          laughing
          blinkPeriod={5}
          size={100}
          profile={{
            browShape: browShapes.THIN,
            eyeColor: 'brown',
            eyeDistance: 30,
            mouthWidth: 40,
            mouthNoseDistance: 10,
            color: 'lime',
          }}
          followMouse
        />
        <FunnyFace
          x={140}
          y={0}
          size={80}
          followMouse
          profile={{
            color: 'peachpuff',
            lipColor: 'red',
            browShape: browShapes.WIDE,
            earShape: earShapes.CURVED,
            width: 0.7,
            round: 0.1,
            lipWidth: 6,
            mouthNoseDistance: 30,
          }}
        />
        <FunnyFace
          x={220}
          y={0}
          size={50}
          expression={expressions.HAPPY}
          talking
          profile={{
            eyeColor: 'darkolivegreen',
          }}
        />
      </svg>
    </div>
  );
};


export default App
