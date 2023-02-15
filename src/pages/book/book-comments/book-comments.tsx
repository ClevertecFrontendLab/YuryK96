import React, { useState } from 'react';
import emptyStar from '../../../assets/images/stars/emptyStar.svg';
import commentAvatar from '../../../assets/images/avatar/comment.png';
import { CommentType } from "../../../redux-toolkit/books/books-type";

import s from './book-commets.module.scss';
import { countStars } from '../../../helpers/stars-helper';



type BookCommentsType = {
  comments: CommentType[] | undefined;
};
export const BookComments: React.FC<BookCommentsType> = ({ comments }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);
  const toggleListComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <div className={s.comments}>
      <div data-test-id='button-hide-reviews' className={s.comments__title}>
        <div style={{ width: 'fit-content', cursor: 'pointer' }} role='presentation' onClick={toggleListComments}>
          Отзывы <span className={s.comments__count}>{comments?.length || 0}</span>{' '}
          <i className={`${s.arrow} ${isCommentsOpen && s.arrowOpen}  `} />
        </div>
      </div>
      <div className={`${s.comments__container} ${isCommentsOpen && s.comments__container_active}`}>
        {comments &&
          comments.map((comment) => {
            const stars = countStars(comment.rating);
            return (
              <div key={comment.id} className={s.comments__wrapper}>
                <div className={s.comments__comment}>
                  <div className={s.comments__person}>
                    <div className={s.comments__avatar}>
                      <img alt='avatar' src={!comment.user.avatarUrl ? commentAvatar : `https://strapi.cleverland.by${comment.user.avatarUrl}`} />
                    </div>
                    <div className={s.comments__name}>{comment.user.firstName}{' '}{comment.user.lastName}</div>
                    <div className={s.comments__date}>{comment.createdAt.split('T')[0] }</div>
                  </div>
                  <div className={s.comments__stars}>
                    {stars.map((star) => (
                      <img alt='star' key={star.id} src={star.star} />
                    ))}
                  </div>
                  <div className={s.comments__descr}>{comment.text}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
