import React from 'react';

import s from './button.module.scss';
import { BookingType } from "../../redux-toolkit/books-reducer";

export const Button: React.FC<ButtonType> = ({
 booking,
  isBookPage = false,
  bookPageText = '',
  isBookEstimate = false,
  id,
}) => (
  <div
    data-test-id={id}
    className={` ${s.button} ${!booking ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage}  ${
      isBookEstimate && s.buttonBookPageEstimate
    } `}
  >
    {' '}
    <p>
      {' '}
      {!bookPageText && !booking
        ? 'ЗАБРОНИРОВАТЬ'
        : !bookPageText && booking?.dateOrder !== ''
        ? `ЗАНЯТО ДО ${booking?.dateOrder}`
        : !bookPageText && 'ЗАБРОНИРОВАНО'}
      {!!bookPageText && bookPageText}{' '}
    </p>{' '}
  </div>
);

type ButtonType = {
    booking?: null | BookingType;

  isBookPage?: boolean;
  isBookEstimate?: boolean;
  bookPageText?: string;
  id?: string;
};
