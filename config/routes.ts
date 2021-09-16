export default [
  {
    path: '/',
    redirect: '/abtest/experiment',
    exact: true,
  },
  {
    name: 'abtest',
    path: '/abtest',
    routes: [
      {
        path: '/abtest',
        redirect: '/abtest/experiment',
        exact: true,
      },
      {
        name: '实验管理',
        icon: 'smile',
        path: '/abtest/experiment',
        component: './Abtest/Experiment',
        access: 'canDeleteFoo',
        exact: true,
      },
      {
        name: '受众管理',
        icon: 'smile',
        path: '/abtest/audience',
        component: './Abtest/Audience',
        exact: true,
      },
      {
        name: '变量管理',
        icon: 'smile',
        path: '/abtest/variable',
        component: './Abtest/Variable',
        exact: true,
      },
      {
        name: '实验层管理',
        icon: 'smile',
        path: '/abtest/laboratory',
        component: './Abtest/Laboratory',
        exact: true,
      },
    ],
  },
  {
    name: 'demo',
    path: '/demo',
    routes: [
      {
        path: '/demo',
        redirect: '/demo/list',
        exact: true,
      },
      {
        name: '列表页',
        path: '/demo/list',
        component: './Demo/list',
        exact: true,
      },
      {
        name: '详情页',
        path: '/demo/detail',
        component: './Demo/detail',
        exact: true,
      },
    ],
  },
  {
    name: '汇总数据-列表页',
    path: '/summary',
    routes: [
      {
        path: '/summary',
        redirect: '/summary/month',
        exact: true,
      },
      {
        name: 'form',
        icon: 'form',
        path: '/summary',
        component: './ListTableList',
        exact: true,
      },
      {
        name: 'form',
        icon: 'form',
        path: '/summary/form',
        component: './Summary/Form',
        exact: true,
      },
      {
        name: 'month',
        path: '/summary/month',
        component: './Summary/Month',
        routes: [
          // {
          //   name: 'month-1级列表页面',
          //   icon: 'month',
          //   path: '/summary/month',
          //   redirect: '/summary/month/month1',
          // },
          {
            name: 'month-1级列表页面',
            icon: 'month1',
            path: '/summary/month/month1',
            component: './Summary/Month/Month1',
            routes: [
              // {
              //   name: 'month-1级列表页面',
              //   icon: 'month',
              //   path: '/summary/month/month1',
              //   redirect: '/summary/month/month1/month11',
              // },
              {
                name: 'month-1-1级列表页面',
                icon: 'month-1-1',
                path: '/summary/month/month1/month11',
                exact: true,
                component: './Summary/Month/Month1/Month11',
              },
            ],
          },
          {
            name: 'month-2级列表页面',
            icon: 'month-2',
            path: '/summary/month/month2',
            exact: true,
            component: './Summary/Month/Month2',
          },
          {
            name: 'month详情页-11级列表页面',
            icon: 'form',
            path: '/summary/month/monthDetail',
            component: './Summary/MonthDetail',
            exact: true,
          },
        ],
      },
      // {
      //   name: 'month详情页-11级列表页面',
      //   icon: 'form',
      //   path: '/summary/monthDetail',
      //   component: './Summary/MonthDetail',
      //   exact: true,
      //   visible:false
      // },
    ],
  },
  {
    name: 'hooks',
    path: '/hooks',
    routes: [
      {
        name: 'hooks',
        icon: 'hooks',
        path: '/hooks/request',
        component: './Hooks/Request',
        exact: true,
      },
      {
        name: 'hooks',
        icon: 'hooks',
        path: '/hooks/other',
        component: './Hooks/Other',
        exact: true,
      },
    ],
  },
  {
    name: 'profile',
    icon: 'profile',
    path: '/profile',
    component: './Profile',
    exact: true,
  },
  {
    component: './404',
  },
];
