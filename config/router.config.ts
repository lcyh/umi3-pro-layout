import routes from './routes';

export default [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    exact: true,
  },
  {
    path: '/403',
    exact: true,
    component: './403',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: routes
  },
  {
    component: './404',
  },
];
