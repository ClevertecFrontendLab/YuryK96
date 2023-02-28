import React from 'react';
import {
    UseFormGetFieldState, UseFormRegister
} from 'react-hook-form';
import { FormValue } from '../../registration';



export const ThirdStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,
                                                        setButtonCheckErrorStateFalse,
                                                        buttonCheckError
                                                     }) => <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <input type="number" id="number"
                   className="authorization_container__firstInput"
                   onFocus={setButtonCheckErrorStateFalse}
                   autoComplete="off"
                   required={true} {...register('phoneNumber', {
                required: true
            })} />

            <label htmlFor="number" className="floating-label">Номер телефона</label>
            <div
                className="authorization_container__firstNote" style={!getFieldState('phoneNumber').error && !buttonCheckError ? {borderTop: '1px solid #BFC4C9'} : {borderTop: '1px solid red'} }>
                {getFieldState('phoneNumber').error  || buttonCheckError ?
                    <p style={{ color: 'red' }}>В формате +375 (xx) xxx-xx-xx</p> : null }  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="email" className="authorization_container__secondInput"
                   onFocus={setButtonCheckErrorStateFalse}
                   type="text" {...register('email', {
                required: true,
                validate: {
                    email: (value)=>
                        // eslint-disable-next-line no-useless-escape
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
                }
            })} autoComplete="off" required={true} />

            <label htmlFor="email" className="floating-label">E-mail</label>
            <div
                className="authorization_container__secondNote"  style={!getFieldState('email').error && !buttonCheckError ? {borderTop: '1px solid #BFC4C9'} : {borderTop: '1px solid red'} } >
                {getFieldState('email').error || buttonCheckError ?
                    <p style={{ color: 'red' }}>Введите корректный e-mail</p> : null} </div>
        </div>
    </React.Fragment>;


type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean
};

