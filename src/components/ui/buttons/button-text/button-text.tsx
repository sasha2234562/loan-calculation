import s from './button-text.module.css';
import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from "react";

interface Props extends  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string;
}

export const ButtonText: FC<Props> = memo(({label, ...rest}) => {

    return (
        <button className={s.button} {...rest}>
            <span className={s.button_text}>{label}</span>
        </button>
    );
});
