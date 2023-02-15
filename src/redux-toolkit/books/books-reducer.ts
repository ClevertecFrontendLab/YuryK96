/* eslint-disable */
import {  createSlice } from "@reduxjs/toolkit";
import { InitialStateType, StatusRequestEnum } from "./books-type";
import { getBook, getBooks, getCategories } from "./books-thunks";


const booksSlice = createSlice({
        name: "books",
        initialState: {
            books: [],
            book: {
                status: null,
                error: null
            },
            categories: null,
            status: null,
            categoriesStatus: null,
            error: null
        } as InitialStateType,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getBooks.fulfilled, (state, action) => {
                    state.status = StatusRequestEnum.Success;
                    state.books = action.payload;
                    state.error = null;
                })
                .addCase(getCategories.fulfilled, (state, action) => {
                    state.categoriesStatus = StatusRequestEnum.Success;
                    state.categories = action.payload;
                    state.error = null;
                })
                .addCase(getBook.fulfilled, (state, action) => {
                    state.book = { ...state.book, ...action.payload };
                    state.book.status = StatusRequestEnum.Success;
                    state.status = StatusRequestEnum.Success;
                    state.error = null;
                })
                .addCase(getBook.rejected, (state, action) => {

                    state.book.status = StatusRequestEnum.Error;
                    state.book.error = action.payload as string;
                    state.status = null;
                })
                .addCase(getCategories.rejected, (state, action) => {
                    state.categoriesStatus = StatusRequestEnum.Error;
                    state.error = action.payload as string;
                })
                .addCase(getBooks.rejected, (state, action) => {
                    state.status = StatusRequestEnum.Error;
                    state.error = action.payload as string;
                })
                .addCase(getBooks.pending, (state, action) => {
                    state.status = StatusRequestEnum.Pending;
                    state.error = null;
                }).addCase(getCategories.pending, (state, action) =>{
                state.status = StatusRequestEnum.Pending;
                state.error = null;
            }).addCase(getBook.pending, (state, action) => {
                state.book.status = StatusRequestEnum.Pending;
                state.status = StatusRequestEnum.Pending;
                state.error = null;
            });

        }

    }
);


export default booksSlice.reducer;

