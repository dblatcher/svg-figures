import { FunctionalComponent, h } from 'preact';
import Face from '../../components/Face';
import { FaceWithExpressionControl } from '../../components/FaceWithExpressionControl';
import { Head } from '../../components/Head';
import { SvgFrame } from '../../components/SvgFrame';
import { expressions } from '../../lib/expressions';
import { toothShapes } from '../../lib/faceProfile';
import { uniqueId } from '../../lib/unique-id';
import style from './style.css';

const { pointy, square, missing, long } = toothShapes

const frameStyle = { width: '30rem', border: '5px double black', background: 'yellow' };

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
            <SvgFrame style={frameStyle} viewBox='0 0 200 200'>

                <Head initialX={100} initialY={30} size={60} />

                <Face ident={uniqueId.generate('face')}
                    x={0} y={0} size={100}
                    profile={{
                        browType: 'wide',
                        eyeColor: 'brown',
                        eyeDistance: 30,
                        mouthWidth: 40,
                        mouthVerticalPosition: 30,
                        color:'lightgreen'
                    }}
                    followMouse />


                <FaceWithExpressionControl ident={uniqueId.generate('face')}
                    x={70} y={120} size={80} followMouse talking
                    profile={{
                        color: 'peachpuff',
                        lipColor: 'red',
                        width: .7,
                        round: .1,
                        lipWidth: 6,
                        mouthVerticalPosition: 30,
                        teeth: [square, square, square, long, long, square, square, square]
                    }}
                />
                <Face ident={uniqueId.generate('face')}
                    x={10} y={110} size={50}
                    expression={expressions.HAPPY} talking
                    profile={{
                        eyeColor: 'darkolivegreen',
                        teeth: [pointy, pointy, pointy, pointy, pointy, pointy]
                    }}
                />
            </SvgFrame>
        </div>
    );
};

export default Home;
