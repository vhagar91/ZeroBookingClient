export const menus = [
  {
    name: 'zerofee-app.settings.general',
    icon: 'dashboard',
    link: false,
    open: false,
    chip: false,
    sub: [
      {
        name: 'zerofee-app.dashboard',
        link: './dashboard',
        icon: 'dashboard',
        chip: false,
        open: true
      },
      {
        name: 'zerofee.users',
        link: './users',
        icon: 'account_box',
        chip: false,
        open: true
      },
      {
        name: 'zerofee.listings',
        link: './listings',
        icon: 'home',
        chip: false,
        open: true
      }
    ]
  }
];
