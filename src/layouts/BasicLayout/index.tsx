/**
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, {
  DefaultFooter,
  PageHeaderWrapper,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, useRef } from 'react';
import { Link, history, useAccess, useModel } from 'umi';
import { Spin } from 'antd';
import {
  GithubOutlined,
  SmileOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '@/assets/logo.png';
import requestData from './requestData';
import { sysLoginOut } from '@/services/login';
import styles from './index.less';
import { LayoutContext } from './context';
import defaultSettings from '../../../config/defaultSettings';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'];
  settings: Settings;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/** Use Authorized check all menu item */

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
const IconMap: any = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const BasicLayout: React.FC<any> = (props) => {
  const {
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const [menuListData, setMenuListData] = useState<MenuDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const menuDataRef = useRef<MenuDataItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  const stores = { initialState, access, menuDataRef };
  useEffect(() => {
    setMenuListData([]);
    setLoading(true);
    setTimeout(() => {
      setMenuListData(requestData);
      setLoading(false);
    }, 1000);
  }, [index]);

  console.log('layout-props-menuDataRef-access', {
    props,
    menuDataRef,
    initialState,
    access,
  });

  const handleMenuCollapse = (payload: boolean): void => {};

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    let newMenuList = menus.map(({ icon, children, ...item }) => ({
      ...item,
      hideInMenu: item.visible,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));
    return newMenuList;
  };

  return (
    <LayoutContext.Provider value={{ ...stores }}>
      <div className={styles['basic-layout-wrapper']}>
        <Spin
          size="large"
          spinning={loading}
          className={styles['spin-loading']}
        >
          <ProLayout
            className={styles['basic-layout-content']}
            logo={logo}
            {...props}
            {...defaultSettings}
            onCollapse={handleMenuCollapse}
            onPageChange={async () => {
              const { location } = history;
              // 如果没有登录，重定向到 login
              if (
                !initialState?.currentUser &&
                location.pathname !== '/login'
              ) {
                await sysLoginOut();
                history.push('/login');
              }
            }}
            onMenuHeaderClick={() => history.push('/')}
            menuItemRender={(menuItemProps, defaultDom) => {
              if (
                menuItemProps.isUrl ||
                !menuItemProps.path ||
                location.pathname === menuItemProps.path
              ) {
                return defaultDom;
              }
              return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => {
              return [
                {
                  path: '/',
                  breadcrumbName: '首页',
                },
                ...routers,
              ];
            }}
            itemRender={(route, params, routes, paths) => {
              return <Link to={route.path}>{route.breadcrumbName}</Link>;
            }}
            breadcrumbProps={(routes = []) => routes}
            footerRender={() => {
              if (
                settings?.footerRender ||
                settings?.footerRender === undefined
              ) {
                return defaultFooterDom;
              }
              return null;
            }}
            menu={{
              loading,
              defaultOpenAll: true,
            }}
            menuDataRender={() => loopMenuItem(menuListData)}
            rightContentRender={() => <RightContent />}
            postMenuData={(menuData) => {
              menuDataRef.current = menuData || [];
              return menuData || [];
            }}
          >
            <PageHeaderWrapper title="测试">{children}</PageHeaderWrapper>
          </ProLayout>
        </Spin>
      </div>
    </LayoutContext.Provider>
  );
};

export default BasicLayout;
