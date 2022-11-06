import { h, VNode } from 'preact';
import UIForHead from './components/UIForHead';

import './style.css';

interface Props {
    color?: string;
}

export default function App(props: Props): VNode {
    return (
        <div>
            <h1 style={{ color: props.color }}>Hello, World!</h1>
            <UIForHead />
        </div>
    );
}
