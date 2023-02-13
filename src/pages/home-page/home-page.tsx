import React, {  useState } from "react";
import { useSelector } from "react-redux";
import { getBooksStatus } from "../../redux-toolkit/books-selectos";
import { StatusRequestEnum } from "../../redux-toolkit/books-reducer";
import { BookCard } from '../book/book-card';

import { SearchPanel } from './search-panel';

import s from './homePage.module.scss';


export const HomePage = () => {
  const [isSortingList, setIsSortingList] = useState<boolean>(false);
    const status = useSelector(getBooksStatus)
  const handleSetIsSortingList = (boolean: boolean) => {
    setIsSortingList(boolean);
  };

  return (

    <section className={s.homePage}>


        {status === StatusRequestEnum.Success && <SearchPanel isSortingList={isSortingList} handleSetIsSortingList={handleSetIsSortingList} />}
        <BookCard isSortingList={isSortingList} />
    </section>
  );
};
