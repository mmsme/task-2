import { UserRoutesEnum } from '../../modules/users/routes/UserRoutes.enum';

export const APP_ROUTES = {
  dashboard: 'dashboard',
  _401: '401',
  _403: '403',
  _404: '404',

  users: {
    module: 'users',
    children: UserRoutesEnum,
  },
};
