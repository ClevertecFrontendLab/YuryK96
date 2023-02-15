import { combineReducers, configureStore } from '@reduxjs/toolkit';

import booksSlice from './books-reducer';

const rootReducer = combineReducers({
  booksBranch: booksSlice,

});

export const store = configureStore({
  reducer: rootReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch
