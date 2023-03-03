import { combineReducers, configureStore } from '@reduxjs/toolkit';

import booksSlice from './books/books-reducer';
import authSlice from './auth/auth-reducer';

const rootReducer = combineReducers({
  booksBranch: booksSlice,
    authBranch: authSlice,

});

export const store = configureStore({
  reducer: rootReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch
