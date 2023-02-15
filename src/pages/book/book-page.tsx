/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar } from "swiper";
import { StatusRequestEnum } from "../../redux-toolkit/books/books-type";
import emptyStar from "../../assets/images/stars/emptyStar.svg";
import wholeStar from "../../assets/images/stars/star.svg";
import { Button } from "../../common/button";
import { getBook } from "../../redux-toolkit/books/books-thunks";

import { BreadCrumbs } from "./bread-crumbs";

import s from "./book-page.module.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper-style.scss";
import { BookComments } from "./book-comments";
import { AppDispatch, AppStateType } from "../../redux-toolkit/books/store";
import bookCat from "../../assets/images/books/bookCat.svg";
import { useWindowSize } from "../../hooks/window-size-hook";
import { countStars } from "../../helpers/stars-helper";
import { getBookStatus, getChosenBook } from "../../redux-toolkit/books/books-selectos";
import { Error } from "../../common/error";



export const BookPage: React.FC = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();
    const { width1000 } = useWindowSize();
    const { userId } = useParams();


    useEffect(() => {
        if (userId) {
            dispatch(getBook(userId));
        }
    }, [pathname, dispatch]);
    const book = useSelector(getChosenBook);
    console.log(book)
    const stars = countStars(book.rating);
    return (
        <section className={s.bookPage}>
            {book.status === StatusRequestEnum.Error && <div style={{
                position: "absolute", width:'100%', marginTop: "-85px"
            }}><Error /></div>}
            <BreadCrumbs title={book.title} categories={book.categories}  />


            {book.status === StatusRequestEnum.Success && <div className={s.content}>
                <div className={s.cover}>
                    {!book?.images ? (
                        <div className={s.nonCover}>
                            {" "}
                            <img src={bookCat} alt="cat book" />{" "}
                        </div>
                    ) : book.images.length === 1 ? (
                        <div className={s.oneCover}>
                            {" "}
                            <img loading='lazy' src={`https://strapi.cleverland.by${book.images[0].url}`}
                                 alt="cover" />{" "}
                        </div>
                    ) : (
                        <>
                            {" "}
                            <Swiper
                                data-test-id="slide-big"
                                loop={true}
                                style={
                                    {
                                        "--swiper-navigation-color": "#fff",
                                        "--swiper-pagination-color": "#363636"
                                    } as React.CSSProperties
                                }
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[Navigation, Thumbs, Pagination]}
                                pagination={!width1000 && { clickable: true }}
                                className="mySwiper2"
                            >
                                {book.images.map((item, index) => (
                                    <SwiperSlide data-test-id="slide-mini" key={index}>
                                        {" "}
                                        <img alt="cover"
                                             src={`https://strapi.cleverland.by${item.url}`} />{" "}
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
                                        horizontalClass: "swiper-scrollbar-horizontal",
                                        dragClass: "swiper-scrollbar-drag",
                                        draggable: true
                                    }}
                                    modules={[Scrollbar]}
                                    className="mySwiper"
                                >
                                    {book.images.map((item, index) => (
                                        <SwiperSlide data-test-id="slide-mini" key={index}>
                                            {" "}
                                            <img alt="cover"
                                                 src={`https://strapi.cleverland.by${item.url}`} />{" "}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </>
                    )}
                </div>
                <div className={s.infoWrapper}>
                    <div className={s.info}>
                        <div className={s.name}>{book?.title}</div>
                        <div className={s.author}>
                            {book?.authors} {book?.issueYear}
                        </div>
                        <div className={s.button}>

                            <Button isBookPage={true} booking={book.booking} />
                        </div>
                    </div>
                    <div className={s.about}>
                        <div className={s.title}> О книге</div>
                        <div className={s.aboutContent}>{book?.description}</div>

                    </div>
                </div>

                <div className={s.rating}>
                    <div className={s.ratingTitle}>Рейтинг</div>
                    <div
                        className={`${s.starsWrapper} ${book?.rating === 0 && s.starsWrapperZero} `}>
                        <div className={s.stars}>
                            {" "}
                            {stars.map((star) => (
                                <div key={star.id} className={s.star}>
                                    {" "}
                                    <img src={star.star} alt="star" />{" "}
                                </div>
                            ))}{" "}
                        </div>
                        <div
                            className={s.ratingNumber}>{book?.rating === 0 || !book.rating ? "ещё нет оценок" : Math.round(book.rating)}</div>
                    </div>
                </div>

                <div className={s.dopInfo}>
                    <div className={s.dopInfo__title}>Подробная информация</div>

                    <div className={s.dopInfo__wrapper}>
                        <div className={s.dopInfo__column}>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Издательство</span>
                                <span className={s.dopInfo__descr}>{book?.publish}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Год издания</span>{" "}
                                <span className={s.dopInfo__descr}>{book?.issueYear}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Страниц</span>{" "}
                                <span className={s.dopInfo__descr}>{book?.pages}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Переплёт</span>{" "}
                                <span className={s.dopInfo__descr}>{book?.cover}</span>
                            </div>
                            {" "}
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Формат</span>{" "}
                                <span className={s.dopInfo__descr}>{book?.format}</span>
                            </div>
                        </div>
                        <div className={s.dopInfo__column}>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Жанр</span> <span
                                className={s.dopInfo__descr}>{book?.categories}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Вес</span> <span
                                className={s.dopInfo__descr}>{book?.weight}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>ISBN</span> <span
                                className={s.dopInfo__descr}>{book?.ISBN}</span>
                            </div>
                            <div className={s.dopInfo__optionWrapper}>
                                <span className={s.dopInfo__option}>Изготовитель</span>{" "}
                                <span className={s.dopInfo__descr}>{book?.producer}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <BookComments comments={book?.comments} />


                <Button id="button-rating" isBookEstimate={true} booking={null}
                        bookPageText="ОЦЕНИТЬ КНИГУ" />
            </div>}
        </section>
    );
};
