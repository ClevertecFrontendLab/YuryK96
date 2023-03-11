import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import s from './burgerButton.module.scss';
import { Navigation } from '../../navigation';


export const BurgerButton: React.FC<BurgerButtonType> = ({ toggleMenu, isOpen }) => (
    <div className={s.burgerButton}>
      <div className={s.ButtonContainer}>
        <div
          data-test-id='button-burger'
          role='presentation'
          onClick={toggleMenu}
          className={`${s.twoLine} ${isOpen && s.twoLineActive}`}
        >
          <span className={`${s.mediumLine} ${isOpen && s.mediumLineActiveFirst}`} />
          <span className={`${s.mediumLine} ${isOpen && s.mediumLineActiveSecond}`} />
        </div>
      </div>
      <div
        role='presentation'
        onClick={toggleMenu}
        style={
          isOpen
            ? {
                position: 'absolute',
                marginLeft: '-5%',
                height: document.documentElement.offsetHeight - 45,
                width: '100%',
              }
            : {}
        }
      />
      <div data-test-id='burger-navigation' className={`${s.menuButton} ${isOpen && s.menuButtonOpen}`} >
        <div className={s.menuButtonWrapper}>
          <Navigation
            idContract='burger-contract'
            idTerms='burger-terms'
            idBooks='burger-books'
            idShowcase='burger-showcase'
            toggleMenu={toggleMenu}
            id='burger'
          />

        </div>
      </div>
    </div>
  );

type BurgerButtonType = {
  isOpen: boolean;
  toggleMenu: () => void;
};
