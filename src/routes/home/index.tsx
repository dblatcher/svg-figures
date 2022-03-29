import { FunctionalComponent, h } from 'preact';
import Face from '../../components/Face';
import { SvgFrame } from '../../components/SvgFrame';
import { expressions } from '../../lib/expressions';
import { uniqueId } from '../../lib/unique-id';
import style from './style.css';


const frameStyle = { width: '20rem', border: '5px double black', background: 'gray' };

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
            <SvgFrame style={frameStyle} viewBox='0 0 200 200'>
                <Face expression={expressions.ANGRY} ident={uniqueId.generate('face')} x={60} y={30} size={100} eyeColor='brown' followMouse />
                <Face ident={uniqueId.generate('face')} x={10} y={70} size={40} followMouse/>
                <Face ident={uniqueId.generate('face')} x={10} y={110} size={40} expression={expressions.NEUTRAL} followMouse/>
            </SvgFrame>
        </div>
    );
};

export default Home;
