import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState,
    UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';

import check from '../../../../../assets/images/authorization/check.svg';
import closeEye from '../../../../../assets/images/authorization/closeEye.svg';
import openEye from '../../../../../assets/images/authorization/openEye.svg';
import { FormValue } from '../../registration';


export const FirstStep: React.FC<FirstStepType> = ({
                                                       register,
                                                       getFieldState,
                                                       getValues,
                                                       errors,
                                                       watch,
                                                       setButtonCheckErrorStateFalse,
                                                       buttonCheckError
                                                   }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoginFocus, setIsLoginFocus] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const setLoginFocusStateTrue = () => {
        setIsLoginFocus(true);
    };
    const setLoginFocusStateFalse = () => {
        setIsLoginFocus(false);
    };
    const setPasswordFocusStateTrue = () => {
        setIsPasswordFocus(true);
    };
    const setPasswordFocusStateFalse = () => {
        setIsPasswordFocus(false);
    };

    return <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
                   onFocus={ ()=> {
                       setButtonCheckErrorStateFalse()
                       setLoginFocusStateTrue()
                   }}

                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('login', {
                onBlur: () => setLoginFocusStateFalse(),

                required: true, validate: {
                    capitalLetter: (value) => Array.from(value).every((letter) => /[a-z]/i.test(letter) || /[0-9]/.test(letter)) || 'must be latin characters'
                    ,
                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number'
                }
            })} />

            <label htmlFor="username" className="floating-label">Придумайте логин для
                входа</label>
            <div className="authorization_container__firstNote"
                style={!isLoginFocus && getFieldState('login').error || buttonCheckError && getFieldState('login').error || buttonCheckError && watch('login') === '' ? {
                    color: 'red',
                    borderTop: '1px solid red'
                } : getFieldState('login').error && watch('login') !== '' ? {  borderTop: '1px solid red'} : { borderTop: '1px solid #BFC4C9'}  }
            >
                <p>Используйте для
                    логина
                    <span
                        style={errors?.login?.message === 'must be latin characters' ? { color: 'red' } : {}}> латинский алфавит </span> и <span
                        style={/[0-9]/.test(watch('login')) || watch('login') === '' ? {} : { color: 'red' }}>   цифры </span>
                </p></div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">
                <div
                    className="authorization_container__WrapperCheck">{!getFieldState('password').error && getValues('password') &&
                    <img src={check}
                         alt="check" />}</div>
                { watch('password')?.length > 0 && <img role="presentation" onClick={togglePasswordVisiblity}
                      src={passwordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="password" className="authorization_container__secondInput"
                   onFocus={ ()=> {
                       setButtonCheckErrorStateFalse()
                       setPasswordFocusStateTrue()
                   }}
                   type={passwordShown ? 'text' : 'password'} {...register('password', {
                onBlur: () => setPasswordFocusStateFalse(),
                required: true, validate: {
                    capitalLetter: (value) => /[A-ZА-Я]/.test(value[0]) || 'not a capital letter',
                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number',
                    minLength: (value) => value.length > 9 || 'must min 8 symbols'


                }
            })} autoComplete="off" required={true} />

            <label htmlFor="password" className="floating-label">Пароль</label>

            <div  className="authorization_container__secondNote"
                 style={!isPasswordFocus && getFieldState('password').error || buttonCheckError && getFieldState('password').error || buttonCheckError && watch('password') === ''  ? {
                color: 'red',
                     borderTop: '1px solid red'
            } :  getFieldState('password').error && watch('password') !== '' ? {  borderTop: '1px solid red'} : { borderTop: '1px solid #BFC4C9'}} >
                <p>  <span
                    style={watch('password')?.length > 9 || watch('password') === '' ? {} : { color: 'red' }}> Пароль не менее 8
                            символов</span>,
                    <span
                        style={errors?.password?.message === 'not a capital letter' ? { color: 'red' } : {}}> с заглавной буквой </span> и <span
                        style={/[0-9]/.test(watch('password')) || watch('password') === '' ? {} : { color: 'red' }}>цифрой</span>
                </p></div>
        </div>
    </React.Fragment>;
};


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    errors: FieldErrors;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean

};

