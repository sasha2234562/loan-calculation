import s from './input.module.css';
import {DetailedHTMLProps, forwardRef, InputHTMLAttributes} from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((
    {label, error, ...rest}
) => {

    return (
        <div className={s.container}>
            <label className={s.label}>{label}</label>
            <input className={error ? s.input_error : s.input} {...rest}/>
            {error && <p className={s.input_error_text}>{error}</p>}
        </div>
    );
});
