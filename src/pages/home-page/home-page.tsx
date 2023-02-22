
import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { NotFoundBooks } from '../../common/not-found-books';
import {
    getBooks,
    getBooksStatus,
    getCategoriesStatus, getCategoryArrayBooksLength, getSearchArrayBooksLength
} from '../../redux-toolkit/books/books-selectos';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { BookCard } from '../book/book-card';

import { SearchPanel } from './search-panel';

import s from './homePage.module.scss';





export const HomePage = () => {
  const [isSortingList, setIsSortingList] = useState<boolean>(false);
  const [isRatingSort, setIsRatingSort]= useState<boolean>(true)
    const [searchText, setSearchText] = useState('')
    const { category } = useParams()
    const searchArrayBooksLength = useSelector(getSearchArrayBooksLength)
    const categoryArrayBooksLength = useSelector(getCategoryArrayBooksLength(category))
    const books = useSelector(getBooks(category));
    const status = useSelector(getBooksStatus)
    const categoryStatus = useSelector(getCategoriesStatus)

    const removeSearchText = () => {
        setSearchText('')
    }
    const addSearchText = (text:string) => {
        setSearchText(text)
    }
  const handleSetIsSortingList = (boolean: boolean) => {
    setIsSortingList(boolean);
  };
  const toggleRatingSort = () => {
      setIsRatingSort(!isRatingSort);
  };

  return (

    <section className={s.homePage}>


        {status === StatusRequestEnum.Success && categoryStatus === StatusRequestEnum.Success &&  <> <SearchPanel  removeSearchText={removeSearchText} addSearchText={addSearchText}   category={category} toggleRatingSort={toggleRatingSort} isSortingList={isSortingList} handleSetIsSortingList={handleSetIsSortingList} />
            {searchArrayBooksLength === 0 && searchText || categoryArrayBooksLength === 0 ? <NotFoundBooks id={categoryArrayBooksLength === 0  ? 'empty-category' : 'search-result-not-found' } title={categoryArrayBooksLength === 0  ? 'В этой категории книг ещё нет' : 'По запросу ничего не найдено'} /> :
        <BookCard searchText={searchText} books={books} category={category} isRatingSort={isRatingSort} isSortingList={isSortingList} />} </>  }
    </section>
  );
};
