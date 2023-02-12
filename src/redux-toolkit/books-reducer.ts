/* eslint-disable */
import { AnyAction, createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import algorithms from "../assets/images/books/algorithms.svg";
import bookCat from "../assets/images/books/bookCat.svg";

import { AppDispatch, AppStateType } from "./store";

export enum StatusRequestEnum {
    Pending = "pending",
    Success = "resolved",
    Error = "rejected",
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();
export const getBooks = createAppAsyncThunk(
    "api/books",
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get("https://strapi.cleverland.by/api/books");
            return response.data as Books[];

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
export const getBook = createAppAsyncThunk(
    "api/book",
    async (id: string | undefined, { rejectWithValue }) => {

        try {
            const response = await axios.get(`https://strapi.cleverland.by/api/books/${id}`);
            return response.data as Book;

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
export const getCategories = createAppAsyncThunk(
    "api/categories",
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get("https://strapi.cleverland.by/api/categories");
            return response.data as CategoryType[];

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

// eslint-disable-next-line import/no-default-export
const booksSlice = createSlice({
        name: "books",
        initialState: {
            books: [],
            book: {
                status: null,
                error:null,
            },
            categories: [],
            status: null,
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
                    state.status = StatusRequestEnum.Success;
                    state.categories = action.payload;
                    state.error = null;
                })
                .addCase(getBook.fulfilled, (state, action) => {
                    state.book = {...state.book, ...action.payload };
                    state.book.status = StatusRequestEnum.Success;
                    state.status = StatusRequestEnum.Success;
                    state.error = null;
                })
                .addCase(getBook.rejected, (state, action) => {
                    state.book.status = StatusRequestEnum.Error;
                    state.book.error = action.payload as string;
                })
                .addCase(getCategories.rejected, (state, action) => {
                    state.status = StatusRequestEnum.Error;
                    state.error = action.payload as string;
                })
                .addCase(getBooks.rejected, (state, action) => {
                    state.status = StatusRequestEnum.Error;
                    state.error = action.payload as string;
                })
                .addMatcher(isPending, (state, action) => {
                    state.status = StatusRequestEnum.Pending;
                    state.error = null;
                });
        }

    }
);

function isError(action: AnyAction) {
    return action.type.endsWith("rejected");
}

function isPending(action: AnyAction) {
    return action.type.endsWith("pending");
}

export default booksSlice.reducer;

type InitialStateType = {
    books: Books[];
    book: Book ;
    categories: CategoryType[];
    status: StatusRequestEnum | null;
    error: string | null;
};

type Books = {
    issueYear: string | null;
    rating: number | null;
    title: string;
    authors: string[] | null;
    image: { url: string | null; };
    categories: string[] | null;
    id: number;
    booking: BookingType,
    delivery: DeliveryType,
    histories: Array<{ id: number | null, userId: number | null }>

} ;

export type Book = {
    status: StatusRequestEnum | null
    error: string | null,
    id?: number;
    title?: string;
    rating?: number | null;
    issueYear?: string | null;
    description?: string | null;
    publish?: string | null;
    pages?: string | null;
    cover?: string | null;
    weight?: string | null;
    format?: string | null;
    ISBN?: string | null;
    producer?: string | null;
    authors?: string[] | null;
    images?: Array<{ url: string | null; }>;
    categories?: string[],
    comments?: CommentType[] ,
    booking?: BookingType,
    delivery?: DeliveryType,
    histories?: Array<{ id: number | null, userId: number | null }>

};
export type CommentType = {
    id: number ,
    rating: number,
    text: string | null,
    createdAt: string,
    user: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl: string | null
    }

}

export type BookingType = {
    id: number,
    order: boolean,
    dateOrder: string | null,
    customerId: number | null,
    customerFirstName: string | null,
    customerLastName: string | null,

}

type DeliveryType = {
    id: number,
    handed: boolean,
    dateHandedFrom: string | null,
    dateHandedTo: string | null,
    recipientId: number | null,
    recipientFirstName: string | null,
    recipientLastName: string | null,
}

type ErrorType = {
    data: null,
    error: {
        status: number,
        name: string,
        message: string,
        details: {}
    }
}

type CategoryType = {
    name: string,
    path: string,
    id: number

}
