import React from 'react';

import s from './button.module.scss';
import '../styles/authorization.scss';
import { BookingType } from '../../redux-toolkit/books/books-type';


export const Button: React.FC<ButtonType> = ({
                                                 booking,
                                                 isBookPage = false,
                                                 bookPageText = '',
                                                 isBookEstimate = false,
                                                 id,
                                                 width = '100%',
                                                 textClass = '',
                                                 paddingTop = 'auto',
                                                 isDisabled = true,
                                                 height = '40px',
                                                 margin = '18px',
                                                 clickEvent = () => {
                                                 },
                                                 isActive = true
                                             }) => <button style={{ width, paddingTop, margin, height }}
            type="button"
            disabled={!isDisabled}
            data-test-id={id} onClick={clickEvent}
            className={`  ${s.button} ${!booking ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage} ${!isActive && s.buttonBlockSecond}  ${
                isBookEstimate && s.buttonBookPageEstimate
            }  ${textClass}`}
    >
        {!bookPageText && !booking
            ? <p> ЗАБРОНИРОВАТЬ </p>
            : !bookPageText && bookPageText !== ''
                ? <p> ЗАНЯТО ДО {booking?.dateOrder} </p>
                : booking?.order && <p style={{ color: '#a7a7a7' }}>ЗАБРОНИРОВАНО </p>}
        {!!bookPageText && bookPageText}

    </button>
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
    height?: string
    isActive?: boolean
    clickEvent?: () => void
    isDisabled?: boolean
};
