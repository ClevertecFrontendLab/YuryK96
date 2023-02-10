import { createReducer } from '@reduxjs/toolkit';

import algorithms from '../assets/images/books/algorithms.svg';
import bookCat from '../assets/images/books/bookCat.svg';

const initialState: InitialState = {
  books: [
    {
      cover: bookCat,
      id: 0,
      stars: 5,
      name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: algorithms,
      id: 1,
      stars: 4,
      name: 'Грокаем алгоритмы. Иллюстрированное пособие для  ',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: false,
      date: '03.05',
    },
    {
      cover: algorithms,
      id: 2,
      stars: 3,
      name: 'Программирование на Java',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: false,
      date: '',
    },
    {
      cover: bookCat,
      id: 4,
      stars: 2,
      name: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: bookCat,
      id: 5,
      stars: 2,
      name: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: bookCat,
      id: 6,
      stars: 2,
      name: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: bookCat,
      id: 7,
      stars: 2,
      name: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: bookCat,
      id: 8,
      stars: 2,
      name: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: true,
      date: '',
    },
    {
      cover: algorithms,
      id: 9,
      stars: 2,
      name: 'Программирование на Java',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: false,
      date: '',
    },
    {
      cover: algorithms,
      id: 10,
      stars: 5,
      name: 'Программирование на Java',
      author: 'Адитья Бхаргава',
      year: 2019,
      state: false,
      date: '',
    },
  ],
};
// eslint-disable-next-line import/no-default-export
export default createReducer(initialState, (builder) => {});

type InitialState = {
  books: Book[];
};

type Book = {
  cover: string;
  id: number;
  stars: number;
  name: string;
  author: string;
  year: number;
  state: boolean;
  date: string;
};
