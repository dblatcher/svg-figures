

import { FunctionComponent } from "react";
import { eventToNumber, eventToString } from "../lib/util";


export const NumberInput: FunctionComponent<{
    label?: string;
    value: number;
    inputHandler: { (value: number): void };
    max?: number;
    min?: number;
    step?: number;
    type?: 'number' | 'range';
    labelAfter?: boolean
}> = (props) => {

    const { type = 'number', label, labelAfter } = props
    const width = type === 'range' ? '5rem' : '3rem';

    return <>
        {(label && !labelAfter) && <label>{label}</label>}
        <input type={type}
            style={{ width }}
            value={props.value}
            max={props.max}
            min={props.min}
            step={props.step}
            onInput={event => {
                props.inputHandler(eventToNumber(event.nativeEvent))
            }}
        />
        {(label && labelAfter) && <label>{label}</label>}
    </>
}


export const StringInput: FunctionComponent<{
    label?: string;
    value: string;
    type?: string;
    inputHandler: { (value: string): void };
    labelAfter?: boolean
}> = (props) => {
    const { label, type = 'text', value, inputHandler, labelAfter } = props
    return <>
        {(label && !labelAfter) && <label>{label}</label>}
        <input value={value} type={type} onInput={
            (event): void => {
                inputHandler(eventToString(event.nativeEvent))
            }
        } />
        {(label && labelAfter) && <label>{label}</label>}
    </>
}

