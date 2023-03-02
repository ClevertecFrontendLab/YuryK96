import React from 'react';
import {
    UseFormGetFieldState,
    UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { FormValue } from '../password-recovery';


export const Input: React.FC<FirstStepType> = ({
                                                   register,
                                                   getFieldState,
    watch,
                                                   setButtonCheckErrorStateFalse,
                                                   buttonCheckError
                                               }) => <div
    className="authorization_container__WrapperSecondInput">
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
        style={!getFieldState('email').error && !buttonCheckError || !getFieldState('email').error && watch('email') !== '' ?  { borderTop: '1px solid #BFC4C9' } : { borderTop: '1px solid red' }}>
        {getFieldState('email').error && watch('email') !== '' || buttonCheckError && watch('email') !== ''  ?
            <p style={{ color: 'red' }}>Введите корректный e-mail</p> : getFieldState('email').error && watch('email') === '' || buttonCheckError  && watch('email') === ''  ?  <p style={{ color: 'red' }}>Поле не может быть пустым</p> : null } </div>

    <div className="authorization_container__forgetPassword_email"><span>На это email  будет отправлено письмо с инструкциями по восстановлению пароля </span>
    </div>
</div>;


type FirstStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean
    watch: UseFormWatch<FormValue>

};

