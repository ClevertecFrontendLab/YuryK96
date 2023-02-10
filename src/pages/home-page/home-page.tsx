import React, { useState } from 'react';

import { BookCard } from '../book/book-card';

import { SearchPanel } from './search-panel';

import s from './homePage.module.scss';

export const HomePage = () => {
  const [isSortingList, setIsSortingList] = useState<boolean>(false);

  const handleSetIsSortingList = (boolean: boolean) => {
    setIsSortingList(boolean);
  };

  return (
    <section className={s.homePage}>
      <SearchPanel isSortingList={isSortingList} handleSetIsSortingList={handleSetIsSortingList} />
      <BookCard isSortingList={isSortingList} />
    </section>
  );
};
