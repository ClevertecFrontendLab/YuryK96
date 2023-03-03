import React from 'react';
import {
    FieldErrors,
    UseFormGetFieldState, UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { FormValue } from '../../registration';



export const SecondStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,
                                                         setButtonCheckErrorStateFalse,
                                                         buttonCheckError,
    watch
                                                     }) => <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
                   onFocus={setButtonCheckErrorStateFalse}
                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('firstName', {
                required: true
            })} />

            <label htmlFor="username" className="floating-label">Имя</label>
            <div
                className="authorization_container__firstNote" data-test-id='hint' style={!getFieldState('firstName').error && !buttonCheckError ||  watch('firstName') !== '' ? {borderTop: '1px solid #BFC4C9'} : {borderTop: '1px solid red'} }>
                {getFieldState('firstName').error  || buttonCheckError && watch('firstName') === '' ?
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p> : null }  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="lastName" className="authorization_container__secondInput"
                   onFocus={setButtonCheckErrorStateFalse}
                   type="text" {...register('lastName', {
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="lastName" className="floating-label">Фамилия</label>
            <div
                className="authorization_container__secondNote" data-test-id='hint'  style={!getFieldState('lastName').error && !buttonCheckError ||  watch('lastName') !== ''  ? {borderTop: '1px solid #BFC4C9'} : {borderTop: '1px solid red'} } >
                {getFieldState('lastName').error || buttonCheckError && watch('lastName') === ''  ?
                    <p style={{ color: 'red' }}>Поле не должно быть пустым</p> : null}  </div>
        </div>
    </React.Fragment>


type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean
    watch: UseFormWatch<FormValue>

};

