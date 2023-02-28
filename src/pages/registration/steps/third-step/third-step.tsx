import React from 'react';
import {
    UseFormGetFieldState, UseFormRegister
} from 'react-hook-form';
import { FormValue } from '../../registration';



export const ThirdStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,
                                                     }) => <>
        <div className="authorization_container__WrapperFirstInput">
            <input type="number" id="number"
                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('phoneNumber', {
                required: true
            })} />

            <label htmlFor="number" className="floating-label">Номер телефона</label>
            <div
                className={`authorization_container__firstNote ${!getFieldState('phoneNumber').error ? '' : 'redColor'}`}>
                {getFieldState('phoneNumber').error &&
                    <p style={{ color: 'red' }}>В формате +375 (xx) xxx-xx-xx</p>}  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="email" className="authorization_container__secondInput"
                   type="text" {...register('email', {
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="email" className="floating-label">E-mail</label>
            <div
                className={`authorization_container__secondNote ${!getFieldState('email').error ? '' : 'redColor'}`}>
                {getFieldState('email').error &&
                    <p style={{ color: 'red' }}>Введите корректный e-mail</p>}  </div>
        </div>
    </>;


type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;

};

