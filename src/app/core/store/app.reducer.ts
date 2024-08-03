import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './users.reducers';

export interface AppState {
  users: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  users: fromUser.UserReducers,
};
