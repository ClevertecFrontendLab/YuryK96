import React from 'react';
import {
    FieldErrors,
    UseFormGetFieldState, UseFormRegister
} from 'react-hook-form';
import { FormValue } from '../../registration';



export const SecondStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,

                                                     }) => <>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('firstName', {
                required: true
            })} />

            <label htmlFor="username" className="floating-label">Имя</label>
            <div
                className={`authorization_container__firstNote ${!getFieldState('firstName').error ? '' : 'redColor'}`}>
                {getFieldState('firstName').error &&
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p>}  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="lastName" className="authorization_container__secondInput"
                   type="text" {...register('lastName', {
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="lastName" className="floating-label">Фамилия</label>
            <div
                className={`authorization_container__secondNote ${!getFieldState('lastName').error ? '' : 'redColor'}`}>
                {getFieldState('lastName').error &&
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p>}  </div>
        </div>
    </>;


type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;

};

