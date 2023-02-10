import { NavLink, useLocation } from 'react-router-dom';

import React, { useState } from 'react';
import s from './navigation.module.scss';

export const Navigation: React.FC<NavigationType> = ({ toggleMenu, idShowcase, idBooks, idContract, idTerms }) => {
  const [isOpen, setIsOpen] = useState(true);
  const categories = [
    {
      name: 'Бизнес-книги',
      id: 0,
      count: 14,
      link: '/books/business',
    },
    {
      name: 'Детективы',
      id: 1,
      count: 8,
      link: '/books/detective',
    },
    {
      name: 'Детские книги',
      id: 2,
      count: 14,
      link: '/books/children',
    },
    {
      name: 'Зарубежная литература',
      id: 3,
      count: 2,
      link: '/books/foreign',
    },
    {
      name: 'История',
      id: 4,
      count: 5,
      link: '/books/history',
    },
    {
      name: 'Классическая литература',
      id: 5,
      count: 12,
      link: '/books/classic',
    },
    {
      name: 'Книги по психологии',
      id: 6,
      count: 11,
      link: '/books/psychology',
    },
    {
      name: 'Компьютерная литература',
      id: 7,
      count: 54,
      link: '/books/computer',
    },
    {
      name: ' Культура и искусство',
      id: 8,
      count: 5,
      link: '/books/culture',
    },
    {
      name: 'Наука и образование',
      id: 9,
      count: 2,
      link: '/books/science',
    },
    {
      name: 'Публицистическая литература',
      id: 10,
      count: 0,
      link: '/books/Nonfiction',
    },
    {
      name: 'Справочники',
      id: 11,
      count: 10,
      link: '/books/directory',
    },
    {
      name: 'Фантастика',
      id: 12,
      count: 12,
      link: '/books/fantasy',
    },
    {
      name: 'Юмористическая литература',
      id: 13,
      count: 8,
      link: '/books/humor',
    },
  ];
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

      <div className={`${s.wrapperList} ${isOpen && s.wrapperListOpen}  `}>
        {' '}
        <NavLink data-test-id={idBooks} onClick={toggleMenu} to='/books/all'>
          <div className={` ${s.booksAll} ${pathname === '/books/all' ? s.activeBooksAll : ''}`}>Все книги</div>{' '}
        </NavLink>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink onClick={toggleMenu} to={category.link}>
                {' '}
                <span className={`${s.name} ${pathname === category.link ? s.nameActive : ''}`}>
                  {category.name}
                </span>{' '}
                <span className={s.count}>{category.count}</span>{' '}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
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
