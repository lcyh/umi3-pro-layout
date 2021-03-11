const menuData = [
  {
    path: '/abtest',
    name: 'ABTest',
    icon: 'smile',
    children: [
      {
        name: '实验管理',
        icon: 'smile',
        iconfont: 'project',
        path: '/abtest/experiment',
        component: './Abtest/Experiment',
        access: 'canDeleteFoo',
        exact: true,
      },
      {
        name: '受众管理',
        icon: 'smile',
        iconfont: 'project',
        path: '/abtest/audience',
        component: './Abtest/Audience',
        exact: true,
      },
      {
        name: '变量管理',
        icon: 'smile',
        iconfont: 'project',
        path: '/abtest/variable',
        component: './Abtest/Variable',
        exact: true,
      },
      {
        name: '实验层管理',
        icon: 'smile',
        iconfont: 'project',
        path: '/abtest/laboratory',
        component: './Abtest/Laboratory',
        exact: true,
      },
    ],
  },
  {
    name: 'demo',
    path: '/demo',
    children: [
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
        visible: true,
      },
    ],
  },
  {
    name: '汇总数据-列表页',
    path: '/summary',
    icon: 'heart',
    collapsed: true,
    children: [
      {
        name: '1级列表页',
        path: '/summary/month',
        children: [
          {
            name: 'month-1级列表页面',
            icon: 'month1',
            path: '/summary/month/month1',
            children: [
              {
                name: 'month-1-1级列表页面',
                icon: 'month-1-1',
                path: '/summary/month/month1/month11',
              },
            ],
          },
          {
            name: 'month-2级列表页面',
            icon: 'month-2',
            path: '/summary/month/month2',
          },
          {
            id: 2,
            name: '11级列表页面',
            path: '/summary/month/monthDetail',
          },
        ],
      },
      {
        name: 'form表单',
        icon: 'form',
        path: '/summary/form',
      },
    ],
  },
  {
    path: '/hooks',
    name: 'hooks菜单',
    children: [
      {
        path: '/hooks/request',
        name: 'hooks1',
      },
      {
        path: '/hooks/other',
        name: 'hooks2',
      },
    ],
  },
  {
    name: 'profile',
    icon: 'profile',
    iconfont: 'profile',
    path: '/profile',
  },
];

export default menuData;
