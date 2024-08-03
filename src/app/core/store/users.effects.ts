import { QueryService } from './../services/query.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { User } from '../../modules/users/models/user';
import { PaginationModel } from '../models/pagination-model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersEffects {
  private readonly api = environment.apiUrl;
  fetchUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.fetchUsers),
      withLatestFrom(this.store.select('users')),
      switchMap(([actionData, userState]) => {
        let query = this._QueryService.buildQuery(actionData.query ?? {});
        return this.http
          .get<PaginationModel<User>>(`${this.api}/users${query}`)
          .pipe(map((res) => ({ response: res, state: userState })));
      }),
      map((res) => {
        return UsersActions.set({
          ...res.state,
          users: res.response,
        });
      })
    )
  );

  fetchUserById = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.fetchUserById),
      withLatestFrom(this.store.select('users')),
      switchMap(([actionData, userState]) => {
        return this.http
          .get<{ data: User; support: any }>(
            `${this.api}/users/${actionData.id}`
          )
          .pipe(map((res) => ({ response: res.data, state: userState })));
      }),
      map((res) => {
        return UsersActions.set({
          ...res.state,
          selectedUser: res.response,
          selectedUserId: res.response.id,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private _QueryService: QueryService
  ) {}
}
