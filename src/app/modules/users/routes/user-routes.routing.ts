import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../core/routes/app-routes';
import { usersResolver } from '../resolvers/users.resolver';
import { ResolverMode } from '../../../core/enums/resolver-mode.enum';

export const UserRoutes: Routes = [
  {
    path: APP_ROUTES.users.module,
    title: 'Users',
    children: [
      {
        path: '',
        redirectTo: APP_ROUTES.users.children.users,
        pathMatch: 'full',
      },
      {
        path: APP_ROUTES.users.children.users,
        resolve: {
          users: usersResolver,
        },
        loadComponent: () =>
          import('../pages/users-list/users-list.component').then(
            (c) => c.UsersListComponent
          ),
      },
      {
        path: `${APP_ROUTES.users.children.userDetails}/:id`,
        title: 'User Details',
        data: {
          mode: ResolverMode.single,
        },
        resolve: {
          user: usersResolver,
        },
        loadComponent: () =>
          import('../pages/users-details/users-details.component').then(
            (c) => c.UsersDetailsComponent
          ),
      },
    ],
  },
];
