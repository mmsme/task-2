import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.reducer';
import { map, of, switchMap, take } from 'rxjs';
import { UsersActions } from '../../../core/store/users.actions';
import { ResolverMode } from '../../../core/enums/resolver-mode.enum';

export const usersResolver: ResolveFn<any> = (route, state) => {
  const store: Store<AppState> = inject(Store);
  const mode = route.data['mode'];
  switch (mode) {
    case ResolverMode.single:
      let id = route.params['id'];
      return store.select('users').pipe(
        take(1),

        switchMap((state) => {
          if (state.selectedUser?.id == id) {
            return of(state.selectedUser);
          }

          let searchResult = state.users?.data.find((e) => e.id == id);
          if (searchResult) {
            store.dispatch(
              UsersActions.set({
                ...state,
                selectedUser: searchResult,
                selectedUserId: searchResult.id,
              })
            );
            return of(searchResult);
          }

          store.dispatch(UsersActions.fetchUserById({ id: id }));
          return of([]);
        })
      );

    default:
      return store.select('users').pipe(
        take(1),
        map((usersState) => {
          return usersState.users;
        }),
        switchMap((users) => {
          console.log(users);

          if (!users?.data) {
            store.dispatch(
              UsersActions.fetchUsers({ query: { page: 1, per_page: 10 } })
            );
            return of([]);
          } else {
            return of(users);
          }
        })
      );
  }
};
