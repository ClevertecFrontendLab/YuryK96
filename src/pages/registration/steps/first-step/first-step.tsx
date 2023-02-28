import React, { useState } from 'react';
import {
 FieldErrors,
    UseFormGetFieldState,
    UseFormGetValues, UseFormRegister
} from 'react-hook-form';
import { FormValue } from '../../registration';
import check from '../../../../assets/images/authorization/check.svg';
import openEye from '../../../../assets/images/authorization/openEye.svg';
import closeEye from '../../../../assets/images/authorization/closeEye.svg';




export const FirstStep:React.FC<FirstStepType> = ({register,getFieldState,getValues,errors})=> {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
  return  <>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('login', {
                required: true, pattern: {
                    value: /[A-Za-z]/,
                    message: 'must be latin characters'
                }, validate: {
                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number'
                }
            })} />

            <label htmlFor="username" className="floating-label">Придумайте логин для
                входа</label>
            <div
                className={`authorization_container__firstNote ${!getFieldState('login').error || getValues('login') === '' ? '' : 'redColor'}`}>
                <p>Используйте для
                    логина
                    <span
                        style={errors?.login?.message === 'must be latin characters' ? { color: 'red' } : {}}> латинский алфавит </span> и <span
                        style={errors?.login?.message === 'not a Number' ? { color: 'red' } : {}}>   цифры </span>
                </p></div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">
                <div
                    className="authorization_container__WrapperCheck">{!getFieldState('password').error && getValues('password') &&
                    <img src={check}
                         alt="check" />}</div>
                <img role="presentation" onClick={togglePasswordVisiblity}
                     src={passwordShown ? openEye : closeEye} alt="eye" /></div>
            <input id="password" className="authorization_container__secondInput"
                   type={passwordShown ? 'text' : 'password'} {...register('password', {
                required: true, validate: {
                    capitalLetter: (value) => /[A-ZА-Я]/.test(value[0]) || 'not a capital letter',
                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number',
                    minLength: (value) => value.length > 9 || 'must min 8 symbols'


                }
            })} autoComplete="off" required={true} />

            <label htmlFor="password" className="floating-label">Пароль</label>

            <div
                className={`authorization_container__secondNote ${!getFieldState('password').error || getValues('password') === '' ? '' : 'redColor'}`}>
                <p>  <span
                    style={errors?.password?.message === 'must min 8 symbols' ? { color: 'red' } : {}}> Пароль не менее 8
                            символов </span>,
                    <span
                        style={errors?.password?.message === 'not a capital letter' ? { color: 'red' } : {}}> с заглавной буквой </span> и <span
                        style={errors?.password?.message === 'not a Number' ? { color: 'red' } : {}}>цифрой</span>
                </p></div>
        </div>
    </>
}


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    errors: FieldErrors;


};

