import React from 'react';

import s from './button.module.scss';

export const Button: React.FC<ButtonType> = ({
  isActive,
  date,
  isBookPage = false,
  bookPageText = '',
  isBookEstimate = false,
  id,
}) => (
  <div
    data-test-id={id}
    className={` ${s.button} ${isActive ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage}  ${
      isBookEstimate && s.buttonBookPageEstimate
    } `}
  >
    {' '}
    <p>
      {' '}
      {!bookPageText && isActive
        ? 'ЗАБРОНИРОВАТЬ'
        : !bookPageText && date !== ''
        ? `ЗАНЯТО ДО ${date}`
        : !bookPageText && 'ЗАБРОНИРОВАНО'}
      {!!bookPageText && bookPageText}{' '}
    </p>{' '}
  </div>
);

type ButtonType = {
  isActive?: boolean;
  date?: string;
  isBookPage?: boolean;
  isBookEstimate?: boolean;
  bookPageText?: string;
  id?: string;
};
