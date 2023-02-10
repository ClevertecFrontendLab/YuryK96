import React, { useState } from 'react';
import emptyStar from '../../../assets/images/stars/emptyStar.svg';
import wholeStar from '../../../assets/images/stars/star.svg';
import { Book } from '../../../redux-toolkit/book-reducer';

import s from './book-commets.module.scss';
import { countStars } from '../../../helpers/stars-helper';

type BookCommentsType = {
  book: Book;
};
export const BookComments: React.FC<BookCommentsType> = ({ book }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);

  const toggleListComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };
  return (
    <div className={s.comments}>
      <div data-test-id='button-hide-reviews' className={s.comments__title}>
        <div style={{ width: 'fit-content', cursor: 'pointer' }} role='presentation' onClick={toggleListComments}>
          Отзывы <span className={s.comments__count}>{book.comments?.length || 0}</span>{' '}
          <i className={`${s.arrow} ${isCommentsOpen && s.arrowOpen}  `} />
        </div>
      </div>
      <div className={`${s.comments__container} ${isCommentsOpen && s.comments__container_active}`}>
        {book.comments &&
          book.comments.map((comment) => {
            const stars = countStars(book.stars);
            return (
              <div key={comment.id} className={s.comments__wrapper}>
                <div className={s.comments__comment}>
                  <div className={s.comments__person}>
                    <div className={s.comments__avatar}>
                      <img alt='avatar' src={comment.photo} />
                    </div>
                    <div className={s.comments__name}>{comment.name}</div>
                    <div className={s.comments__date}>{comment.date}</div>
                  </div>
                  <div className={s.comments__stars}>
                    {stars.map((star) => (
                      <img alt='star' key={star.id} src={star.star} />
                    ))}
                  </div>
                  <div className={s.comments__descr}>{comment.comment}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
