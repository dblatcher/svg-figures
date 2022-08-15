import { FunctionalComponent, h } from 'preact';
import Face from '../components/Face';
import { FaceWithExpressionControl } from '../components/FaceWithExpressionControl';
import { SvgFrame } from '../components/SvgFrame';
import { accessoryMap } from '../lib/accessories';
import { expressions } from '../lib/expressions';
import { toothShapes } from '../shapes/tooth';
import { browShapes } from '../shapes/brow';
import { uniqueId } from '../lib/unique-id';
import UIForHead from './UIForHead';

const { pointy, square, missing, long } = toothShapes

const frameStyle = { width: '30rem', border: '5px double black', background: 'yellow' };

const App: FunctionalComponent = () => {
    return (
        <div>


            <UIForHead accessoryMap={accessoryMap} />
            <UIForHead accessoryMap={accessoryMap} />


            <SvgFrame style={frameStyle} viewBox='0 0 200 200'>

                <Face ident={uniqueId.generate('face')}
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


                <FaceWithExpressionControl ident={uniqueId.generate('face')}
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
                <Face ident={uniqueId.generate('face')}
                    x={10} y={110} size={50}
                    expression={expressions.HAPPY} talking
                    profile={{
                        eyeColor: 'darkolivegreen',
                        teeth: [pointy, pointy, missing, pointy, pointy, pointy]
                    }}
                />
            </SvgFrame>
        </div>
    );
};

export default App;
