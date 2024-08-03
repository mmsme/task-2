import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input } from '@angular/core';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store/app.reducer';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../../core/routes/app-routes';

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss',
})
export class UsersDetailsComponent {
  user!: User;
  backLink = `/${APP_ROUTES.dashboard}/${APP_ROUTES.users.module}/${APP_ROUTES.users.children.users}`;
  constructor(private store: Store<AppState>, private destroyRef: DestroyRef) {
    this.store
      .select('users')
      .pipe(
        map((res) => res.selectedUser),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
      });
  }
}
