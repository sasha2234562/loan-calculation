import {FC, memo} from 'react';
import s from './tag.module.css'

interface Props {
    value: string | number;
    active: boolean;
    onClick: ()=> void;
}

export const Tag:FC<Props> = memo(({value, active, onClick}) => {

    return (
        <button className={active ? s.container: s.container_not_active} type={'button'} onClick={onClick}>
            <span className={s.tag_text}>{value}</span>
        </button>
    );
});
