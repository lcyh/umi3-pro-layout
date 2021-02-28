import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

const menuData = [
        {
          path: '/abtest',
          name: 'ABTest',
          collapsed: true,
          children:[
            {
              name: '实验管理',
              icon: 'project',
              iconfont: 'project',
              path: '/abtest/experiment',
              component: './Abtest/Experiment',
              access: 'canDeleteFoo',
              exact: true,
            },
            {
              name: '受众管理',
              icon: 'project',
              iconfont: 'project',
              path: '/abtest/audience',
              component: './Abtest/Audience',
              exact: true,
            },
            {
              name: '变量管理',
              icon: 'project',
              iconfont: 'project',
              path: '/abtest/variable',
              component: './Abtest/Variable',
              exact: true,
            },
            {
              name: '实验层管理',
              icon: 'project',
              iconfont: 'project',
              path: '/abtest/laboratory',
              component: './Abtest/Laboratory',
              exact: true,
            },
          ]
        },
        {
          name: 'demo',
          path: '/demo',
          collapsed: true,
          children:[
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
              hideInMenu: true,
            },
          ]
        },
        {
            name: '汇总数据',
            path: '/summary',
            component: './ListTableList',
            children: [
              {
                collapsed: true,
                menuName: '域买家维度交易',
                name: '域买家维度交易',
                children: [
                  {
                    name: 'form表单',
                    icon: 'form',
                    iconfont: 'form',
                    path: 'summary/form',
                    component: './Home',
                  },
                  {
                    id: 2,
                    name: '月表',
                    path: '/summary/month',
                    component: './Month',
                  },
                ],
              },
              {
                path: '/data_ming',
                name: '明细数据',
                children: [
                  {
                    path: '/other/outLoadMenu',
                    name: '菜单导出',
                    hideInMenu: true,
                  },
                  {
                    path: '/other/homeEdit',
                    name: '概述导出',
                  },
                ]
              },
            ]                
        },
        {
          name: 'profile',
          icon: 'profile',
          iconfont: 'profile',
          path: '/profile',
          component: './Profile',
        },
];
  
export default menuData;