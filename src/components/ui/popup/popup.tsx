import s from './popup.module.css';
import icon_close from '../../../assets/cross.svg'
import {ChangeEvent, FC, memo, useCallback, MouseEvent, useRef, useState} from "react";
import {Input} from "../input/input.tsx";
import {Button, ButtonText} from "../buttons";
import {Tag} from "../tag/tag.tsx";

interface Props {
    onClickClose: () => void;
}

const tagsMonth = [12, 24, 36, 48];
const period = ['в год', 'в месяц']

const getRublesDeclension = (amount: number): string => {
    const lastDigit = amount % 10;
    const lastTwoDigits = amount % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${amount.toFixed(2)} рублей`;
    }

    switch (lastDigit) {
        case 1:
            return `${amount.toFixed(2)} рубль`;
        case 2:
        case 3:
        case 4:
            return `${amount.toFixed(2)} рубля`;
        default:
            return `${amount.toFixed(2)} рублей`;
    }
};




export const Popup: FC<Props> = memo(({onClickClose}) => {
    const modalRef = useRef(null);
    const [numberMonth, setNumberMonth] = useState(tagsMonth[0]);
    const [periodCredit, setPeriodCredit] = useState(period[1]);
    const [inValidInput, setInValidInput] = useState(false);
    const [showResultPrice, setShowResultPrice] = useState(false);
    const [price, setPrice] = useState('');
    const priceResult = +price / numberMonth * (periodCredit === period[1] ? 1 : tagsMonth[0])

    const clickSelectNumberMonth = useCallback((value: number) => setNumberMonth(value), [])

    const onChangePeriodCredit = useCallback((value: string) => setPeriodCredit(value), [])

    const onChangePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInValidInput(false);
        setPrice(e.currentTarget.value)
    }, [])

    const onClickCalculate = useCallback(() => {
        if (price === '') {
            setInValidInput(true)
            setShowResultPrice(false)
            return
        }
        setShowResultPrice(true)
    }, [price])

    const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (!target.closest(`.${s.modal}`)) {
            onClickClose();
        }
    };

    return (
        <div className={s.container} onClick={handleClickOutside}>
            <div className={s.modal} ref={modalRef}>
                <div className={s.content_wrapper}>
                    <h2 className={s.title_popup}>Платежи по кредиту</h2>
                    <p className={s.popup_text}>Введите сумму кредита и выберите срок, на который вы хотите его
                        оформить.<br/>
                        Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше
                        спланировать свои финансы.
                    </p>
                    <Input label={'Container'} placeholder={'placeholder'} onChange={onChangePrice} type={'number'}
                           error={inValidInput ? 'Поле обязательно для заполнения' : undefined}/>
                    <ButtonText label={'Рассчитать'} onClick={onClickCalculate}/>
                    {showResultPrice && <div className={s.number_months}>
                        <span>Количество месяцев?</span>
                        <div className={s.tags_wrapper}>
                            {tagsMonth.map((item, index) => {
                                return <Tag value={item} active={numberMonth === item} key={index}
                                            onClick={() => clickSelectNumberMonth(item)}/>
                            })}
                        </div>
                    </div>}
                    {showResultPrice && <div className={s.result_payment}>
                        <h4 className={s.result_payment_title}>Итого ваш платеж по кредиту:</h4>
                        <div className={s.tags_wrapper}>
                            {period.map((item, index) => {
                                return <Tag key={index} value={item} active={periodCredit === item}
                                            onClick={() => onChangePeriodCredit(item)}/>
                            })}
                        </div>
                        <span className={s.result_price}>{getRublesDeclension(priceResult)}</span>
                    </div>}
                    <Button label={'Добавить'} kind={'big'}/>
                    <button className={s.close_button} onClick={onClickClose}>
                        <img src={icon_close} alt="icon close"/>
                    </button>
                </div>
            </div>
        </div>
    );
});
