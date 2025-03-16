import s from './button-with-border.module.css';
import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from "react";

interface Props extends  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string;
    kind: 'small' | 'big'
}

export const ButtonWithBorder:FC<Props> = memo(({label, kind, ...rest}) => {
    return (
        <button className={kind === 'big' ? s.button_big : s.button_small}  {...rest}> <span>{label}</span></button>
    );
});
