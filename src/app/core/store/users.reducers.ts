import { createReducer, on } from '@ngrx/store';
import { User } from '../../modules/users/models/user';
import { UsersActions } from './users.actions';
import { PaginationModel } from '../models/pagination-model';

export interface State {
  users: PaginationModel<User> | null;
  selectedUser: User | null;
  selectedUserId: number | null;
}

const initialState: State = {
  users: null,
  selectedUser: null,
  selectedUserId: null,
};

export const UserReducers = createReducer(
  initialState,
  on(UsersActions.set, (state, actions) => {
    return {
      ...state,
      users: actions.users,
      selectedUser: actions.selectedUser,
      selectedUserId: actions.selectedUserId,
    };
  }),
  on(UsersActions.fetchUserById, (state, actions) => {
    return {
      ...state,
      selectedUserId: actions.id,
    };
  })
);
