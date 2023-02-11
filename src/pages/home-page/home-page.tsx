import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBooks } from "../../redux-toolkit/books-reducer";

import { BookCard } from '../book/book-card';

import { SearchPanel } from './search-panel';

import s from './homePage.module.scss';
import { AppDispatch } from "../../redux-toolkit/store";

export const HomePage = () => {
  const [isSortingList, setIsSortingList] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()

  useEffect( ()=>{
      dispatch(getBooks())
  },[dispatch] )
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
