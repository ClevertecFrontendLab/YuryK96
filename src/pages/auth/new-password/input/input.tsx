
import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState, UseFormGetValues,
    UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import check from '../../../../assets/images/authorization/check.svg';
import openEye from '../../../../assets/images/authorization/openEye.svg';
import closeEye from '../../../../assets/images/authorization/closeEye.svg';
import { FormValue } from '../new-password';



export const Input: React.FC<FirstStepType> = ({
                                                   register,
                                                   getFieldState,
                                                   getValues,
                                                   errors,
                                                   watch,
                                                   setButtonCheckErrorStateFalse,
                                                   buttonCheckError
                                               }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);

    const setPasswordFocusStateTrue = () => {
        setIsPasswordFocus(true);
    };
    const setPasswordFocusStateFalse = () => {
        setIsPasswordFocus(false);
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleRepeatPasswordVisiblity = () => {
        setRepeatPasswordShown(!repeatPasswordShown);
    };
    return  <div className="authorization_container__WrapperSecondInput">
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

        <label htmlFor="password" className="floating-label">Новый пароль</label>

        <div  className="authorization_container__secondNote"
              style={!isPasswordFocus && getFieldState('password').error || buttonCheckError && getFieldState('password').error ? {
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


        <div className="authorization_container__WrapperSecondInput">
            <div  className="authorization_container__WrapperIcons">

                { watch('repeatPassword')?.length > 0 && <img style={ {marginLeft:'25px'} } role="presentation" onClick={toggleRepeatPasswordVisiblity}
                                                        src={repeatPasswordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="repeatPassword" className="authorization_container__secondInput"
                   onFocus={ ()=> {
                       setButtonCheckErrorStateFalse()
                       setPasswordFocusStateTrue()
                   }}
                   type={repeatPasswordShown ? 'text' : 'password'} {...register('repeatPassword', {
                onBlur: () => setPasswordFocusStateFalse(),
                required: true,
                validate: {
                    matchPasswords: ()=> watch('password') === watch('repeatPassword') || 'do not match'
                }
            })} autoComplete="off" required={true}  />

            <label htmlFor="repeatPassword" className="floating-label">Повторить пароль</label>

            <div
                className="authorization_container__secondNote"  style={!getFieldState('repeatPassword').error && !buttonCheckError ? {borderTop: '1px solid #BFC4C9'} : {borderTop: '1px solid red'} } >
                <div style={ {height:'16px'} } >  {getFieldState('repeatPassword').error || buttonCheckError ?
                    <p style={{ color: 'red' }}>Пароли не совпадают</p> : null} </div>  </div>

        </div>
    </div>
}


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    errors: FieldErrors;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean

};

