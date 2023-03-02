
import React, { useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import s from './password-recovery.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import leftArrow from '../../../assets/images/authorization/leftArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Input } from './input';



export const PasswordRecovery: React.FC<PasswordRecoveryType> = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        formState: {  isValid }
    } = useForm<FormValue>({ mode: 'onChange' });

    const [buttonCheckError, setButtonCheckError] = useState(false);

    const { mobile } = useWindowSize();



    const onSubmit = (data: FormValue) => {
        console.log(data);
    };



    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };


    return <section className="authorization_wrapper">
        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div  className="authorization_container authorization_container_personalArea">
                <div className='authorization_container__toPersonalArea' >
                    <div className='authorization_container__wrapperImg' >
                      <NavLink to='/auth'>  <img src={leftArrow} alt='left Arrow'/></NavLink>
                    </div>
                        <span>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
                </div>
                <h3 className="authorization_container__header">Восстановление пароля</h3>

                <form  onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                            <Input register={register} getFieldState={getFieldState}
                                   buttonCheckError={buttonCheckError}

 watch={watch}                                  setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                            />

                    </div>
                </form>
                <div className="authorization_container__buttonWrapper ">
                    <Button clickEvent={isValid ? ()=>{ handleSubmit(onSubmit)() } : setButtonCheckErrorStateTrue  }
                            bookPageText="ВОССТАНОВИТЬ" width="100%"
                            height={mobile ? '40px' : '52px'}
                            margin="0"
                            paddingTop="5px"

                            textClass="registrationButtonText" />
                    <div style={ {marginTop:'16px'} } className="question_authorization"><p> Нет учётной записи?</p> <NavLink
                        to="/registration">
                        <div className="question_authorization__wrapperLink"><span> Регистрация</span>
                            <div><img src={rightArrow} alt="arrow" /></div>
                        </div>
                    </NavLink></div>
                </div>
            </div>
        </div>
    </section>;
};

export type FormValue = {
    email: string,

}

// eslint-disable-next-line @typescript-eslint/ban-types
type PasswordRecoveryType = {}
