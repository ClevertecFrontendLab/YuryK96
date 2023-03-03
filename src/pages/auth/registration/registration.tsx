
import React, { useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import s from './registration.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { FirstStep } from './steps/first-step';
import { SecondStep } from './steps/second-step';
import { ThirdStep } from './steps/third-step';


export const Registration: React.FC<RegistrationType> = () => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        getFieldState,
        control,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const [stepNumber, setStepNumber] = useState(1);
    const [buttonCheckError, setButtonCheckError] = useState(false);

    const { mobile } = useWindowSize();



    const onSubmit = (data: FormValue) => {
        console.log(data);
    };
    const nextStep = () => {
        if (stepNumber === 3) {
            handleSubmit(onSubmit)()
        } else {
            setStepNumber(stepNumber + 1);
        }
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
            <div className="authorization_container">
                <h3 className="authorization_container__header">Регистрация</h3>
                <div className="authorization_container__steps"> {stepNumber} шаг из 3</div>
                <form data-test-id='register-form'  onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                        {stepNumber === 1 &&
                            <FirstStep register={register} getFieldState={getFieldState}
                                       watch={watch}
                                       buttonCheckError={buttonCheckError}
                                        setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                                       getValues={getValues} errors={errors}
                            />}
                        {stepNumber === 2 &&
                            <SecondStep register={register}
                                       watch={watch} buttonCheckError={buttonCheckError}
                                        setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse} getFieldState={getFieldState}
                            />}
                        {stepNumber === 3 &&
                            <ThirdStep register={register} buttonCheckError={buttonCheckError}
                                       control={control} setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse} getFieldState={getFieldState}
                                       watch={watch}
                            />}
                    </div>

                    <div className="authorization_container__buttonWrapper">
                        <Button clickEvent={isValid ? nextStep : setButtonCheckErrorStateTrue}
                                bookPageText={stepNumber === 1 ? 'СЛЕДУЮЩИЙ ШАГ' :
                                    stepNumber === 2 ? 'ПОСЛЕДНИЙ ШАГ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'
                                } width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="18px 0"
                                paddingTop="5px"

                                textClass="registrationButtonText" />
                        <div className="question_authorization"><p> Есть учетная запись?</p> <NavLink
                            to="/auth">
                            <div className="question_authorization__wrapperLink"><span> Войти</span>
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
    login: string,
    password: string
    firstName: string,
    lastName: string
    phoneNumber: number
    email: string
}


// eslint-disable-next-line @typescript-eslint/ban-types
type RegistrationType = {}
