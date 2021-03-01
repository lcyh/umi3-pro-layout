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
  PageContainer,
} from '@ant-design/pro-layout';
import React, { useEffect, useState, useRef } from 'react';
import { Link, history, useAccess, useModel } from 'umi';
import { Spin, message as AntdMessage, Button } from 'antd';
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
import { getAuthList } from '@/services/user';
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
  const menuDataRef = useRef<MenuDataItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  const stores = { initialState, access, menuDataRef };
  useEffect(() => {
    setMenuListData([]);
    setLoading(true);
    getAuthList()
      .then((result) => {
        const { code, data = {}, message } = result;
        if (code !== 0) {
          AntdMessage.error(message);
          return;
        }
        setMenuListData(data.authList || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        AntdMessage.error(error);
      });
  }, []);

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
            <PageContainer
              content="欢迎使用 ProLayout 组件"
              tabList={
                location.pathname === '/abtest/experiment'
                  ? [
                      {
                        tab: '基本信息',
                        key: 'base',
                      },
                      {
                        tab: '详细信息',
                        key: 'info',
                      },
                    ]
                  : []
              }
              // extra={[
              //   <Button key="3">操作</Button>,
              //   <Button key="2">操作</Button>,
              //   <Button key="1" type="primary">
              //     主操作
              //   </Button>,
              // ]}
              // footer={[
              //   <Button key="rest">重置</Button>,
              //   <Button key="submit" type="primary">
              //     提交
              //   </Button>,
              // ]}
            >
              {children}
            </PageContainer>
          </ProLayout>
        </Spin>
      </div>
    </LayoutContext.Provider>
  );
};

export default BasicLayout;
