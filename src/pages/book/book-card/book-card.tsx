import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { countStars } from '../../../helpers/stars-helper';
import emptyStar from '../../../assets/images/stars/emptyStar.svg';
import wholeStar from '../../../assets/images/stars/star.svg';
import catBook from '../../../assets/images/books/bookCat.svg';
import { Button } from "../../../common/button";
import { getBooks } from '../../../redux-toolkit/books-selectos';

import s from './book-card.module.scss';

export const BookCard: React.FC<Book> = ({ isSortingList }) => {
  const books = useSelector(getBooks);

  return (
    <div className={`${s.book} ${isSortingList && s.bookList} ${!isSortingList && s.bookSquare}`}>
      {books.map((book) => {
        const stars = countStars(book.rating);

        return (
          <div className={s.bookWrapper} key={book.id}>
            <NavLink to={`/books/all/${book.id}`}>
              <div data-test-id='card' key={book.id} className={s.BookItem}>
                <div className={s.cover}>
                  <img alt='cover' src={book.image ? `https://strapi.cleverland.by${book.image.url}` : catBook} />
                </div>
                <div className={s.wrapper}>
                  <div className={s.stars}>
                    {' '}
                    {stars.map((star) => (
                      <div key={star.id} className={s.star}>
                        {' '}
                        <img src={star.star} alt='star' />{' '}
                      </div>
                    ))}{' '}
                  </div>
                  <div className={s.info}>
                    <div className={s.name}>{book.title}</div>
                    <div className={s.author}>
                      {book.authors}, {book.issueYear}
                    </div>
                  </div>
                  <div className={s.button}>
                    <Button booking={book.booking}  />
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

type Book = {
  isSortingList: boolean;
};
