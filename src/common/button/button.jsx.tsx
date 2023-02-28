import React from 'react';

import s from './button.module.scss';
import "../styles/authorization.scss"
import { BookingType } from '../../redux-toolkit/books/books-type';


export const Button: React.FC<ButtonType> = ({
                                                 booking,
                                                 isBookPage = false,
                                                 bookPageText = '',
                                                 isBookEstimate = false,
                                                 id,
                                                 width = 'auto',
                                                 textClass = '',
                                                 paddingTop = 'auto',
    height = '40px' ,
    margin='18px',
    clickEvent=()=>{},
                                                 isActive= true
                                             }) =>
    (<div style={{ width,paddingTop,margin,height }}
          role='presentation'
          data-test-id={id} onClick={clickEvent}
          className={` ${s.button} ${!booking ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage} ${!isActive && s.buttonBlockSecond}  ${
              isBookEstimate && s.buttonBookPageEstimate
          } `}
        >
            {!bookPageText && !booking
                ? <p> ЗАБРОНИРОВАТЬ </p>
                : !bookPageText && bookPageText !== ''
                    ? <p> ЗАНЯТО ДО {booking?.dateOrder} </p>
                    : booking?.order && <p style={{ color: '#a7a7a7' }}>ЗАБРОНИРОВАНО </p>}
            {!!bookPageText && <p className={textClass}>{bookPageText} </p>}

        </div>
    );

type ButtonType = {
    booking?: null | BookingType;
    isBookPage?: boolean;
    isBookEstimate?: boolean;
    bookPageText?: string;
    id?: string;
    width?: string
    textClass?: string
    paddingTop?: string;
    margin?: string
    height? : string
    isActive?: boolean
    clickEvent?: ()=> void
};
