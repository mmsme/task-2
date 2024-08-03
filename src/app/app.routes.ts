import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/routes/app-routes';
import { UserRoutes } from './modules/users/routes/user-routes.routing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.dashboard,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.dashboard,
    title: 'Dashboard',
    loadComponent: () =>
      import(
        './shared/components/dashboard-layout/dashboard-layout.component'
      ).then((c) => c.DashboardLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: APP_ROUTES.users.module,
        pathMatch: 'full',
      },
      ...UserRoutes,
    ],
  },
];
