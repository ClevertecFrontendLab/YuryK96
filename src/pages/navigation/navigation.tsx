import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getCategories } from "../../redux-toolkit/books-selectos";

import s from './navigation.module.scss';


export const Navigation: React.FC<NavigationType> = ({ toggleMenu, idShowcase, idBooks, idContract, idTerms }) => {
  const [isOpen, setIsOpen] = useState(true);
  const categories = useSelector(getCategories);
  const { pathname } = useLocation();
  const handleSetIsOpen: () => void = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav>
      <h1
        role='presentation'
        data-test-id={idShowcase}
        onClick={handleSetIsOpen}
        className={` ${s.showcase} ${isOpen ? s.activeShowcase : pathname === '/books/all' ? s.activeShowcase : ''}`}
      >
        <p> Витрина книг</p>
        <i className={`${s.arrow} ${isOpen && s.arrowOpen} ${pathname === '/books/all' && s.arrowColor}  `} />
      </h1>

        {categories &&  <div className={`${s.wrapperList} ${isOpen && s.wrapperListOpen}  `}>
        {' '}
        <NavLink data-test-id={idBooks} onClick={toggleMenu} to='/books/all'>
          <div className={` ${s.booksAll} ${pathname === '/books/all' ? s.activeBooksAll : ''}`}>Все книги</div>{' '}
        </NavLink>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink onClick={toggleMenu} to={`/books/${category.path}`}>
                {' '}
                <span className={`${s.name} ${pathname === `/books/${category.path}` ? s.nameActive : ''}`}>
                  {category.name}
                </span>{' '}
                <span className={s.count}>{category.id}</span>{' '}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>}
      <NavLink
        onClick={() => {
          setIsOpen(false);
          if (toggleMenu) {
            toggleMenu();
          }
        }}
        to='/terms'
      >
        <h1 data-test-id={idTerms} className={` ${s.terms} ${pathname === '/terms' ? s.activeTerms : ''}`}>
          Правила пользования
        </h1>
      </NavLink>
      <NavLink
        onClick={() => {
          setIsOpen(false);
          if (toggleMenu) {
            toggleMenu();
          }
        }}
        to='/contract'
      >
        {' '}
        <h1 data-test-id={idContract} className={` ${s.contract} ${pathname === '/contract' ? s.activeContract : ''}`}>
          Договор оферты
        </h1>
      </NavLink>
    </nav>
  );
};

type NavigationType = {
  toggleMenu?: () => void;
  idShowcase: string;
  idBooks: string;
  idContract: string;
  idTerms: string;
};
