/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';
import { registration } from './auth-thunks';
import { InitialStateType } from './auth-type';
import { getBook } from '../books/books-thunks';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        authError: null,
        authStatus: null
    } as InitialStateType,

    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (state, action) => {
            state.user = action.payload;
            state.authError = null;
        }).addCase(registration.rejected, (state, action) => {
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload as string;

        }).addCase(registration.pending, (state, action) => {
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;
        });
    }
});

export default authSlice.reducer;
