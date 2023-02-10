import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar } from 'swiper';

import emptyStar from '../../assets/images/stars/emptyStar.svg';
import wholeStar from '../../assets/images/stars/star.svg';
import { Button } from '../../common/button/button.jsx';
import { getBook } from '../../redux-toolkit/book-selectos';

import { BreadCrumbs } from './bread-crumbs';

import s from './book-page.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper-style.scss';
import { BookComments } from './book-comments';
import { AppStateType } from '../../redux-toolkit/store';
import bookCat from '../../assets/images/books/bookCat.svg';
import { useWindowSize } from '../../hooks/window-size-hook';
import { countStars } from '../../helpers/stars-helper';

export const BookPage: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const { pathname } = useLocation();
  const { width1000 } = useWindowSize();
  const [bookId, setBookId] = useState(0);

  useEffect(() => {
    const url = new URLSearchParams(pathname);
    const id = Number(url.get('id'));

    if (id && id <= 2) {
      setBookId(id);
    }
  }, [pathname]);
  const book = useSelector((state: AppStateType) => getBook(state, bookId));
  const stars = countStars(book.stars);
  return (
    <section className={s.bookPage}>
      <BreadCrumbs />

      <div className={s.content}>
        <div className={s.cover}>
          {book.covers === null ? (
            <div className={s.nonCover}>
              {' '}
              <img src={bookCat} alt='cat book' />{' '}
            </div>
          ) : book.covers.length === 1 ? (
            <div className={s.oneCover}>
              {' '}
              <img src={book.covers[0].cover} alt='cover' />{' '}
            </div>
          ) : (
            <>
              {' '}
              <Swiper
                data-test-id='slide-big'
                loop={true}
                style={
                  {
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#363636',
                  } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Navigation, Thumbs, Pagination]}
                pagination={!width1000}
                className='mySwiper2'
              >
                {book.covers.map((item, index) => (
                  <SwiperSlide data-test-id='slide-mini' key={item.id}>
                    {' '}
                    <img alt='cover' src={item.cover} />{' '}
                  </SwiperSlide>
                ))}
              </Swiper>
              {width1000 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  slidesPerView={5}
                  scrollbar={{
                    hide: true,
                    horizontalClass: 'swiper-scrollbar-horizontal',
                    dragClass: 'swiper-scrollbar-drag',
                    draggable: true,
                  }}
                  modules={[Scrollbar]}
                  className='mySwiper'
                >
                  {book.covers.map((item, index) => (
                    <SwiperSlide data-test-id='slide-mini' key={item.id}>
                      {' '}
                      <img alt='cover' src={item.cover} />{' '}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          )}
        </div>
        <div className={s.infoWrapper}>
          <div className={s.info}>
            <div className={s.name}>{book.name}</div>
            <div className={s.author}>
              {book.author} {book.year}
            </div>
            <div className={s.button}>
              <Button isBookPage={true} isActive={book.state} date={book.date} />
            </div>
          </div>
          <div className={s.about}>
            <div className={s.title}> О книге</div>
            <div className={s.aboutContent}>{book.about}</div>
            <div className={s.about2Content}>{book.about2}</div>
          </div>
        </div>

        <div className={s.rating}>
          <div className={s.ratingTitle}>Рейтинг</div>
          <div className={`${s.starsWrapper} ${book.stars === 0 && s.starsWrapperZero} `}>
            <div className={s.stars}>
              {' '}
              {stars.map((star) => (
                <div key={star.id} className={s.star}>
                  {' '}
                  <img src={star.star} alt='star' />{' '}
                </div>
              ))}{' '}
            </div>
            <div className={s.ratingNumber}>{book.stars === 0 ? 'ещё нет оценок' : book.stars}</div>
          </div>
        </div>

        <div className={s.dopInfo}>
          <div className={s.dopInfo__title}>Подробная информация</div>

          <div className={s.dopInfo__wrapper}>
            <div className={s.dopInfo__column}>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Издательство</span>
                <span className={s.dopInfo__descr}>{book.publishingHouse}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Год издания</span>{' '}
                <span className={s.dopInfo__descr}>{book.year}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Страниц</span>{' '}
                <span className={s.dopInfo__descr}>{book.pages}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Переплёт</span>{' '}
                <span className={s.dopInfo__descr}>{book.binding}</span>
              </div>{' '}
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Формат</span>{' '}
                <span className={s.dopInfo__descr}>{book.format}</span>
              </div>
            </div>
            <div className={s.dopInfo__column}>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Жанр</span> <span className={s.dopInfo__descr}>{book.genre}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Вес</span> <span className={s.dopInfo__descr}>{book.weight}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>ISBN</span> <span className={s.dopInfo__descr}>{book.isbn}</span>
              </div>
              <div className={s.dopInfo__optionWrapper}>
                <span className={s.dopInfo__option}>Изготовитель</span>{' '}
                <span className={s.dopInfo__descr}>{book.Manufacturer}</span>
              </div>
            </div>
          </div>
        </div>

        <BookComments book={book} />

        <Button id='button-rating' isBookEstimate={true} isActive={true} bookPageText='ОЦЕНИТЬ КНИГУ' />
      </div>
    </section>
  );
};
