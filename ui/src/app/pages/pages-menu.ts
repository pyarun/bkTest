import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/',
    home: true,
  },

  {
    title: 'Games',
    icon: 'nb-locked',
    children: [
      {
        title: 'Sales',
        link: '/sales',
      },
      {
        title: 'Features',
        link: '/features',
      }
    ],
  },
];
