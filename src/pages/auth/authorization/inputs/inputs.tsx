import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState,
    UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import check from '../../../../assets/images/authorization/check.svg';
import closeEye from '../../../../assets/images/authorization/closeEye.svg';
import openEye from '../../../../assets/images/authorization/openEye.svg';
import { FormValue } from '../authorization';


export const Inputs: React.FC<FirstStepType> = ({
                                                    register,
                                                    getFieldState,
                                                    getValues, watch
                                                    ,
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
                   onFocus={() => {
                       setButtonCheckErrorStateFalse();
                       setLoginFocusStateTrue();
                   }}

                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('login', {
                onBlur: () => setLoginFocusStateFalse(),

                required: true
            })} />

            <label htmlFor="username" className="floating-label">Логин</label>
            <div data-test-id="hint"
                 className="authorization_container__firstNote"
                 style={!getFieldState('login').error && !buttonCheckError || watch('login') !== '' ? { borderTop: '1px solid #BFC4C9' } : { borderTop: '1px solid red' }}>
                <div
                    style={{ height: '16px' }}>{getFieldState('login').error || buttonCheckError && watch('login') === '' ?
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p> : null} </div>
            </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">

                {watch('password')?.length > 0 &&
                    <img style={{ marginLeft: '25px' }} role="presentation"
                         onClick={togglePasswordVisiblity}
                         data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'}
                         src={passwordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="password" className="authorization_container__secondInput"
                   onFocus={() => {
                       setButtonCheckErrorStateFalse();
                       setPasswordFocusStateTrue();
                   }}
                   type={passwordShown ? 'text' : 'password'} {...register('password', {
                onBlur: () => setPasswordFocusStateFalse(),
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="password" className="floating-label">Пароль</label>

            <div data-test-id="hint"
                 className="authorization_container__secondNote"
                 style={!getFieldState('password').error && !buttonCheckError || watch('password') !== '' ? { borderTop: '1px solid #BFC4C9' } : { borderTop: '1px solid red' }}>
                <div
                    style={{ height: '16px' }}>  {getFieldState('password').error || buttonCheckError && watch('password') === '' ?
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p> : null} </div>
            </div>


            <div className="authorization_container__forgetPassword"><NavLink to="/forgot-pass">
                <span>Забыли логин и пароль?</span></NavLink></div>

            {/* <div className='authorization_container__wrongPassword'><div style={ {color:'red'} } >Неверный логин или пароль!</div> <NavLink to="/forgot-pass"> <div>Восстановить?</div> </NavLink>  </div> */}


        </div>
    </React.Fragment>;
};


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean

};

