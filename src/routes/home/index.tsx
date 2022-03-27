import { FunctionalComponent, h } from 'preact';
import Face from '../../components/Face';
import { SvgFrame } from '../../components/SvgFrame';
import style from './style.css';


const frameStyle = { width: '20rem', border: '5px double black', background: 'gray' };

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
            <SvgFrame style={frameStyle} viewBox='0 0 100 100'>
                <Face x={20} y={60} />
                <Face x={50} y={30} followMouse eyeColor='brown' />
            </SvgFrame>
        </div>
    );
};

export default Home;
