import React from 'react';

import s from './button.module.scss';
import { BookingType } from "../../redux-toolkit/books/books-type";


export const Button: React.FC<ButtonType> = ({
   booking,
  isBookPage = false,
  bookPageText = '',
  isBookEstimate = false,
  id,
}) =>
    ( <div
            data-test-id={id}
            className={` ${s.button} ${!booking ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage}  ${
                isBookEstimate && s.buttonBookPageEstimate
            } `}
        >
            {!bookPageText && !booking
                ?    <p> ЗАБРОНИРОВАТЬ </p>
                : !bookPageText && bookPageText !== ''
                    ?  <p> ЗАНЯТО ДО {booking?.dateOrder} </p>
                    : booking?.order && <p style={ {color: '#a7a7a7'} }>ЗАБРОНИРОВАНО </p>}
            {!!bookPageText && <p>{bookPageText} </p>}

        </div>
    )

type ButtonType = {
    booking?: null | BookingType;

  isBookPage?: boolean;
  isBookEstimate?: boolean;
  bookPageText?: string;
  id?: string;
};
