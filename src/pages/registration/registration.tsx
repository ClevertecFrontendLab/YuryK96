import React, { useState } from 'react';
import {
useForm
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import s from './registration.module.scss';
import '../../common/styles/authorization.scss';
import { Button } from '../../common/button';
import rightArrow from '../../assets/images/authorization/rightArrow.svg';
import { useWindowSize } from '../../hooks/window-size-hook';
import {FirstStep} from './steps/first-step';
import { SecondStep } from './steps/second-step';
import { ThirdStep } from './steps/third-step';


export const Registration: React.FC<RegistrationType> = () => {
    const {
        register,
        handleSubmit,
        getValues,
        getFieldState,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const [stepNumber, setStepNumber] = useState(1)
    const { mobile } = useWindowSize();

const nextStep = ()=> {
    if (stepNumber === 3){
        setStepNumber(1)
    }
    else { setStepNumber(stepNumber + 1)}

    }
    const onSubmit = (data: any) => {
        console.log(data);
    };
    return <section className={s.registration}>

        <div className="authorization_container">
            <h3 className="authorization_container__header">Регистрация</h3>
            <div className="authorization_container__steps"> {stepNumber} шаг из 3</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="authorization_container__form">
                    { stepNumber === 1 && <FirstStep register={register} getFieldState={getFieldState}
                                getValues={getValues} errors={errors}
                    />}
                    { stepNumber === 2 && <SecondStep register={register} getFieldState={getFieldState}
                                                    />}
                    { stepNumber === 3 && <ThirdStep register={register} getFieldState={getFieldState}
                                                   />}
                </div>
            </form>
            <div className="authorization_container__buttonWrapper">
                <Button isActive={isValid} clickEvent={nextStep} bookPageText="СЛЕДУЮЩИЙ ШАГ" width="100%"
                        height={mobile ? '40px' : '52px'}
                        margin="18px 0"
                        paddingTop="5px"

                        textClass="registrationButtonText" />
                <div className="question_authorization"><p> Есть учетная запись?</p> <NavLink
                    to="/login">
                    <div className="question_authorization__wrapperLink"><span> Войти</span>
                        <div><img src={rightArrow} alt="arrow" /></div>
                    </div>
                </NavLink></div>
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
