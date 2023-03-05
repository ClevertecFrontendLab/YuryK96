/* eslint-disable */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';
import { authorization, registration } from './auth-thunks';
import { InitialStateType } from './auth-type';
import { getBook } from '../books/books-thunks';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        authError: null,
        authStatus: null,
        isAuth: false,
    } as InitialStateType,

    reducers: {
        clearAuthError(state ) {
            state.authError = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (state, action) => {
            state.user = action.payload;
            state.authStatus = StatusRequestEnum.Success;
            state.authError = null;
        }).addCase(authorization.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.authStatus = StatusRequestEnum.Success;
                state.authError = null;
            }
        }) .addMatcher(isError, (state, action: PayloadAction<string>)=>{
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload;
        }).addMatcher(isPending, (state, action: PayloadAction)=>{
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;
        })
    }
});
function isError(action: AnyAction){
    return action.type.endsWith('rejected')
}function isPending(action: AnyAction){
    return action.type.endsWith('pending')
}
export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
