import {
  UIForFunnyFace,
  FaceWithExpressionControl,
  accessoryMap,
  FunnyFace,
  browShapes,
  expressions,
  ExpressionDesigner,
} from 'funny-face-lib';

export const App = () => {
  return (
    <div>
      <p>test app runs</p>
      <UIForFunnyFace accessoryMap={accessoryMap} />

      <ExpressionDesigner />

      <svg>
        <FaceWithExpressionControl x={10} y={10} profile={{ color: 'blue' }} />
        <FaceWithExpressionControl
          x={100}
          y={10}
          profile={{ color: 'green' }}
        />
      </svg>

      <svg>
        <FunnyFace
          x={0}
          y={0}
          blinkPeriod={5}
          size={100}
          profile={{
            browShape: browShapes.THIN,
            eyeColor: 'brown',
            eyeDistance: 30,
            mouthWidth: 40,
            mouthNoseDistance: 10,
            color: 'lightgreen',
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
