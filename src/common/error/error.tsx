import { useState } from "react";

import error from "../../assets/images/error/error-sign.svg";
import cross from "../../assets/images/error/cross.svg";

import s from "./error.module.scss";

export const Error = () => {
    const [isClose, setIsClose]= useState(false)

    const closeError = ()=> {
        setIsClose(true)
    }

    return <div className={`${s.error}  ${isClose && s.error_close}`} data-test-id='error'>

        <div className={s.error__container}>

            <div className={s.error__item}>
                    <div className={s.error__wrapper}>
                <div className={s.error__signIcon}> <img src={error} alt='error-icon'  /> </div>
                <div className={s.error__text}>  <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>  </div></div>
                <div role='presentation' onClick={closeError} className={s.error__crossIcon}> <img src={cross} alt='cross-icon'  /> </div>
            </div>
        </div>

    </div>;
};

