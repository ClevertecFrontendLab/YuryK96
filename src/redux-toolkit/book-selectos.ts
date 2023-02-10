import { AppStateType } from './store';

export const getBook = (state: AppStateType, id: number) => state.bookBranch[id];
