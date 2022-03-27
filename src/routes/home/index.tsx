import { FunctionalComponent, h } from 'preact';
import Face from '../../components/Face';
import { SvgFrame } from '../../components/SvgFrame';
import { uniqueId } from '../../lib/unique-id';
import style from './style.css';


const frameStyle = { width: '20rem', border: '5px double black', background: 'gray' };

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
            <SvgFrame style={frameStyle} viewBox='0 0 200 200'>
                <Face ident={uniqueId.generate('face')} x={50} y={30} size={100} followMouse eyeColor='brown' />
                <Face ident={uniqueId.generate('face')} x={20} y={70} size={30} followMouse/>
            </SvgFrame>
        </div>
    );
};

export default Home;
