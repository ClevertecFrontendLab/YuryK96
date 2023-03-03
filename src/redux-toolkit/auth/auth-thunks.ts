import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, AppStateType } from '../store';
import { booksAPI } from '../../api/books';
import { Books } from '../books/books-type';
import { authAPI, CreateNewUserType, ResponseNewUser } from '../../api/auth';
import { DefaultResponseTypes } from '../../api/api';


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();


export const registration = createAppAsyncThunk(
    'auth/local/register',
    async (data: CreateNewUserType, { rejectWithValue }) => {
        try {

            const response = await authAPI.createNewUser(data);
            return response.data.user;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
