import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from '../button';
import "../styles/authorization.scss";
import { useWindowSize } from '../../hooks/window-size-hook';
import { FormValue } from '../../pages/auth/registration/registration';


export const AuthMessage:React.FC<AuthMessageType> = ( {title = 'Регистрация успешна', message= 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль', buttonText='ВХОД', dataForm} )=> {
    const navigate = useNavigate()
    const { mobile } = useWindowSize();
 return    <section className="authorization_wrapper" data-test-id='status-block'>
        <h1  className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div className="authorization_container " style={ {minHeight:'auto'} }>
                <h3 style={ { width:'100%' ,textAlign:'center'} } className="authorization_container__header">{title}</h3>

                <div className='authorization_container__message' >{message}</div>

                <div className="authorization_container__buttonWrapper ">
                    <Button bookPageText={buttonText} width="100%"
                            clickEvent={ ()=> { navigate('/auth') } }
                            height={mobile ? '40px' : '52px'}
                            margin="0"
                            paddingTop="5px"
                            textClass="registrationButtonText" />
                </div>
            </div>
        </div>
    </section>;
}

type AuthMessageType = {
    title?: string
    message?: string
    buttonText?: string
    dataForm?: FormValue
};
