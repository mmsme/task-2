import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaginationModel } from '../models/pagination-model';
import { User } from '../../modules/users/models/user';
import * as fromUsers from './users.reducers';

export const UsersActions = createActionGroup({
  source: '[Users]',
  events: {
    set: props<fromUsers.State>(),
    fetchUsers: props<{ query: object | null }>(),
    fetchUserById: props<{ id: number }>(),
  },
});
