import './App.css'
import {ButtonWithBorder, Popup} from "./components/ui";
import {useCallback, useState} from "react";

function App() {
    const [openPopup, setOpenPopup] = useState(false);

    const onClickOpenPopup = useCallback(() => setOpenPopup(prev => !prev), []);

    return (
        <>
            <main>
                {!openPopup && <ButtonWithBorder kind={'small'} label={'Расчет платежей'} onClick={onClickOpenPopup}/>}
                {openPopup && <Popup onClickClose={onClickOpenPopup}/>}
            </main>
        </>
    )
}

export default App
