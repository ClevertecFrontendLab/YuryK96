/* eslint-disable */
import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
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
}>()
export const getBooks = createAppAsyncThunk(
    "api/books",
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get("https://strapi.cleverland.by/api/books");
            return response.data as Book[];

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
            status: null,
            error: null
        } as InitialStateType,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getBooks.pending, (state) => {
                state.status = StatusRequestEnum.Pending;
                state.error = null;
            })
                .addCase(getBooks.fulfilled, (state, action) => {
                    state.status = StatusRequestEnum.Success;
                    state.books = action.payload;
                    state.error = null;
                })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = StatusRequestEnum.Error;
                state.error = action.payload as string

                });
        }

    }
);
export default booksSlice.reducer;

type InitialStateType = {
    books: Book[];
    status: StatusRequestEnum | null,
    error: string | null
};

type Book = {
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

};

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
