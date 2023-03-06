import React from 'react';
import {
    UseFormGetFieldState,
    UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { FormValue } from '../password-recovery';


export const Input: React.FC<FirstStepType> = ({
                                                   register,
                                                   getFieldState,
    watch,authError,
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
    <div data-test-id='hint' style={{ color: 'red',  paddingLeft: '12px' }}
        className={`authorization_container__secondNote ${!getFieldState('email').error && !buttonCheckError || !getFieldState('email').error && watch('email') !== '' ?  'grayBorderTop' : 'redBorderTop'} ${authError && 'redBorderTop' }`}
       >
        {getFieldState('email').error && watch('email') !== '' || buttonCheckError && watch('email') !== ''  ?
            <span >Введите корректный e-mail</span> : getFieldState('email').error && watch('email') === '' || buttonCheckError  && watch('email') === ''  ?  <span >Поле не может быть пустым</span> : authError ? <span>error</span> : null } </div>

    <div className="authorization_container__forgetPassword_email"><span>На это email  будет отправлено письмо с инструкциями по восстановлению пароля </span>
    </div>
</div>;


type FirstStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean
    watch: UseFormWatch<FormValue>
    authError: null | string
};

