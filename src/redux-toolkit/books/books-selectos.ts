import { AppStateType } from "./store";

export const getBooks = (state: AppStateType) => state.booksBranch.books;
export const getCategories = (state: AppStateType) => state.booksBranch.categories;

export const getChosenBook = (state: AppStateType) => state.booksBranch.book;
export const getBooksStatus = (state: AppStateType) => state.booksBranch.status;
export const getBookStatus = (state: AppStateType) => state.booksBranch.book.status;
export const getCategoriesStatus = (state: AppStateType) => state.booksBranch.categoriesStatus;
