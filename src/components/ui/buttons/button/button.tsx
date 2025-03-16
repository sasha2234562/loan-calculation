import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from "react";
import s from './button.module.css'

interface Props extends  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string;
    kind: 'small' | 'big'
}

export const Button:FC<Props> = memo(({label, kind, ...rest}) => {
    return (
        <button className={kind === 'big' ? s.button_big : s.button_small} {...rest}>
            <span className={s.button_label}>{label}</span>
        </button>
    );
});
