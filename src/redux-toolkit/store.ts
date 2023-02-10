import { combineReducers, configureStore } from '@reduxjs/toolkit';

import bookReducer from './book-reducer';
import booksReducer from './books-reducer';

const rootReducer = combineReducers({
  booksBranch: booksReducer,
  bookBranch: bookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
