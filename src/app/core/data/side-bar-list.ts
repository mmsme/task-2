import { MenuItem } from '../models/menu-item';
import { APP_ROUTES } from '../routes/app-routes';

export const SIDEBAR_LIST: MenuItem[] = [
  {
    name: 'users',
    icon: 'fa-duotone fa-solid fa-user-group',
    image: null,
    link: APP_ROUTES.users.module,
  },
  {
    name: 'products',
    icon: 'fa-solid fa-box',
    image: null,
    link: '/products',
  },
  {
    name: 'invoices',
    icon: 'fa-solid fa-file-invoice-dollar',
    image: null,
    link: '/invoices',
  },
  {
    name: 'contracts',
    icon: 'fa-solid fa-file-signature',
    image: null,
    link: '/contracts',
    children: [
      {
        name: 'contracts',
        icon: 'fa-solid fa-file-signature',
        image: null,
        link: '/contracts',
      },
      {
        name: 'contracts',
        icon: 'fa-solid fa-file-signature',
        image: null,
        link: '/contracts',
      },
      {
        name: 'contracts',
        icon: 'fa-solid fa-file-signature',
        image: null,
        link: '/contracts',
      },
    ],
  },
];
