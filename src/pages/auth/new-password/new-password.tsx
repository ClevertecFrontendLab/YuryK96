import React, { useEffect, useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import s from './new-passord.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import leftArrow from '../../../assets/images/authorization/leftArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Input } from './input';


export const NewPassword: React.FC<NewPasswordType> = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        getValues,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });

    const [buttonCheckError, setButtonCheckError] = useState(false);
    const [firstStatusButton, setFirstStatusButton] = useState(true);
    const [isActiveButton, setIsActiveButton] = useState(true);

    const { mobile } = useWindowSize();


    useEffect(() => {
        if (isValid){
            if(!isActiveButton){
                setIsActiveButton(true)
            }
        }
        else if (isActiveButton){
            setIsActiveButton(false)
        }

    }, [isValid, isActiveButton]);


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
    const setIsFirstStatusButtonFalse = () => {
        setFirstStatusButton(false);
    };


    return <section className="authorization_wrapper" data-test-id='auth'>
        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div className="authorization_container authorization_container_personalArea">

                <h3 className="authorization_container__header">Восстановление пароля</h3>

                <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="authorization_container__form">
                        <Input register={register} getFieldState={getFieldState}
                               watch={watch}
                               buttonCheckError={buttonCheckError}
                               setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                               getValues={getValues} errors={errors}
                        />

                    </div>
                    <div className="authorization_container__buttonWrapper ">
                        <Button clickEvent={isValid ? () => {
                            handleSubmit(onSubmit)();
                        } : () => {
                            setButtonCheckErrorStateTrue();
                            setIsFirstStatusButtonFalse();
                        }}
                                bookPageText="СОХРАНИТЬ ИЗМЕНЕНИЯ" width="100%"
                                isActive={firstStatusButton? true : isActiveButton }
                                height={mobile ? '40px' : '52px'}
                                margin="0"
                                paddingTop="5px"

                                textClass="registrationButtonText" />
                        <div style={{ marginTop: '16px' }} className="question_authorization"><p>После
                            сохранения войдите в библиотеку, используя новый пароль</p></div>
                    </div>
                </form>

            </div>
        </div>
    </section>;
};

export type FormValue = {
    password: string,
    repeatPassword: string

}

// eslint-disable-next-line @typescript-eslint/ban-types
type NewPasswordType = {}
