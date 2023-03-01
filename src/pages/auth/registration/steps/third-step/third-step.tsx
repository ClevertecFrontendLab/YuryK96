import React from 'react';
import {
    Control,
    Controller, FieldValues, UseControllerProps,
    UseControllerReturn,
    UseFormGetFieldState, UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import InputMask from "react-input-mask"
import { FormValue } from '../../registration';



export const ThirdStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,
                                                        setButtonCheckErrorStateFalse,
                                                        buttonCheckError,
                                                        control,
                                                        watch
                                                     }) => {

const firstCodeNumber =  String( watch('phoneNumber')).charAt(5)
   return  <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <Controller name="phoneNumber" control={control} render={({ field }) => (

                <InputMask type="text" id="number"

                           mask={['+', '3', '7', '5', '(', /( ?(?=[2])[2]|(?=[3])[3]|(?=[4])[4]|^$ )/,   firstCodeNumber === '2' ? /( ?(?=[5])[5]|(?=[9])[9]|^$ )/ :  firstCodeNumber === '3' ? /( ?(?=[3])[3]|^$ )/ :  firstCodeNumber === '4' ? /( ?(?=[4])[4]|^$ )/ : /\d/ , ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}

                           maskPlaceholder="+375(xx) xxx-xx-xx"
                           className="authorization_container__firstInput"
                           onFocus={setButtonCheckErrorStateFalse}
                           autoComplete="off"
                           required={true} {...register('phoneNumber', {
                    required: true,
                    validate: {
                        checkNumber: (value)=> String(value).includes('x') ? false : true || 'not a number'
                    }
                })} />

            )} />


            <label htmlFor="number" className="floating-label">Номер телефона</label>
            <div
                className="authorization_container__firstNote"
                style={!getFieldState('phoneNumber').error && !buttonCheckError ? { borderTop: '1px solid #BFC4C9' } : { borderTop: '1px solid red' }}>
                {getFieldState('phoneNumber').error || buttonCheckError ?
                    <p style={{ color: 'red' }}>В формате +375 (xx) xxx-xx-xx</p> : null}  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="email" className="authorization_container__secondInput"
                   onFocus={setButtonCheckErrorStateFalse}
                   type="text" {...register('email', {
                required: true,
                validate: {
                    email: (value) =>
                        // eslint-disable-next-line no-useless-escape
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
                }
            })} autoComplete="off" required={true} />

            <label htmlFor="email" className="floating-label">E-mail</label>
            <div
                className="authorization_container__secondNote"
                style={!getFieldState('email').error && !buttonCheckError ? { borderTop: '1px solid #BFC4C9' } : { borderTop: '1px solid red' }}>
                {getFieldState('email').error || buttonCheckError ?
                    <p style={{ color: 'red' }}>Введите корректный e-mail</p> : null} </div>
        </div>
    </React.Fragment>;
}

type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    control: Control<FormValue>
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean,
    watch: UseFormWatch<FormValue>
};

