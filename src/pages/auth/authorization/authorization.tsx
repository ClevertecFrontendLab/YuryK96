
import React, { useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './authorization.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Inputs } from './inputs';

import { AppDispatch } from '../../../redux-toolkit/store';
import { authorization } from '../../../redux-toolkit/auth/auth-thunks';



export const Authorization: React.FC<AuthorizationType> = () => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        getFieldState,
        control,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const dispatch = useDispatch<AppDispatch>()
    const [buttonCheckError, setButtonCheckError] = useState(false);

    const { mobile } = useWindowSize();

    const onSubmit = (data: FormValue) => {
       dispatch(authorization(data))
    };



    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };


    return <section className="authorization_wrapper" data-test-id='auth'>
        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div  className="authorization_container authorization_container_personalArea">
                <h3 className="authorization_container__header">Вход в личный кабинет</h3>

                <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                            <Inputs register={register} getFieldState={getFieldState}
                                    watch={watch}
                                       buttonCheckError={buttonCheckError}
                                        setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                                       getValues={getValues}
                            />

                    </div>

                    <div className="authorization_container__buttonWrapper ">
                        <Button clickEvent={isValid ? ()=>{ handleSubmit(onSubmit)() } : setButtonCheckErrorStateTrue  }
                                bookPageText="ВХОД" width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="0"
                                paddingTop="5px"

                                textClass="registrationButtonText" />
                        <div className="question_authorization"><p> Нет учётной записи?</p> <NavLink
                            to="/registration">
                            <div className="question_authorization__wrapperLink"><span> Регистрация</span>
                                <div><img src={rightArrow} alt="arrow" /></div>
                            </div>
                        </NavLink></div>
                    </div>
                </form>

            </div>
        </div>
    </section>;
};

export type FormValue = {
    identifier: string,
    password: string
}


// eslint-disable-next-line @typescript-eslint/ban-types
type AuthorizationType = {}
