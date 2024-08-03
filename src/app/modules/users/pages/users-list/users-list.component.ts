import { QueryService } from './../../../../core/services/query.service';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store/app.reducer';
import { PaginationModel } from '../../../../core/models/pagination-model';
import { User } from '../../models/user';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersActions } from '../../../../core/store/users.actions';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { APP_ROUTES } from '../../../../core/routes/app-routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FilterPipe,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 9;
  users!: PaginationModel<User>;
  searchText: string = '';
  detailsLink = `/${APP_ROUTES.dashboard}/${APP_ROUTES.users.module}/${APP_ROUTES.users.children.userDetails}`;

  constructor(
    private store: Store<AppState>,
    private destroyRef: DestroyRef,
    private _QueryService: QueryService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.store
      .select('users')
      .pipe(
        map((res) => res.users),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        if (res) {
          this.users = res;
        }
      });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  getUsers() {
    let model = { page: this.pageIndex + 1, per_page: this.pageSize };
    this.store.dispatch(UsersActions.fetchUsers({ query: model }));
  }
}
